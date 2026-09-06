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
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (!wordsRef.current || !sectionRef.current) return;

    const words = wordsRef.current.querySelectorAll(`.${styles.word}`);

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0.15, y: 8 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'center 35%',
        scrub: 0.3,
        onUpdate: (self) => {
          // If already revealed once, keep words fully visible so scrolling back up does NOT un-reveal or dim them
          if (hasRevealedRef.current) return;

          const progress = self.progress;

          if (progress >= 0.95) {
            hasRevealedRef.current = true;
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 0.25,
              stagger: 0.01,
              overwrite: true,
            });
            return;
          }

          words.forEach((word, i) => {
            const wordProgress = (progress - i / words.length) * words.length;
            const clampedProgress = Math.max(
              0,
              Math.min(1, wordProgress * 1.4),
            );

            gsap.set(word, {
              opacity: 0.15 + clampedProgress * 0.85,
              y: 8 * (1 - clampedProgress),
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = MANIFESTO_TEXT.split(' ');

  return (
    <section ref={sectionRef} className={styles.manifesto} id="manifesto">
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logoRow}>
            <h2 className={styles.wordmark}>More about me</h2>
            <p className={styles.tagline}>
              How things feel when <br /> no one is looking.
            </p>
          </div>
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
