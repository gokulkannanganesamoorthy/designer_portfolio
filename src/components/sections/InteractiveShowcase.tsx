"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./InteractiveShowcase.module.css";
import Projects from "./Projects";

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
];

export default function InteractiveShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        <motion.div 
          layoutId="card-works"
          className={styles.card}
          onClick={() => setActiveId("works")}
          whileHover={{ scale: 0.98, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2>Selected Works</h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <p>Explore my recent projects, case studies, and interactive prototypes.</p>
          </div>
        </motion.div>

        <motion.div 
          layoutId="card-experience"
          className={styles.card}
          onClick={() => setActiveId("experience")}
          whileHover={{ scale: 0.98, y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2>Experience</h2>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <p>My professional journey, roles, and career timeline.</p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeId && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              layoutId={`card-${activeId}`}
              className={styles.modalContent}
            >
              <button 
                className={styles.closeBtn} 
                onClick={() => setActiveId(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className={styles.scrollableContent}>
                {activeId === "works" && (
                  <div className={styles.innerSection}>
                    <Projects isModal={true} />
                  </div>
                )}
                {activeId === "experience" && (
                  <div className={styles.innerSection}>
                    <div className={styles.experienceHeader}>
                      <h2 className={styles.modalTitle}>Experience</h2>
                      <p>A timeline of my professional journey.</p>
                    </div>
                    <div className={styles.timeline}>
                      {experienceData.map((exp, i) => (
                        <div key={i} className={styles.timelineItem}>
                          <div className={styles.year}>{exp.year}</div>
                          <div className={styles.timelineDot}></div>
                          <div className={styles.details}>
                            <h3>{exp.role}</h3>
                            <h4>{exp.company}</h4>
                            <p>{exp.description}</p>
                          </div>
                        </div>
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
