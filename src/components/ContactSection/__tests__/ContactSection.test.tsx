import { render } from "@testing-library/react";
import ContactSection from "../ContactSection";

describe("ContactSection", () => {
  it("should match snapshot", () => {
    const { container } = render(<ContactSection />);
    expect(container).toMatchSnapshot();
  });
});
