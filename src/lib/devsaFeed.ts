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
  description: string;
  pubDate?: string;
  category?: string;
};

const decodeXmlEntities = (value: string) =>
  value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 10)))
    .replace(
      /&#x([0-9a-f]+);/gi,
      (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)),
    );

const getItemField = (itemXml: string, tagName: string) => {
  const match = itemXml.match(new RegExp(`<${tagName}(?:\\s+[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? decodeXmlEntities(match[1].trim()) : undefined;
};

const stripMarkdownLinks = (value: string) => value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)");

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const normalizeOrganizerName = (value: string) =>
  normalizeWhitespace(value).replace(/\bACM SA\b/gi, "ACM San Antonio");

const parseChicagoDateToIso = (value: string) => {
  const match = value.match(
    /^(?:[A-Za-z]+), ([A-Za-z]+) (\d{1,2}), (\d{4}) at (\d{1,2}):(\d{2}) (AM|PM) CT$/,
  );

  if (!match) {
    throw new Error(`Unsupported DEVSA date format: ${value}`);
  }

  const [, monthName, dayString, yearString, hourString, minuteString, meridiem] = match;
  const month = MONTH_INDEX[monthName];

  if (month === undefined) {
    throw new Error(`Unsupported month in DEVSA date: ${value}`);
  }

  const day = Number.parseInt(dayString, 10);
  const year = Number.parseInt(yearString, 10);
  const minute = Number.parseInt(minuteString, 10);
  const rawHour = Number.parseInt(hourString, 10);
  const hour = rawHour % 12 + (meridiem === "PM" ? 12 : 0);

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
  const partMap = Object.fromEntries(parts.map((part) => [part.type, part.value]));

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

export const parseDevsaDescription = (description: string): DevsaFeedDescriptionParts | null => {
  const segments = description.split(" · ");

  if (segments.length < 5) {
    return null;
  }

  const [dateLabel, venueLabel, formatSegment, hostedBySegment, ...bodySegments] = segments;
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
  return normalized.includes("acm sa") || normalized.includes("acm san antonio");
};

const makeEventId = (guid: string) => {
  const lastSegment = guid.split("/").filter(Boolean).at(-1);
  return lastSegment ?? guid;
};

const buildTags = (descriptionParts: DevsaFeedDescriptionParts, category?: string) => {
  const tags = new Set<string>();

  if (category) {
    tags.add(category.toLowerCase());
  }

  tags.add(descriptionParts.format.toLowerCase());

  return [...tags];
};

const parseFeedItem = (itemXml: string): ParsedFeedItem | null => {
  const title = getItemField(itemXml, "title");
  const link = getItemField(itemXml, "link");
  const guid = getItemField(itemXml, "guid");
  const description = getItemField(itemXml, "description");

  if (!title || !link || !guid || !description) {
    return null;
  }

  return {
    title,
    link,
    guid,
    description,
    pubDate: getItemField(itemXml, "pubDate"),
    category: getItemField(itemXml, "category"),
  };
};

export const parseDevsaFeed = (xml: string) => {
  const importedEvents: ImportedEvent[] = [];

  for (const match of xml.matchAll(RSS_ITEM_PATTERN)) {
    const parsedItem = parseFeedItem(match[1]);

    if (!parsedItem) {
      continue;
    }

    const descriptionParts = parseDevsaDescription(parsedItem.description);

    if (!descriptionParts || !isAcmSaHostedEvent(descriptionParts.hostedBy)) {
      continue;
    }

    importedEvents.push({
      id: makeEventId(parsedItem.guid),
      title: parsedItem.title,
      description: descriptionParts.body,
      date: parseChicagoDateToIso(descriptionParts.dateLabel),
      location: {
        venue:
          descriptionParts.venueLabel.toLowerCase() === "online event"
            ? undefined
            : descriptionParts.venueLabel,
        isVirtual:
          descriptionParts.format.toLowerCase() === "virtual" ||
          descriptionParts.venueLabel.toLowerCase() === "online event",
      },
      meetupLink: parsedItem.link,
      tags: buildTags(descriptionParts, parsedItem.category),
      isFeatured: false,
      organizer: descriptionParts.hostedBy,
      registrationRequired: true,
      source: {
        feed: "devsa",
        guid: parsedItem.guid,
        publishedAt: parsedItem.pubDate ? new Date(parsedItem.pubDate).toISOString() : undefined,
        category: parsedItem.category,
        format: descriptionParts.format,
        hostedBy: descriptionParts.hostedBy,
        rawDescription: parsedItem.description,
      },
    });
  }

  return importedEvents.sort((left, right) => left.date.localeCompare(right.date));
};
