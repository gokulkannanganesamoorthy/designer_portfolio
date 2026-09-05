'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';
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
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  // 1. Setup Scroll Tracking
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Setup Velocity Tracking
  const scrollVelocity = useVelocity(scrollY);
  // Smooth out the velocity so the glitch doesn't snap off instantly
  const smoothVelocity = useSpring(scrollVelocity, { damping: 30, stiffness: 200 });

  // Map velocity to SVG displacement scale (0 when still, high when scrolling fast)
  // We use absolute value of velocity
  const displacementScale = useTransform(smoothVelocity, [-2000, 0, 2000], [300, 0, 300]);
  
  // Update the SVG filter DOM node directly for maximum performance
  useMotionValueEvent(displacementScale, "change", (latest) => {
    if (displacementRef.current) {
      displacementRef.current.setAttribute('scale', latest.toString());
    }
  });

  // Map velocity to a CSS blur for extra chaos
  const blurAmount = useTransform(smoothVelocity, [-2000, 0, 2000], [20, 0, 20]);
  const filterString = useTransform(blurAmount, (val) => `blur(${val}px) url(#shredder)`);

  const step = projects.length > 1 ? 1 / (projects.length - 1) : 1;

  // React state for the progress indicator
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const newIndex = Math.min(Math.round(latest * (projects.length - 1)), projects.length - 1);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  return (
    <div className={styles.container} ref={containerRef}>
      {/* SVG Definitions for the Kinetic Velocity Shredder */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="shredder" colorInterpolationFilters="sRGB">
          {/* Fractal noise heavily stretched horizontally to create slicing bands */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0001 0.4" numOctaves="1" result="warp" />
          <feDisplacementMap 
            ref={displacementRef}
            xChannelSelector="R" 
            yChannelSelector="G" 
            scale="0" 
            in="SourceGraphic" 
            in2="warp" 
          />
        </filter>
      </svg>

      <div className={styles.noise} />

      {/* The scroll track height defines how long we can scroll */}
      <div className={styles.scrollTrack} style={{ height: `${projects.length * 120}vh` }}>
        
        <div className={styles.viewer}>
          
          {/* Progress Indicator */}
          <div className={styles.progressIndicator}>
            {projects.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.progressDot} ${activeIndex === i ? styles.progressDotActive : ''}`} 
              />
            ))}
          </div>

          {/* Dynamic Typography Panels */}
          {projects.map((p, i) => {
            const center = i * step;
            // Define opacity mapping: Fade in as it approaches center, fade out as it leaves
            const opacity = useTransform(
              scrollYProgress, 
              [center - (step * 0.5), center, center + (step * 0.5)], 
              [0, 1, 0]
            );
            
            // Define scale mapping: zoom in slightly from far, zoom past camera when leaving
            const scale = useTransform(
              scrollYProgress, 
              [center - (step * 0.5), center, center + (step * 0.5)], 
              [0.8, 1, 2.5]
            );

            // Define Y parallax
            const y = useTransform(
              scrollYProgress, 
              [center - (step * 0.5), center, center + (step * 0.5)], 
              [100, 0, -200]
            );

            return (
              <motion.div 
                key={p.id} 
                className={styles.contentWrapper}
                style={{ 
                  position: 'absolute', 
                  opacity, 
                  scale, 
                  y,
                  filter: filterString, // Apply both blur and the SVG shredder
                  pointerEvents: activeIndex === i ? 'auto' : 'none'
                }}
              >
                 <motion.h2 className={styles.companyText}>
                    {p.company}
                 </motion.h2>
                 <motion.div className={styles.subText}>
                    {p.role}
                 </motion.div>

                 <div className={styles.detailsGrid}>
                    <div className={styles.detailCol}>
                      <span className={styles.detailLabel}>Duration</span>
                      <span className={styles.detailValue}>{p.year}</span>
                    </div>
                    <div className={styles.detailCol}>
                      <span className={styles.detailLabel}>Project ID</span>
                      <span className={styles.detailValue}>#{p.id.toUpperCase()}</span>
                    </div>
                 </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
