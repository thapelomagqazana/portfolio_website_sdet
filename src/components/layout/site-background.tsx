import { NetworkCanvas } from "@/visual/network";

/**
 * SiteBackground renders the global animated background layer.
 *
 * It is isolated from page content so the app can keep background rendering,
 * z-index behavior, and pointer-event behavior consistent across sections.
 */
export function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      data-testid="site-background"
    >
      <NetworkCanvas className="h-full w-full" />
    </div>
  );
}
