export const formatDate = (dateString: string) => {
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

export const formatDateRange = (start: string, end?: string) => {
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
