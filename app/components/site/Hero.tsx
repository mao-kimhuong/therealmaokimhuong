import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero" data-theme-section="dark" data-logo-scroll-trigger>
      <div
        className="hero-bg-wrap"
        data-parallax="trigger"
        data-parallax-disable="tablet"
        data-parallax-scroll-start="top top"
        data-parallax-start="0"
        data-parallax-end="40"
      >
        <Image
          src="/images/IMG_3898.JPG"
          alt="Mao Kim Huong standing on a rock at the beach"
          fill
          priority
          sizes="100vw"
          draggable={false}
        />
      </div>
      <div className="hero-content-wrap">
        <div className="partner-wrap" data-transition-reveal>
          <span className="hero-label">Full-stack developer</span>
          <div className="partner-dot" />
          <span className="hero-label">Open to work</span>
        </div>
        <div className="locate-wrap" data-transition-reveal>
          <div className="hero-label txt-align-right">
            Phnom Penh, <span className="block-span">working globally.</span>
          </div>
          <div className="globe" aria-hidden="true">
            <div className="globe__meridian" />
            <div className="globe__meridian" />
            <div className="globe__meridian" />
            <div className="globe__parallel is--top" />
            <div className="globe__parallel is--mid" />
            <div className="globe__parallel is--bot" />
          </div>
        </div>
      </div>
    </section>
  );
}
