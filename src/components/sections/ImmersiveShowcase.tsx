"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImmersiveShowcase.module.css";
import Projects from "./Projects";

import dynamic from "next/dynamic";
import "react-3d-tunnel-scroll/style.css";

const TunnelScroll = dynamic(() => import("react-3d-tunnel-scroll"), { ssr: false });

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
  { year: "2018", role: "Junior Designer", company: "Startup Inc", description: "Assisted in branding and web design." },
];

export default function ImmersiveShowcase() {
  const [activePane, setActivePane] = useState<"works" | "experience" | null>(null);

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

  const tunnelData = experienceData.map((exp) => ({
    id: exp.year,
    title: `${exp.role} @ ${exp.company}`,
    img: `https://picsum.photos/seed/${exp.company}/800/1200`
  }));

  return (
    <section className={styles.container}>
      <div className={styles.splitContainer}>
        
        {/* Left Pane: Works */}
        <motion.div 
          layoutId="pane-works"
          className={`${styles.pane} ${styles.paneLeft}`}
          onClick={() => setActivePane("works")}
          whileHover="hover"
          transition={{ type: "spring", bounce: 0.1, duration: 0.7 }}
        >
          <motion.div 
            className={styles.paneBg} 
            variants={{ hover: { scale: 1.05 } }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Live Miniature Preview for Works */}
          <div className={styles.previewGraphicWorks}>
            <div className={styles.miniatureWrapper}>
              <Projects isModal={true} />
            </div>
          </div>
          <div className={styles.paneContent}>
            <h2 className={styles.paneTitle}>Selected Works</h2>
            <div className={styles.arrowIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>
        </motion.div>

        {/* Right Pane: Experience */}
        <motion.div 
          layoutId="pane-experience"
          className={`${styles.pane} ${styles.paneRight}`}
          onClick={() => setActivePane("experience")}
          whileHover="hover"
          transition={{ type: "spring", bounce: 0.1, duration: 0.7 }}
        >
          <motion.div 
            className={styles.paneBg} 
            variants={{ hover: { scale: 1.05 } }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          {/* Minimal Visual Preview for Experience */}
          <div className={styles.previewGraphic}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4v16a2 2 0 0 0 2 2h14"></path>
              <path d="M4 14l4-4a3 3 0 0 1 4 0l3 3 4-4"></path>
              <circle cx="19" cy="9" r="2"></circle>
            </svg>
          </div>
          <div className={styles.paneContent}>
            <h2 className={styles.paneTitle}>Experience</h2>
            <div className={styles.arrowIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </div>
        </motion.div>
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
              style={{ borderRadius: 0, backgroundColor: "#000" }}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setActivePane(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              {activePane === "works" && (
                <div className={styles.scrollableContent}>
                  <div className={styles.projectsWrapper}>
                    <Projects isModal={true} />
                  </div>
                </div>
              )}

              {activePane === "experience" && (
                <div className={styles.expPrototypeWrapper}>
                  <TunnelScroll 
                    projects={tunnelData}
                    zSpacing={2500}
                    label="EXPERIENCE"
                    backgroundColor="#000000"
                    textColor="#ffffff"
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
