"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 500, damping: 38 });
  const sy = useSpring(my, { stiffness: 500, damping: 38 });
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      setHovering((e.target as Element).closest("a, button, [data-cursor]") !== null);
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup",   up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup",   up);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <>
      {/* Lagging square */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 99998,
          x: sx, y: sy,
          translateX: "-50%", translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:       hovering ? 36 : clicking ? 6 : 20,
            height:      hovering ? 36 : clicking ? 6 : 20,
            borderRadius: hovering ? "50%" : "0%",
            /* ← copper on hover, ink-rule at rest */
            borderColor: hovering ? "#b87333" : "#1e3050",
            opacity:     clicking ? 0.4 : 0.35,
          }}
          transition={{ duration: 0.18 }}
          style={{ border: "1px solid #1e3050", background: "transparent" }}
        />
      </motion.div>

      {/* Sharp dot */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          pointerEvents: "none", zIndex: 99999,
          x: mx, y: my,
          translateX: "-50%", translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width:      clicking ? 10 : 4,
            height:     clicking ? 10 : 4,
            /* ← copper on hover, parchment at rest */
            background: hovering ? "#b87333" : "#d8e8f4",
          }}
          transition={{ duration: 0.1 }}
          style={{ borderRadius: 0 }}
        />
      </motion.div>
    </>
  );
}
