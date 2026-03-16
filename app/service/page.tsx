"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";

const SERVICES = [
  {
    id: "01", title: "Fullstack Web App",
    price: "From $8xx-up",
    desc: "End-to-end web application — PHP/Laravel backend, MySQL database, React or HTML/JS frontend. From requirements to live deployment.",
    stack: ["PHP", "Laravel", "MySQL", "REST API", "Firebase"],
    deliverables: ["Full source code", "API documentation", "Database schema", "1 month support"],
  },
  {
    id: "02", title: "API & Backend",
    price: "From $4xx-up",
    desc: "RESTful APIs and backend systems built with PHP & Laravel. Auth, role management, Firebase integration, MySQL/SQL Server.",
    stack: ["PHP", "Laravel", "MySQL", "SQL Server", "Firebase"],
    deliverables: ["API docs", "Postman collection", "Auth system", "DB schema"],
  },
  {
    id: "03", title: "Frontend & UI",
    price: "From $3xx-up",
    desc: "Responsive interfaces with React, HTML5, CSS3 and JavaScript. UI/UX design in Figma from wireframe to pixel-perfect implementation.",
    stack: ["React.js", "HTML5", "CSS3", "JavaScript", "Figma"],
    deliverables: ["Responsive design", "Figma mockups", "Cross-browser tested", "Performance audit"],
  },
  {
    id: "04", title: "Mobile App",
    price: "From $5xx-up",
    desc: "Cross-platform mobile applications with Flutter and Firebase backend. iOS and Android from a single codebase.",
    stack: ["Flutter", "Firebase", "REST API", "MySQL"],
    deliverables: ["Flutter source code", "Firebase setup", "iOS & Android build", "App store guidance"],
  },
];

export default function ServicePage(): ReactNode {
  const [openId, setOpenId] = useState<string | null>("01");

  return (
    <main style={{ background: "#f4edd8", minHeight: "100vh" }}>
      <Nav />
      <TransitionWrapper>
        <div style={{ padding: "14vh 6vw 12vh" }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "8vh" }}>
            <p style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8966e", marginBottom: 12 }}>
              Services
            </p>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(64px, 12vw, 160px)",
              lineHeight: 0.88, letterSpacing: "0.02em",
              color: "#1e1608",
            }}>
              What I Build
            </h1>
          </motion.div>

          {/* Accordion */}
          <div style={{ marginBottom: "10vh" }}>
            {SERVICES.map((s, i) => {
              const isOpen = openId === s.id;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.07 }}
                  style={{ borderTop: "1px solid #cfc4a0" }}
                >
                  <button
                    data-cursor
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    style={{
                      width: "100%",
                      background: isOpen ? "#100e04" : "transparent",
                      padding: "24px 0",
                      cursor: "none",
                      display: "grid",
                      gridTemplateColumns: "48px 1fr 140px 32px",
                      gap: "2vw", alignItems: "center", textAlign: "left",
                      transition: "background 0.2s",
                    }}
                  >
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      color: isOpen ? "#3d3020" : "#a8966e",
                    }}>
                      {s.id}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.8vw, 38px)",
                      letterSpacing: "0.04em", lineHeight: 1,
                      color: isOpen ? "#f4edd8" : "#100e04",
                      transition: "color 0.2s",
                    }}>
                      {s.title}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 11,
                      color: isOpen ? "#b87333" : "#a8966e",
                      transition: "color 0.2s",
                    }}>
                      {s.price}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      style={{ width: 14, height: 14, position: "relative" }}
                    >
                      <span style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1, background: isOpen ? "#b87333" : "#a8966e", transform: "translateY(-50%)" }} />
                      <span style={{ position: "absolute", left: "50%", top: 0, height: "100%", width: 1, background: isOpen ? "#b87333" : "#a8966e", transform: "translateX(-50%)" }} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden", background: "#0d1520" }}
                      >
                        <div style={{
                          padding: "0 0 32px",
                          paddingLeft: "calc(48px + 2vw)",
                          display: "grid", gridTemplateColumns: "1fr 1fr",
                          gap: "4vw",
                        }}>
                          <div>
                            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 13, color: "#6b5c3e", lineHeight: 1.85, marginBottom: 20 }}>
                              {s.desc}
                            </p>
                            <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3d3020", marginBottom: 10 }}>Stack</p>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {s.stack.map((t) => (
                                <span key={t} style={{
                                  fontFamily: "var(--font-mono)", fontSize: 9,
                                  color: "#3d3020", padding: "3px 8px",
                                  border: "1px solid #1e1608",
                                }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#3d3020", marginBottom: 14 }}>Deliverables</p>
                            {s.deliverables.map((d) => (
                              <div key={d} style={{
                                display: "flex", alignItems: "center", gap: 10,
                                borderBottom: "1px solid #1e1608", padding: "9px 0",
                              }}>
                                <div style={{ width: 4, height: 4, background: "#b87333", flexShrink: 0 }} />
                                <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#6b5c3e" }}>{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
            <div style={{ borderTop: "1px solid #cfc4a0" }} />
          </div>

          {/* CTA */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr auto",
            alignItems: "center", gap: "4vw",
            padding: "40px", background: "#b87333",
          }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "0.02em", lineHeight: 1,
              color: "#f4edd8",
            }}>
              Not sure what you need? Let's figure it out.
            </p>
            <Link href="/contact" data-cursor>
              <motion.span
                whileHover={{ background: "#f4edd8", color: "#b87333" }}
                style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "12px 28px",
                  border: "1px solid rgba(245,242,237,0.4)",
                  fontFamily: "var(--font-label)", fontSize: 9,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "#f4edd8", whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                Start a project
              </motion.span>
            </Link>
          </div>
        </div>
      </TransitionWrapper>
    </main>
  );
}
