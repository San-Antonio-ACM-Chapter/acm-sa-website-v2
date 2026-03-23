import { render } from "@testing-library/react";
import SocialLink from "../SocialLink";

describe("SocialLink", () => {
  it("should match snapshot with default props", () => {
    const { container } = render(
      <SocialLink
        name="Test Social"
        url="https://example.com"
        alt="Test icon"
        icon="/test-icon.svg"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with custom icon", () => {
    const { container } = render(
      <SocialLink
        name="Custom Social"
        url="https://example.com"
        alt="Custom social icon"
        icon="/custom-icon.svg"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
