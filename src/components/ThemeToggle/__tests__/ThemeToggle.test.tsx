import { render } from "@testing-library/react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "../ThemeToggle";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("ThemeToggle", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
