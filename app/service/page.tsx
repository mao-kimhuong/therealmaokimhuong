"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";
import BackgroundCanvas from "../components/BackgroundCanvas";
import ClientOnly from "../components/ClientOnly";

const SERVICES = [
  {
    id: "01",
    title: "Web Application Development",
    short: "Full-stack",
    description:
      "End-to-end web applications built with PHP/Laravel on the backend and React or Vue.js on the frontend. From architecture and database design to deployment and maintenance.",
    tags: ["Laravel", "PHP", "React", "Vue.js", "MySQL"],
  },
  {
    id: "02",
    title: "API Development & Integration",
    short: "Backend",
    description:
      "Scalable RESTful APIs with proper authentication (Sanctum/JWT), documentation, rate limiting, and optimization for high-traffic systems. Third-party API integrations included.",
    tags: ["REST API", "Laravel Sanctum", "JWT", "Postman"],
  },
  {
    id: "03",
    title: "Mobile App Development",
    short: "Flutter",
    description:
      "Cross-platform mobile applications using Flutter, targeting iOS and Android from a single codebase. Native-feeling performance with full backend integration.",
    tags: ["Flutter", "Dart", "Firebase", "REST API"],
  },
  {
    id: "04",
    title: "Database Architecture",
    short: "Data",
    description:
      "MySQL and PostgreSQL schema design, query optimization, indexing strategy, and performance tuning for complex business data at scale. Data migration services included.",
    tags: ["MySQL", "PostgreSQL", "SQL Server", "Firebase"],
  },
  {
    id: "05",
    title: "POS & Business Systems",
    short: "Enterprise",
    description:
      "Custom point-of-sale, inventory management, and ERP systems tailored to business workflows. Multi-warehouse, multi-branch support with role-based access control.",
    tags: ["Laravel", "MySQL", "JavaScript", "jQuery"],
  },
  {
    id: "06",
    title: "UI/UX Design",
    short: "Design",
    description:
      "From wireframes to pixel-perfect interfaces. User flow analysis, Figma prototyping, design systems, and handoff-ready components that developers can actually build.",
    tags: ["Figma", "Adobe XD", "Prototyping", "Design Systems"],
  },
];

export default function ServicePage(): ReactNode {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", color: "var(--ink-text)" }}>
      <ClientOnly>
        <BackgroundCanvas />
      </ClientOnly>
      <Nav />

      <TransitionWrapper>
        <div style={{ padding: "12vh 0", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div style={{
            padding: "0 clamp(20px,6vw,80px) 8vh",
            borderBottom: "1px solid var(--ink-rule)",
          }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: 16,
              }}
            >
              What I Do — {SERVICES.length} Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px,14vw,160px)",
                lineHeight: 0.9, color: "var(--parchment)", letterSpacing: "0.02em",
              }}
            >
              Services<span style={{ color: "var(--copper)" }}>.</span>
            </motion.h1>
          </div>

          {/* ── Services list ── */}
          <div>
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onMouseEnter={() => setHovered(svc.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderBottom: "1px solid var(--ink-rule)",
                  padding: "0 clamp(20px,6vw,80px)",
                  background: hovered === svc.id
                    ? "rgba(30,48,80,0.35)"
                    : "transparent",
                  transition: "background 0.3s ease",
                }}
              >
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px 120px 1fr",
                  gap: "3vw",
                  alignItems: "start",
                  padding: "5vh 0",
                }}>
                  {/* Number */}
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10, color: "var(--copper)",
                    letterSpacing: "0.15em", paddingTop: 4,
                  }}>
                    {svc.id}
                  </span>

                  {/* Short label */}
                  <div style={{ paddingTop: 4 }}>
                    <span style={{
                      fontFamily: "var(--font-label)",
                      fontSize: 9, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: "var(--ink-subtle)",
                    }}>
                      {svc.short}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(24px,3.5vw,48px)",
                      lineHeight: 0.95, color: "var(--parchment)",
                      marginBottom: 16, letterSpacing: "0.01em",
                    }}>
                      {svc.title}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: "clamp(13px,1.1vw,15px)",
                      color: "var(--ink-body)", lineHeight: 1.75,
                      maxWidth: 560, marginBottom: 18,
                    }}>
                      {svc.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {svc.tags.map((t) => (
                        <span key={t} style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9, letterSpacing: "0.08em",
                          color: "var(--ink-text)",
                          padding: "3px 10px",
                          border: "1px solid var(--ink-rule)",
                          background: "var(--ink-2)",
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Process note ── */}
          <div style={{
            padding: "6vh clamp(20px,6vw,80px)",
            borderTop: "1px solid var(--ink-rule)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6vw",
          }}>
            <div>
              <p style={{
                fontFamily: "var(--font-label)",
                fontSize: 9, letterSpacing: "0.18em",
                textTransform: "uppercase", color: "var(--ink-subtle)", marginBottom: 16,
              }}>
                How I Work
              </p>
              {["Discovery & scoping", "Architecture & planning", "Build & iterate", "Deploy & support"].map((step, i) => (
                <div key={step} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--ink-rule)",
                }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9, color: "var(--copper)", minWidth: 20,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14, color: "var(--ink-text)",
                  }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <p style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "clamp(15px,1.4vw,19px)",
                color: "var(--ink-body)", lineHeight: 1.7, marginBottom: 28,
              }}>
                Every project is unique. Let's talk through what you're building
                and find the right approach together.
              </p>
              <Link href="/contact" data-cursor>
                <motion.span
                  whileHover={{ background: "var(--parchment)", color: "var(--ink)" }}
                  style={{
                    padding: "14px 36px",
                    background: "var(--copper)", color: "var(--parchment)",
                    fontFamily: "var(--font-label)",
                    letterSpacing: "0.15em", fontSize: 9,
                    textTransform: "uppercase", cursor: "pointer",
                    display: "inline-block", transition: "all 0.2s",
                  }}
                >
                  Get in touch →
                </motion.span>
              </Link>
            </div>
          </div>

        </div>
      </TransitionWrapper>
    </main>
  );
}
