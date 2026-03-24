"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Event } from "@/components/EventsSection/EventsSection";
import styles from "./EventCard.module.css";
import { formatDateRange } from "./EventCard.utils";
import EventCardAgenda from "./EventCardAgenda/EventCardAgenda";
interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [mounted, setMounted] = useState(false);
  // will be used to expand or collapse the event card
  const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div
      className={`${styles.eventCard} ${event.isFeatured ? styles.featured : ""} ${isCardOpen ? styles.open : ""}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-expanded={isCardOpen}
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
                alt={`${event.organizer || "Speaker"} headshot`}
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
          {mounted
            ? formatDateRange(event.date, event.endDate)
            : "Loading date..."}
        </p>
      </div>

      {/*everything above this comment should be revealed when the card is collapsed (collapsed by default),
       everything below this comment should be revealed only when the card is opened (the user has tapped or clicked
        ont he card)*/}

      {isCardOpen && (
        <>
          <p className={styles.eventDescription}>{event.description}</p>

          <EventCardAgenda agenda={event.agenda} eventId={event.id} />

          <div className={styles.eventDetails}>
            <div className={styles.eventLocation}>
              <span className={styles.locationIcon}>📍</span>
              {event.location.isVirtual ? (
                <span>Virtual Event</span>
              ) : event.location.mapsLink ? (
                <span className={styles.locationLink}>
                  {event.location.venue}
                  {event.location.address && `, ${event.location.address}`}
                </span>
              ) : (
                <span>
                  {event.location.venue}
                  {event.location.address && `, ${event.location.address}`}
                </span>
              )}
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
          </div>
        </>
      )}
    </div>
  );
};

export default EventCard;
