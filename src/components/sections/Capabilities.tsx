'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Capabilities.module.css';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    num: '01',
    title: 'Digital Experience',
    desc: 'Engineering interactive environments where technology serves emotion.',
  },
  {
    num: '02',
    title: 'Brand Systems',
    desc: 'Architecting identity frameworks that scale without losing soul.',
  },
  {
    num: '03',
    title: 'Creative Dev',
    desc: 'Bridging the gap between visionary design and technical execution.',
  },
  {
    num: '04',
    title: 'Technical Strategy',
    desc: 'Aligning product architecture with long-term business objectives.',
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const cards = gridRef.current.children;
    const ctx = gsap.context(() => {
      
      gsap.fromTo(cards, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.capabilities} id="capabilities">
      <div className={styles.header}>
        <span className="mono-label">[03] Services</span>
        <h2 className={styles.title}>Capabilities</h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {CAPABILITIES.map((cap) => (
          <div key={cap.num} className={styles.card}>
            <div className={styles.cardGlow} />
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <span className="mono-label">{cap.num}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{cap.title}</h3>
                <p className={styles.cardDesc}>{cap.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
