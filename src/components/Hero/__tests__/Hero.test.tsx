import { render } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
  it("should match snapshot with default props", () => {
    const { container } = render(<Hero />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with custom props", () => {
    const { container } = render(
      <Hero
        imgOptions={{
          img: "/test-logo.svg",
          alt: "Test Logo",
        }}
        title="Test Title"
        city="Austin"
        cityTypingSpeed={50}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
