'use client';

import { motion } from 'framer-motion';
import styles from './Process.module.css';
import { processSteps } from '@/lib/data';

export default function Process() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          HOW I WORK
        </motion.h2>
      </div>

      <div className={styles.grid}>
        {processSteps.map((step, index) => (
          <motion.div 
            key={step.id} 
            className={styles.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
          >
            <span className={styles.stepNumber}>{step.id}</span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className={styles.footerLine}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, delay: 0.5, ease: [0.2, 0, 0, 1] }}
      >
        "Because the last 5% is usually where the experience becomes memorable."
      </motion.div>
    </section>
  );
}
