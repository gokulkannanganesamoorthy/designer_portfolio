'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

// Unified cinematic blur reveal variants across all hooks AND final hero text
const hookVariants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: 'blur(12px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: 'blur(12px)',
    transition: {
      duration: 0.6,
      ease: [0.2, 0, 0, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [linesFlown, setLinesFlown] = useState(false);
  const [linesHandedOver, setLinesHandedOver] = useState(false);

  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);

  const [flightPathTop, setFlightPathTop] = useState({
    x: [0, 0, 0] as (number | string)[],
    y: [0, 0, 0] as (number | string)[],
  });
  const [flightPathBottom, setFlightPathBottom] = useState({
    x: [0, 0, 0] as (number | string)[],
    y: [0, 0, 0] as (number | string)[],
  });

  const blockRef = useRef<HTMLDivElement>(null);
  const gRef = useRef<HTMLSpanElement>(null);
  const buttonCircleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const [arrowRevealed, setArrowRevealed] = useState(false);
  const [arrowFlying, setArrowFlying] = useState(false);
  const [arrowDocked, setArrowDocked] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [arrowPath, setArrowPath] = useState({
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
  });

  const [ctaVisible, setCtaVisible] = useState(false);
  const [ctaExpanded, setCtaExpanded] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const runSequence = () => {
    clearAllTimeouts();

    if (typeof window !== 'undefined') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }

    setPhase(0);
    setLinesFlown(false);
    setLinesHandedOver(false);
    setArrowRevealed(false);
    setArrowFlying(false);
    setArrowDocked(false);
    setCtaVisible(false);
    setCtaExpanded(false);
    setReplayKey((k) => k + 1);

    // Dispatch reset event for navigation
    window.dispatchEvent(new CustomEvent('hero-sequence-reset'));

    // 0.3s — "What if your digital presence felt different?"
    const t1 = setTimeout(() => setPhase(1), 300);
    // 2.4s — Hook fades/blurs away
    const t1_exit = setTimeout(() => setPhase(0), 2400);
    // 2.8s — "Let's make it."
    const t2 = setTimeout(() => setPhase(2), 2800);
    // 4.2s — Hook disappears
    const t2_exit = setTimeout(() => setPhase(0), 4200);
    // 4.4s — GOKUL MAKES reveals
    const t4 = setTimeout(() => setPhase(4), 4400);

    // Compute exact pixel coordinates and reveal small Arrow Mark on left of "G"
    const tArrowPrep = setTimeout(() => {
      const gRect = gRef.current?.getBoundingClientRect();
      const circleRect = buttonCircleRef.current?.getBoundingClientRect();
      const blockRect = blockRef.current?.getBoundingClientRect();

      if (gRect && circleRect && blockRect) {
        const startX = gRect.left - blockRect.left - 24;
        const startY = gRect.top - blockRect.top + gRect.height / 2;
        const targetX = circleRect.left - blockRect.left + circleRect.width / 2;
        const targetY = circleRect.top - blockRect.top + circleRect.height / 2;

        setArrowPath({
          startX,
          startY,
          dx: targetX - startX,
          dy: targetY - startY,
        });
      } else {
        setArrowPath({
          startX: -40,
          startY: 20,
          dx: 40,
          dy: 100,
        });
      }
      setArrowRevealed(true);
    }, 4500);

    // 5.5s — line/arrow animation launch
    const tLaunch = setTimeout(() => {
      const topTarget = document.getElementById('nav-line-top-target');
      const bottomTarget = document.getElementById('nav-line-bottom-target');
      const topRect = topTarget?.getBoundingClientRect();
      const bottomRect = bottomTarget?.getBoundingClientRect();

      const sourceTop = topLineRef.current?.getBoundingClientRect();
      const sourceBottom = bottomLineRef.current?.getBoundingClientRect();

      if (sourceTop) {
        const targetCenterX =
          topRect && topRect.width > 0
            ? topRect.left + topRect.width / 2
            : window.innerWidth - 60;
        const targetCenterY =
          topRect && topRect.height > 0 ? topRect.top + topRect.height / 2 : 50;

        const sourceCenterX = sourceTop.left + sourceTop.width / 2;
        const sourceCenterY = sourceTop.top + sourceTop.height / 2;

        const dx = targetCenterX - sourceCenterX;
        const dy = targetCenterY - sourceCenterY;

        setFlightPathTop({
          x: [0, dx, dx],
          y: [0, 0, dy],
        });
      }

      if (sourceBottom) {
        const targetCenterX =
          bottomRect && bottomRect.width > 0
            ? bottomRect.left + bottomRect.width / 2
            : window.innerWidth - 60;
        const targetCenterY =
          bottomRect && bottomRect.height > 0
            ? bottomRect.top + bottomRect.height / 2
            : 56;

        const sourceCenterX = sourceBottom.left + sourceBottom.width / 2;
        const sourceCenterY = sourceBottom.top + sourceBottom.height / 2;

        const dx = targetCenterX - sourceCenterX;
        const dy = targetCenterY - sourceCenterY;

        setFlightPathBottom({
          x: [0, dx, dx],
          y: [0, 0, dy],
        });
      }

      setLinesFlown(true);
      setArrowFlying(true);

      // 6.3s — CTA settles (800ms duration for flight)
      const tHandover = setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hero-sequence-done'));
        setLinesHandedOver(true);
        setCtaVisible(true);
      }, 800);

      // Arrow locks into the circle; expansion
      const tArrowDock = setTimeout(() => {
        setArrowDocked(true);
        setCtaExpanded(true);
      }, 950);

      timeoutsRef.current.push(tHandover, tArrowDock);
    }, 5500);

    timeoutsRef.current.push(t1, t1_exit, t2, t2_exit, t4, tArrowPrep, tLaunch);
  };

  useEffect(() => {
    setMounted(true);
    runSequence();
    return () => clearAllTimeouts();
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(contactSection, {
          offset: -30,
          duration: 1.2,
        });
      } else {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className={styles.heroContainer} id="hero">
      <div className={styles.wrapper}>
        {/* Hook Sequence */}
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="hook1"
              className={styles.hookContainer}
              variants={hookVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className={styles.hookText}>
                What if your digital presence felt different?
              </p>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="hook2"
              className={styles.hookContainer}
              variants={hookVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className={styles.hookText}>Let's make it.</p>
            </motion.div>
          )}

          {phase === 4 && (
            <div key="final" className={styles.finalHero}>
              {/* Top line (underscore) — reveals in-place, then flies right & up */}
              <motion.div
                ref={topLineRef}
                className={styles.heroLine}
                initial={{ width: 0, opacity: 0 }}
                animate={
                  linesFlown
                    ? {
                        width: 16,
                        opacity: linesHandedOver ? 0 : 1,
                        x: flightPathTop.x,
                        y: flightPathTop.y,
                      }
                    : { width: 60, opacity: 1, x: 0, y: 0 }
                }
                transition={
                  linesFlown
                    ? {
                        duration: 0.8, // 800ms flight
                        ease: [0.76, 0, 0.24, 1],
                        times: [0, 0.5, 1],
                      }
                    : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                }
                style={{
                  marginBottom: '1.25rem',
                  visibility: linesHandedOver ? 'hidden' : 'visible',
                  pointerEvents: linesHandedOver ? 'none' : 'auto',
                }}
              />

              {/* Text block: GOKUL MAKES — uses the EXACT same slow blur reveal as the 3 hooks */}
              <motion.div
                ref={blockRef}
                className={styles.heroTextBlock}
                variants={hookVariants}
                initial="initial"
                animate="animate"
              >
                {/* Intro Flying Arrow Mark:
                    Starts on the left side of "G" facing DOWN (90deg) at small scale (0.45),
                    descends vertically past subtitle, turns RIGHT towards CTA,
                    grows to full scale (1.0) and rotates from 90deg to 0deg (facing right)
                    as it lands precisely in the circle at the start (left) of the button */}
                {arrowRevealed && !arrowDocked && (
                  <motion.div
                    className={styles.flyingArrowWrap}
                    initial={{
                      opacity: 0,
                      x: arrowPath.startX,
                      y: arrowPath.startY,
                      rotate: 90,
                      scale: 0.45,
                    }}
                    animate={
                      arrowFlying
                        ? {
                            opacity: 1,
                            x: [
                              arrowPath.startX,
                              arrowPath.startX,
                              arrowPath.startX + arrowPath.dx,
                            ],
                            y: [
                              arrowPath.startY,
                              arrowPath.startY + arrowPath.dy,
                              arrowPath.startY + arrowPath.dy,
                            ],
                            rotate: [90, 90, 0],
                            scale: [0.45, 0.45, 1.0],
                          }
                        : {
                            opacity: 1,
                            x: arrowPath.startX,
                            y: arrowPath.startY,
                            rotate: 90,
                            scale: 0.45,
                          }
                    }
                    transition={
                      arrowFlying
                        ? {
                            duration: 0.8, // 800ms flight
                            ease: [0.76, 0, 0.24, 1],
                            times: [0, 0.5, 1],
                          }
                        : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                    }
                  >
                    <div className={styles.flyingArrowInner}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                        className={styles.arrowSvg}
                      >
                        <path
                          fill="currentColor"
                          d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}

                <h1 className={styles.title}>
                  <span ref={gRef} className={styles.gLetter}>
                    G
                  </span>
                  OKUL MAKES
                </h1>
                
                {/* 5.1s — subtitle appears (Phase 4 starts at 4.4s, so 0.7s delay) */}
                <motion.p 
                  className={styles.subtitle}
                  initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  Turning brands into experiences.
                </motion.p>

                {/* Bottom line (underscore) — immediately under "Turning brands into experiences." */}
                <motion.div
                  ref={bottomLineRef}
                  className={styles.heroLine}
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    linesFlown
                      ? {
                          width: 16,
                          opacity: linesHandedOver ? 0 : 1,
                          x: flightPathBottom.x,
                          y: flightPathBottom.y,
                        }
                      : { width: 60, opacity: 1, x: 0, y: 0 }
                  }
                  transition={
                    linesFlown
                      ? {
                          duration: 0.8, // 800ms flight
                          ease: [0.76, 0, 0.24, 1],
                          times: [0, 0.5, 1],
                        }
                      : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                  }
                  style={{
                    marginTop: '0.75rem',
                    visibility: linesHandedOver ? 'hidden' : 'visible',
                    pointerEvents: linesHandedOver ? 'none' : 'auto',
                  }}
                />

                {/* Uiverse "Let's Start" CTA with expanding right-side ')' edge reveal */}
                <div className={styles.ctaContainer}>
                  <div
                    style={{
                      opacity: ctaVisible ? 1 : 0,
                      transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      pointerEvents: ctaVisible ? 'auto' : 'none',
                    }}
                  >
                    <div className={styles.ctaAnchorBox}>
                      <a
                        ref={buttonRef}
                        href="#contact"
                        className={`${styles.letsStartBtn} ${
                          ctaExpanded ? styles.letsStartBtnExpanded : ''
                        }`}
                        onClick={handleCtaClick}
                        aria-label="Let's Start"
                      >
                        <div className={styles.trackWrapper}>
                          <div className={styles.trackSpacer} />
                          <div
                            ref={buttonCircleRef}
                            className={styles.buttonCircle}
                          >
                            <div className={styles.arrowIconWrap}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 16"
                                className={styles.arrowSvg}
                              >
                                <path
                                  fill="currentColor"
                                  d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <span className={styles.buttonLabel}>Let's Start</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Permanent Replay Intro Controller with majja entry & hover
        <motion.button
          key={replayKey}
          type="button"
          className={styles.replayController}
          onClick={runSequence}
          initial={{ opacity: 0, y: 32, x: '-50%', scale: 0.8, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1, filter: 'blur(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 18,
            delay: 0.6,
          }}
          whileHover={{ scale: 1.07, y: -3, x: '-50%' }}
          whileTap={{ scale: 0.93, y: 1, x: '-50%' }}
          aria-label="Replay Hero Sequence"
          title="Restart cinematic sequence"
        >

        </div></motion.button>*/}
      </div>
    </section>
  );
}
