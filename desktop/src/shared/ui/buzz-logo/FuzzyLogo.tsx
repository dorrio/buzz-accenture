import { cn } from "@/shared/lib/cn";

export type FuzzyLogoProps = {
  /** Retained for call-site compatibility; the animated texture is retired. */
  fuzz?: boolean;
  className?: string;
  ariaLabel?: string;
  loop?: boolean;
  /** Retained for call-site compatibility; no-op. */
  loopRestSeconds?: number;
  /** When true, applies a lightweight CSS pulse to the mark. */
  pulse?: boolean;
  /** Retained for call-site compatibility; no-op. */
  reverse?: boolean;
  /** Retained for call-site compatibility; no-op. */
  variant?: string;
};

/**
 * The Accenture Connect brand mark: the official ">" chevron in `currentColor`
 * with an optional lightweight CSS pulse. Renders the SVG directly so a
 * caller's sizing className (e.g. `w-28`, `h-auto w-full`) drives its
 * dimensions the same way {@link BuzzMark} does.
 *
 * Previously an animated fractal-noise "fuzzy" bee morph via
 * `BuzzLogoAnimation`; retired with the bee theme. The prop surface is kept so
 * existing call sites compile unchanged — the animation-specific props are
 * now no-ops.
 */
export function FuzzyLogo({
  className,
  ariaLabel = "Accenture Connect logo",
  pulse = true,
}: FuzzyLogoProps) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      className={cn("buzz-mark", pulse && "buzz-logo--pulse", className)}
      viewBox="0 0 12.08 12.77"
      fill="currentColor"
    >
      <polygon points="0,9.02 7.05,6.4 0,3.65 0,0 12.07,4.85 12.08,7.88 0.01,12.77" />
    </svg>
  );
}
