"use client";

import { useRef } from "react";
import { gsap, useGSAP, getLenis, prefersReducedMotion, scrollToTarget } from "../../lib/gsap";
import { LINKS, SITE } from "../../content";
import ScribbleButton from "./ScribbleButton";
import Wordmark from "./Wordmark";

const LOGO_OFFSETS = [
  { query: "(min-width: 1025px)", y: "90%" },
  { query: "(min-width: 768px) and (max-width: 1024px)", y: "120%" },
  { query: "(max-width: 767px)", y: "120%" },
];

export default function Header() {
  const brandRef = useRef<HTMLButtonElement>(null);

  // The name starts full-width over the hero and shrinks into the nav as you scroll.
  useGSAP(() => {
    const brand = brandRef.current;
    const trigger = document.querySelector("[data-logo-scroll-trigger]");
    if (!brand || !trigger || prefersReducedMotion()) return;

    let active = false;
    const onClick = (e: MouseEvent) => {
      e.preventDefault();
      if (active) scrollToTarget(0);
    };
    brand.addEventListener("click", onClick);

    const setActive = (on: boolean) => {
      active = on;
      brand.toggleAttribute("data-back-to-top-active", on);
      if (on) brand.setAttribute("aria-label", "Back to top");
      else brand.setAttribute("aria-label", SITE.name);
    };

    const mm = gsap.matchMedia();
    LOGO_OFFSETS.forEach(({ query, y }) => {
      mm.add(query, () => {
        gsap.set(brand, { clearProps: "width" });
        const finalWidth = getComputedStyle(brand).width;
        gsap.set(brand, { width: "100%", y });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
            onLeave: () => setActive(true),
            onEnterBack: () => setActive(false),
          },
        });
        tl.to(brand, { width: finalWidth, y: 0, ease: "none" });
        return () => setActive(false);
      });
    });

    return () => {
      brand.removeEventListener("click", onClick);
      mm.revert();
    };
  });

  // Header text colour follows whichever section sits under it.
  useGSAP(() => {
    const header = document.querySelector<HTMLElement>("[data-nav-bar-height]");
    const sections = document.querySelectorAll<HTMLElement>("[data-theme-section]");
    let current: string | null = null;
    let ticking = false;

    const check = () => {
      const mid = header ? header.offsetHeight / 2 : 0;
      for (const s of sections) {
        const { top, bottom } = s.getBoundingClientRect();
        if (top <= mid && bottom >= mid) {
          const theme = s.dataset.themeSection!;
          if (theme !== current) {
            document.body.dataset.themeNav = theme;
            current = theme;
          }
          break;
        }
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(check); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    getLenis()?.on("scroll", onScroll);
    check();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      getLenis()?.off("scroll", onScroll);
    };
  });

  return (
    <>
      <header className="header" data-nav-bar-height>
        <div className="navbar_wrapper">
          <div className="brand_wrapper">
            <button ref={brandRef} className="brand" aria-label={SITE.name} data-transition-reveal>
              <Wordmark />
            </button>
          </div>
          <div className="nav-button" data-transition-reveal>
            <ScribbleButton href={LINKS.bookCall} variant="ink-black" external>
              Book a call
            </ScribbleButton>
            <ScribbleButton href={LINKS.quote} variant="dark-blue">
              Get a quote
            </ScribbleButton>
          </div>
        </div>
      </header>
      <div className="progressive-blur" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className={`progressive-blur__layer is--${n}`} />
        ))}
      </div>
    </>
  );
}
