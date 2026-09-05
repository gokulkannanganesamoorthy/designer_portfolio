'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';
import { aboutContent } from '@/lib/data';

export default function About() {
  return (
    <section className={styles.container} id="about">
      <motion.div 
        className={styles.imageWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
      >
        <div className={styles.imagePlaceholder}>
          [ PORTRAIT IMAGE PLACEHOLDER ]
        </div>
      </motion.div>

      <div className={styles.textContent}>
        <motion.h2 
          className={styles.opening}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          {aboutContent.opening}
        </motion.h2>
        
        {aboutContent.paragraphs.map((text, i) => (
          <motion.p 
            key={i}
            className={styles.paragraph}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.2, 0, 0, 1] }}
          >
            {text}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
