import React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CinematicHero } from "./cinematic-landing-hero";

describe("CinematicHero", () => {
  it("exports the hero component", () => {
    expect(typeof CinematicHero).toBe("function");
  });

  it("renders the configured brand and CTA content", () => {
    const html = renderToString(
      <CinematicHero
        brandName="Web3Danime"
        tagline1="Build the future,"
        tagline2="not just another site."
        ctaHeading="Make it cinematic."
        metricValue={365}
        metricLabel="Days creating"
      />,
    );

    expect(html).toContain("Web3Danime");
    expect(html).toContain("Build the future,");
    expect(html).toContain("not just another site.");
    expect(html).toContain("Make it cinematic.");
    expect(html).toContain("Days creating");
  });
});
