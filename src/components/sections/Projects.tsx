'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Projects.module.css';
import { projects } from '@/lib/data';

function ProjectItem({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax the image slower than the text
  const yImage = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  // Rotate slightly for 3D effect
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  // Scale the text up as it enters
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div className={styles.projectItem} ref={ref}>
      <motion.div 
        className={styles.imageWrapper}
        style={{ y: yImage, rotate }}
        whileHover={{ scale: 0.95, transition: { duration: 0.4 } }}
      >
        {/* Replace with actual image */}
        <div className={styles.imagePlaceholder} style={{ backgroundColor: project.bgColor }}>
          [ {project.title.toUpperCase()} IMAGE ]
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.textWrapper}
        style={{ scale: textScale, y: textY }}
      >
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.meta}>{project.category} · {project.year}</p>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className={styles.container} id="work">
      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
