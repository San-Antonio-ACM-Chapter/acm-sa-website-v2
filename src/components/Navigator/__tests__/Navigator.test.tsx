import { render } from "@testing-library/react";
import Navigator from "../Navigator";
import { ThemeProvider } from "@/contexts/ThemeContext";

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

describe("Navigator", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
