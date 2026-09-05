'use client';

import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section className={styles.container} id="work">
      {projects.map((project, index) => (
        <div key={project.id} className={styles.projectWrapper}>
          
          <div className={styles.projectHeader}>
            <span className={styles.projectNumber}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <motion.h2 
              className={styles.projectTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            >
              {project.title}
            </motion.h2>
            <div className={styles.projectMeta}>
              <span className={styles.metaItem}>{project.category}</span>
              <span className={styles.metaItem}>{project.year}</span>
            </div>
          </div>

          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          >
            <div className={styles.imagePlaceholder}>[ CINEMATIC VISUAL HERE ]</div>
          </motion.div>

          <div className={styles.caseStudy}>
            <div className={styles.caseLeft}>
              <div className={styles.caseSection}>
                <h4 className={styles.caseTitle}>THE CHALLENGE</h4>
                <p className={styles.caseContent}>
                  {project.description}
                </p>
              </div>
              <div className={styles.caseSection}>
                <h4 className={styles.caseTitle}>ROLE</h4>
                <p className={styles.caseContent} style={{ fontFamily: "'SF Pro Display', sans-serif", fontSize: "1rem" }}>
                  {project.role}
                </p>
              </div>
            </div>
            
            <div className={styles.caseRight}>
              <div className={styles.caseSection}>
                <h4 className={styles.caseTitle}>THE INVISIBLE</h4>
                <p className={styles.caseContent}>
                  A deep obsession with timing, typography, and negative space to reframe how users perceive this brand.
                </p>
              </div>
            </div>
          </div>

        </div>
      ))}
    </section>
  );
}
