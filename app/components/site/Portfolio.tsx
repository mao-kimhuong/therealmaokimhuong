"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, ScrollTrigger, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { LINKS, PROJECTS } from "../../content";
import BracketHeading from "./BracketHeading";
import ScribbleButton from "./ScribbleButton";

const CARD_RADIUS = "0.65em";

function Arrow() {
  return (
    <svg viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M6 1 1 6l5 5M1 6h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function NavButton({ dir }: { dir: "prev" | "next" }) {
  return (
    <button
      className={`portfolio-orbit__btn is--${dir}`}
      data-portfolio-button={dir}
      aria-label={dir === "prev" ? "Previous project" : "Next project"}
    >
      <Arrow />
      <span className="portfolio-orbit__btn-overlay" aria-hidden="true">
        <span className="portfolio-orbit__btn-corner" />
        <span className="portfolio-orbit__btn-corner is--tr" />
        <span className="portfolio-orbit__btn-corner is--bl" />
        <span className="portfolio-orbit__btn-corner is--br" />
      </span>
    </button>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);

  // Cards orbit along a slowly rotating axis; the front card grows and un-crops,
  // and the text on the left swaps line by line.
  useGSAP(
    () => {
      const root = ref.current!;
      const list = root.querySelector<HTMLElement>("[data-orbit-list]")!;
      const items = gsap.utils.toArray<HTMLElement>("[data-orbit-item]", root);
      const cards = items.map((it) => it.querySelector<HTMLElement>("[data-orbit-card]")!);
      const videos = items.map((it) => it.querySelector<HTMLVideoElement>("video"));
      const contents = gsap.utils.toArray<HTMLElement>("[data-portfolio-content]", root);
      const counter = root.querySelector<HTMLElement>('[data-portfolio-count="current"]')!;
      const count = items.length;
      if (count < 2) return;

      const reduced = prefersReducedMotion();
      const wrap = gsap.utils.wrap(0, count);
      const state = { step: 0 };
      const spin = { rotation: 0 };
      let target = 0;
      let activeIndex = 0;
      let shownContent = -1;
      let orbitWidth = 0;
      let inView = false;
      let keysActive = false;
      let contentTl: gsap.core.Timeline | null = null;
      let stepTween: gsap.core.Tween | null = null;
      let growTl: gsap.core.Timeline | null = null;
      let widthTween: gsap.core.Tween | null = null;

      const splits = contents.map((c) => {
        const s = gsap.utils
          .toArray<HTMLElement>("[data-portfolio-content-reveal]", c)
          .map((el) => SplitText.create(el, { type: "lines", mask: "lines" }));
        return { wrapper: c, splits: s, lines: s.flatMap((x) => x.lines) };
      });

      const pauseVideos = () => videos.forEach((v) => v?.pause());
      const playActive = () => {
        if (!inView) return;
        videos.forEach((v, i) => i !== activeIndex && v?.pause());
        videos[activeIndex]?.play().catch(() => {});
      };

      const measure = () => {
        cards.forEach((c) => {
          gsap.set(c, { clearProps: "width" });
          c.dataset.naturalWidth = String(c.offsetWidth);
        });
        orbitWidth = Math.max(...cards.map((c) => Number(c.dataset.naturalWidth)));
      };
      const naturalWidth = (c: HTMLElement) => Number(c.dataset.naturalWidth) || c.offsetWidth;
      const reveal = (c: HTMLElement) => gsap.utils.clamp(0, 1, Number(gsap.getProperty(c, "--reveal")) || 0);

      const clip = (c: HTMLElement) => {
        const inset = 0.18 * c.offsetHeight * (1 - reveal(c));
        const v = inset <= 0.5 ? 0 : inset;
        gsap.set(c.firstElementChild, { clipPath: `inset(${v}px 0px ${v}px 0px round ${CARD_RADIUS})` });
      };

      const render = () => {
        if (!orbitWidth) return;
        const front = wrap(Math.round(state.step));
        items.forEach((it, i) => {
          const isActive = i === front;
          it.dataset.status = isActive ? "active" : "not-active";
          cards[i].style.pointerEvents = isActive ? "auto" : "none";
          cards[i].setAttribute("aria-hidden", String(!isActive));
        });
        const radius = 0.7 * orbitWidth;
        const maxBlur = 0.04 * orbitWidth;
        gsap.set(list, { rotation: spin.rotation });
        items.forEach((it, i) => {
          const angle = ((i - state.step) / count) * Math.PI * 2;
          const depth = Math.pow((Math.cos(angle) + 1) / 2, 1.3);
          gsap.set(it, {
            x: Math.sin(angle) * radius,
            y: 0,
            scale: gsap.utils.interpolate(0.2, 1, depth),
            rotation: -spin.rotation,
            filter: `blur(${gsap.utils.interpolate(maxBlur, 0, depth)}px)`,
            zIndex: Math.round(depth * 1000),
          });
        });
      };

      const grow = (i: number, animate = true) => {
        const c = cards[i];
        const w = 1.15 * (c.offsetWidth || naturalWidth(c));
        growTl?.kill();
        widthTween?.kill();
        gsap.killTweensOf(c);
        if (!animate || reduced) {
          orbitWidth = w;
          gsap.set(c, { width: w, "--reveal": 1 });
          clip(c);
          render();
          return;
        }
        const o = { width: orbitWidth || c.offsetWidth };
        growTl = gsap.timeline()
          .to(o, { width: w, duration: 0.75, onUpdate: () => { orbitWidth = o.width; render(); } }, 0)
          .to(c, {
            width: w, "--reveal": 1, duration: 0.75, overwrite: true,
            onUpdate: () => clip(c),
            onComplete: () => { orbitWidth = w; clip(c); render(); },
          }, 0);
      };

      const shrink = (i: number) => {
        const c = cards[i];
        gsap.killTweensOf(c);
        gsap.to(c, {
          width: naturalWidth(c), "--reveal": 0, duration: 0.55, overwrite: true,
          onUpdate: () => clip(c),
          onComplete: () => { gsap.set(c, { clearProps: "width", "--reveal": 0 }); clip(c); },
        });
      };

      const showContent = (i: number, animate = true) => {
        const num = String(i + 1).padStart(2, "0");
        gsap.killTweensOf(counter);
        if (!animate) {
          counter.textContent = num;
        } else {
          gsap.timeline()
            .to(counter, { autoAlpha: 0, yPercent: -100, duration: 0.3, ease: "power3.in" })
            .call(() => { counter.textContent = num; })
            .set(counter, { yPercent: 100 })
            .to(counter, { autoAlpha: 1, yPercent: 0, duration: 0.4, ease: "power3.out" });
        }

        if (i === shownContent) return;
        const prev = shownContent >= 0 ? splits[shownContent] : null;
        const next = splits[i];
        contentTl?.kill();
        shownContent = i;
        if (!animate) {
          splits.forEach((s) => gsap.set(s.lines, { yPercent: 110 }));
          gsap.set(contents, { autoAlpha: 0 });
          gsap.set(next.wrapper, { autoAlpha: 1 });
          gsap.set(next.lines, { yPercent: 0 });
          return;
        }
        splits.forEach((s, idx) => {
          if (idx !== i && s !== prev) { gsap.set(s.wrapper, { autoAlpha: 0 }); gsap.set(s.lines, { yPercent: 110 }); }
        });
        contentTl = gsap.timeline();
        if (prev) contentTl.to(prev.lines, { yPercent: -110, duration: 0.35, stagger: 0.025, ease: "power3.in" });
        contentTl
          .set(prev ? prev.wrapper : [], { autoAlpha: 0 })
          .set(next.wrapper, { autoAlpha: 1 })
          .fromTo(next.lines, { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.055, ease: "power4.out" });
      };

      const go = (dir: number) => {
        const prevIndex = activeIndex;
        pauseVideos();
        target += dir;
        const next = wrap(target);
        stepTween?.kill();
        growTl?.kill();
        widthTween?.kill();
        shrink(prevIndex);
        cards.forEach((c, i) => { if (i !== prevIndex && i !== next && reveal(c) > 0) shrink(i); });
        activeIndex = next;
        showContent(next);

        const o = { width: orbitWidth };
        widthTween = gsap.to(o, {
          width: naturalWidth(cards[next]), duration: 0.55, overwrite: true,
          onUpdate: () => { orbitWidth = o.width; render(); },
        });
        stepTween = gsap.to(state, {
          step: target, duration: 0.7, overwrite: true, onUpdate: render,
          onComplete: () => { if (activeIndex === next) { grow(next); playActive(); } },
        });
      };

      const onClick = (e: MouseEvent) => {
        const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-portfolio-button]");
        if (!btn) return;
        e.preventDefault();
        go(btn.dataset.portfolioButton === "next" ? 1 : -1);
      };
      const onKey = (e: KeyboardEvent) => {
        if (!keysActive) return;
        const el = document.activeElement;
        if (el?.matches("input, textarea, select, [contenteditable='true']")) return;
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      };
      root.addEventListener("click", onClick);
      window.addEventListener("keydown", onKey);

      videos.forEach((v) => { if (v) { v.muted = true; v.loop = true; v.playsInline = true; } });
      measure();
      cards.forEach((c) => { gsap.set(c, { "--reveal": 0 }); clip(c); });
      showContent(0, false);
      grow(0, false);
      render();

      const spinTween = gsap.to(spin, { rotation: 360, duration: 24, ease: "none", repeat: -1, paused: true, onUpdate: render });

      const ro = new ResizeObserver(() => {
        stepTween?.kill(); growTl?.kill(); widthTween?.kill();
        cards.forEach((c, i) => i !== activeIndex && gsap.set(c, { clearProps: "width" }));
        measure();
        const c = cards[activeIndex];
        orbitWidth = 1.15 * naturalWidth(c);
        gsap.set(c, { width: orbitWidth, "--reveal": 1 });
        clip(c);
        render();
      });
      ro.observe(root);

      ScrollTrigger.create({
        trigger: root, start: "top bottom", end: "bottom top",
        onToggle: ({ isActive }) => {
          inView = isActive;
          if (isActive) { if (!reduced) spinTween.play(); playActive(); }
          else { spinTween.pause(); pauseVideos(); }
        },
      });
      ScrollTrigger.create({
        trigger: root, start: "top center", end: "bottom center",
        onToggle: ({ isActive }) => { keysActive = isActive; },
      });

      return () => {
        root.removeEventListener("click", onClick);
        window.removeEventListener("keydown", onKey);
        ro.disconnect();
        splits.forEach((s) => s.splits.forEach((x) => x.revert()));
      };
    },
    { scope: ref }
  );

  return (
    <section id="portfolio" className="portfolio" data-theme-section="dark">
      <div className="portfolio-header-w">
        <BracketHeading>Projects</BracketHeading>
        <p className="portfolio-header__p" data-split-rolling>
          Turning ideas into products people use.
        </p>
      </div>

      <div ref={ref} className="portfolio-orbit">
        <div className="portfolio-orbit__content">
          <div className="portfolio-orbit__info">
            <div className="portfolio-orbit__count" aria-hidden="true">
              <div className="portfolio-orbit__count-col">
                <p className="portfolio-orbit__count-txt" data-portfolio-count="current">01</p>
              </div>
              <div className="portfolio-orbit__count-divider" />
              <div className="portfolio-orbit__count-col">
                <p className="portfolio-orbit__count-txt">{String(PROJECTS.length).padStart(2, "0")}</p>
              </div>
            </div>
            <div className="portfolio-orbit__info-bottom">
              <div className="portfolio-orbit__description" aria-live="polite">
                {PROJECTS.map((p) => (
                  <div key={p.title} className="portfolio-orbit__content-item" data-portfolio-content>
                    <h3 data-portfolio-content-reveal>{p.title}</h3>
                    <p data-portfolio-content-reveal>{p.description}</p>
                    <p className="portfolio-orbit__tags" data-portfolio-content-reveal>{p.tags}</p>
                  </div>
                ))}
              </div>
              <div className="portfolio-orbit__overlay-nav">
                <NavButton dir="prev" />
                <NavButton dir="next" />
              </div>
            </div>
          </div>

          <div className="portfolio-orbit__collection">
            <div className="portfolio-orbit__list" data-orbit-list>
              {PROJECTS.map((p) => {
                const media = (
                  <div className="portfolio-orbit__image-mask">
                    <Image src={p.image} alt={p.title} fill sizes="(min-width: 768px) 35vw, 70vw" draggable={false} />
                    {p.video && <video src={p.video} muted loop playsInline preload="metadata" />}
                  </div>
                );
                return (
                  <div key={p.title} className="portfolio-orbit__item" data-orbit-item>
                    {p.href ? (
                      <a className="portfolio-orbit__card" data-orbit-card href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.title}>
                        {media}
                      </a>
                    ) : (
                      <div className="portfolio-orbit__card" data-orbit-card>{media}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-cta">
        <ScribbleButton href={LINKS.quote} variant="ink-black">
          Start your project
        </ScribbleButton>
      </div>
    </section>
  );
}
