"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImmersiveShowcase.module.css";
import Projects from "./Projects";

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
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

  return (
    <section className={styles.container}>
      <div className={styles.splitContainer}>
        
        {/* Left Pane: Works */}
        <motion.div 
          layoutId="pane-works"
          className={`${styles.pane} ${styles.paneLeft}`}
          onClick={() => setActivePane("works")}
          whileHover="hover"
        >
          <motion.div 
            className={styles.paneBg} 
            variants={{ hover: { scale: 1.05 } }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
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
        >
          <motion.div 
            className={styles.paneBg} 
            variants={{ hover: { scale: 1.05 } }} 
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
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
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setActivePane(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className={styles.scrollableContent}>
                {activePane === "works" && (
                  <div className={styles.projectsWrapper}>
                    <Projects isModal={true} />
                  </div>
                )}

                {activePane === "experience" && (
                  <div className={styles.experienceSection}>
                    <div className={styles.experienceHeader}>
                      <h2>Experience</h2>
                    </div>
                    
                    <div className={styles.editorialList}>
                      {experienceData.map((exp, i) => (
                        <motion.div 
                          key={i} 
                          className={styles.editorialRow}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                          <div className={styles.yearCol}>
                            {exp.year}
                          </div>
                          <div className={styles.dividerCol}>
                            <div className={styles.verticalLine}></div>
                          </div>
                          <div className={styles.detailsCol}>
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                            <p>{exp.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
