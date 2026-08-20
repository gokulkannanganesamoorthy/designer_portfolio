'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './InteractiveTunnel.module.css';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
}

interface InteractiveTunnelProps {
  projects: Project[];
  zSpacing?: number;
  initialZ?: number;
}

const InteractiveTunnel: React.FC<InteractiveTunnelProps> = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Reset active index on mount
    setActiveIndex(0);

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      let newActiveIndex = activeIndex;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section's top is in the top 50% of the viewport, or it covers the middle
          if (rect.top <= viewportHeight * 0.6 && rect.bottom >= viewportHeight * 0.4) {
            newActiveIndex = index;
          }
        }
      });

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.canvasLayout}>
      {/* Mobile Sticky Tabs */}
      <div className={styles.mobileWidget}>
        {projects.map((project, i) => (
          <button
            key={`mobile-tab-${i}`}
            className={`${styles.mobileTab} ${activeIndex === i ? styles.mobileTabActive : ''}`}
            onClick={() => scrollToSection(i)}
          >
            {project.company}
          </button>
        ))}
      </div>

      {/* LEFT COLUMN - Sticky Widget */}
      <div className={styles.leftColumn}>
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeader}>Experience Timeline</div>
          {projects.map((project, i) => (
            <div
              key={`tab-${i}`}
              className={`${styles.widgetTab} ${activeIndex === i ? styles.widgetTabActive : ''}`}
              onClick={() => scrollToSection(i)}
            >
              <span>{project.company}</span>
              {activeIndex === i && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '3px',
                    height: '100%',
                    background: 'var(--color-orange, #ff6b00)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN - Scrollable Canvas */}
      <div className={styles.rightColumn}>
        {projects.map((project, i) => (
          <section
            key={`section-${i}`}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={styles.canvasSection}
          >
            <div className={styles.canvasBox}>
              {/* SVG Connections (Using percentage viewBox 0 0 100 100 for responsive scaling) */}
              <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Node 1 to Node 2 */}
                <path 
                  d="M 25 35 C 35 35, 35 65, 45 65" 
                  className={styles.connectionPath} 
                  vectorEffect="non-scaling-stroke" 
                />
                {/* Node 2 to Node 3 */}
                <path 
                  d="M 60 65 C 70 65, 65 25, 75 25" 
                  className={styles.connectionPath} 
                  vectorEffect="non-scaling-stroke" 
                />
                
                <circle cx="25" cy="35" r="0.8" className={styles.connectionDot} vectorEffect="non-scaling-stroke" />
                <circle cx="45" cy="65" r="0.8" className={styles.connectionDot} vectorEffect="non-scaling-stroke" />
                <circle cx="60" cy="65" r="0.8" className={styles.connectionDot} vectorEffect="non-scaling-stroke" />
                <circle cx="75" cy="25" r="0.8" className={styles.connectionDot} vectorEffect="non-scaling-stroke" />
              </svg>

              {/* Node 1: Role */}
              <div className={styles.node} style={{ left: '5%', top: '25%' }}>
                <div className={styles.nodeTag}>Role</div>
                <div className={styles.nodeContent}>{project.role}</div>
              </div>

              {/* Node 2: Company */}
              <div className={styles.node} style={{ left: '40%', top: '60%' }}>
                <div className={styles.nodeTag}>Organization</div>
                <div className={styles.nodeContent}>{project.company}</div>
              </div>

              {/* Node 3: Year */}
              <div className={styles.node} style={{ left: '70%', top: '15%' }}>
                <div className={styles.nodeTag}>Duration</div>
                <div className={styles.nodeContent}>{project.year}</div>
              </div>

            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default InteractiveTunnel;
