'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './ScrollStory.module.css';
import { scrollStory } from '@/lib/data';

export default function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });

  // Calculate the total number of items to evenly distribute the reveal
  const totalItems = scrollStory.length;

  return (
    <section className={styles.container} ref={containerRef} id="about">
      <div className={styles.stickyArea}>
        <div className={styles.textContent}>
          {scrollStory.map((item, index) => {
            // Calculate the specific scroll range for this item to appear
            const start = index / totalItems;
            const end = (index + 1) / totalItems;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [start - 0.1, end],
              [0.1, 1],
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [start - 0.1, end],
              [10, 0],
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [start - 0.1, end],
              [0.9, 1],
            );

            if (item.type === 'text') {
              return (
                <motion.span
                  key={index}
                  style={{ opacity, y }}
                  className={styles.tokenWrapper}
                >
                  {item.value}
                </motion.span>
              );
            } else if (item.type === 'image') {
              return (
                <motion.img
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  className={styles.inlineImage}
                  style={{
                    opacity,
                    scale,
                    rotate: useTransform(
                      scrollYProgress,
                      [start, end],
                      [-10, 0],
                    ),
                  }}
                />
              );
            }
            return null;
          })}
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBarContainer}>
          <motion.div
            className={styles.progressBar}
            style={{ scaleX: smoothProgress }}
          />
          <motion.div
            className={styles.progressKnob}
            style={{
              left: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            }}
          />
        </div>
      </div>
    </section>
  );
}
