"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";

const TIMELINE = [
  {
    year: "2025-Present",
    role: "Fullstack Web Developer",
    co: "iOne Cambodia",
    note: "Building core product 0→1",
  },
  {
    year: "2024-2025",
    role: "Fullstack Web Developer",
    co: "BluePrint Technology Company",
    note: "10+ client projects",
  },
  {
    year: "2023-2024",
    role: "Web Developer Intern",
    co: "INKLUSIVITY TECHNOLOGY",
    note: "React, TypeScript, design systems",
  },
  {
    year: "2022-2023",
    role: "Junior Graphic Designer",
    co: "THE FLORA",
    note: "First 300 Salary",
  },
];

const BELIEFS = [
  [
    "Ship early, iterate fast",
    "Working software beats perfect plans every time.",
  ],
  ["Code is communication", "Write for humans. Machines are flexible."],
  ["Full ownership", "I care about the whole product — not just my slice."],
  ["Performance is UX", "Slow apps lose users. Every ms counts."],
];

export default function AboutPage(): ReactNode {
  return (
    <main style={{ background: "#f5f2ed", minHeight: "100vh" }}>
      <Nav />

      <TransitionWrapper>
        <div style={{ padding: "12vh 0" }}>

          {/* HERO */}
          <div
            style={{
              padding: "0 clamp(20px,6vw,80px) 8vh",
              borderBottom: "1px solid #d4cfc6",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#b8b2a8",
                marginBottom: 16,
              }}
            >
              About
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 14vw, 160px)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
              }}
            >
              Hello<span style={{ color: "#c8291a" }}>,</span>
              <br />
              World<span style={{ color: "#c8291a" }}>.</span>
            </motion.h1>
          </div>

          {/* PROFILE + BIO */}
          <div
            style={{
              padding: "0 clamp(20px,6vw,80px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: "60px",
              marginBottom: "10vh",
              marginTop: "8vh",
            }}
          >
            {/* IMAGE */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              <img
                src="/profile.png"
                alt="Profile"
                style={{
                  width: "100%",
                  maxWidth: 380,
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  border: "1px solid #d4cfc6",
                }}
              />
            </motion.div>

            {/* BIO */}
            <div>
              <p
                style={{
                  fontSize: "clamp(16px,1.6vw,20px)",
                  fontStyle: "italic",
                  color: "#3d3935",
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                I'm a fullstack engineer who cares equally about clean
                architecture and great user experience. 4+ years building
                products end-to-end.
              </p>

              <div style={{ borderTop: "1px solid #d4cfc6", paddingTop: 28 }}>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#b8b2a8",
                    marginBottom: 20,
                  }}
                >
                  What I believe
                </p>

                {BELIEFS.map(([title, desc], i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit,minmax(180px,1fr))",
                      gap: "20px",
                      padding: "14px 0",
                      borderBottom: "1px solid #e8e3da",
                    }}
                  >
                    <p style={{ fontStyle: "italic", fontSize: 14 }}>
                      {title}
                    </p>

                    <p
                      style={{
                        fontSize: 13,
                        color: "#6b6560",
                        lineHeight: 1.6,
                      }}
                    >
                      {desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <a href="/resume.pdf" target="_blank">
                  <motion.span
                    whileHover={{ background: "#0e0c0a", color: "#fff" }}
                    style={{
                      padding: "12px 28px",
                      border: "1px solid #0e0c0a",
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                  >
                    Download Resume
                  </motion.span>
                </a>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div style={{ padding: "0 clamp(20px,6vw,80px)" }}>
            <h2
              style={{
                fontSize: "clamp(26px,3vw,42px)",
                marginBottom: 40,
              }}
            >
              Experience
            </h2>

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  borderTop: "1px solid #d4cfc6",
                  padding: "22px 0",
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 20,
                }}
              >
                <span style={{ color: "#c8291a", fontSize: 12 }}>
                  {item.year}
                </span>

                <p style={{ fontSize: 18 }}>{item.role}</p>

                <div>
                  <p style={{ fontStyle: "italic", fontSize: 14 }}>
                    {item.co}
                  </p>
                  <p style={{ fontSize: 11, color: "#b8b2a8" }}>
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              padding: "8vh clamp(20px,6vw,80px)",
              textAlign: "center",
            }}
          >
            <Link href="/contact">
              <motion.span
                whileHover={{ background: "#000", color: "#fff" }}
                style={{
                  padding: "16px 40px",
                  background: "#c8291a",
                  color: "#fff",
                  letterSpacing: "0.15em",
                  fontSize: 11,
                  textTransform: "uppercase",
                  cursor: "pointer",
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