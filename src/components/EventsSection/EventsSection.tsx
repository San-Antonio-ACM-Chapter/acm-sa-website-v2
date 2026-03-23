"use client";
import { useState } from "react";
import EventCard from "@/components/EventCard/EventCard";
import styles from "./EventsSection.module.css";

export type EventLocation = {
  venue?: string;
  address?: string;
  city?: string;
  state?: string;
  isVirtual: boolean;
  virtualLink?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: EventLocation;
  imageUrl?: string;
  registrationUrl?: string;
  tags: string[];
  capacity?: number;
  isFeatured: boolean;
  organizer?: string;
  registrationRequired?: boolean;
};

// Mock events data
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Web Development Workshop",
    description:
      "Learn the fundamentals of modern web development with React and TypeScript.",
    date: "2026-04-15T18:00:00Z",
    location: {
      venue: "UTSA Main Campus",
      address: "One UTSA Circle",
      city: "San Antonio",
      state: "TX",
      isVirtual: false,
    },
    tags: ["workshop", "web development", "react"],
    isFeatured: true,
    registrationRequired: true,
  },
  {
    id: "2",
    title: "Career Fair Networking Night",
    description:
      "Connect with local tech companies and learn about career opportunities.",
    date: "2026-05-01T17:00:00Z",
    location: {
      venue: "Tech Bloc",
      address: "123 E Houston St",
      city: "San Antonio",
      state: "TX",
      isVirtual: false,
    },
    tags: ["career", "networking"],
    isFeatured: false,
    registrationRequired: false,
  },
];

const EventsSection = () => {
  const [showAll, setShowAll] = useState(false);

  // Only show mock data in development mode
  const isDevelopment = process.env.NODE_ENV === "development";
  const events = isDevelopment ? MOCK_EVENTS : [];

  const now = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.endDate ?? event.date);
    return eventDate >= now;
  });

  const displayedEvents = showAll ? events : upcomingEvents;

  return (
    <section className={styles.eventsSection} id="events" tabIndex={-1}>
      <h2>Events</h2>

      {events.length === 0 && (
        <div className={styles.emptyState}>
          <p>No events scheduled at the moment. Check back soon!</p>
        </div>
      )}

      {events.length > 0 && (
        <>
          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterButton} ${!showAll ? styles.active : ""}`}
              onClick={() => setShowAll(false)}
              type="button"
            >
              Upcoming ({upcomingEvents.length})
            </button>
            <button
              className={`${styles.filterButton} ${showAll ? styles.active : ""}`}
              onClick={() => setShowAll(true)}
              type="button"
            >
              All Events ({events.length})
            </button>
          </div>

          <div className={styles.eventsGrid}>
            {displayedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {!showAll && upcomingEvents.length === 0 && (
            <div className={styles.emptyState}>
              <p>No upcoming events. Check out our past events!</p>
              <button
                className={styles.viewAllButton}
                onClick={() => setShowAll(true)}
                type="button"
              >
                View All Events
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default EventsSection;
