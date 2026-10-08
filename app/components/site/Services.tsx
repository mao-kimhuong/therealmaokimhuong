"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "../../lib/gsap";
import { SERVICES } from "../../content";

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  // Desktop: the section pins and each service row collapses as the next one opens,
  // with the image sliding out to the right while the next slides in.
  useGSAP(
    () => {
      const section = ref.current!;
      const list = section.querySelector<HTMLElement>("[data-services-list]")!;
      const items = Array.from(section.querySelectorAll<HTMLElement>("[data-services-item]")).map((item) => ({
        item,
        row: item.querySelector<HTMLElement>("[data-services-row]")!,
        visual: item.querySelector<HTMLElement>("[data-services-visual]")!,
        imageWrap: item.querySelector<HTMLElement>("[data-services-image-wrap]")!,
      }));

      const mm = gsap.matchMedia();
      mm.add("(min-width: 992px)", () => {
        if (prefersReducedMotion()) return;

        const sizeVisuals = () => {
          items.forEach(({ row, visual }, i) => {
            const prevRow = i > 0 ? items[i - 1].row.offsetHeight : 0;
            gsap.set(visual, { height: Math.max(window.innerHeight - row.offsetHeight - prevRow, 0) });
          });
        };
        sizeVisuals();

        gsap.set(list, { y: 0 });
        items.forEach(({ visual, imageWrap }, i) => {
          gsap.set(visual, { overflow: "hidden" });
          gsap.set(imageWrap, { left: "29%", width: i === 0 ? "71%" : "0%" });
        });

        // Rows above the previous one scroll out of view so two rows stay visible.
        const listOffset = (index: number) => {
          let y = 0;
          for (let i = 0; i <= index - 2; i++) y += items[i].row.offsetHeight;
          return -y;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + window.innerHeight * items.length,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: sizeVisuals,
          },
        });

        items.slice(0, -1).forEach((cur, i) => {
          const next = items[i + 1];
          tl.to(cur.visual, { height: 0, duration: 1, ease: "none" }, i)
            .to(cur.imageWrap, { left: "100%", width: "0%", duration: 1, ease: "none" }, i)
            .to(next.imageWrap, { left: "29%", width: "71%", duration: 1, ease: "none" }, i)
            .to(list, { y: () => listOffset(i + 1), duration: 1, ease: "none" }, i);
        });

        return () => {
          gsap.set([list, ...items.flatMap((x) => [x.visual, x.imageWrap])], {
            clearProps: "transform,height,width,left,overflow",
          });
        };
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="services" data-theme-section="light" data-services>
      <div className="services-wrapper">
        <div className="services-sticky">
          <div className="services-list" data-services-list>
            {SERVICES.map((s, i) => (
              <div key={s.title} className="service-item" data-services-item>
                <div className="service-row" data-services-row>
                  <div className="service-number">[{String(i + 1).padStart(2, "0")}]</div>
                  <h3 className="service-title">{s.title}</h3>
                </div>
                <div className="service-visual" data-services-visual>
                  <div className="service-description">
                    <p>{s.description}</p>
                  </div>
                  <div className="service-image-wrap" data-services-image-wrap>
                    <Image src={s.image} alt="" fill sizes="(min-width: 992px) 71vw, 100vw" draggable={false} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
