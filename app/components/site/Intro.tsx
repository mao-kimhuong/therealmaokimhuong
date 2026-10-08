"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, getLenis, prefersReducedMotion } from "../../lib/gsap";
import { SITE } from "../../content";

// A thick scribble that covers the whole screen at 80% stroke width.
export const COVER_SCRIBBLE =
  "M-60 140 C 180 -60, 420 40, 220 260 S -40 560, 320 440 S 820 60, 960 180 S 700 560, 420 680 S 40 980, 460 900 S 1000 520, 1080 620 S 860 1040, 620 1080";

export default function Intro() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current!;
      const path = wrap.querySelector("path")!;
      const signature = wrap.querySelector<HTMLElement>("[data-transition-signature]")!;
      const reveals = document.querySelectorAll("[data-transition-reveal]");
      const lenis = getLenis();

      if (prefersReducedMotion()) {
        gsap.set(path, { drawSVG: "100% 100%" });
        gsap.set(signature, { autoAlpha: 0 });
        gsap.set(reveals, { autoAlpha: 1 });
        return;
      }

      lenis?.stop();
      window.scrollTo(0, 0);
      const split = SplitText.create(signature, { type: "chars", mask: "chars" });

      const tl = gsap.timeline({ delay: 0.15 });
      tl.set(path, { drawSVG: "0% 100%", strokeWidth: "80%" })
        .set(signature, { autoAlpha: 1 })
        .from(split.chars, { yPercent: 110, duration: 0.7, stagger: 0.03, ease: "power4.out" })
        .to({}, { duration: 0.35 })
        .to(split.chars, { yPercent: -110, duration: 0.5, stagger: 0.02, ease: "power3.in" })
        .to(path, { drawSVG: "100% 100%", strokeWidth: "5%", duration: 1.25, ease: "power1.inOut" }, "<0.2")
        .set(signature, { autoAlpha: 0 })
        .fromTo(
          reveals,
          { yPercent: 25, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.15, ease: "expo.out" },
          "<0.15"
        )
        .call(() => lenis?.start(), [], "<");

      return () => {
        split.revert();
        lenis?.start();
      };
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="transition" aria-hidden="true">
      <div className="transition__shape">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none">
          <path
            d={COVER_SCRIBBLE}
            stroke="currentColor"
            strokeWidth="80%"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="transition__signature" data-transition-signature style={{ visibility: "hidden" }}>
        {SITE.name}
      </div>
    </div>
  );
}
