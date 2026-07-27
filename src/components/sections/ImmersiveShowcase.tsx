"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImmersiveShowcase.module.css";
import Timeline3D from "./showcase/Timeline3D";
import CylinderGallery from "./showcase/CylinderGallery";

export default function ImmersiveShowcase() {
  const [activePane, setActivePane] = useState<"education" | "experience" | null>(null);
  const [hoveredPane, setHoveredPane] = useState<"education" | "experience" | null>(null);

  useEffect(() => {
    if (activePane) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePane]);

  return (
    <section className={styles.container}>
      {/* Background Title (EXPERIENCE) across the top, visible in default state */}
      <div className={styles.headerTitle}>
        E X P E R I E N C E
      </div>

      <div className={styles.splitContainer}>
        {/* Left Pane: Work & Education */}
        <motion.div 
          layoutId="pane-education"
          className={`${styles.pane} ${styles.paneLeft} ${hoveredPane === "education" ? styles.paneHovered : ""} ${hoveredPane === "experience" ? styles.paneShrunk : ""}`}
          onClick={() => setActivePane("education")}
          onHoverStart={() => setHoveredPane("education")}
          onHoverEnd={() => setHoveredPane(null)}
        >
          <div className={styles.paneBgColor1} />
          <motion.div className={styles.paneOverlay}>
            <div className={styles.overlayTextContainer}>
              <h2 className={styles.paneTitleLarge}>
                WORK<br />
                AND<br />
                EDUCATION
              </h2>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Pane: Experience / Projects */}
        <motion.div 
          layoutId="pane-experience"
          className={`${styles.pane} ${styles.paneRight} ${hoveredPane === "experience" ? styles.paneHovered : ""} ${hoveredPane === "education" ? styles.paneShrunk : ""}`}
          onClick={() => setActivePane("experience")}
          onHoverStart={() => setHoveredPane("experience")}
          onHoverEnd={() => setHoveredPane(null)}
        >
          <div className={styles.paneBgColor2} />
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className={styles.footerLinks}>
        <a href="#">LINKEDIN</a>
        <a href="#">GITHUB</a>
        <a href="#">SPOTIFY</a>
        <a href="#">INSTAGRAM</a>
        <a href="#">RESUME</a>
      </div>

      {/* Fullscreen Modals */}
      <AnimatePresence>
        {activePane && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              layoutId={`pane-${activePane}`}
              className={styles.modalContent}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setActivePane(null)}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {activePane === "education" && (
                <Timeline3D />
              )}

              {activePane === "experience" && (
                <CylinderGallery />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
