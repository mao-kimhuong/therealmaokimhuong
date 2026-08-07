"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";
import BackgroundCanvas from "../components/BackgroundCanvas";
import ClientOnly from "../components/ClientOnly";

const PROJECTS = [
  {
    id: "01",
    title: "iOneCard Platform",
    category: "Fintech / Mobile Platform",
    year: "2025",
    description:
      "Backend & full-stack work on iOne's mobile fintech platform — 15+ production modules across 8 epics, including Device Protection, Trade-In, Installment, Visa Card, Gift Card, POS, Corporation Registration, and Search. RESTful APIs with JWT auth, ETL pipelines for reporting, and a full admin portal with CRUD, exports, and role-based access — shipped to live iOS/Android users.",
    tech: ["ThinkPHP5", "FastAdmin", "MySQL", "Redis", "Docker", "JWT"],
    image: null,
  },
  {
    id: "02",
    title: "POS & Inventory Management System",
    category: "Multi-Shop Web Application",
    year: "2023",
    description:
      "Point of Sale, Inventory & Warehouse Management, CRM, and Vendor Management systems built from scratch, supporting multi-shop and multi-warehouse operations — built during a full-cycle internship at Inklusivity Technology.",
    tech: ["PHP", "MySQL", "jQuery", "JavaScript"],
    image: "/images/pos.jpg",
  },
  {
    id: "03",
    title: "Masterchat — Real-Time Chat Platform",
    category: "Communication Platform",
    year: "2024",
    description:
      "Real-time messaging platform for BluePrint Technology serving active users, with responsive UI, live message delivery, and hardened API access — built collaboratively across design, QA, and backend.",
    tech: ["Laravel", "Firebase", "JavaScript", "MySQL"],
    image: null,
  },
  {
    id: "04",
    title: "Gift Card Integration (Linkit360)",
    category: "Third-Party API Integration",
    year: "2025",
    description:
      "End-to-end integration of a third-party gift card provider into the iOneCard app — list, detail, checkout, order history, and order detail flows, plus Telegram bot alerts for real-time out-of-stock notifications.",
    tech: ["ThinkPHP5", "REST API", "MySQL"],
    image: null,
  },
];

export default function PortfolioPage(): ReactNode {
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
              Selected Work — {PROJECTS.length} Projects
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 14vw, 160px)",
                lineHeight: 0.9, color: "var(--parchment)", letterSpacing: "0.02em",
              }}
            >
              Work<span style={{ color: "var(--copper)" }}>.</span>
            </motion.h1>
          </div>

          {/* ── Project list ── */}
          <div>
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  borderBottom: "1px solid var(--ink-rule)",
                  padding: "0 clamp(20px,6vw,80px)",
                  transition: "background 0.3s ease",
                  background: hovered === project.id
                    ? "rgba(30,48,80,0.35)"
                    : "transparent",
                }}
              >
                <div
                  className="project-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 320px",
                    gap: "4vw",
                    alignItems: "center",
                    padding: "5vh 0",
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10, color: "var(--copper)", letterSpacing: "0.15em",
                  }}>
                    {project.id}
                  </span>

                  {/* Info */}
                  <div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 16, marginBottom: 10,
                    }}>
                      <span style={{
                        fontFamily: "var(--font-label)",
                        fontSize: 9, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: "var(--ink-subtle)",
                      }}>
                        {project.category}
                      </span>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9, color: "var(--copper-dim)", letterSpacing: "0.08em",
                      }}>
                        {project.year}
                      </span>
                    </div>
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      lineHeight: 0.95, color: "var(--parchment)",
                      marginBottom: 14, letterSpacing: "0.01em",
                    }}>
                      {project.title}
                    </h2>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontStyle: "italic",
                      fontSize: "clamp(13px,1.1vw,15px)",
                      color: "var(--ink-body)", lineHeight: 1.7,
                      maxWidth: 500, marginBottom: 16,
                    }}>
                      {project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {project.tech.map((t) => (
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

                  {/* Image */}
                  <motion.div
                    animate={{ opacity: hovered === project.id ? 1 : 0.7 }}
                    style={{
                      aspectRatio: "16/10",
                      overflow: "hidden",
                      border: "1px solid var(--ink-rule)",
                    }}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.8) contrast(1.05) saturate(0.9)",
                          transition: "transform 0.5s ease",
                          transform: hovered === project.id ? "scale(1.04)" : "scale(1)",
                        }}
                      />
                    ) : (
                      <div style={{
                        width: "100%", height: "100%",
                        background: "var(--ink-3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9, color: "var(--ink-subtle)",
                          letterSpacing: "0.15em",
                        }}>
                          NO PREVIEW
                        </span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div style={{
            padding: "8vh clamp(20px,6vw,80px)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 24,
          }}>
            <p style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "clamp(15px,1.4vw,18px)",
              color: "var(--ink-body)", maxWidth: 420, lineHeight: 1.7,
            }}>
              Have a project in mind? I build fast, clean, and scalable.
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
                Start a project →
              </motion.span>
            </Link>
          </div>

        </div>
      </TransitionWrapper>
    </main>
  );
}
