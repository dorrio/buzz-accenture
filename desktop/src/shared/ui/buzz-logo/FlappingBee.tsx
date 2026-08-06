/**
 * The Accenture Connect chevron mark — the official ">" glyph from the
 * Accenture logo, in `currentColor`, geometry identical to {@link BuzzMark}.
 * Kept as a separate component so callers that scatter many marks — e.g. the
 * onboarding field — keep a stable import.
 *
 * (Previously a flapping-wing bee; the wings were part of the retired bee
 * theme. The plain SVG paints on the first frame.)
 */
export function FlappingBee({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={["buzz-mark", className].filter(Boolean).join(" ")}
      viewBox="0 0 12.08 12.77"
      fill="currentColor"
    >
      <polygon points="0,9.02 7.05,6.4 0,3.65 0,0 12.07,4.85 12.08,7.88 0.01,12.77" />
    </svg>
  );
}
