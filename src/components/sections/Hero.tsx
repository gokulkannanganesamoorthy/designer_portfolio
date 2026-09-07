'use client';

import { useEffect, useState, useRef } from 'react';
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

  useEffect(() => {
    setMounted(true);

    // Sequence of intro hooks with smooth, responsive blur reveal cadence
    const t1 = setTimeout(() => setPhase(1), 200); // Hook 1: "Ready to elevate your digital presence?"
    const t2 = setTimeout(() => setPhase(2), 2000); // Hook 2: "Ready for your next digital experience?"
    const t3 = setTimeout(() => setPhase(3), 4000); // Hook 3: "Let’s begin"
    const t4 = setTimeout(() => setPhase(4), 6000); // Hook 4: "GOKUL MAKES" with 2 underscore lines

    // After GOKUL MAKES settles, fly the lines to the top right
    const t5 = setTimeout(() => {
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

      // Launch flight animation: moves right first, then moves up
      setLinesFlown(true);

      // Exactly when flight completes (1.0s), hand over to Navigation seamlessly
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('hero-sequence-done'));
        setLinesHandedOver(true);
      }, 1000);
    }, 7500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

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
                Ready to elevate your digital presence?
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
              <p className={styles.hookText}>Let's make it unforgettable.</p>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="hook3"
              className={styles.hookContainer}
              variants={hookVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <p className={styles.hookText}>Can we start?</p>
            </motion.div>
          )}

          {phase === 4 && (
            <div key="final" className={styles.finalHero}>
              {/* Top line (underscore) — reveals in-place, then flies right & up */}
              {!linesHandedOver && (
                <motion.div
                  ref={topLineRef}
                  className={styles.heroLine}
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    linesFlown
                      ? {
                          width: 16,
                          opacity: 1,
                          x: flightPathTop.x,
                          y: flightPathTop.y,
                        }
                      : { width: 60, opacity: 1, x: 0, y: 0 }
                  }
                  transition={
                    linesFlown
                      ? {
                          duration: 1.0,
                          ease: [0.76, 0, 0.24, 1],
                          times: [0, 0.55, 1],
                        }
                      : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                  }
                  style={{
                    marginBottom: '1.25rem',
                  }}
                />
              )}

              {/* Text block: GOKUL MAKES — uses the EXACT same slow blur reveal as the 3 hooks */}
              <motion.div
                className={styles.heroTextBlock}
                variants={hookVariants}
                initial="initial"
                animate="animate"
              >
                <h1 className={styles.title}>GOKUL MAKES</h1>
                <p className={styles.subtitle}>
                  Turning brands into experiences.
                </p>
              </motion.div>

              {/* Bottom line (underscore) — reveals in-place, then flies right & up */}
              {!linesHandedOver && (
                <motion.div
                  ref={bottomLineRef}
                  className={styles.heroLine}
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    linesFlown
                      ? {
                          width: 16,
                          opacity: 1,
                          x: flightPathBottom.x,
                          y: flightPathBottom.y,
                        }
                      : { width: 60, opacity: 1, x: 0, y: 0 }
                  }
                  transition={
                    linesFlown
                      ? {
                          duration: 1.0,
                          ease: [0.76, 0, 0.24, 1],
                          times: [0, 0.55, 1],
                        }
                      : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
                  }
                  style={{
                    marginTop: '1.25rem',
                  }}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
