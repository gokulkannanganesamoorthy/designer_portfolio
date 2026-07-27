"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Timeline3D.module.css";

const timelineData = [
  { year: "2014", title: "IIT Roorkee", subtitle: "Electrical Engineering", zIndex: 0 },
  { year: "2018", title: "TechCorp", subtitle: "UI/UX Designer", zIndex: -1000 },
  { year: "2021", title: "Creative Studio", subtitle: "Lead Designer", zIndex: -2000 },
  { year: "2024", title: "Freelance", subtitle: "Creative Director", zIndex: -3000 },
];

export default function Timeline3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  // We'll use framer-motion's useScroll on a hidden scroll container
  // to drive the Z-axis translation.

  const { scrollYProgress } = useScroll({
    container: containerRef
  });

  // Map scroll progress (0 to 1) to Z translation (0 to 4000)
  const zTransform = useTransform(scrollYProgress, [0, 1], [0, 4000]);

  return (
    <div className={styles.wrapper}>
      {/* Background Image Placeholder */}
      <div className={styles.bgImage} />

      {/* 3D Scene */}
      <div className={styles.scene}>
        <motion.div 
          className={styles.camera}
          style={{ z: zTransform }}
        >
          {timelineData.map((item, idx) => (
            <div 
              key={idx} 
              className={styles.node}
              style={{ transform: `translateZ(${item.zIndex}px)` }}
            >
              <div className={styles.nodeBox}>
                <span className={styles.icon}>☑</span>
                <span className={styles.year}>{item.year}</span>
              </div>
              <h2 className={styles.title}>{item.title}</h2>
              <p className={styles.subtitle}>{item.subtitle}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hidden Scroll Area to drive animation */}
      <div className={styles.scrollArea} ref={containerRef}>
        <div className={styles.scrollSpacer} />
      </div>

      <div className={styles.indicator}>
        ↕ SCROLL
      </div>
    </div>
  );
}
