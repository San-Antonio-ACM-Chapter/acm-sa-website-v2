import { parseDevsaFeed } from "@/lib/devsaFeed";
import type { ImportedEvent } from "@/lib/events";

export const FEED_URL =
  "https://www.devsa.community/api/events/feed?communityId=acm-sa";

export const getDevsaAcmEvents = async (): Promise<ImportedEvent[]> => {
  try {
    const response = await fetch(FEED_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch DEVSA feed: ${response.status} ${response.statusText}`,
      );
    }

    const xml = await response.text();
    return parseDevsaFeed(xml);
  } catch (error) {
    console.error("Failed to load ACM SA events from DEVSA feed", error);
    return [];
  }
};
