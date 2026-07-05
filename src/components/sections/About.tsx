"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./About.module.css";

export default function About() {
  const [mode, setMode] = useState<"text" | "video">("text");

  return (
    <section className={styles.container} id="about">
      <div className={styles.header}>
        <h2 className={styles.title}>About</h2>
        <div className={styles.toggle}>
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
        </div>
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {mode === "text" ? (
            <motion.div 
              key="text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.textContent}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={styles.videoContainer}
            >
              <video 
                className={styles.video} 
                autoPlay 
                muted 
                loop 
                playsInline
                controls
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
