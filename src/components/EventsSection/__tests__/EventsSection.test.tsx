import { fireEvent, render, screen } from "@testing-library/react";
import type { Event } from "@/lib/events";
import EventsSection from "../EventsSection";

const BLUE_CARD_CLASS = "eventCardBlue";
const RED_CARD_CLASS = "eventCardRed";

const buildEvent = (overrides: Partial<Event>): Event => ({
  id: "event-1",
  title: "Test Event",
  description: "This is a test event description",
  date: "2026-03-24T00:00:00.000Z",
  location: {
    venue: "Test Venue",
    address: "123 Test St",
    isVirtual: false,
  },
  meetupLink: "https://devsa.community/events/test-event",
  tags: ["testing"],
  isFeatured: false,
  organizer: "ACM San Antonio",
  registrationRequired: true,
  ...overrides,
});

describe("EventsSection", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-03-23T15:00:00.000Z"));
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("filters out past events", () => {
    const events: Event[] = [
      buildEvent({
        id: "past-event",
        title: "Past Event",
        date: "2026-03-22T23:00:00.000Z",
        endDate: "2026-03-23T01:00:00.000Z",
      }),
      buildEvent({
        id: "future-event",
        title: "Future Event",
        date: "2026-03-24T23:00:00.000Z",
        endDate: "2026-03-25T01:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    expect(screen.queryByText("Past Event")).not.toBeInTheDocument();
    expect(screen.getByText("Future Event")).toBeInTheDocument();
  });

  it("shows Live Now for an active event and Upcoming for the next future event", () => {
    const events: Event[] = [
      buildEvent({
        id: "live-event",
        title: "Live Event",
        date: "2026-03-23T14:00:00.000Z",
        endDate: "2026-03-23T16:00:00.000Z",
      }),
      buildEvent({
        id: "upcoming-event",
        title: "Upcoming Event",
        date: "2026-03-24T18:00:00.000Z",
        endDate: "2026-03-24T20:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    const liveCard = screen.getByText("Live Event").closest("a");
    const upcomingCard = screen.getByText("Upcoming Event").closest("a");

    expect(screen.getByText("Live Now")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(liveCard).toHaveTextContent("Live Now");
    expect(upcomingCard).toHaveTextContent("Upcoming");
  });

  it("shows Happening Today for a later-today event and Upcoming for the next future event", () => {
    const events: Event[] = [
      buildEvent({
        id: "today-event",
        title: "Today Event",
        date: "2026-03-23T23:00:00.000Z",
        endDate: "2026-03-24T01:00:00.000Z",
      }),
      buildEvent({
        id: "next-event",
        title: "Next Event",
        date: "2026-03-24T18:00:00.000Z",
        endDate: "2026-03-24T20:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    const todayCard = screen.getByText("Today Event").closest("a");
    const nextCard = screen.getByText("Next Event").closest("a");

    expect(screen.getByText("Happening Today")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(todayCard).toHaveTextContent("Happening Today");
    expect(nextCard).toHaveTextContent("Upcoming");
  });

  it("alternates visible card accents blue then red", () => {
    const events: Event[] = [
      buildEvent({
        id: "event-1",
        title: "Event One",
        date: "2026-03-24T18:00:00.000Z",
      }),
      buildEvent({
        id: "event-2",
        title: "Event Two",
        date: "2026-03-25T18:00:00.000Z",
      }),
      buildEvent({
        id: "event-3",
        title: "Event Three",
        date: "2026-03-26T18:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    const eventLinks = screen.getAllByRole("link");

    expect(eventLinks[0]).toHaveClass(BLUE_CARD_CLASS);
    expect(eventLinks[1]).toHaveClass(RED_CARD_CLASS);
  });

  it("shows the empty state when no future events remain", () => {
    const events: Event[] = [
      buildEvent({
        id: "past-event",
        title: "Past Event",
        date: "2026-03-22T23:00:00.000Z",
        endDate: "2026-03-23T01:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    expect(
      screen.getByText("No events scheduled at the moment. Check back soon!"),
    ).toBeInTheDocument();
  });

  it("shows a see more button after 2 events on desktop and expands on click", () => {
    const events: Event[] = [
      buildEvent({
        id: "event-1",
        title: "Event One",
        date: "2026-03-24T18:00:00.000Z",
      }),
      buildEvent({
        id: "event-2",
        title: "Event Two",
        date: "2026-03-25T18:00:00.000Z",
      }),
      buildEvent({
        id: "event-3",
        title: "Event Three",
        date: "2026-03-26T18:00:00.000Z",
      }),
      buildEvent({
        id: "event-4",
        title: "Event Four",
        date: "2026-03-27T18:00:00.000Z",
      }),
    ];

    render(<EventsSection events={events} />);

    expect(screen.getByText("Event One")).toBeInTheDocument();
    expect(screen.getByText("Event Two")).toBeInTheDocument();
    expect(screen.queryByText("Event Three")).not.toBeInTheDocument();
    expect(screen.queryByText("Event Four")).not.toBeInTheDocument();
    expect(screen.getByText("See more events")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /see more events/i }));

    expect(screen.getByText("Event Three")).toBeInTheDocument();
    const compactExpandedEvent = screen.getByText("Event Four").closest("a");

    expect(screen.getByText("Event Four")).toBeInTheDocument();
    expect(compactExpandedEvent).toHaveTextContent("Test Venue");
  });
});
