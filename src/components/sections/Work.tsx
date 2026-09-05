'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'Luno Tech',
    category: 'Digital Product',
    year: '2024',
    color: '#1a1a1a',
  },
  {
    id: '02',
    title: 'Wild Stone',
    category: 'E-commerce',
    year: '2024',
    color: '#0f172a',
  },
  {
    id: '03',
    title: 'Prink',
    category: 'Brand Identity',
    year: '2025',
    color: '#1c1917',
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const projects = sectionRef.current!.querySelectorAll(`.${styles.project}`);
      
      projects.forEach((proj) => {
        const image = proj.querySelector(`.${styles.imageInner}`);
        
        // Simple elegant parallax on images
        gsap.fromTo(image,
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: proj,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.work} id="work">
      <div className={styles.header}>
        <span className="mono-label">[02] Selected Work</span>
      </div>

      <div className={styles.gallery}>
        {PROJECTS.map((project) => (
          <div key={project.id} className={styles.project}>
            
            <div className={styles.imageContainer}>
              <div 
                className={styles.imageInner}
                style={{ backgroundColor: project.color }}
              >
                {/* Placeholder for project images */}
                <div className={styles.placeholderLabel}>{project.title}</div>
              </div>
            </div>

            <div className={styles.meta}>
              <h3 className={styles.title}>{project.title}</h3>
              <div className={styles.details}>
                <span className="mono-label">{project.category}</span>
                <span className="mono-label">{project.year}</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
