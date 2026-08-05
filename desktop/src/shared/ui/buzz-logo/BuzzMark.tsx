/**
 * The Accenture Connect mark: the official ">" chevron from the Accenture logo,
 * as a plain static SVG in `currentColor`, so it tints per-theme (Accenture
 * Purple on brand surfaces) and paints complete on the very first frame.
 */
export function BuzzMark({ className }: { className?: string }) {
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
