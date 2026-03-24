import { render, screen } from "@testing-library/react";
import type { Event } from "@/lib/events";
import EventsSection from "../EventsSection";

// Mock Date methods and constructor to return consistent timezone-independent results
const RealDate = Date;

beforeAll(() => {
  // Mock Date constructor to return a fixed date
  // @ts-expect-error - We're intentionally overriding the Date class for testing
  global.Date = class extends RealDate {
    constructor(...args: ConstructorParameters<DateConstructor>) {
      if (args.length === 0) {
        // When called without arguments (like `new Date()`), return a fixed date
        super("2026-03-22T12:00:00Z");
      } else {
        // When called with arguments, use the real Date constructor
        // @ts-expect-error - Date constructor overloads are not modeled well with spread here
        super(...args);
      }
    }

    // Mock toLocaleDateString
    toLocaleDateString(
      _locale?: string,
      options?: Intl.DateTimeFormatOptions,
    ): string {
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
    }

    // Mock toLocaleTimeString
    toLocaleTimeString(): string {
      return "6:00 PM";
    }

    // Preserve static methods (prevent tree-shaking)
    static now = RealDate.now;
    static parse = RealDate.parse;
    static UTC = RealDate.UTC;
  };
});

afterAll(() => {
  global.Date = RealDate;
});

describe("EventsSection", () => {
  const mockEvents: Event[] = [
    {
      id: "test-event-1",
      title: "Test Event",
      description: "This is a test event description",
      date: "2026-04-15T18:00:00Z",
      location: {
        venue: "Test Venue",
        address: "123 Test St",
        isVirtual: false,
      },
      meetupLink: "https://devsa.community/events/test-event-1",
      tags: ["testing", "jest"],
      isFeatured: false,
      organizer: "ACM SA",
      registrationRequired: true,
    },
    {
      id: "test-event-2",
      title: "Tomorrow Event",
      description: "This is another test event description",
      date: "2026-04-16T18:00:00Z",
      location: {
        venue: "Another Venue",
        isVirtual: true,
      },
      meetupLink: "https://devsa.community/events/test-event-2",
      tags: ["virtual"],
      isFeatured: false,
      organizer: "ACM San Antonio",
      registrationRequired: true,
    },
  ];

  it("renders future events and marks the next one as upcoming", () => {
    render(<EventsSection events={mockEvents} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText("Tomorrow Event")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
    expect(
      screen.queryByText("No events scheduled at the moment. Check back soon!"),
    ).not.toBeInTheDocument();
  });
});
