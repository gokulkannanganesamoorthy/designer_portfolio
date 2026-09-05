'use client';

import { motion } from 'framer-motion';
import styles from './Thinking.module.css';
import { articles } from '@/lib/data';

export default function Thinking() {
  return (
    <section className={styles.container} id="think">
      <div className={styles.header}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          THINKING
        </motion.h2>
      </div>

      <div className={styles.articleList}>
        {articles.map((article, index) => (
          <motion.div 
            key={index} 
            className={styles.articleRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0, 0, 1] }}
          >
            <h3 className={styles.articleTitle}>{article.title}</h3>
            <span className={styles.articleDate}>{article.date}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
