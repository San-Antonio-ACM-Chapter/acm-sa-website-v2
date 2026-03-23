import { render } from "@testing-library/react";
import EventsSection from "../EventsSection";

describe("EventsSection", () => {
  it("should match snapshot", () => {
    const { container } = render(<EventsSection />);
    expect(container).toMatchSnapshot();
  });
});
