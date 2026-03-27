import { render, screen } from "@testing-library/react";
import type { Event } from "@/lib/events";
import EventCard from "../EventCard";

// Mock Date methods to return consistent timezone-independent results
const mockToLocaleDateString = jest.fn(
  (_locale: string, options?: Intl.DateTimeFormatOptions) => {
    // Return a consistent format regardless of timezone
    if (
      options?.weekday &&
      options?.month &&
      options?.day &&
      options?.year &&
      options?.hour
    ) {
      return "Wed, Apr 15, 2026, 6:00 PM";
    }
    if (options?.weekday && options?.month && options?.day && options?.year) {
      return "Wed, Apr 15, 2026";
    }
    return "4/15/2026";
  },
);

const mockToLocaleTimeString = jest.fn(() => "6:00 PM");

beforeAll(() => {
  // @ts-expect-error - Mock the Date prototype methods
  Date.prototype.toLocaleDateString = mockToLocaleDateString;
  Date.prototype.toLocaleTimeString = mockToLocaleTimeString;
});

describe("EventCard", () => {
  const mockEvent: Event = {
    id: "test-event-1",
    title: "Test Event",
    description: "This is a test event description",
    date: "2026-04-15T18:00:00Z",
    location: {
      venue: "Test Venue",
      address: "123 Test St",
      isVirtual: false,
    },
    meetupLink: "https://www.meetup.com/acm-sa/events/test-event-1",
    tags: ["testing", "jest"],
    isFeatured: false,
    registrationRequired: false,
  };

  it("renders a regular event card", () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Wed, Apr 15, 2026, 6:00 PM")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test event description"),
    ).toBeInTheDocument();
    expect(screen.getByText("testing")).toBeInTheDocument();
    expect(screen.getByText("jest")).toBeInTheDocument();
    expect(screen.getByText("View details →")).toBeInTheDocument();
  });

  it("renders a featured event card", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
      organizer: "ACM San Antonio",
    };
    render(<EventCard event={featuredEvent} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(
      screen.getByText("Organized by ACM San Antonio"),
    ).toBeInTheDocument();
  });

  it("renders a virtual live event card", () => {
    const virtualEvent: Event = {
      ...mockEvent,
      location: {
        isVirtual: true,
      },
    };
    render(
      <EventCard
        event={virtualEvent}
        statusLabel="Live Now"
        statusTone="live"
        accentVariant="red"
      />,
    );

    expect(screen.getByText("Virtual Event")).toBeInTheDocument();
    expect(screen.getByText("Live Now")).toBeInTheDocument();
  });

  it("matches snapshot for regular event card", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for featured event card with blue accent", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
      organizer: "ACM San Antonio",
      imageUrl: "/test-image.jpg",
    };
    const { container } = render(
      <EventCard event={featuredEvent} accentVariant="blue" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for featured event card with red accent", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
      organizer: "ACM San Antonio",
      imageUrl: "/test-image.jpg",
    };
    const { container } = render(
      <EventCard event={featuredEvent} accentVariant="red" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for live event card", () => {
    const liveEvent: Event = {
      ...mockEvent,
      organizer: "DevSA",
    };
    const { container } = render(
      <EventCard
        event={liveEvent}
        statusLabel="Live Now"
        statusTone="live"
        accentVariant="red"
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for event card with agenda", () => {
    const eventWithAgenda: Event = {
      ...mockEvent,
      description:
        "This is a test event description\n\nAGENDA:\n6:00 PM - Welcome\n6:30 PM - Main Talk\n7:30 PM - Q&A",
      organizer: "ACM SA",
    };
    const { container } = render(<EventCard event={eventWithAgenda} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for virtual event card", () => {
    const virtualEvent: Event = {
      ...mockEvent,
      location: {
        isVirtual: true,
      },
      organizer: "Tech Community",
    };
    const { container } = render(<EventCard event={virtualEvent} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for event card with capacity", () => {
    const eventWithCapacity: Event = {
      ...mockEvent,
      capacity: 50,
      organizer: "ACM SA",
    };
    const { container } = render(<EventCard event={eventWithCapacity} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("matches snapshot for event with headshot and image", () => {
    const eventWithImages: Event = {
      ...mockEvent,
      imageUrl: "/event-image.jpg",
      headshotUrl: "/speaker-headshot.jpg",
      organizer: "Guest Speaker",
      isFeatured: true,
    };
    const { container } = render(<EventCard event={eventWithImages} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
