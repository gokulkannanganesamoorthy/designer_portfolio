"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ObserverOverlay() {
  const [observePos, setObservePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Clear previous timer and hide any existing word
      clearTimeout(idleTimer);
      setObservePos(null);

      // Check if hovering over something interactive
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], [style*="cursor: pointer"]');
      
      if (!isInteractive) {
        idleTimer = setTimeout(() => {
          setObservePos({ x: e.clientX, y: e.clientY });
          
          // Disappear after 2 seconds
          setTimeout(() => {
            setObservePos(null);
          }, 2000);
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {observePos && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "fixed",
            left: observePos.x,
            top: observePos.y,
            transform: "translate(-50%, -100%)", // slightly above cursor
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            color: "var(--text-secondary)",
            pointerEvents: "none",
            zIndex: 100,
          }}
          className="mono"
        >
          OBSERVE
        </motion.div>
      )}
    </AnimatePresence>
  );
}
