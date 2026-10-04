import React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CinematicHero } from "./cinematic-landing-hero";

describe("CinematicHero", () => {
  it("exports the hero component", () => {
    expect(typeof CinematicHero).toBe("function");
  });

  it("preserves the original cinematic hero defaults", () => {
    const html = renderToString(<CinematicHero />);

    expect(html).toContain("Sobers");
    expect(html).toContain("Track the journey,");
    expect(html).toContain("not just the days.");
    expect(html).toContain("Accountability, redefined.");
    expect(html).toContain("Days Sober");
    expect(html).toContain("Start your recovery.");
    expect(html).toContain("Join thousands of others in the 12-step program and take control of your timeline today.");
    expect(html).toContain("Sponsor Update");
    expect(html).toContain("Sobers empowers sponsors and sponsees in 12-step recovery programs with structured accountability, precise sobriety tracking, and beautiful visual timelines.");
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
