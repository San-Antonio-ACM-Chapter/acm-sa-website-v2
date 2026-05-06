import type { ImportedEvent } from "@/lib/events";

const RSS_ITEM_PATTERN = /<item>([\s\S]*?)<\/item>/g;

const MONTH_INDEX: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export type DevsaFeedDescriptionParts = {
  dateLabel: string;
  venueLabel: string;
  format: string;
  hostedBy: string;
  body: string;
};

type ParsedFeedItem = {
  title: string;
  link: string;
  guid: string;
  summary: string;
  description: string;
  pubDate?: string;
  categories: string[];
  eventStart?: string;
  eventEnd?: string;
  eventType?: string;
  venue?: string;
  address?: string;
  hosts: string[];
  detailsUrl?: string;
  rsvpUrl?: string;
};

const decodeXmlEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 10)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCharCode(Number.parseInt(code, 16)),
    );

const getItemField = (itemXml: string, tagName: string) => {
  const match = itemXml.match(
    new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"),
  );
  return match ? decodeXmlEntities(match[1].trim()) : undefined;
};

const getItemFields = (itemXml: string, tagName: string) => {
  const matches = itemXml.matchAll(
    new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "gi"),
  );

  return [...matches].map((match) => decodeXmlEntities(match[1].trim()));
};

const stripMarkdownLinks = (value: string) =>
  value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const normalizeOrganizerName = (value: string) =>
  normalizeWhitespace(value).replace(/\bACM SA\b/gi, "ACM San Antonio");

const parseChicagoDateToIso = (value: string) => {
  const match = value.match(
    /^(?:[A-Za-z]+), ([A-Za-z]+) (\d{1,2}), (\d{4}) at (\d{1,2}):(\d{2}) (AM|PM) CT$/,
  );

  if (!match) {
    throw new Error(`Unsupported DEVSA date format: ${value}`);
  }

  const [
    ,
    monthName,
    dayString,
    yearString,
    hourString,
    minuteString,
    meridiem,
  ] = match;
  const month = MONTH_INDEX[monthName];

  if (month === undefined) {
    throw new Error(`Unsupported month in DEVSA date: ${value}`);
  }

  const day = Number.parseInt(dayString, 10);
  const year = Number.parseInt(yearString, 10);
  const minute = Number.parseInt(minuteString, 10);
  const rawHour = Number.parseInt(hourString, 10);
  const hour = (rawHour % 12) + (meridiem === "PM" ? 12 : 0);

  return chicagoTimeToUtcIso(year, month, day, hour, minute);
};

const getChicagoParts = (utcMillis: number) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date(utcMillis));
  const partMap = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return {
    year: Number.parseInt(partMap.year, 10),
    month: Number.parseInt(partMap.month, 10) - 1,
    day: Number.parseInt(partMap.day, 10),
    hour: Number.parseInt(partMap.hour, 10),
    minute: Number.parseInt(partMap.minute, 10),
    second: Number.parseInt(partMap.second, 10),
  };
};

const chicagoTimeToUtcIso = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) => {
  let utcMillis = Date.UTC(year, month, day, hour, minute);

  for (let index = 0; index < 4; index += 1) {
    const chicagoParts = getChicagoParts(utcMillis);
    const representedMillis = Date.UTC(
      chicagoParts.year,
      chicagoParts.month,
      chicagoParts.day,
      chicagoParts.hour,
      chicagoParts.minute,
      chicagoParts.second,
    );
    const targetMillis = Date.UTC(year, month, day, hour, minute);
    const diff = representedMillis - targetMillis;

    if (diff === 0) {
      break;
    }

    utcMillis -= diff;
  }

  return new Date(utcMillis).toISOString();
};

export const parseDevsaDescription = (
  description: string,
): DevsaFeedDescriptionParts | null => {
  const segments = description.split(" · ");

  if (segments.length < 5) {
    return null;
  }

  const [
    dateLabel,
    venueLabel,
    formatSegment,
    hostedBySegment,
    ...bodySegments
  ] = segments;
  const formatMatch = formatSegment.match(/^Format:\s*(.+)$/i);
  const hostedByMatch = hostedBySegment.match(/^Hosted by\s+(.+)$/i);

  if (!formatMatch || !hostedByMatch) {
    return null;
  }

  return {
    dateLabel: normalizeWhitespace(dateLabel),
    venueLabel: normalizeWhitespace(venueLabel),
    format: normalizeWhitespace(formatMatch[1]),
    hostedBy: normalizeOrganizerName(hostedByMatch[1]),
    body: stripMarkdownLinks(bodySegments.join(" · ")).trim(),
  };
};

export const isAcmSaHostedEvent = (hostedBy: string) => {
  const normalized = hostedBy.toLowerCase();
  return (
    normalized.includes("acm sa") || normalized.includes("acm san antonio")
  );
};

const makeEventId = (guid: string) => {
  const lastSegment = guid.split("/").filter(Boolean).at(-1);
  return lastSegment ?? guid;
};

const buildTags = (
  hosts: string[],
  categories: string[],
  eventType?: string,
  fallbackFormat?: string,
) => {
  const tags = new Set<string>();
  const normalizedHosts = new Set(hosts.map((host) => host.toLowerCase()));

  for (const category of categories) {
    if (
      category &&
      !normalizedHosts.has(normalizeOrganizerName(category).toLowerCase())
    ) {
      tags.add(category.toLowerCase());
    }
  }

  if (eventType) {
    tags.add(eventType.toLowerCase());
  } else if (fallbackFormat) {
    tags.add(fallbackFormat.toLowerCase());
  }

  return [...tags];
};

const parseFeedItem = (itemXml: string): ParsedFeedItem | null => {
  const title = getItemField(itemXml, "title");
  const link = getItemField(itemXml, "link");
  const guid = getItemField(itemXml, "guid");
  const summary = getItemField(itemXml, "description");
  const description = getItemField(itemXml, "devsa:description") ?? summary;

  if (!title || !link || !guid || !summary || !description) {
    return null;
  }

  return {
    title,
    link,
    guid,
    summary,
    description,
    pubDate: getItemField(itemXml, "pubDate"),
    categories: getItemFields(itemXml, "category"),
    eventStart: getItemField(itemXml, "devsa:eventStart"),
    eventEnd: getItemField(itemXml, "devsa:eventEnd"),
    eventType: getItemField(itemXml, "devsa:eventType"),
    venue: getItemField(itemXml, "devsa:venue"),
    address: getItemField(itemXml, "devsa:address"),
    hosts: getItemFields(itemXml, "devsa:host"),
    detailsUrl: getItemField(itemXml, "devsa:detailsUrl"),
    rsvpUrl: getItemField(itemXml, "devsa:rsvpUrl"),
  };
};

export const parseDevsaFeed = (xml: string) => {
  const importedEvents: ImportedEvent[] = [];

  for (const match of xml.matchAll(RSS_ITEM_PATTERN)) {
    const parsedItem = parseFeedItem(match[1]);

    if (!parsedItem) {
      continue;
    }

    const descriptionParts = parseDevsaDescription(parsedItem.summary);
    const normalizedHosts = parsedItem.hosts.map(normalizeOrganizerName);
    const includesAcmSaHost =
      normalizedHosts.length > 0
        ? normalizedHosts.some((host) => isAcmSaHostedEvent(host))
        : descriptionParts
          ? isAcmSaHostedEvent(descriptionParts.hostedBy)
          : false;

    if (!descriptionParts || !includesAcmSaHost) {
      continue;
    }

    const organizer = normalizedHosts.join(", ") || descriptionParts.hostedBy;
    const venue = parsedItem.venue ?? descriptionParts.venueLabel;
    const normalizedVenue = venue.toLowerCase();
    const isVirtual =
      parsedItem.eventType?.toLowerCase() === "virtual" ||
      normalizedVenue === "online event";
    const date =
      parsedItem.eventStart ??
      parseChicagoDateToIso(descriptionParts.dateLabel);
    const endDate = parsedItem.eventEnd;
    const meetupLink = parsedItem.detailsUrl ?? parsedItem.link;

    importedEvents.push({
      id: makeEventId(parsedItem.guid),
      title: parsedItem.title,
      description: parsedItem.description,
      date,
      endDate,
      location: {
        venue: isVirtual ? undefined : venue,
        address: isVirtual ? undefined : parsedItem.address,
        isVirtual,
      },
      meetupLink,
      tags: buildTags(
        normalizedHosts,
        parsedItem.categories,
        parsedItem.eventType,
        descriptionParts.format,
      ),
      isFeatured: false,
      organizer,
      registrationRequired: true,
      source: {
        feed: "devsa",
        guid: parsedItem.guid,
        publishedAt: parsedItem.pubDate
          ? new Date(parsedItem.pubDate).toISOString()
          : undefined,
        category: parsedItem.categories[0],
        format: parsedItem.eventType ?? descriptionParts.format,
        hostedBy: organizer,
        rawDescription: parsedItem.description,
      },
    });
  }

  return importedEvents.sort((left, right) =>
    left.date.localeCompare(right.date),
  );
};
