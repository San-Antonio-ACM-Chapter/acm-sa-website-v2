"use client";
import type { Event } from "@/components/EventsSection/EventsSection";
import styles from "./EventCardAgenda.module.css";

interface EventCardAgendaProps {
  agenda: Event["agenda"];
  eventId: string;
}

const EventCardAgenda = ({ agenda, eventId }: EventCardAgendaProps) => {
  if (!agenda || Object.keys(agenda.items).length === 0) {
    return null;
  }

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours, 10);
    const isPM = hour >= 12;
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${isPM ? "PM" : "AM"}`;
  };

  return (
    <div className={styles.agendaSection}>
      <h4 className={styles.agendaTitle}>Agenda</h4>
      <div className={styles.agendaContent}>
        {Object.entries(agenda.items).map(([time, description]) => (
          <p key={`${eventId}-agenda-${time}`} className={styles.agendaItem}>
            {formatTime(time)} — {description}
          </p>
        ))}
        {agenda.note && <p className={styles.agendaNote}>{agenda.note}</p>}
      </div>
    </div>
  );
};

export default EventCardAgenda;
