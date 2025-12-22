import { render, screen, waitFor } from "@testing-library/react";
import { ThreeWrapper } from "../ThreeWrapper";

// Mock @react-three/fiber Canvas to avoid WebGL rendering in tests
jest.mock("@react-three/fiber", () => ({
  Canvas: ({
    children,
    style,
  }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
  }) => (
    <div data-testid="canvas-mock" style={style}>
      {children}
    </div>
  ),
}));

// Mock @react-three/drei PerformanceMonitor
jest.mock("@react-three/drei", () => ({
  PerformanceMonitor: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("ThreeWrapper Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Canvas when WebGL is supported", async () => {
    // Mock WebGL support
    const mockGetContext = jest.fn(() => ({ canvas: {} }) as any);
    HTMLCanvasElement.prototype.getContext = mockGetContext;

    render(
      <ThreeWrapper fallback={<div>Fallback content</div>}>
        <mesh data-testid="test-mesh">
          <boxGeometry />
        </mesh>
      </ThreeWrapper>,
    );

    // Wait for WebGL check to complete
    await waitFor(() => {
      const canvas = screen.queryByTestId("canvas-mock");
      expect(canvas).toBeInTheDocument();
    });
  });

  it("renders fallback when WebGL is not supported", async () => {
    // Mock no WebGL support
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

    render(
      <ThreeWrapper fallback={<div>Fallback content</div>}>
        <mesh>
          <boxGeometry />
        </mesh>
      </ThreeWrapper>,
    );

    // Wait for WebGL check and fallback render
    await waitFor(() => {
      const fallback = screen.getByText(/Fallback content/i);
      expect(fallback).toBeInTheDocument();
    });
  });

  it("renders fallback with fixed positioning in backdrop mode", async () => {
    // Mock no WebGL support
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);

    render(
      <ThreeWrapper backdrop={true} fallback={<div>Static backdrop</div>}>
        <mesh>
          <boxGeometry />
        </mesh>
      </ThreeWrapper>,
    );

    await waitFor(() => {
      const fallbackContainer =
        screen.getByText(/Static backdrop/i).parentElement;
      expect(fallbackContainer).toHaveStyle({
        position: "fixed",
        "z-index": "-1",
      });
    });
  });

  it("applies backdrop styles to Canvas when backdrop prop is true", async () => {
    // Mock WebGL support
    HTMLCanvasElement.prototype.getContext = jest.fn(
      () => ({ canvas: {} }) as any,
    );

    render(
      <ThreeWrapper backdrop={true}>
        <mesh>
          <boxGeometry />
        </mesh>
      </ThreeWrapper>,
    );

    await waitFor(() => {
      const canvas = screen.getByTestId("canvas-mock");
      expect(canvas).toHaveStyle({
        position: "fixed",
        "z-index": "-1",
      });
    });
  });
});
