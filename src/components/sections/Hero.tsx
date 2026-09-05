'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Hero.module.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Clean cinematic fade up
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2, delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5 },
        '-=1.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      
      {/* Subtle atmospheric glow */}
      <div className={styles.glow} />

      <div className={styles.content}>
        <div className={styles.topInfo}>
          <span className="mono-label">Based in Chennai, IN</span>
          <span className="mono-label">Available '25</span>
        </div>

        <div className={styles.centerBlock}>
          <h1 ref={titleRef} className={styles.title}>
            <span className={styles.titleLine}>GOKUL</span>
            <span className={styles.titleLine}>MAKES</span>
          </h1>
          
          <p ref={subtitleRef} className={styles.subtitle}>
            Digital Experience Designer.
            <br />Designing the invisible. Building things people remember.
          </p>
        </div>

      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
      </div>

    </section>
  );
}
