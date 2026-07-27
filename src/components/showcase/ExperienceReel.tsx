"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import styles from "./ExperienceReel.module.css";

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
  { year: "2018", role: "Junior Designer", company: "Startup Inc", description: "Assisted in branding and web design." },
];

export default function ExperienceReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll to power horizontal reel movement
  const { scrollYProgress } = useScroll({ container: containerRef });
  
  const xTranslation = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const smoothX = useSpring(xTranslation, { damping: 25, stiffness: 120 });

  // Mouse interaction for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10 to 10 deg
      const y = (e.clientY / innerHeight - 0.5) * -20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateY = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const rotateX = useSpring(mouseY, { damping: 30, stiffness: 100 });

  return (
    <div className={styles.reelViewport} ref={containerRef}>
      
      <div className={styles.scrollHint}>
        Scroll down to scrub timeline
      </div>
      
      <div className={styles.reelScene}>
        <motion.div 
          className={styles.reelContainer}
          style={{ rotateX, rotateY }}
        >
          <motion.div 
            className={styles.reelTrack}
            style={{ x: smoothX }}
          >
            {experienceData.map((exp, index) => (
              <div key={index} className={styles.reelCard}>
                <div className={styles.cardGlow}></div>
                <div className={styles.cardContent}>
                  <div className={styles.yearCol}>{exp.year}</div>
                  <h3 className={styles.roleText}>{exp.role}</h3>
                  <h4 className={styles.companyText}>{exp.company}</h4>
                  <p className={styles.descText}>{exp.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div style={{ height: `${experienceData.length * 100}vh` }} />
    </div>
  );
}
