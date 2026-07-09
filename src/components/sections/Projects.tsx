"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";

import { projects } from "@/lib/data";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
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
        <div className={`${styles.browserMockup} ${viewMode === "mobile" ? styles.browserMockupMobile : ""}`}>
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
              <button 
                onClick={() => setViewMode("mobile")} 
                className={`${styles.actionBtn} ${viewMode === "mobile" ? styles.activeView : ""}`} 
                title="Mobile View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </button>
              <button 
                onClick={() => setViewMode("desktop")} 
                className={`${styles.actionBtn} ${viewMode === "desktop" ? styles.activeView : ""}`} 
                title="Desktop View"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </button>
              <div className={styles.divider}></div>
              <button onClick={handleShareLink} className={styles.actionBtn} title="Copy Link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
              <button onClick={handleOpenLink} className={styles.actionBtn} title="Open in new tab">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
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
                
                <div className={`${styles.iframeScaleContainer} ${viewMode === "mobile" ? styles.mobileView : ""}`}>
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
