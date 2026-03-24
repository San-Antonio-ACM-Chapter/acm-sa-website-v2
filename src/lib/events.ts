export type EventLocation = {
  venue?: string;
  address?: string;
  city?: string;
  state?: string;
  isVirtual: boolean;
  virtualLink?: string;
  mapsLink?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: EventLocation;
  imageUrl?: string;
  headshotUrl?: string;
  meetupLink: string;
  tags: string[];
  capacity?: number;
  isFeatured: boolean;
  organizer?: string;
  registrationRequired?: boolean;
};

export type EventFeedSource = {
  feed: "devsa";
  guid: string;
  publishedAt?: string;
  category?: string;
  format: string;
  hostedBy: string;
  rawDescription: string;
};

export type ImportedEvent = Event & {
  source: EventFeedSource;
};
