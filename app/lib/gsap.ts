"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, CustomEase, useGSAP);

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
CustomEase.create("button-ease", "0.78, 0.18, 0.18, 1");
gsap.defaults({ ease: "osmo", duration: 0.6 });

// ── Shared Lenis instance (set by SmoothScroll) ─────────────────────────
let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenisInstance = l; };
export const getLenis = () => lenisInstance;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scroll to a selector or y position, falling back to native scroll. */
export function scrollToTarget(target: string | number) {
  const easing = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2);
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { duration: 1.2, easing });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
