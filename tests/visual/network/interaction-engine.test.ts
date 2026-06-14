import { describe, expect, it } from "vitest";
import {
  getDistanceBetweenPoints,
  getInteractionStrength,
  getNodeAttractionOffset,
  getNodeGlowIntensity,
  getNodeInteraction,
  isPointWithinRadius,
  resolveInteractionConfig,
} from "../../../src/visual/network";
import type { NetworkInteractionConfig, PointerPosition } from "../../../src/visual/network";

const node: PointerPosition = { x: 100, y: 100 };
const pointer: PointerPosition = { x: 140, y: 100 };

describe("network interaction engine", () => {
  it("calculates distance using euclidean distance", () => {
    expect(getDistanceBetweenPoints({ x: 0, y: 0 }, { x: 3, y: 4 })).toBe(5);
  });

  it("returns zero distance for identical points", () => {
    expect(getDistanceBetweenPoints(node, node)).toBe(0);
  });

  it("supports negative coordinates", () => {
    expect(getDistanceBetweenPoints({ x: -3, y: -4 }, { x: 0, y: 0 })).toBe(5);
  });

  it("detects points inside radius", () => {
    expect(isPointWithinRadius(pointer, node, 50)).toBe(true);
  });

  it("detects exact radius boundary as inside", () => {
    expect(isPointWithinRadius({ x: 150, y: 100 }, node, 50)).toBe(true);
  });

  it("returns false for null pointer", () => {
    expect(isPointWithinRadius(null, node, 50)).toBe(false);
  });

  it("returns false for invalid radius", () => {
    expect(isPointWithinRadius(pointer, node, 0)).toBe(false);
    expect(isPointWithinRadius(pointer, node, -10)).toBe(false);
    expect(isPointWithinRadius(pointer, node, Number.NaN)).toBe(false);
  });

  it("calculates interaction strength", () => {
    expect(getInteractionStrength(0, 100)).toBe(1);
    expect(getInteractionStrength(50, 100)).toBe(0.5);
    expect(getInteractionStrength(100, 100)).toBe(0);
  });

  it("clamps invalid interaction strength", () => {
    expect(getInteractionStrength(120, 100)).toBe(0);
    expect(getInteractionStrength(-1, 100)).toBe(0);
    expect(getInteractionStrength(50, 0)).toBe(0);
    expect(getInteractionStrength(Number.NaN, 100)).toBe(0);
  });

  it("calculates attraction offset toward pointer", () => {
    const config = resolveInteractionConfig({
      interactionRadius: 100,
      attractionStrength: 1,
      maxOffset: 10,
    });

    const offset = getNodeAttractionOffset(node, pointer, config);

    expect(offset.offsetX).toBeGreaterThan(0);
    expect(offset.offsetY).toBe(0);
    expect(offset.offsetX).toBeLessThanOrEqual(10);
  });

  it("returns zero offset when disabled", () => {
    const config = resolveInteractionConfig({ disabled: true });

    expect(getNodeAttractionOffset(node, pointer, config)).toEqual({
      offsetX: 0,
      offsetY: 0,
    });
  });

  it("returns zero offset outside radius", () => {
    const config = resolveInteractionConfig({ interactionRadius: 10 });

    expect(getNodeAttractionOffset(node, pointer, config)).toEqual({
      offsetX: 0,
      offsetY: 0,
    });
  });

  it("returns zero offset when pointer is exactly on node", () => {
    const config = resolveInteractionConfig({ interactionRadius: 100 });

    expect(getNodeAttractionOffset(node, node, config)).toEqual({
      offsetX: 0,
      offsetY: 0,
    });
  });

  it("calculates glow intensity", () => {
    const config = resolveInteractionConfig({
      interactionRadius: 100,
      glowStrength: 0.8,
    });

    const glow = getNodeGlowIntensity(node, pointer, config);

    expect(glow).toBeGreaterThan(0);
    expect(glow).toBeLessThanOrEqual(0.8);
  });

  it("returns zero glow when disabled", () => {
    const config = resolveInteractionConfig({ disabled: true });

    expect(getNodeGlowIntensity(node, pointer, config)).toBe(0);
  });

  it("returns complete node interaction result", () => {
    const result = getNodeInteraction(node, pointer, {
      interactionRadius: 100,
      glowStrength: 0.8,
    });

    expect(result.isWithinRadius).toBe(true);
    expect(result.interactionStrength).toBeGreaterThan(0);
    expect(result.glowIntensity).toBeGreaterThan(0);
  });

  it("handles null pointer safely", () => {
    const result = getNodeInteraction(node, null);

    expect(result).toEqual({
      offsetX: 0,
      offsetY: 0,
      glowIntensity: 0,
      interactionStrength: 0,
      isWithinRadius: false,
    });
  });

  it("sanitizes unsafe config overrides", () => {
    const config: Partial<NetworkInteractionConfig> = {
      interactionRadius: -1,
      attractionStrength: -1,
      glowStrength: -1,
      maxOffset: -1,
    };

    const resolved = resolveInteractionConfig(config);

    expect(resolved.interactionRadius).toBe(0);
    expect(resolved.attractionStrength).toBe(0);
    expect(resolved.glowStrength).toBe(0);
    expect(resolved.maxOffset).toBe(0);
  });
});
