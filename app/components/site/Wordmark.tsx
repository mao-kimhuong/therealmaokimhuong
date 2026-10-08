import { SITE } from "../../content";

/** The name set as SVG text so it always spans exactly the width it's given. */
export default function Wordmark({ title }: { title?: string }) {
  return (
    <svg viewBox="0 0 1360 118" fill="currentColor" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <text
        className="wordmark-text"
        x="0"
        y="116"
        fontSize="160"
        textLength="1360"
        lengthAdjust="spacingAndGlyphs"
      >
        {SITE.name.toUpperCase()}
      </text>
    </svg>
  );
}
