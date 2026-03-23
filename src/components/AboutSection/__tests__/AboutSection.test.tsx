import { render } from "@testing-library/react";
import AboutSection from "../AboutSection";

describe("AboutSection", () => {
  it("should match snapshot", () => {
    const { container } = render(<AboutSection />);
    expect(container).toMatchSnapshot();
  });
});
