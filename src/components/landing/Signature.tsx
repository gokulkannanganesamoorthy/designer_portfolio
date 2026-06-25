"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Signature() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "var(--text-xs)",
            letterSpacing: "0.2em",
            color: "var(--text-secondary)",
            pointerEvents: "none",
            zIndex: 10,
          }}
          className="mono"
        >
          GK
        </motion.div>
      )}
    </AnimatePresence>
  );
}
