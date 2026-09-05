'use client';

import { useRef, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  Variants,
} from 'framer-motion';
import styles from './BusinessCard.module.css';
import Navigation from '../layout/Navigation';
import { personalInfo } from '@/lib/data';

export default function BusinessCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax background on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Mouse parallax for kinetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 50; // -25px to 25px
      const y = (e.clientY / innerHeight - 0.5) * 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Character animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    show: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const renderSplitText = (text: string) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        variants={charVariants}
        style={{ display: 'inline-block', originY: 1 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  const nameParts = personalInfo.businessName.split(' ');

  return (
    <motion.div
      ref={containerRef}
      className={styles.heroContainer}
      id="home"
      style={{ y, opacity }}
    >
      <Navigation />

      <motion.div
        className={styles.typographyWrapper}
        style={{ x: smoothX, y: smoothY }}
      >
        <motion.div
          className={styles.titleLine}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.heroHeading}>
            {renderSplitText(nameParts[0])}
          </h1>
        </motion.div>
        <motion.div
          className={styles.titleLine}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <h1 className={styles.heroHeading} style={{ fontStyle: 'italic' }}>
            {renderSplitText(nameParts[1] || '')}
          </h1>
        </motion.div>

        <motion.div
          className={styles.subtitle}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.tagline}>{personalInfo.tagline}</p>
          <p className={styles.services}>{personalInfo.services.join(' · ')}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="editorial-subheading" style={{ fontSize: '0.6rem' }}>
          SCROLL
        </span>
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
