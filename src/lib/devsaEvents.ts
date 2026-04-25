import { parseDevsaFeed } from "@/lib/devsaFeed";
import type { ImportedEvent } from "@/lib/events";

const FEED_URL = "https://devsa.community/api/events/feed?communityId=acm-sa";
const CACHE_SECONDS = 60 * 60 * 12;

export const getDevsaAcmEvents = async (): Promise<ImportedEvent[]> => {
  try {
    const response = await fetch(FEED_URL, {
      next: { revalidate: CACHE_SECONDS },
    });

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
