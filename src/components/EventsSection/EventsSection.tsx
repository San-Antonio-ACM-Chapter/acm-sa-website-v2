"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard/EventCard";
import Button from "@/components/Button/Button";
import styles from "./EventsSection.module.css";

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
  agenda?: {
    items: Record<string, string>;
    note?: string;
  };
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

const EventsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetch("/data/events.json");
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to load events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const sortEventsByDate = (eventsToSort: Event[]) => {
    return [...eventsToSort].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB; // Ascending order (soonest first)
    });
  };

  const now = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.endDate ?? event.date);
    return eventDate >= now;
  });

  const displayedEvents = sortEventsByDate(showAll ? events : upcomingEvents);

  return (
    <section className={styles.eventsSection} id="events" tabIndex={-1}>
      <div className={styles.contentWrapper}>
        <h2>Events</h2>

        {loading && (
          <div className={styles.emptyState}>
            <p>Loading events...</p>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className={styles.emptyState}>
            <p>No events scheduled at the moment. Check back soon!</p>
          </div>
        )}

        {!loading && events.length > 0 && (
          <>
            <div className={styles.filterButtons}>
              <Button
                active={!showAll}
                onClick={() => setShowAll(false)}
              >
                Upcoming ({upcomingEvents.length})
              </Button>
              <Button
                active={showAll}
                onClick={() => setShowAll(true)}
              >
                All Events ({events.length})
              </Button>
            </div>

            <div className={styles.eventsGrid}>
              {displayedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {!showAll && upcomingEvents.length === 0 && (
              <div className={styles.emptyState}>
                <p>No upcoming events. Check out our past events!</p>
                <Button
                  variant="primary"
                  onClick={() => setShowAll(true)}
                >
                  View All Events
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
