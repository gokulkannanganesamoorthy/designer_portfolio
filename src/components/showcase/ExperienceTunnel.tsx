"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./ExperienceTunnel.module.css";

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
  { year: "2018", role: "Junior Designer", company: "Startup Inc", description: "Assisted in branding and web design." },
];

export default function ExperienceTunnel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within the container
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  // Map scroll progress to a deep Z-translation (moving forward through the tunnel)
  const zTranslation = useTransform(scrollYProgress, [0, 1], [0, 3000]);
  const smoothZ = useSpring(zTranslation, { damping: 20, stiffness: 100 });

  return (
    <div className={styles.tunnelViewport} ref={containerRef}>
      
      {/* Scroll instruction overlay */}
      <div className={styles.scrollHint}>
        Scroll down to dive deeper
      </div>
      
      <div className={styles.tunnelScene}>
        <motion.div 
          className={styles.tunnelWrapper}
          style={{ z: smoothZ }}
        >
          {experienceData.map((exp, index) => {
            // Position each card further down the Z axis
            const zPos = -(index * 1000) - 500;
            // Alternate left and right
            const xPos = index % 2 === 0 ? -300 : 300;
            const rotateY = index % 2 === 0 ? 15 : -15;

            return (
              <div 
                key={index} 
                className={styles.tunnelCard}
                style={{
                  transform: `translate3d(${xPos}px, 0px, ${zPos}px) rotateY(${rotateY}deg)`
                }}
              >
                <div className={styles.yearCol}>{exp.year}</div>
                <h3 className={styles.roleText}>{exp.role}</h3>
                <h4 className={styles.companyText}>{exp.company}</h4>
                <p className={styles.descText}>{exp.description}</p>
              </div>
            );
          })}
          
          {/* End of tunnel light */}
          <div 
            className={styles.tunnelEnd}
            style={{ transform: `translate3d(0, 0, ${-(experienceData.length * 1000) - 1000}px)` }}
          ></div>
        </motion.div>
      </div>

      {/* Invisible tall div to force scrolling */}
      <div style={{ height: `${experienceData.length * 100 + 100}vh` }} />
    </div>
  );
}
