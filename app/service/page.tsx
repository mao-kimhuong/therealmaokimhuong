"use client";

import { useState, FormEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../components/Nav";
import TransitionWrapper from "../components/TransitionWrapper";

const TYPES = ["New project", "Freelance contract", "Full-time role", "Open source", "Just say hi"];



export default function ContactPage(): ReactNode {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const field = (name: string) => ({
    width: "100%", background: "none", border: "none",
    borderBottom: `1px solid ${focused === name ? "#100e04" : "#cfc4a0"}`,
    padding: "10px 0",
    fontFamily: "var(--font-body)", fontStyle: "italic" as const,
    fontSize: 14, color: "#1e1608", outline: "none",
    transition: "border-color 0.2s",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send message");
      }

      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main style={{ background: "#f4edd8", minHeight: "100vh" }}>
      <Nav />
      <TransitionWrapper>
        <div style={{ padding: "14vh 6vw 12vh" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "10vw", alignItems: "start",
          }}>

            {/* Left */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#a8966e", marginBottom: 16 }}
              >
                Contact
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(64px, 11vw, 148px)",
                  lineHeight: 0.88, letterSpacing: "0.02em",
                  color: "#1e1608", marginBottom: "8vh",
                }}
              >
                Let's<br />Talk<span style={{ color: "#b87333" }}>.</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ display: "flex", flexDirection: "column", gap: 0 }}
              >
                {[
                  { label: "Email",    val: "maokimhuong.office@gmail.com" },
                  { label: "GitHub",   val: "https://github.com/maokimhuong19000" },
                  { label: "LinkedIn", val: "www.linkedin.com/in/maokimhuong" },
                  { label: "Response", val: "< 24 hours" },
                ].map(({ label, val }) => (
                  <div key={label} style={{
                    display: "grid", gridTemplateColumns: "80px 1fr",
                    borderBottom: "1px solid #e4d8b8", padding: "12px 0",
                  }}>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8966e" }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 13, color: "#3d3020" }}>{val}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  <p style={{
                    fontFamily: "var(--font-label)", fontSize: 9,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "#a8966e", marginBottom: 24,
                    paddingBottom: 16, borderBottom: "1px solid #cfc4a0",
                  }}>
                    New Message
                  </p>

                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8966e", marginBottom: 6 }}>Name</p>
                    <input
                      required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="Your name"
                      style={field("name")}
                    />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8966e", marginBottom: 6 }}>Email</p>
                    <input
                      required type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="you@example.com"
                      style={field("email")}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8966e", marginBottom: 10 }}>Type</p>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                      {TYPES.map((t) => (
                        <button
                          key={t} type="button" data-cursor
                          onClick={() => setForm({ ...form, type: t })}
                          style={{
                            fontFamily: "var(--font-label)", fontSize: 8,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            padding: "5px 12px", cursor: "none",
                            border: "1px solid",
                            borderColor: form.type === t ? "#100e04" : "#cfc4a0",
                            background: form.type === t ? "#100e04" : "transparent",
                            color: form.type === t ? "#f4edd8" : "#a8966e",
                            transition: "all 0.15s",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <p style={{ fontFamily: "var(--font-label)", fontSize: 8, letterSpacing: "0.15em", textTransform: "uppercase", color: "#a8966e", marginBottom: 6 }}>Message</p>
                    <textarea
                      required rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("msg")} onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project..."
                      style={{ ...field("msg"), resize: "none", lineHeight: 1.8 }}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p style={{
                      fontFamily: "var(--font-body)", fontStyle: "italic",
                      fontSize: 12, color: "#c0392b", marginBottom: 12,
                    }}>
                      ⚠ {error}
                    </p>
                  )}

                  <motion.button
                    type="submit" data-cursor
                    disabled={sending}
                    whileHover={!sending ? { background: "#0d1520" } : {}}
                    style={{
                      padding: "14px",
                      background: sending ? "#8a5a28" : "#b87333",
                      fontFamily: "var(--font-label)", fontSize: 9,
                      letterSpacing: "0.18em", textTransform: "uppercase",
                      color: "#f4edd8", cursor: sending ? "default" : "none",
                      transition: "background 0.2s",
                      opacity: sending ? 0.8 : 1,
                    }}
                  >
                    {sending ? "Sending..." : "Send Message →"}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "40px", background: "#0d1520",
                    display: "flex", flexDirection: "column", gap: 16,
                  }}
                >
                  <div style={{
                    width: 32, height: 32, background: "#b87333",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "#f4edd8", fontSize: 14 }}>✓</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 32, letterSpacing: "0.04em", color: "#f4edd8", lineHeight: 1 }}>
                    Message Sent
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 13, color: "#a8966e", lineHeight: 1.7 }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </TransitionWrapper>
    </main>
  );
}