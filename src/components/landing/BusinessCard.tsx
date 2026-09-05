'use client';

import { motion, Variants } from 'framer-motion';
import styles from './BusinessCard.module.css';
import Navigation from '../layout/Navigation';
import { personalInfo } from '@/lib/data';

export default function BusinessCard() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 40,
        damping: 15
      }
    }
  };

  return (
    <div className={styles.heroContainer} id="home">
      <Navigation />
      
      <motion.div 
        className={styles.typographyWrapper}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className={styles.titleLine}>
          <motion.h1 className="editorial-heading" variants={itemVariants}>
            {personalInfo.firstName}
          </motion.h1>
        </div>
        <div className={styles.titleLine}>
          <motion.h1 className="editorial-heading" variants={itemVariants}>
            {personalInfo.lastName}
          </motion.h1>
        </div>
        
        <motion.div className={styles.subtitle} variants={itemVariants}>
          <p className="editorial-subheading">{personalInfo.title}</p>
          <p className="editorial-subheading" style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
            Based in {personalInfo.location}
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="editorial-subheading" style={{ fontSize: '0.6rem' }}>SCROLL</span>
        <motion.div 
          className={styles.scrollDot}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
