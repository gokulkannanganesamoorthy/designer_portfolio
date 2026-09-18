'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Manifesto.module.css';
import { RoughNotation } from 'react-rough-notation';

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
        end: '+=100%', // Increased overall scroll distance to give everything more breathing room
        scrub: 0.3,
        onUpdate: (self) => {
          const progress = self.progress;

          words.forEach((wordElement, i) => {
            const word = wordElement as HTMLElement;
            const wordProgress = (progress - i / words.length) * words.length;

            // Text opacity fades in fast
            const textRevealProgress = Math.max(
              0,
              Math.min(1, wordProgress * 1.4),
            );

            gsap.set(word, {
              opacity: 0.15 + textRevealProgress * 0.85,
              y: 8 * (1 - textRevealProgress),
            });

            // Effects take a MASSIVE 15x longer to finish so they are extremely bold and visible
            const effectProgress = Math.max(0, Math.min(1, wordProgress / 15));
            word.style.setProperty(
              '--effect-progress',
              effectProgress.toString(),
            );

            // Check if text is fully revealed
            word.setAttribute(
              'data-revealed',
              textRevealProgress === 1 ? 'true' : 'false',
            );

            // The symbol stays active during the widened effect window, but forces off at the end of the scroll section
            word.setAttribute(
              'data-revealing',
              wordProgress > 0 && effectProgress < 1 && progress < 0.99 ? 'true' : 'false',
            );
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = MANIFESTO_TEXT.split(' ');

  // Custom components for specific words
  const ExperienceWord = ({ word }: { word: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [show, setShow] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      if (!ref.current) return;
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          if (m.attributeName === 'data-revealed') {
            const revealed = ref.current?.getAttribute('data-revealed') === 'true';
            setIsRevealed(revealed);
            if (revealed && !show) setShow(true);
          }
        });
      });
      observer.observe(ref.current, { attributes: true });
      return () => observer.disconnect();
    }, [show]);

    // Redraw loop on hover by toggling the show prop
    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isHovered && isRevealed) {
        interval = setInterval(() => {
          setShow(false);
          setTimeout(() => setShow(true), 50);
        }, 1000);
      } else if (isRevealed) {
        setShow(true); // ensure it stays on when not hovered
      }
      return () => clearInterval(interval);
    }, [isHovered, isRevealed]);

    return (
      <span 
        ref={ref} 
        className={`${styles.word} ${styles.experienceWord}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <RoughNotation
          type="circle"
          padding={4}
          show={show}
          color="var(--fg)"
          strokeWidth={2}
          animationDuration={800}
        >
          {word}
        </RoughNotation>
      </span>
    );
  };

  const FeelWord = ({ word }: { word: string }) => {
    return (
      <span className={`${styles.word} ${styles.sparkleWord}`}>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <span className={styles.blackHoleText}>{word}</span>
          <div className={styles.sparkleContainer}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              const distance = 25 + ((i * 7) % 20);
              const tx = (Math.cos(angle) * distance).toFixed(2);
              const ty = (Math.sin(angle) * distance).toFixed(2);
              return (
                <div
                  key={i}
                  className={styles.sparkle}
                  style={
                    {
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </span>
      </span>
    );
  };

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

              const cleanWord = word.replace(/[.,]/g, '').toLowerCase();

              if (cleanWord === 'pause') {
                return (
                  <span key={index}>
                    <span
                      className={`${styles.word} ${styles.symbolWord}`}
                      data-revealed="false"
                    >
                      <span className={styles.text}>{word}</span>
                      <span className={styles.symbol}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </span>
                    </span>{' '}
                  </span>
                );
              }

              if (cleanWord === 'experience' || cleanWord === 'experiences') {
                return (
                  <span key={index}>
                    <ExperienceWord word={word} />{' '}
                  </span>
                );
              }

              if (cleanWord === 'architecture') {
                return (
                  <span key={index}>
                    <span
                      className={`${styles.word} ${styles.architectureWord}`}
                    >
                      <span className={styles.inner}>{word}</span>
                    </span>{' '}
                  </span>
                );
              }

              if (cleanWord === 'pixel') {
                return (
                  <span key={index}>
                    <span className={`${styles.word} ${styles.pixelWord}`}>
                      {word}
                    </span>{' '}
                  </span>
                );
              }

              if (cleanWord === 'statement') {
                // If it ends with a period, separate it
                const hasPeriod = word.endsWith('.');
                return (
                  <span key={index}>
                    <span className={styles.word}>
                      {word.replace('.', '')}
                      {hasPeriod && (
                        <span className={styles.bouncingPeriod}>.</span>
                      )}
                    </span>{' '}
                  </span>
                );
              }

              if (cleanWord === 'stop') {
                return (
                  <span key={index}>
                    <span
                      className={`${styles.word} ${styles.symbolWord}`}
                      data-revealed="false"
                    >
                      <span className={styles.text}>{word}</span>
                      <span className={styles.symbol}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                        </svg>
                      </span>
                    </span>{' '}
                  </span>
                );
              }

              if (cleanWord === 'feel') {
                return (
                  <span key={index}>
                    <FeelWord word={word} />{' '}
                  </span>
                );
              }

              return (
                <span key={index}>
                  <span className={styles.word}>{word}</span>{' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
