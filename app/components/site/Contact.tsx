"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { CONTACT_WORDS, LINKS } from "../../content";
import ScribbleButton from "./ScribbleButton";

// Where each word flies to, in vw/vh from the centre.
const LANES = [
  { x: -38, y: -38 }, { x: -14, y: -40 }, { x: 14, y: -40 }, { x: 38, y: -38 },
  { x: -42, y: -14 }, { x: -18, y: -18 }, { x: 18, y: -18 }, { x: 42, y: -14 },
  { x: -42, y: 14 },  { x: -18, y: 18 },  { x: 18, y: 18 },  { x: 42, y: 14 },
  { x: -38, y: 38 },  { x: -14, y: 40 },  { x: 14, y: 40 },  { x: 38, y: 38 },
];
const WORD_COUNT = 50;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  // "Contact" in many languages flies past the camera while the content fades in.
  useGSAP(
    () => {
      const section = ref.current!;
      const content = section.querySelector<HTMLElement>("[data-contact-content]")!;
      const wordsWrap = section.querySelector<HTMLElement>("[data-contact-words]")!;
      const r = gsap.utils.random;

      gsap.set(content, { autoAlpha: 0, yPercent: 25, scale: 0.96, filter: "blur(0.5rem)" });
      const fadeIn = gsap.to(content, {
        autoAlpha: 1, yPercent: 0, scale: 1, filter: "blur(0rem)", ease: "none",
        scrollTrigger: { trigger: section, start: "top 60%", end: "top 25%", scrub: true, invalidateOnRefresh: true },
      });
      if (prefersReducedMotion()) {
        fadeIn.progress(1);
        return;
      }

      wordsWrap.innerHTML = "";
      const words = Array.from({ length: WORD_COUNT }, (_, i) => {
        const span = document.createElement("span");
        span.textContent = CONTACT_WORDS[i % CONTACT_WORDS.length];
        wordsWrap.appendChild(span);
        return span;
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 1, invalidateOnRefresh: true },
      });
      words.forEach((word, i) => {
        const lane = LANES[i % LANES.length];
        const start = r(0, 0.52) + 0.12 * Math.floor(i / LANES.length);
        const inDur = r(0.12, 0.18);
        const outDur = r(0.12, 0.18);
        const midX = lane.x + r(-4, 4);
        const midY = lane.y + r(-4, 4);
        const scale = r(0.7, 1.3);

        gsap.set(word, {
          xPercent: -50, yPercent: -50,
          x: `${lane.x * r(0.08, 0.22)}vw`, y: `${lane.y * r(0.08, 0.22)}vh`,
          z: r(-1600, -1100), scale: 0.35 * scale, autoAlpha: 0, filter: "blur(0.65rem)",
        });
        tl.to(word, {
          x: `${midX}vw`, y: `${midY}vh`, z: 0, scale, autoAlpha: r(0.25, 0.62), filter: "blur(0rem)",
          duration: inDur, ease: "power1.inOut",
        }, start);
        tl.to(word, {
          x: `${midX + r(-3, 3)}vw`, y: `${midY + r(-3, 3)}vh`, z: r(800, 1200),
          scale: scale * r(1.3, 1.65), autoAlpha: 0, filter: "blur(0.5rem)",
          duration: outDur, ease: "power1.in",
        }, start + inDur);
      });

      return () => { wordsWrap.innerHTML = ""; };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="contact" data-theme-section="light">
      <div className="contact-sticky">
        <div className="contact-words" data-contact-words aria-hidden="true" />
        <div className="contact-content" data-contact-content>
          <h2 className="contact-heading">Contact</h2>
          <p className="contact-text">
            Have a project in mind? I’d love to hear about it. Tell me what you need and I’ll get back to you
            within 24 hours.
          </p>
          <div className="button-group">
            <ScribbleButton href={LINKS.bookCall} variant="light-silver" external>
              Message on Telegram
            </ScribbleButton>
            <ScribbleButton href={LINKS.quote} variant="dark-blue">
              Get a quote
            </ScribbleButton>
          </div>
        </div>
      </div>
    </section>
  );
}
