import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as React from "react";

afterEach(() => cleanup());

// next/image → <img>
vi.mock("next/image", () => {
  type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
  return {
    default: (props: ImgProps) => React.createElement("img", props),
  };
});

// next/navigation (si mockeas)
vi.mock("next/navigation", async (orig) => {
  const actual = (await orig()) as Record<string, unknown>;
  return {
    ...actual,
    usePathname: () => "/",
  };
});
