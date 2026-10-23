"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard/EventCard";
import { FEED_URL } from "@/lib/devsaEvents";
import { parseDevsaFeed } from "@/lib/devsaFeed";
import type { Event } from "@/lib/events";
import styles from "./EventsSection.module.css";

interface EventsSectionProps {
  events: Event[];
}

const DEFAULT_EVENT_DURATION_MS = 2 * 60 * 60 * 1000;
const MOBILE_BREAKPOINT = 900;

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

const formatCompactDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const getIsMobileViewport = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;

const EventsSection = ({ events: buildTimeEvents }: EventsSectionProps) => {
  const [, setIsMobileViewport] = useState(getIsMobileViewport);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [liveEvents, setLiveEvents] = useState<Event[] | null>(null);
  const events = liveEvents ?? buildTimeEvents;

  // The site is a static export, so buildTimeEvents is frozen at the last
  // deploy. Refresh from the feed on load; keep the build copy if that fails.
  useEffect(() => {
    if (typeof fetch !== "function") {
      return;
    }

    const controller = new AbortController();

    fetch(FEED_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`DEVSA feed returned ${response.status}`);
        }
        return response.text();
      })
      .then((xml) => setLiveEvents(parseDevsaFeed(xml)))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

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
  const featuredEventLimit = 2;
  const compactPreviewLimit = 0;
  const featuredEvents = visibleEvents.slice(0, featuredEventLimit);
  const remainingEvents = visibleEvents.slice(featuredEventLimit);
  const compactPreviewEvents = showAllEvents
    ? []
    : remainingEvents.slice(0, compactPreviewLimit);
  const compactEvents = showAllEvents ? remainingEvents : [];
  const hiddenEventCount = remainingEvents.length - compactPreviewEvents.length;
  const hasHiddenEvents = hiddenEventCount > 0;

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
            {featuredEvents.map((event, index) => {
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

            {((showAllEvents && compactEvents.length > 0) ||
              (!showAllEvents && compactPreviewEvents.length > 0)) && (
              <div className={styles.compactList}>
                {(showAllEvents ? compactEvents : compactPreviewEvents).map(
                  (event, index) => {
                    const status = getEventStatus(event, nextUpcomingEvent?.id);
                    const accentVariant =
                      (featuredEvents.length + index) % 2 === 0
                        ? "blue"
                        : "red";

                    return (
                      <a
                        key={event.id}
                        className={`${styles.compactEvent} ${accentVariant === "blue" ? styles.compactEventBlue : styles.compactEventRed}`}
                        href={event.meetupLink}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <div className={styles.compactHeader}>
                          <div className={styles.compactTitleWrap}>
                            {status && (
                              <span
                                className={`${styles.compactStatus} ${status.tone === "live" ? styles.compactStatusLive : status.tone === "accent" ? styles.compactStatusAccent : styles.compactStatusNeutral}`}
                              >
                                {status.label}
                              </span>
                            )}
                            <h3 className={styles.compactTitle}>
                              {event.title}
                            </h3>
                          </div>
                          <span className={styles.compactDate}>
                            {formatCompactDate(event.date)}
                          </span>
                        </div>

                        <div className={styles.compactMeta}>
                          <span className={styles.compactVenue}>
                            {event.location.isVirtual
                              ? "Virtual Event"
                              : event.location.venue || "TBA"}
                          </span>
                          <span className={styles.compactOrganizer}>
                            {event.organizer}
                          </span>
                        </div>
                      </a>
                    );
                  },
                )}
              </div>
            )}

            {hasHiddenEvents && !showAllEvents && (
              <button
                className={styles.seeMoreButton}
                onClick={() => setShowAllEvents(true)}
                type="button"
              >
                <span className={styles.seeMoreEyebrow}>More Events</span>
                <span className={styles.seeMoreTitle}>See more events</span>
                <span className={styles.seeMoreMeta}>
                  {hiddenEventCount} more upcoming{" "}
                  {hiddenEventCount === 1 ? "event" : "events"}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
