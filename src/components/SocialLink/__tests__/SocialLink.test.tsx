import { render } from "@testing-library/react";
import SocialLink from "../SocialLink";

describe("SocialLink", () => {
  it("should match snapshot with default props", () => {
    const { container } = render(
      <SocialLink href="https://example.com" icon="/test-icon.svg" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with label", () => {
    const { container } = render(
      <SocialLink
        href="https://example.com"
        icon="/test-icon.svg"
        label="Test Social"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
