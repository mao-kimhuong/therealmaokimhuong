"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";
import LiquidBackground from "../components/LiquidBackground";
import ClientOnly from "../components/ClientOnly";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App (Flutter)",
  "API Development",
  "POS / Business System",
  "UI/UX Design",
  "Consultation",
  "Other",
];

const CONTACT_INFO = [
  { label: "Email",    value: "maokimhuong.office@gmail.com", href: "mailto:maokimhuong.office@gmail.com" },
  { label: "GitHub",   value: "github.com/maokimhuong",       href: "https://github.com/maokimhuong" },
  { label: "Telegram", value: "+855 96 37 38 968",             href: "https://t.me/maokimhuong" },
];

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage(): ReactNode {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", type: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--ink-muted)",
    color: "var(--ink-bright)",
    fontFamily: "var(--font-body)",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-label)",
    fontSize: 9,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--ink-subtle)",
    display: "block",
    marginBottom: 6,
  };

  return (
    <main style={{ background: "var(--ink)", minHeight: "100vh", color: "var(--ink-text)", position: "relative" }}>
      <ClientOnly>
        <LiquidBackground />
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
              Let's Build Something
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
              Contact<span style={{ color: "var(--copper)" }}>.</span>
            </motion.h1>
          </div>

          {/* ── Main grid ── */}
          <div
            className="contact-grid"
            style={{
              padding: "8vh clamp(20px,6vw,80px)",
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              gap: "8vw",
              alignItems: "start",
            }}
          >
            {/* ── Form ── */}
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 36 }}
            >
              {/* Name + Email row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text" required
                    value={form.name} onChange={set("name")}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--copper)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--ink-muted)")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email" required
                    value={form.email} onChange={set("email")}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--copper)")}
                    onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--ink-muted)")}
                  />
                </div>
              </div>

              {/* Project type */}
              <div>
                <label style={labelStyle}>Project Type</label>
                <select
                  value={form.type} onChange={set("type")}
                  style={{
                    ...inputStyle,
                    cursor: "pointer",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--copper)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--ink-muted)")}
                >
                  <option value="" style={{ background: "var(--ink-2)" }}>Select a service…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} style={{ background: "var(--ink-2)" }}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  required rows={5}
                  value={form.message} onChange={set("message")}
                  placeholder="Tell me about your project, timeline, and budget…"
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--copper)")}
                  onBlur={(e)  => (e.currentTarget.style.borderColor = "var(--ink-muted)")}
                />
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  whileHover={status === "idle" ? { background: "var(--parchment)", color: "var(--ink)" } : {}}
                  data-cursor
                  style={{
                    padding: "14px 36px",
                    background: status === "sent" ? "var(--teal)" : "var(--copper)",
                    color: "var(--parchment)",
                    fontFamily: "var(--font-label)",
                    fontSize: 9, letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: status === "sending" ? 0.7 : 1,
                    cursor: status === "idle" ? "pointer" : "default",
                    transition: "all 0.2s",
                  }}
                >
                  {status === "sending" ? "Sending…"
                    : status === "sent"    ? "Message Sent ✓"
                    : "Send Message"}
                </motion.button>

                {status === "error" && (
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10, color: "#e05252",
                  }}>
                    Failed to send. Email me directly.
                  </p>
                )}
              </div>
            </motion.form>

            {/* ── Contact info ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {/* Availability */}
              <div style={{
                padding: "20px 24px",
                border: "1px solid var(--ink-rule)",
                background: "var(--ink-2)",
                marginBottom: 32,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#4caf50",
                    boxShadow: "0 0 8px rgba(76,175,80,0.5)",
                    animation: "pulse-dot 2s infinite",
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-label)",
                    fontSize: 9, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "var(--ink-body)",
                  }}>
                    Available for new projects
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: 13, color: "var(--ink-text)", lineHeight: 1.6,
                }}>
                  Currently open freelance work, and
                  interesting collaborations. Response within 24 hours.
                </p>
              </div>

              {/* Contact links */}
              {CONTACT_INFO.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  whileHover={{ x: 8 }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 0",
                    borderBottom: "1px solid var(--ink-rule)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-label)",
                    fontSize: 9, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: "var(--copper)",
                  }}>
                    {info.label}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10, color: "var(--ink-text)",
                    letterSpacing: "0.04em",
                  }}>
                    {info.value}
                  </span>
                </motion.a>
              ))}

              {/* Location */}
              <div style={{
                marginTop: 32, paddingTop: 24,
                borderTop: "1px solid var(--ink-rule)",
              }}>
                <p style={{
                  fontFamily: "var(--font-label)",
                  fontSize: 9, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "var(--ink-subtle)",
                  marginBottom: 8,
                }}>
                  Based in
                </p>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 32, color: "var(--parchment)",
                  letterSpacing: "0.04em", lineHeight: 1,
                }}>
                  PHNOM PENH
                </p>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9, color: "var(--ink-body)",
                  marginTop: 4, letterSpacing: "0.08em",
                }}>
                  Cambodia · UTC+7 · Open to remote worldwide
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </TransitionWrapper>
    </main>
  );
}
