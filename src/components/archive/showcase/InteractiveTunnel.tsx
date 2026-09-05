'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './InteractiveTunnel.module.css';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
}

export default function InteractiveTunnel({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const step = projects.length > 1 ? 1 / (projects.length - 1) : 1;

  return (
    <div 
      className={styles.container} 
      ref={containerRef}
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className={styles.stickyWrapper}>
        <div className={styles.timelineLine} />

        {projects.map((p, i) => {
          // Exactly the same mathematically safe array mapping we used before to prevent WAAPI errors
          const inputMap = projects.map((_, idx) => idx * step);

          // Opacity: fades in gracefully, fades out gracefully
          const outputOpacity = projects.map((_, idx) => idx === i ? 1 : 0);
          const opacity = useTransform(scrollYProgress, inputMap, outputOpacity);
          
          // Scale: starts slightly smaller, grows to 1, then zooms past the camera
          const outputScale = projects.map((_, idx) => idx < i ? 0.95 : idx === i ? 1 : 1.1);
          const scale = useTransform(scrollYProgress, inputMap, outputScale);

          // Blur effect: out of focus when incoming, crisp when active, out of focus when leaving
          // Framer motion allows mapping strings too!
          const outputBlur = projects.map((_, idx) => idx === i ? 0 : 10);
          const blurValue = useTransform(scrollYProgress, inputMap, outputBlur);
          const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

          // Y-Axis: Slides up from bottom, stays pinned, then slides up out of frame
          const outputY = projects.map((_, idx) => idx < i ? 100 : idx === i ? 0 : -100);
          const y = useTransform(scrollYProgress, inputMap, outputY);

          return (
            <motion.div
              key={p.id}
              className={styles.glassCard}
              style={{
                opacity,
                scale,
                y,
                filter,
                zIndex: projects.length - i // ensure proper stacking
              }}
            >
              <div className={styles.yearText}>
                {p.year}
              </div>
              <motion.h2 className={styles.companyText}>
                {p.company}
              </motion.h2>
              <div className={styles.roleText}>
                {p.role}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
