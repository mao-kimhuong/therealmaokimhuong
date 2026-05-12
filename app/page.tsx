"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import BackgroundCanvas from "./components/BackgroundCanvas";
import Background from "./components/Background";
import PageLoader from "./components/PageLoader";
import ClientOnly from "./components/ClientOnly";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", position: "relative" }}>
      {/* Ambient gradient mesh */}
      <ClientOnly>
        <Background />
      </ClientOnly>

      {/* Particle canvas */}
      <ClientOnly>
        <BackgroundCanvas />
      </ClientOnly>

      {/* Page loader — runs once on first visit */}
      <ClientOnly>
        <PageLoader onDone={() => setLoaded(true)} />
      </ClientOnly>

      {/* Main content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <Nav />
        <Hero />
      </div>
    </main>
  );
}