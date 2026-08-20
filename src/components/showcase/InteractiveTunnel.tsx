'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './InteractiveTunnel.module.css';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
}

const colorPalettes = [
  ['#FF007A', '#00E5FF', '#7000FF'], // Magenta, Cyan, Purple
  ['#FF6B00', '#FFD600', '#FF0055'], // Orange, Yellow, Hot Pink
  ['#8A2BE2', '#FF1493', '#0044FF'], // Electric Purple, Deep Pink, Blue
  ['#00FFFF', '#39FF14', '#0088FF'], // Cyan, Lime Green, Bright Blue
];

function GlassCard({ project, index, activeIndex }: { project: Project; index: number; activeIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Hover effect state
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation: Max rotation 15 degrees
    const rY = ((mouseX / width) - 0.5) * 30; // -15 to 15
    const rX = ((mouseY / height) - 0.5) * -30; // -15 to 15

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const colors = colorPalettes[index % colorPalettes.length];
  const isActive = activeIndex === index;

  return (
    <div className={styles.cardWrapper} ref={cardRef}>
      <motion.div
        className={styles.glassCard}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isActive ? 1.02 : 0.95,
          opacity: isActive ? 1 : 0.4,
          z: isActive ? 50 : 0
        }}
        transition={{
          rotateX: { type: 'spring', stiffness: 300, damping: 30 },
          rotateY: { type: 'spring', stiffness: 300, damping: 30 },
          scale: { duration: 0.6, ease: 'easeOut' },
          opacity: { duration: 0.6, ease: 'easeOut' },
          z: { duration: 0.6, ease: 'easeOut' }
        }}
      >
        <div 
          className={styles.yearBadge}
          style={{ color: colors[0] }}
        >
          {project.year}
        </div>
        <h3 
          className={styles.companyTitle}
          style={{
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {project.company}
        </h3>
        <p className={styles.roleText}>{project.role}</p>
      </motion.div>
    </div>
  );
}

export default function InteractiveTunnel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const cardElements = containerRef.current.querySelectorAll(`.${styles.cardWrapper}`);
      let newIndex = activeIndex;
      const viewportHeight = window.innerHeight;

      cardElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // If the card is in the middle of the viewport
        if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.4) {
          newIndex = index;
        }
      });
      
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const activeColors = colorPalettes[activeIndex % colorPalettes.length];

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Dynamic Fluid Aura Background */}
      <div className={styles.auraContainer}>
         <motion.div 
           className={styles.auraBlob} 
           style={{ width: '70vw', height: '70vw', left: '-20vw', top: '-10vh' }}
           animate={{ 
             backgroundColor: activeColors[0],
             scale: [1, 1.1, 1],
             x: [0, 40, 0],
             y: [0, -40, 0]
           }}
           transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
         />
         <motion.div 
           className={styles.auraBlob} 
           style={{ width: '60vw', height: '60vw', right: '-10vw', bottom: '0vh' }}
           animate={{ 
             backgroundColor: activeColors[1],
             scale: [1.1, 1, 1.1],
             x: [0, -40, 0],
             y: [0, 40, 0]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
         />
         <motion.div 
           className={styles.auraBlob} 
           style={{ width: '50vw', height: '50vw', left: '25vw', top: '30vh' }}
           animate={{ 
             backgroundColor: activeColors[2],
             scale: [1, 1.2, 1],
             x: [0, 50, -30, 0],
           }}
           transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
         />
      </div>

      <div className={styles.timeline}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Experience</h2>
          <div className={styles.headerSubtitle}>The Journey</div>
        </div>

        {projects.map((p, i) => (
          <GlassCard key={p.id} project={p} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </div>
  );
}
