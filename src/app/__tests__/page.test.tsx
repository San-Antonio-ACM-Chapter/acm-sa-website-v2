import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock the ThreeWrapper component since it uses WebGL
jest.mock("../components/ThreeWrapper", () => ({
  ThreeWrapper: ({
    children,
    fallback,
  }: {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }) => <div data-testid="three-wrapper-mock">{fallback || children}</div>,
}));

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /ACM San Antonio/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the main content area", () => {
    render(<Home />);

    const content = screen.getByText(/Your interactive UI content goes here/i);
    expect(content).toBeInTheDocument();
  });

  it("renders the ThreeWrapper component", () => {
    render(<Home />);

    const threeWrapper = screen.getByTestId("three-wrapper-mock");
    expect(threeWrapper).toBeInTheDocument();
  });
});
