import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import * as React from "react";

afterEach(() => cleanup());

// Mock next/image → <img>
vi.mock("next/image", () => {
  return {
    default: (props: any) =>
      React.createElement("img", {
        ...props,
        src: typeof props?.src === "string" ? props.src : "",
        alt: props?.alt ?? "",
      }),
  };
});

// Mock mínimo de next/navigation usado por Header
vi.mock("next/navigation", async (orig) => {
  const actual = (await orig()) as any;
  return {
    ...actual,
    usePathname: () => "/",
  };
});
