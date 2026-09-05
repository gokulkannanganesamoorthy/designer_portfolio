'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Contact.module.css';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Scale up the footer text slightly as it reveals
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <footer className={styles.footerContainer} ref={containerRef} id="contact">
      <div className={styles.footerFixed}>
        
        <motion.div style={{ scale }}>
          <h2 className={styles.heading}>HAVE SOMETHING<br />WORTH BUILDING?</h2>
          <p className={styles.subheading}>Tell me what you're working on. I'll tell you what I'd change.</p>
          
          <div style={{ marginTop: 'var(--spacing-16)' }}>
            <a href="mailto:hello@gokulmakes.in" className={styles.hugeLink}>
              hello@gokulmakes.in
            </a>
          </div>
        </motion.div>

        <div className={styles.bottomRow}>
          <div className={styles.footerLeft}>
            <span style={{ color: 'var(--bg-primary)', fontWeight: 500, letterSpacing: '0.1em' }}>
              {personalInfo.name.toUpperCase()}
            </span>
            <span>{personalInfo.title}</span>
            <span style={{ marginTop: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}>
              Designing the Invisible.
            </span>
          </div>
          <div className={styles.footerRight}>
            <a href="#">LINKEDIN</a>
            <a href="#">INSTAGRAM</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
