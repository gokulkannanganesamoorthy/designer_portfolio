'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './InteractiveTunnel.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface InteractiveTunnelProps {
  projects: {
    id: string;
    title: string;
    role: string;
    year: string;
    company: string;
  }[];
  zSpacing?: number;
  initialZ?: number;
}

const InteractiveTunnel: React.FC<InteractiveTunnelProps> = ({
  projects = [],
  zSpacing = 2500,
  initialZ = 2500,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!projects.length) return;

    let ctx = gsap.context(() => {
      const totalDepth = projects.length * zSpacing + initialZ;

      // 1. Scroll Z Physics
      gsap.fromTo(
        sceneRef.current,
        { z: 0 },
        {
          z: totalDepth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalDepth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Fade out cards as they pass the camera
      gsap.utils.toArray('.interactive-card').forEach((card: any, i) => {
        const triggerStart = i * zSpacing + initialZ - 800;
        const triggerEnd = i * zSpacing + initialZ + 500;
        
        // We only fade out opacity when it passes the camera (Z > 0 relative to camera)
        gsap.to(card, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${triggerStart} top`,
            end: () => `top+=${triggerEnd} top`,
            scrub: true,
          },
        });
      });

      // 2. Mouse Parallax Tilt
      const rotateXTo = gsap.quickTo(sceneRef.current, "rotateX", { duration: 0.8, ease: "power3" });
      const rotateYTo = gsap.quickTo(sceneRef.current, "rotateY", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        // Normalize mouse coordinates from -1 to 1
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;

        // Apply rotation (invert Y for natural tilt)
        rotateXTo(y * -15); // Max 15 degrees tilt
        rotateYTo(x * 15);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length, zSpacing, initialZ]);

  return (
    <section className={styles.tunnelSection} ref={sectionRef}>
      <div className={styles.tunnelOverlay} />
      <h2 className={styles.tunnelLabel}>[ INTERACTIVE ARCHIVE ]</h2>

      <div className={styles.tunnelViewport}>
        <div className={styles.tunnelScene} ref={sceneRef}>
          {projects.map((project, i) => {
            const zPos = -(i * zSpacing) - initialZ;
            
            // Alternate left/right and give initial slight rotation to make it look like a tunnel
            const xPos = i % 2 === 0 ? '-25vw' : '25vw';
            const initRotateY = i % 2 === 0 ? '15deg' : '-15deg';

            return (
              <div
                key={project.id || i}
                className={`${styles.cardContainer} interactive-card`}
                style={{
                  transform: `translate3d(calc(-50% + ${xPos}), -50%, ${zPos}px) rotateY(${initRotateY})`,
                }}
              >
                <div className={styles.card}>
                  <div className={styles.cardYear}>[{project.year}]</div>
                  <h3 className={styles.cardCompany}>{project.company}</h3>
                  <div className={styles.cardRole}>{project.role}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTunnel;
