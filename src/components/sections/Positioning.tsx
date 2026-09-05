'use client';

import { motion } from 'framer-motion';
import styles from './Positioning.module.css';
import { positioning } from '@/lib/data';

export default function Positioning() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <motion.h2 
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
        >
          {positioning.headline}
        </motion.h2>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          {positioning.description}
        </motion.p>
      </div>
    </section>
  );
}
