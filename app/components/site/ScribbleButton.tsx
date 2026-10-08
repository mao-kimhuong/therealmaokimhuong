"use client";

import { useId, useRef, useState, useEffect } from "react";
import { gsap, useGSAP } from "../../lib/gsap";

type Props = {
  href: string;
  children: string;
  variant?: "ink-black" | "dark-blue" | "light-silver";
  external?: boolean;
};

// Scribble drawn in a 200×60 box, stretched to the button size.
const SCRIBBLE =
  "M-10 48 C 20 10, 40 4, 52 30 S 70 70, 96 30 S 128 -6, 140 26 S 160 70, 184 32 S 206 6, 214 18";

export default function ScribbleButton({ href, children, variant = "ink-black", external }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskId = `btn-mask-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [size, setSize] = useState({ w: 200, h: 60 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.offsetWidth || 200, h: el.offsetHeight || 60 }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useGSAP(
    () => {
      const el = ref.current;
      const path = pathRef.current;
      if (!el || !path) return;

      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(path, { drawSVG: "0% 0%", strokeWidth: 0 });
        let tween: gsap.core.Animation | null = null;

        const enter = () => {
          tween?.kill();
          gsap.set(path, { drawSVG: "0% 0%", strokeWidth: 0 });
          tween = gsap.to(path, { drawSVG: "0% 100%", strokeWidth: 70, duration: 0.8, ease: "button-ease" });
        };
        const leave = () => {
          tween?.kill();
          tween = gsap.timeline()
            .to(path, { strokeWidth: 4, duration: 0.8, ease: "button-ease" }, 0)
            .to(path, { drawSVG: "100% 100%", duration: 0.8, ease: "button-ease" }, 0);
        };
        const focusIn = () => el.matches(":focus-visible") && enter();

        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointerleave", leave);
        el.addEventListener("focusin", focusIn);
        el.addEventListener("focusout", leave);
        return () => {
          tween?.kill();
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointerleave", leave);
          el.removeEventListener("focusin", focusIn);
          el.removeEventListener("focusout", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <a
      ref={ref}
      href={href}
      className="btn"
      data-variant={variant}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="btn__bg" />
      <span className="btn__text">{children}</span>
      <svg
        className="btn__fill"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
            <path
              ref={pathRef}
              d={SCRIBBLE}
              transform={`scale(${size.w / 200} ${size.h / 60})`}
              fill="none"
              stroke="#fff"
              strokeWidth="0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <foreignObject x="0" y="0" width={size.w} height={size.h} mask={`url(#${maskId})`}>
          <div className="btn__fill-text">{children}</div>
        </foreignObject>
      </svg>
    </a>
  );
}
