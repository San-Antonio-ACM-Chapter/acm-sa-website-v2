"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import type { Event } from "@/components/EventsSection/EventsSection";
import styles from "./EventCard.module.css";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDateRange = (start: string, end?: string) => {
    const startDate = new Date(start);
    const startFormatted = startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (end) {
      const endDate = new Date(end);
      const endFormatted = endDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      if (startFormatted === endFormatted) {
        // Same day event
        const startTime = startDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
        const endTime = endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
        return `${startFormatted}, ${startTime} - ${endTime}`;
      }
      // Multi-day event
      return `${startFormatted} - ${endFormatted}`;
    }

    return formatDate(start);
  };

  return (
    <div
      className={`${styles.eventCard} ${event.isFeatured ? styles.featured : ""}`}
    >
      {event.isFeatured && <div className={styles.featuredBadge}>Featured</div>}

      {event.imageUrl && (
        <div className={styles.eventImageContainer}>
          <Image
            src={event.imageUrl}
            alt={`${event.title} promotional image`}
            width={600}
            height={300}
            className={styles.eventImage}
          />
          {event.headshotUrl && (
            <div className={styles.headshotOverlay}>
              <Image
                src={event.headshotUrl}
                alt={`${event.organizer || 'Speaker'} headshot`}
                width={80}
                height={80}
                className={styles.headshotImage}
              />
            </div>
          )}
        </div>
      )}

      <div className={styles.eventHeader}>
        <h3 className={styles.eventTitle}>{event.title}</h3>
        <p className={styles.eventDate}>
          {mounted ? formatDateRange(event.date, event.endDate) : "Loading date..."}
        </p>
      </div>

      <p className={styles.eventDescription}>{event.description}</p>

      <div className={styles.eventDetails}>
        <div className={styles.eventLocation}>
          <span className={styles.locationIcon}>📍</span>
          <span>
            {event.location.isVirtual ? (
              "Virtual Event"
            ) : (
              <>
                {event.location.venue}
                {event.location.address && `, ${event.location.address}`}
              </>
            )}
          </span>
        </div>

        {event.capacity && (
          <div className={styles.eventCapacity}>
            <span className={styles.capacityIcon}>👥</span>
            <span>Capacity: {event.capacity}</span>
          </div>
        )}
      </div>

      {event.tags.length > 0 && (
        <div className={styles.eventTags}>
          {event.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className={styles.eventFooter}>
        <p className={styles.organizer}>Organized by {event.organizer}</p>
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.registerButton}
          >
            Register Now
          </a>
        )}
        {event.location.isVirtual &&
          event.location.virtualLink &&
          !event.registrationUrl && (
            <a
              href={event.location.virtualLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.registerButton}
            >
              Join Event
            </a>
          )}
      </div>
    </div>
  );
};

export default EventCard;
