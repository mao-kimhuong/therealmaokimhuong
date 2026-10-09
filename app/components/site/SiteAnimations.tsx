"use client";

import { gsap, SplitText, ScrollTrigger, useGSAP, prefersReducedMotion } from "../../lib/gsap";

/**
 * Attribute-driven scroll animations shared across sections:
 * data-split-lines, data-split-rolling, data-split-random, data-stagger,
 * data-bracket-heading, data-parallax and data-footer.
 * Rendered last on the page so pinned sections above have already set up.
 */
export default function SiteAnimations() {
  useGSAP(() => {
    const reduced = prefersReducedMotion();
    const splits: SplitText[] = [];
    const $ = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

    if (!reduced) {
      // Lines slide up out of a mask.
      $("[data-split-lines]").forEach((el) => {
        splits.push(SplitText.create(el, {
          type: "lines", mask: "lines", autoSplit: true, linesClass: "split-line",
          onSplit: (self) => {
            gsap.set(self.lines, { yPercent: 110 });
            return gsap.to(self.lines, {
              yPercent: 0, duration: 0.8, ease: "power4.out", stagger: 0.1,
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            });
          },
        }));
      });

      // Characters roll forward in 3D.
      $("[data-split-rolling]").forEach((el) => {
        splits.push(SplitText.create(el, {
          type: "chars, lines", mask: "lines", autoSplit: true,
          onSplit: (self) => {
            const depth = 0.6 * parseFloat(getComputedStyle(el).fontSize);
            gsap.set(self.lines, { perspective: 500 });
            gsap.set(self.chars, { rotationX: -110, z: -depth, y: depth, opacity: 0, transformOrigin: `50% 50% -${depth}px` });
            return gsap.to(self.chars, {
              rotationX: 0, z: 0, y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.03,
              scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
            });
          },
        }));
      });

      // Characters start scattered and assemble as you scroll.
      $("[data-split-random]").forEach((el) => {
        const spread = Math.min(3 * parseFloat(getComputedStyle(el).fontSize), 0.2 * Math.min(innerWidth, innerHeight));
        splits.push(SplitText.create(el, {
          type: "words, chars",
          onSplit: (self) => {
            gsap.set(self.chars, {
              x: () => gsap.utils.random(-spread, spread),
              y: () => gsap.utils.random(-spread, spread),
              rotation: () => gsap.utils.random(-90, 90),
              scale: () => gsap.utils.random(0.5, 1.4),
              filter: "blur(8px)",
            });
            return gsap.to(self.chars, {
              x: 0, y: 0, rotation: 0, scale: 1, filter: "blur(0px)",
              stagger: { each: 0.03, from: "random" },
              scrollTrigger: { trigger: el, start: "top bottom", end: "top 40%", scrub: true },
            });
          },
        }));
      });

      // Children of [data-stagger] rise in one after another.
      $("[data-stagger]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-stagger-item]"), {
          yPercent: 60, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.035,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      // [ Brackets ] slide in from the sides.
      $("[data-bracket-heading]").forEach((el) => {
        const left = el.querySelector("[data-bracket-left]");
        const right = el.querySelector("[data-bracket-right]");
        const st = { trigger: el, start: "top bottom", end: "top 40%", scrub: true };
        if (left) gsap.fromTo(left, { xPercent: -160 }, { xPercent: 0, ease: "none", scrollTrigger: st });
        if (right) gsap.fromTo(right, { xPercent: 160 }, { xPercent: 0, ease: "none", scrollTrigger: { ...st } });
      });
    }

    const mm = gsap.matchMedia();
    if (!reduced) {
      // Simple scrubbed parallax.
      mm.add({ isTablet: "(max-width: 991px)", isDesktop: "(min-width: 992px)" }, (ctx) => {
        $("[data-parallax='trigger']").forEach((el) => {
          if (el.dataset.parallaxDisable === "tablet" && ctx.conditions?.isTablet) return;
          const start = parseFloat(el.dataset.parallaxStart ?? "20");
          const end = parseFloat(el.dataset.parallaxEnd ?? "-20");
          gsap.fromTo(el, { yPercent: start }, {
            yPercent: end, ease: "none",
            scrollTrigger: {
              trigger: el,
              start: `clamp(${el.dataset.parallaxScrollStart ?? "top bottom"})`,
              end: `clamp(${el.dataset.parallaxScrollEnd ?? "bottom top"})`,
              scrub: true,
            },
          });
        });
      });

      // Footer slides out from under the contact section.
      mm.add("(min-width: 768px)", () => {
        const wrap = document.querySelector("[data-footer]");
        const inner = document.querySelector("[data-footer-inner]");
        if (!wrap || !inner) return;
        gsap.from(inner, {
          yPercent: -100, ease: "none",
          scrollTrigger: { trigger: wrap, start: "clamp(top bottom)", end: "clamp(top top)", scrub: true },
        });
      });
    }

    // Re-measure once fonts and images have settled.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      splits.forEach((s) => s.revert());
      mm.revert();
    };
  });

  return null;
}
