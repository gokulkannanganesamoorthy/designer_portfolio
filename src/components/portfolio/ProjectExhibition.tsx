"use client";

import { motion } from "framer-motion";
import styles from "./ProjectExhibition.module.css";

interface ProjectProps {
  title: string;
  description: string;
  role: string;
  year: string;
  layout?: "default" | "alt";
}

export default function ProjectExhibition({ 
  title, 
  description, 
  role, 
  year, 
  layout = "default" 
}: ProjectProps) {
  return (
    <section className={styles.exhibition} data-layout={layout}>
      <div className={styles.content}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
        >
          {/* Placeholder for Next.js Image component when assets are available */}
        </motion.div>

        <motion.div 
          className={styles.details}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.2, 0, 0, 1] }}
        >
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.metadata}>
            <div className={styles.metaItem}>
              <span className={`${styles.metaLabel} mono`}>Role</span>
              <span className={`${styles.metaValue} mono`}>{role}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={`${styles.metaLabel} mono`}>Year</span>
              <span className={`${styles.metaValue} mono`}>{year}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
