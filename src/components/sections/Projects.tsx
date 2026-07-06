"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";

import { projects } from "@/lib/data";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

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
                onClick={() => setActiveIndex(index)}
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
          </div>
          
          <div className={styles.browserContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={styles.scrollableInner}
                style={{ backgroundColor: activeProject.bgColor }}
              >
                {/* Dummy long content to demonstrate scrolling */}
                <div className={styles.dummyHeader}>
                  <div className={styles.dummyTitle}>{activeProject.title}</div>
                  <div className={styles.dummyCategory}>{activeProject.category}</div>
                </div>
                
                <div className={styles.dummyGrid}>
                  <div className={styles.dummyBlock}></div>
                  <div className={styles.dummyBlock}></div>
                  <div className={styles.dummyBlockFull}></div>
                  <div className={styles.dummyBlock}></div>
                  <div className={styles.dummyBlock}></div>
                  <div className={styles.dummyBlockFull}></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
