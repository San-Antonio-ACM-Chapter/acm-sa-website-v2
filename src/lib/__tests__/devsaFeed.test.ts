import { isAcmSaHostedEvent, parseDevsaDescription, parseDevsaFeed } from "@/lib/devsaFeed";

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
  it("returns only ACM SA hosted items and maps them into the site event shape", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <item>
      <title>People, Not Widgets || AI-April</title>
      <link>https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</link>
      <guid isPermaLink="true">https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d</guid>
      <description>Tuesday, April 14, 2026 at 6:00 PM CT · Geekdom 3rd Floor · Format: Hybrid · Hosted by Geeks &amp;&amp; {...}, ACM SA · People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery</description>
      <pubDate>Thu, 05 Mar 2026 05:23:53 GMT</pubDate>
      <category>Hybrid</category>
    </item>
    <item>
      <title>Taco Tuesday Open Source Builder Nights</title>
      <link>https://devsa.community/events/taco-tuesday-open-source-builder-nights-mn2437wh</link>
      <guid isPermaLink="true">https://devsa.community/events/taco-tuesday-open-source-builder-nights-mn2437wh</guid>
      <description>Tuesday, March 31, 2026 at 6:00 PM CT · Zelifcam · Format: In-Person · Hosted by Alamo Tech Collective · Join us for an open source building night.</description>
      <pubDate>Sun, 22 Mar 2026 18:50:04 GMT</pubDate>
      <category>In-Person</category>
    </item>
  </channel>
</rss>`;

    expect(parseDevsaFeed(xml)).toEqual([
      {
        id: "people-not-widgets-ai-april-mmd0sz0d",
        title: "People, Not Widgets || AI-April",
        description:
          "People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery",
        date: "2026-04-14T23:00:00.000Z",
        location: {
          venue: "Geekdom 3rd Floor",
          isVirtual: false,
        },
        meetupLink: "https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d",
        tags: ["hybrid"],
        isFeatured: false,
        organizer: "Geeks && {...}, ACM San Antonio",
        registrationRequired: true,
        source: {
          feed: "devsa",
          guid: "https://devsa.community/events/people-not-widgets-ai-april-mmd0sz0d",
          publishedAt: "2026-03-05T05:23:53.000Z",
          category: "Hybrid",
          format: "Hybrid",
          hostedBy: "Geeks && {...}, ACM San Antonio",
          rawDescription:
            "Tuesday, April 14, 2026 at 6:00 PM CT · Geekdom 3rd Floor · Format: Hybrid · Hosted by Geeks && {...}, ACM SA · People, Not Widgets - Lessons learned from applying systems thinking and analytics to social services delivery",
        },
      },
    ]);
  });
});
