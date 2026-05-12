"use client";

// ── Place this file at: app/about/page.tsx ──────────────────────────

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";
import BackgroundCanvas from "../components/BackgroundCanvas";
import ClientOnly from "../components/ClientOnly";

const TIMELINE = [
  { year: "2025 — Present", role: "Fullstack Web Developer", co: "iOne Cambodia",           note: "Building core product 0 → 1"         },
  { year: "2024 — 2025",    role: "Fullstack Web Developer", co: "BluePrint Technology",    note: "10+ client projects shipped"          },
  { year: "2023 — 2024",    role: "Web Developer Intern",    co: "Inklusivity Technology",  note: "React, TypeScript, design systems"    },
  { year: "2022 — 2023",    role: "Junior Graphic Designer", co: "The Flora",               note: "Brand identity & marketing assets"    },
];

const BELIEFS = [
  ["Ship early, iterate fast",  "Working software beats perfect plans every time."],
  ["Code is communication",     "Write for humans first. Machines are flexible."],
  ["Full ownership",            "I care about the whole product — not just my slice."],
  ["Performance is UX",         "Slow apps lose users. Every millisecond counts."],
];

export default function AboutPage(): ReactNode {
  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", color: "var(--ink-text)", position: "relative" }}>
      <ClientOnly><BackgroundCanvas /></ClientOnly>
      <Nav />

      <TransitionWrapper>
        <div style={{ padding: "12vh 0", position: "relative", zIndex: 1 }}>

          {/* ── HEADLINE ── */}
          <div style={{ padding: "0 clamp(20px,6vw,80px) 8vh", borderBottom: "1px solid var(--ink-rule)" }}>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: 16 }}
            >
              About
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px,14vw,160px)", lineHeight: 0.9, letterSpacing: "0.02em", color: "var(--parchment)" }}
            >
              Hello<span style={{ color: "var(--copper)" }}>,</span>
              <br />
              World<span style={{ color: "var(--copper)" }}>.</span>
            </motion.h1>
          </div>

          {/* ── PROFILE + BIO ── */}
          <div
            className="about-grid"
            style={{ padding: "8vh clamp(20px,6vw,80px)", display: "grid", gridTemplateColumns: "360px 1fr", gap: "6vw", alignItems: "start", borderBottom: "1px solid var(--ink-rule)" }}
          >
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <img
                src="/profile.png" alt="Mao Kimhuong"
                style={{ width: "100%", maxWidth: 360, aspectRatio: "3/4", objectFit: "cover", border: "1px solid var(--ink-rule)", filter: "brightness(0.88) contrast(1.05)" }}
              />
            </motion.div>

            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px,1.6vw,20px)", fontStyle: "italic", color: "var(--ink-text)", lineHeight: 1.75, marginBottom: 40 }}>
                I'm a fullstack engineer based in Cambodia who cares equally about clean architecture and
                great user experience. 4+ years building products end-to-end — from database schema to
                pixel-perfect UI.
              </p>

              <div style={{ borderTop: "1px solid var(--ink-rule)", paddingTop: 28 }}>
                <p style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: 20 }}>
                  What I believe
                </p>
                {BELIEFS.map(([title, desc], i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "14px 0", borderBottom: "1px solid var(--ink-rule)" }}
                  >
                    <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14, color: "var(--ink-bright)" }}>{title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--ink-body)", lineHeight: 1.65 }}>{desc}</p>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <a href="/resume.pdf" target="_blank" data-cursor>
                  <motion.span
                    whileHover={{ background: "var(--parchment)", color: "var(--ink)" }}
                    style={{ padding: "12px 28px", border: "1px solid var(--ink-muted)", fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-text)", cursor: "pointer", display: "inline-block", transition: "all 0.2s" }}
                  >
                    Download Resume
                  </motion.span>
                </a>
              </div>
            </div>
          </div>

          {/* ── EXPERIENCE ── */}
          <div style={{ padding: "6vh clamp(20px,6vw,80px)" }}>
            <motion.h2
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,3vw,48px)", color: "var(--parchment)", marginBottom: 40, letterSpacing: "0.02em" }}
            >
              Experience
            </motion.h2>

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ borderTop: "1px solid var(--ink-rule)", padding: "22px 0", display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: 24, alignItems: "start" }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--copper)", letterSpacing: "0.1em" }}>{item.year}</span>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 17, color: "var(--ink-bright)", lineHeight: 1.4 }}>{item.role}</p>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 14, color: "var(--ink-text)", marginBottom: 4 }}>{item.co}</p>
                  <p style={{ fontFamily: "var(--font-label)", fontSize: 9, color: "var(--ink-subtle)", letterSpacing: "0.1em" }}>{item.note}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{ padding: "6vh clamp(20px,6vw,80px)", borderTop: "1px solid var(--ink-rule)", textAlign: "center" }}>
            <Link href="/contact" data-cursor>
              <motion.span
                whileHover={{ background: "var(--parchment)", color: "var(--ink)" }}
                style={{ padding: "16px 40px", background: "var(--copper)", color: "var(--parchment)", fontFamily: "var(--font-label)", letterSpacing: "0.15em", fontSize: 9, textTransform: "uppercase", cursor: "pointer", display: "inline-block", transition: "all 0.2s" }}
              >
                Start a project →
              </motion.span>
            </Link>
          </div>

        </div>
      </TransitionWrapper>
    </main>
  );
}