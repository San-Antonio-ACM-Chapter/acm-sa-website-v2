import { fireEvent, render } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("should match snapshot with outline variant", () => {
    const { container } = render(<Button>Click Me</Button>);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with primary variant", () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with secondary variant", () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with active state", () => {
    const { container } = render(<Button active>Active Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot as link", () => {
    const { container } = render(
      <Button
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link Button
      </Button>,
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    fireEvent.click(getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
