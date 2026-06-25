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
}: ProjectProps) {
  // We use Framer Motion's whileInView to trigger development
  return (
    <section className={styles.exhibition}>
      <motion.div 
        className={styles.imageContainer}
        initial="initial"
        whileInView="developed"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div 
          className={styles.photographicPaper}
          variants={{
            initial: { filter: "brightness(0.3) contrast(0.5) grayscale(100%)" },
            developed: { filter: "brightness(1) contrast(1) grayscale(0%)" }
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div 
        className={styles.typography}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.metadata}>
          <span className="mono">{role}</span>
          <span className={styles.dash}>—</span>
          <span className="mono">{year}</span>
        </div>
      </motion.div>
    </section>
  );
}
