import {
  isAcmSaHostedEvent,
  parseDevsaDescription,
  parseDevsaFeed,
} from "@/lib/devsaFeed";

describe("parseDevsaDescription", () => {
  it("extracts the structured prelude from the DEVSA item description", () => {
    const description =
      "Tuesday, April 14, 2026 at 6:00 PM CT · Geekdom 3rd Floor · Format: Hybrid · Hosted by Geeks && {...}, ACM SA · People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery";

    expect(parseDevsaDescription(description)).toEqual({
      dateLabel: "Tuesday, April 14, 2026 at 6:00 PM CT",
      venueLabel: "Geekdom 3rd Floor",
      format: "Hybrid",
      hostedBy: "Geeks && {...}, ACM San Antonio",
      body: "People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery",
    });
  });
});

describe("isAcmSaHostedEvent", () => {
  it("matches ACM SA in a multi-host string", () => {
    expect(isAcmSaHostedEvent("Geeks && {...}, ACM SA")).toBe(true);
  });

  it("rejects unrelated host strings", () => {
    expect(isAcmSaHostedEvent("Geeks && {...}, Alamo Python")).toBe(false);
  });
});

describe("parseDevsaFeed", () => {
  it("maps ACM SA items from the filtered DEVSA feed into the site event shape", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:devsa="https://devsa.community/ns/event-feed/1.0">
  <channel>
    <item>
      <title>People, Not Widgets || AI-April</title>
      <link>https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</link>
      <guid isPermaLink="true">https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</guid>
      <description>Tuesday, April 14, 2026 at 6:00 PM CT · Geekdom 3rd Floor · Format: Hybrid · Hosted by Geeks &amp;&amp; {...}, ACM SA · People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery</description>
      <pubDate>Thu, 05 Mar 2026 05:23:53 GMT</pubDate>
      <category>Hybrid</category>
      <category>Geeks &amp;&amp; {...}</category>
      <category>ACM SA</category>
      <devsa:eventStart>2026-04-14T18:00:00-05:00</devsa:eventStart>
      <devsa:eventEnd>2026-04-14T20:00:00-05:00</devsa:eventEnd>
      <devsa:eventTimezone>America/Chicago</devsa:eventTimezone>
      <devsa:eventType>hybrid</devsa:eventType>
      <devsa:description>People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery</devsa:description>
      <devsa:venue>Geekdom 3rd Floor</devsa:venue>
      <devsa:address>110 E Houston St, San Antonio, TX</devsa:address>
      <devsa:locationLabel>Geekdom 3rd Floor, 110 E Houston St, San Antonio, TX</devsa:locationLabel>
      <devsa:host id="geeks-and-drinks">Geeks &amp;&amp; {...}</devsa:host>
      <devsa:host id="acm-sa">ACM SA</devsa:host>
      <devsa:detailsUrl>https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</devsa:detailsUrl>
      <devsa:rsvpUrl>https://www.meetup.com/acm-sa/events/313183678/</devsa:rsvpUrl>
      <devsa:rsvpMode>external</devsa:rsvpMode>
      <devsa:link rel="details">https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</devsa:link>
      <devsa:link rel="rsvp">https://www.meetup.com/acm-sa/events/313183678/</devsa:link>
    </item>
  </channel>
</rss>`;

    expect(parseDevsaFeed(xml)).toEqual([
      {
        id: "people-not-widgets-ai-april-mmd0sz0d",
        title: "People, Not Widgets || AI-April",
        description:
          "People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery",
        date: "2026-04-14T18:00:00-05:00",
        endDate: "2026-04-14T20:00:00-05:00",
        location: {
          venue: "Geekdom 3rd Floor",
          address: "110 E Houston St, San Antonio, TX",
          isVirtual: false,
        },
        meetupLink:
          "https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d",
        tags: ["hybrid"],
        isFeatured: false,
        organizer: "Geeks && {...}, ACM San Antonio",
        registrationRequired: true,
        source: {
          feed: "devsa",
          guid: "https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d",
          publishedAt: "2026-03-05T05:23:53.000Z",
          category: "Hybrid",
          format: "hybrid",
          hostedBy: "Geeks && {...}, ACM San Antonio",
          rawDescription:
            "People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery",
        },
      },
    ]);
  });
});
