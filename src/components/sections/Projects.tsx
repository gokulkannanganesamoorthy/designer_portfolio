"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";

import { projects } from "@/lib/data";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const activeProject = projects[activeIndex];

  // Reset loading state when changing projects
  const handleProjectChange = (index: number) => {
    setActiveIndex(index);
    setIframeLoaded(false);
  };

  const handleOpenLink = () => {
    window.open(`https://${activeProject.url}`, "_blank");
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(`https://${activeProject.url}`);
    alert("Link copied to clipboard!");
  };

  return (
    <section className={styles.container} id="projects">
      <div className={styles.content}>
        
        {/* Navigation Sidebar */}
        <div className={styles.sidebar}>
          <h2 className={styles.sectionTitle}>Selected Work</h2>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.projectLink} ${activeIndex === index ? styles.active : ""}`}
                onClick={() => handleProjectChange(index)}
              >
                <span className={styles.projectNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.projectTitleText}>{project.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screen in Screen wrapper */}
        <div className={styles.browserMockup}>
          <div className={styles.browserHeader}>
            <div className={styles.browserDots}>
              <span />
              <span />
              <span />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeProject.id}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className={styles.browserUrl}
              >
                {activeProject.url}
              </motion.div>
            </AnimatePresence>

            <div className={styles.browserActions}>
              <button onClick={handleShareLink} className={styles.actionBtn} title="Copy Link">
                ⎘
              </button>
              <button onClick={handleOpenLink} className={styles.actionBtn} title="Open in new tab">
                ↗
              </button>
            </div>
          </div>
          
          <div className={styles.browserContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.iframeWrapper}
                style={{ backgroundColor: activeProject.bgColor }}
              >
                {!iframeLoaded && (
                  <div className={styles.loadingOverlay}>
                    <motion.div 
                      className={styles.loadingText}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Hold tight, we're fetching the experience...
                    </motion.div>
                  </div>
                )}
                
                <div className={styles.iframeScaleContainer}>
                  <iframe
                    src={`https://${activeProject.url}`}
                    className={styles.iframeContent}
                    title={activeProject.title}
                    loading="lazy"
                    allow="fullscreen"
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
