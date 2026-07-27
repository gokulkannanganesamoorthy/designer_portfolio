"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import styles from "./CylinderGallery.module.css";

const projectsData = [
  { date: "JUL 2020", title: "change-host" },
  { date: "MAY 2021", title: "Vaccine Slots Discord Bot" },
  { date: "AUG 2024", title: "Chat bot" },
  { date: "OCT 2024", title: "Word Game" },
  { date: "MAR 2025", title: "DJ Gig" },
  { date: "APR 2025", title: "Portfolio" },
  { date: "JUN 2025", title: "Focus Clock" },
  { date: "OCT 2025", title: "Slide Sync" },
  { date: "OCT 2025", title: "Login Page" },
  { date: "MAY 2026", title: "Reso" },
];

export default function CylinderGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag state
  const dragX = useMotionValue(0);
  // Map horizontal drag to Y rotation. 
  // Dragging 1000px horizontally rotates the cylinder by 180 degrees.
  const rotationY = useTransform(dragX, [-1000, 1000], [-180, 180]);

  // Total panels
  const numPanels = projectsData.length;
  // Angle per panel
  const angle = 360 / numPanels;
  // Calculate Z distance to push panels out so they form a perfect circle.
  // Panel width is ~300px.
  const panelWidth = 320;
  const radius = Math.round((panelWidth / 2) / Math.tan(Math.PI / numPanels)) + 50;

  return (
    <div className={styles.wrapper}>
      {/* Background Image Placeholder */}
      <div className={styles.bgImage} />

      <div className={styles.scene} ref={containerRef}>
        <motion.div 
          className={styles.cylinder}
          style={{ rotateY: rotationY }}
          drag="x"
          dragConstraints={{ left: -3000, right: 3000 }}
          dragElastic={0.1}
          whileTap={{ cursor: "grabbing" }}
        >
          {projectsData.map((project, i) => (
            <div 
              key={i} 
              className={styles.panel}
              style={{
                transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`
              }}
            >
              <div className={styles.dateTag}>{project.date}</div>
              <div className={styles.card}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className={styles.indicator}>
        &lt;&gt; PAN
      </div>
    </div>
  );
}
