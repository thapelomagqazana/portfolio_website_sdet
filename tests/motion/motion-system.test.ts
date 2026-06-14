import { describe, expect, it } from "vitest";
import {
  cardHover,
  delays,
  durations,
  easings,
  fadeIn,
  panelReveal,
  qualityGatePulse,
  scaleIn,
  sectionRevealProps,
  slideUp,
  staggerContainer,
  viewportFrequent,
  viewportOnce,
} from "../../src/animations";

describe("motion constants", () => {
  it("defines production-safe duration tokens", () => {
    expect(durations.micro).toBeLessThanOrEqual(0.15);
    expect(durations.major).toBeLessThanOrEqual(0.9);
  });

  it("defines premium easing tokens", () => {
    expect(easings.premium).toEqual([0.22, 1, 0.36, 1]);
    expect(easings.system).toEqual([0.16, 1, 0.3, 1]);
    expect(easings.linear).toBe("linear");
  });

  it("defines delay tokens without negative delays", () => {
    expect(Object.values(delays).every((delay) => delay >= 0)).toBe(true);
  });
});

describe("motion presets", () => {
  it("defines required transition variants", () => {
    expect(fadeIn.hidden).toBeDefined();
    expect(fadeIn.visible).toBeDefined();
    expect(slideUp.hidden).toBeDefined();
    expect(slideUp.visible).toBeDefined();
    expect(scaleIn.hidden).toBeDefined();
    expect(scaleIn.visible).toBeDefined();
    expect(panelReveal.hidden).toBeDefined();
    expect(panelReveal.visible).toBeDefined();
    expect(staggerContainer.visible).toBeDefined();
  });

  it("keeps card hover subtle", () => {
    expect(cardHover.y).toBe(-4);
    expect(cardHover.scale).toBeLessThanOrEqual(1.01);
  });

  it("keeps quality gate pulse meaningful but controlled", () => {
    expect(qualityGatePulse.scale).toEqual([1, 1.04, 1]);
    expect(qualityGatePulse.transition.repeat).toBe(Infinity);
  });
});

describe("scroll presets", () => {
  it("uses once-only viewport animation by default", () => {
    expect(viewportOnce.once).toBe(true);
    expect(sectionRevealProps.viewport).toBe(viewportOnce);
  });

  it("supports frequent viewport animation for special cases", () => {
    expect(viewportFrequent.once).toBe(false);
  });
});
