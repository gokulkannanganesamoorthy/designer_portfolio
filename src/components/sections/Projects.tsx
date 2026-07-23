"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";

import { projects } from "@/lib/data";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const activeProject = projects[activeIndex];

  // Playground state
  const [indicatorStyle, setIndicatorStyle] = useState<"sticker" | "cursor" | "glitch" | "bounce">("sticker");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGlitch, setShowGlitch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (indicatorStyle === "glitch" && iframeLoaded) {
      setShowGlitch(true);
      const timer = setTimeout(() => setShowGlitch(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeIndex, indicatorStyle, iframeLoaded]);

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

          <div className={styles.playgroundControls}>
            <p>Try Interaction Ideas:</p>
            <div className={styles.playgroundButtons}>
              <button className={indicatorStyle === "sticker" ? styles.activeToggle : ""} onClick={() => { setIndicatorStyle("sticker"); setHasInteracted(false); }}>1. Sticker</button>
              <button className={indicatorStyle === "cursor" ? styles.activeToggle : ""} onClick={() => { setIndicatorStyle("cursor"); setHasInteracted(false); }}>2. Cursor</button>
              <button className={indicatorStyle === "glitch" ? styles.activeToggle : ""} onClick={() => { setIndicatorStyle("glitch"); setHasInteracted(false); }}>3. Glitch</button>
              <button className={indicatorStyle === "bounce" ? styles.activeToggle : ""} onClick={() => { setIndicatorStyle("bounce"); setHasInteracted(false); }}>4. Bounce</button>
            </div>
          </div>
        </div>

        {/* Screen in Screen wrapper */}
        <div 
          className={styles.hardwareWrapper}
          onMouseMove={(e) => {
            if (indicatorStyle !== "cursor") return;
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          
          {/* 1. Spinning Interactive Badge (Sticker) */}
          {indicatorStyle === "sticker" && (
            <div className={styles.spinningBadge}>
              <motion.svg 
                viewBox="0 0 100 100" 
                width="100%" 
                height="100%"
                className={styles.spinningText}
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text fill="currentColor" fontSize="10.5" fontWeight="600" letterSpacing="1.5">
                  <textPath href="#circlePath">
                    SCROLL TO EXPLORE • LIVE PREVIEW • 
                  </textPath>
                </text>
              </motion.svg>
              <div className={styles.badgeCenter}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="7 13 12 18 17 13"></polyline>
                  <polyline points="7 6 12 11 17 6"></polyline>
                </svg>
              </div>
            </div>
          )}

          {/* 2. Custom Cursor Overlay */}
          {indicatorStyle === "cursor" && !hasInteracted && isHovering && (
            <div className={styles.cursorCaptureLayer} onClick={() => setHasInteracted(true)}>
              <motion.div 
                className={styles.customCursor}
                animate={{ x: mousePos.x, y: mousePos.y }}
                transition={{ type: "tween", ease: "backOut", duration: 0 }}
                style={{ pointerEvents: "none" }}
              >
                <span>SCROLL</span>
              </motion.div>
            </div>
          )}

          <motion.div 
            className={`${styles.browserMockup} ${viewMode === "mobile" ? styles.browserMockupMobile : ""}`}
            animate={
              indicatorStyle === "bounce" && !hasInteracted
                ? { y: [0, 20, 0] }
                : { y: 0 }
            }
            transition={
              indicatorStyle === "bounce" && !hasInteracted
                ? { duration: 1.5, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }
                : { duration: 0.3 }
            }
            onMouseEnter={() => setHasInteracted(true)}
            onTouchStart={() => setHasInteracted(true)}
          >
            
            {viewMode === "mobile" && (
              <div className={styles.dynamicIsland}>
                <div className={styles.cameraLens}></div>
              </div>
            )}

            <div className={styles.browserHeader}>
              <div className={styles.leftActions}>
                {viewMode === "desktop" ? (
                  <div className={styles.browserDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                ) : (
                  <div className={styles.mobileLinkActions}>
                    <button onClick={handleShareLink} className={styles.actionBtn} title="Copy Link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button onClick={handleOpenLink} className={styles.actionBtn} title="Open in new tab">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </button>
                  </div>
                )}
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
                {viewMode === "desktop" && (
                  <>
                    <div className={styles.divider}></div>
                    <button onClick={handleShareLink} className={styles.actionBtn} title="Copy Link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </button>
                    <button onClick={handleOpenLink} className={styles.actionBtn} title="Open in new tab">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className={styles.browserContent}>
              <AnimatePresence>
                {indicatorStyle === "glitch" && showGlitch && (
                  <motion.div 
                    className={styles.glitchOverlay}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={styles.glitchText}>SYSTEM UNLOCKED</div>
                    <div className={styles.glitchSubtext}>INTERACTION READY</div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            
            {viewMode === "desktop" && (
              <div className={styles.imacChin}>
                <svg className={styles.appleLogo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.1-44.6-35.9-2.8-74.3 22.7-93.1 22.7-18.9 0-46.5-21-78.2-20.5-40.9 .5-78.8 23.9-99.9 61.2-42.5 74.9-10.8 185.8 30.6 245 20.3 29.1 43.6 61.4 75.3 60.3 30.7-1.1 42.7-19.6 80.1-19.6 37.3 0 48.5 19.6 80.6 19.1 32.7-.5 53.6-30.4 73.7-59.5 23.2-33.8 32.7-66.5 33.3-68.2-1.7-.5-68.3-26.1-68.3-111.1zM275.6 116.4c17.2-20.7 28.7-49.5 25.5-78.4-23.9 1-52.9 15.9-70.6 36.6-14.9 17.4-28.1 46.9-24.4 75 26.6 2 52.3-13.3 69.5-33.2z"/></svg>
              </div>
            )}
          </div>
          
          {viewMode === "desktop" && (
            <div className={styles.imacStand}>
              <div className={styles.imacStandBase}></div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
