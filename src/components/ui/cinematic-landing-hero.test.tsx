import { describe, expect, it } from "vitest";
import { CinematicHero } from "./cinematic-landing-hero";

describe("CinematicHero", () => {
  it("exports the hero component", () => {
    expect(typeof CinematicHero).toBe("function");
  });
});