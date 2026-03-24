import { render } from "@testing-library/react";
import EventCardAgenda from "../EventCardAgenda";

describe("EventCardAgenda", () => {
  it("matches snapshot with full agenda", () => {
    const mockAgenda = {
      items: {
        "18:00": "Doors open + meet & greet",
        "18:30": "ACM San Antonio announcements",
        "18:35": "Featured session",
        "19:30": "Q&A + networking",
      },
      note: "(Timing is approximate — we'll keep things moving and leave room for questions + conversation.)",
    };

    const { container } = render(
      <EventCardAgenda agenda={mockAgenda} eventId="test-event-123" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with agenda but no note", () => {
    const mockAgenda = {
      items: {
        "18:00": "Doors open",
        "19:00": "Main session",
      },
    };

    const { container } = render(
      <EventCardAgenda agenda={mockAgenda} eventId="test-event-456" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when agenda is undefined", () => {
    const { container } = render(
      <EventCardAgenda agenda={undefined} eventId="test-event-789" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when agenda items are empty", () => {
    const mockAgenda = {
      items: {},
      note: "Some note",
    };

    const { container } = render(
      <EventCardAgenda agenda={mockAgenda} eventId="test-event-empty" />,
    );
    expect(container).toMatchSnapshot();
  });
});

