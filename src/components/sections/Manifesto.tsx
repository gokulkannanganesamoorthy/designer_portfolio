'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT = `I don't just design interfaces. I design how things feel when no one is looking. The pause before a click. The silence between transitions. The invisible architecture of attention. Every pixel is a decision. Every whitespace is a statement. I build experiences that make people stop, feel, and remember.`;

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wordsRef.current || !sectionRef.current) return;

    const words = wordsRef.current.querySelectorAll(`.${styles.word}`);
    
    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.1, y: 10 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          words.forEach((word, i) => {
            const wordProgress = (progress - (i / words.length)) * words.length;
            const clampedProgress = Math.max(0, Math.min(1, wordProgress * 1.5));
            
            gsap.set(word, {
              opacity: 0.1 + clampedProgress * 0.9,
              y: 10 * (1 - clampedProgress),
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = MANIFESTO_TEXT.split(' ');

  return (
    <section ref={sectionRef} className={styles.manifesto} id="manifesto">
      <div className={styles.stickyContainer}>
        <div className={styles.inner}>
          <span className={`${styles.sectionLabel} mono-label`}>[01] Philosophy</span>
          <div ref={wordsRef} className={styles.textBlock}>
            {words.map((word, index) => (
              <span key={index} className={styles.word}>
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
