import { render } from "@testing-library/react";
import type { Event } from "@/components/EventsSection/EventsSection";
import EventCard from "../EventCard";

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
    tags: ["testing", "jest"],
    isFeatured: false,
    registrationRequired: false,
  };

  it("should match snapshot with regular event", () => {
    const { container } = render(<EventCard event={mockEvent} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with featured event", () => {
    const featuredEvent: Event = {
      ...mockEvent,
      isFeatured: true,
    };
    const { container } = render(<EventCard event={featuredEvent} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with virtual event", () => {
    const virtualEvent: Event = {
      ...mockEvent,
      location: {
        isVirtual: true,
      },
    };
    const { container } = render(<EventCard event={virtualEvent} />);
    expect(container).toMatchSnapshot();
  });
});
