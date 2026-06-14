import { describe, expect, it } from "vitest";
import {
  createTelemetryPulse,
  isTelemetryPulseActive,
  updateTelemetryPulse,
  updateTelemetryPulses,
} from "../../../src/visual/network";

describe("telemetry pulses", () => {
  it("creates a pulse", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 10, y: 20 }, "test", 1000);

    expect(pulse.id).toBe("pulse-1");
    expect(pulse.origin).toEqual({ x: 10, y: 20 });
    expect(pulse.kind).toBe("test");
    expect(pulse.ageMs).toBe(0);
    expect(pulse.radius).toBe(0);
    expect(pulse.opacity).toBe(1);
  });

  it("uses safe duration when invalid duration is provided", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", -1);

    expect(pulse.durationMs).toBe(1);
  });

  it("updates pulse age, radius, and opacity", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);
    const updated = updateTelemetryPulse(pulse, 500, 100);

    expect(updated.ageMs).toBe(500);
    expect(updated.radius).toBe(50);
    expect(updated.opacity).toBe(0.5);
  });

  it("ignores negative delta", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);
    const updated = updateTelemetryPulse(pulse, -500, 100);

    expect(updated.ageMs).toBe(0);
    expect(updated.radius).toBe(0);
    expect(updated.opacity).toBe(1);
  });

  it("handles invalid max radius safely", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);
    const updated = updateTelemetryPulse(pulse, 500, -100);

    expect(updated.radius).toBe(0);
    expect(updated.opacity).toBe(0.5);
  });

  it("detects active and expired pulses", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);

    expect(isTelemetryPulseActive(pulse)).toBe(true);
    expect(isTelemetryPulseActive({ ...pulse, ageMs: 999 })).toBe(true);
    expect(isTelemetryPulseActive({ ...pulse, ageMs: 1000 })).toBe(false);
  });

  it("returns false for invalid pulse duration", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);

    expect(isTelemetryPulseActive({ ...pulse, durationMs: 0 })).toBe(false);
    expect(isTelemetryPulseActive({ ...pulse, durationMs: Number.NaN })).toBe(false);
  });

  it("updates and removes expired pulses", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);
    const updated = updateTelemetryPulses([pulse], 1200);

    expect(updated).toEqual([]);
  });

  it("keeps active pulses after batch update", () => {
    const pulse = createTelemetryPulse("pulse-1", { x: 0, y: 0 }, "test", 1000);
    const updated = updateTelemetryPulses([pulse], 500);

    expect(updated).toHaveLength(1);
    expect(updated[0].ageMs).toBe(500);
  });

  it("handles empty pulse arrays", () => {
    expect(updateTelemetryPulses([], 16)).toEqual([]);
  });
});
