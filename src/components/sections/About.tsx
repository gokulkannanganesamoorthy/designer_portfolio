"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./About.module.css";
import { aboutContent } from "@/lib/data";

export default function About() {
  const [mode, setMode] = useState<"text" | "video">("text");

  return (
    <section className={styles.container} id="about">
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        
        <div className={styles.toggleContainer}>
          <button 
            className={`${styles.toggleBtn} ${mode === "text" ? styles.active : ""}`}
            onClick={() => setMode("text")}
          >
            Read
          </button>
          <button 
            className={`${styles.toggleBtn} ${mode === "video" ? styles.active : ""}`}
            onClick={() => setMode("video")}
          >
            Watch
          </button>
          {/* Animated underline for active state */}
          <motion.div 
            className={styles.activeUnderline}
            layoutId="activeUnderline"
            initial={false}
            animate={{
              x: mode === "text" ? 0 : "100%"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          {mode === "text" ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className={styles.textContent}
            >
              {aboutContent.paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className={styles.videoContent}
            >
              <div className={styles.videoWrapper}>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className={styles.video}
                >
                  <source src={aboutContent.videoUrl} type="video/mp4" />
                </video>
                <div className={styles.videoOverlay}>
                  <span>The Process</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
