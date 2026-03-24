"use client";
import EventCard from "@/components/EventCard/EventCard";
import type { Event } from "@/lib/events";
import styles from "./EventsSection.module.css";

interface EventsSectionProps {
  events: Event[];
}

const DEFAULT_EVENT_DURATION_MS = 2 * 60 * 60 * 1000;

const chicagoDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getChicagoDateKey = (value: Date) => chicagoDateFormatter.format(value);

const getEventEndTime = (event: Event) =>
  event.endDate
    ? new Date(event.endDate)
    : new Date(new Date(event.date).getTime() + DEFAULT_EVENT_DURATION_MS);

const isLiveNow = (event: Event, now: Date) => {
  const start = new Date(event.date);
  const end = getEventEndTime(event);
  return now >= start && now <= end;
};

const isHappeningToday = (event: Event, now: Date) => {
  const start = new Date(event.date);
  return getChicagoDateKey(start) === getChicagoDateKey(now) && start > now;
};

const getEventStatus = (event: Event, nextUpcomingEventId?: string) => {
  const now = new Date();

  if (isLiveNow(event, now)) {
    return { label: "Live Now", tone: "live" as const };
  }

  if (isHappeningToday(event, now)) {
    return { label: "Happening Today", tone: "accent" as const };
  }

  if (event.id === nextUpcomingEventId) {
    return { label: "Upcoming", tone: "neutral" as const };
  }

  return undefined;
};

const EventsSection = ({ events }: EventsSectionProps) => {
  const now = new Date();
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const nextUpcomingEvent = sortedEvents.find((event) => {
    if (getEventEndTime(event) < now) {
      return false;
    }

    if (isLiveNow(event, now) || isHappeningToday(event, now)) {
      return false;
    }

    return new Date(event.date) > now;
  });
  const visibleEvents = sortedEvents.filter(
    (event) => getEventEndTime(event) >= new Date(),
  );

  return (
    <section className={styles.eventsSection} id="events" tabIndex={-1}>
      <div className={styles.contentWrapper}>
        <h2>Events</h2>

        {visibleEvents.length === 0 && (
          <div className={styles.emptyState}>
            <p>No events scheduled at the moment. Check back soon!</p>
          </div>
        )}

        {visibleEvents.length > 0 && (
          <div className={styles.eventsGrid}>
            {visibleEvents.map((event, index) => {
              const status = getEventStatus(event, nextUpcomingEvent?.id);
              const accentVariant = index % 2 === 0 ? "blue" : "red";

              return (
                <EventCard
                  key={event.id}
                  event={event}
                  statusLabel={status?.label}
                  statusTone={status?.tone}
                  accentVariant={accentVariant}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
