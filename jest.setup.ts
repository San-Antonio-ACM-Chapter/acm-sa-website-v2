// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    priority: _priority,
    ...props
  }: {
    alt?: string;
    priority?: boolean;
    src?: string | { src?: string };
  } & Record<string, unknown>) => {
    // Render a plain img in tests so snapshots stay stable across Next upgrades.
    const React = require("react");
    return React.createElement("img", {
      alt,
      src: typeof src === "string" ? src : src?.src,
      ...props,
    });
  },
}));
