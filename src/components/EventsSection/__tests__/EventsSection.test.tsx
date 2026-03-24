import { render } from "@testing-library/react";
import EventsSection from "../EventsSection";
import type { Event } from "@/lib/events";

// Mock Date methods and constructor to return consistent timezone-independent results
const RealDate = Date;
const originalEnv = process.env.NODE_ENV;

beforeAll(() => {
  // Set NODE_ENV to development so MOCK_EVENTS are shown
  Object.defineProperty(process.env, "NODE_ENV", {
    value: "development",
    writable: true,
    configurable: true,
  });

  // Mock Date constructor to return a fixed date
  // @ts-expect-error - We're intentionally overriding the Date class for testing
  global.Date = class extends RealDate {
    constructor(...args: any[]) {
      if (args.length === 0) {
        // When called without arguments (like `new Date()`), return a fixed date
        super("2026-03-22T12:00:00Z");
      } else {
        // When called with arguments, use the real Date constructor
        // @ts-ignore - Spread operator needed for dynamic arguments
        super(...args);
      }
    }

    // Mock toLocaleDateString
    toLocaleDateString(locale?: string, options?: Intl.DateTimeFormatOptions): string {
      if (options?.weekday && options?.month && options?.day && options?.year && options?.hour) {
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
  Object.defineProperty(process.env, "NODE_ENV", {
    value: originalEnv,
    writable: true,
    configurable: true,
  });
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
  ];

  it("should match snapshot", () => {
    const { container } = render(<EventsSection events={mockEvents} />);
    expect(container).toMatchSnapshot();
  });
});
