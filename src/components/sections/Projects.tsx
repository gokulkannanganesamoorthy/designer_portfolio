'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Projects.module.css';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section className={styles.container} id="projects">
      <div className={styles.header}>
        <h2 className="editorial-subheading">Selected Works</h2>
      </div>

      <div className={styles.projectList}>
        {projects.map((project, index) => (
          <motion.a 
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            key={project.id} 
            className={styles.projectRow}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          >
            <div className={styles.projectId}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className={`${styles.projectTitle} serif`}>
              {project.title}
            </h3>
            <div className={styles.projectCategory}>
              {project.category}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
