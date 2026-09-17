'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';

gsap.registerPlugin(ScrollTrigger);

const MANIFESTO_TEXT = `I don't just design interfaces. \n I design the experience around them. \n \n The pause before a click. The silence between transitions. \n The invisible architecture of attention. \n Every pixel is a decision. Every whitespace is a statement. \n I build experiences that make people stop, feel, and remember.`;

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
        trigger: sectionRef.current, // Pin the whole section
        pin: true,
        pinSpacing: true, // Keep the spacing so the page doesn't jump
        start: 'center center', // Freeze the section exactly when it hits the center
        end: '+=100%', // Require the user to scroll 100% of the viewport height to fully reveal the text before it unpins
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;

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
              I design what happens <br /> behind the screen, too.
            </p>
          </div>
          <div ref={wordsRef} className={styles.textBlock}>
            {words.map((word, index) => {
              if (word === '\n') {
                return <br key={index} />;
              }
              return (
                <span key={index} className={styles.word}>
                  {word}{' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
