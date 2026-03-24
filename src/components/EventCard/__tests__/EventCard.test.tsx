import { render, fireEvent } from "@testing-library/react";
import type { Event } from "@/components/EventsSection/EventsSection";
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

  it("should match snapshot with regular event (closed)", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with regular event (opened)", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    const card = container.querySelector('[role="button"]');
    if (card) {
      fireEvent.click(card);
    }
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with featured event (closed)", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
    };
    const { container } = render(<EventCard event={featuredEvent} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with featured event (opened)", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
    };
    const { container } = render(<EventCard event={featuredEvent} />);
    const card = container.querySelector('[role="button"]');
    if (card) {
      fireEvent.click(card);
    }
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with virtual event (closed)", () => {
    const virtualEvent: Event = {
      ...mockEvent,
      location: {
        isVirtual: true,
      },
    };
    const { container } = render(<EventCard event={virtualEvent} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with virtual event (opened)", () => {
    const virtualEvent: Event = {
      ...mockEvent,
      location: {
        isVirtual: true,
      },
    };
    const { container } = render(<EventCard event={virtualEvent} />);
    const card = container.querySelector('[role="button"]');
    if (card) {
      fireEvent.click(card);
    }
    expect(container).toMatchSnapshot();
  });
});
