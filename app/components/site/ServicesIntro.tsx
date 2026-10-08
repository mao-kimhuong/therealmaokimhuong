"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import BracketHeading from "./BracketHeading";

const DRAW_SCRIBBLE =
  "M90 140 C 260 40, 420 -20, 300 140 S 20 470, 120 480 S 470 230, 480 100 S 300 640, 220 730 S 560 420, 880 60 S 960 120, 640 520 S 240 960, 300 950 S 840 420, 900 340 S 640 940, 1020 560 S 860 1000, 1080 1080";

export default function ServicesIntro() {
  const ref = useRef<HTMLDivElement>(null);

  // Pins the "Clean code / Real impact" screen while a blue scribble draws over it,
  // handing off into the blue services section below.
  useGSAP(
    () => {
      const wrap = ref.current!;
      const section = wrap.querySelector<HTMLElement>("[data-scroll-draw-section]")!;
      const path = wrap.querySelector("[data-scroll-draw-overlay] path")!;
      if (prefersReducedMotion()) {
        gsap.set(path, { drawSVG: "0% 0%" });
        return;
      }
      const setHeight = () => gsap.set(wrap, { height: Math.max(section.scrollHeight, window.innerHeight) });
      setHeight();
      gsap.set(path, { strokeWidth: "5%", drawSVG: "0% 0%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=200%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: setHeight,
          },
        })
        .to(path, { drawSVG: "0% 100%", duration: 1, ease: "none" }, 0)
        .to(path, { strokeWidth: "80%", duration: 0.75, ease: "none" }, 0.25);
    },
    { scope: ref }
  );

  return (
    <>
      <div id="services" />
      <div ref={ref} className="scroll-draw-transition" data-theme-section="light" data-scroll-draw-transition>
        <section className="services-header__w" data-scroll-draw-section>
          <p className="services-big-txt" data-split-rolling>
            Clean code. <span className="services-big-txt__span">Real impact.</span>
          </p>
          <BracketHeading className="txt-color-blue">Services</BracketHeading>
        </section>
        <div className="scroll-draw-transition__overlay" data-scroll-draw-overlay aria-hidden="true">
          <div className="scroll-draw-transition__shape">
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" fill="none">
              <path d={DRAW_SCRIBBLE} stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
