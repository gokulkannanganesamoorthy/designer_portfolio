'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './TheInvisible.module.css';
import { invisiblePrinciples } from '@/lib/data';

export default function TheInvisible() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.container} id="think">
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>THE INVISIBLE</h2>
        <p className={styles.sectionSubtitle}>
          The details people don't notice are often the details they remember.
        </p>
      </div>

      <div className={styles.list}>
        {invisiblePrinciples.map((principle, index) => {
          const isHovered = hoveredIndex === index;
          
          return (
            <div 
              key={principle.id} 
              className={styles.item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={styles.itemHeader}>
                <span className={styles.itemNumber}>{principle.id}</span>
                <h3 className={styles.itemTitle}>{principle.title}</h3>
              </div>
              
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    className={styles.itemContent}
                    initial={{ height: 0, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ height: 'auto', opacity: 1, filter: 'blur(0px)' }}
                    exit={{ height: 0, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className={styles.itemDescription}>
                      {principle.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
