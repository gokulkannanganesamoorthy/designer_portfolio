'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Process.module.css';
import { processSteps } from '@/lib/data';

function Card({ step, index, total }: { step: any; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"] // Track when the card reaches the top sticky position
  });

  // Calculate top offset for stacking effect
  const topOffset = `calc(20vh + ${index * 20}px)`;

  // As subsequent cards arrive, this card should scale down slightly and darken
  // Since we don't have a global scroll tracking array easily here, we'll use a local trick:
  // We track the scroll progress of *this* card container reaching the top.
  // Actually, for a true stack effect, it's better to track a parent container, but this local approach works for simple overlapping.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - ((total - index) * 0.02)]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div className={styles.cardWrapper} style={{ top: topOffset }}>
      <motion.div 
        className={styles.card}
        style={{ scale }}
      >
        <span className={styles.stepNumber}>{step.id}</span>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>
      </motion.div>
    </div>
  );
}

export default function Process() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>HOW I WORK</h2>
      </div>

      <div className={styles.cardsContainer}>
        {processSteps.map((step, index) => (
          <Card key={step.id} step={step} index={index} total={processSteps.length} />
        ))}
      </div>
    </section>
  );
}
