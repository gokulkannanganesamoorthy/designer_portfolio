'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { navigationLinks as links } from '@/lib/data';

interface NavigationProps {
  delay?: number;
}

const containerVariants = {
  hidden: { width: 0, opacity: 0 },
  show: {
    width: 'auto',
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 15 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: 15,
    transition: { duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

export default function Navigation({ delay = 8 }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() || 0;
    if (current > previous && current > 150) {
      setHidden(true); // Hide on scroll down
    } else {
      setHidden(false); // Show on scroll up
    }

    // Always make nav visible if user scrolls past hero
    if (current > 100 && !visible) {
      setVisible(true);
    }
  });

  useEffect(() => {
    // If page is refreshed when already scrolled down, show immediately
    if (typeof window !== 'undefined' && window.scrollY > 100) {
      setVisible(true);
      return;
    }

    // Hero sequence sends this event when the two underscore lines land in the top right
    const handleSequenceDone = () => {
      setVisible(true);
    };

    window.addEventListener('hero-sequence-done', handleSequenceDone);

    return () => {
      window.removeEventListener('hero-sequence-done', handleSequenceDone);
    };
  }, []);

  return (
    <motion.div
      className={styles.navContainer}
      animate={{ 
        y: hidden ? -100 : 0 
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        visibility: visible ? 'visible' : 'hidden',
      }}
    >
      <motion.nav
        className={styles.navPill}
        onHoverStart={() => {
          setIsHovered(true);
          window.dispatchEvent(new CustomEvent('nav-hover'));
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          window.dispatchEvent(new CustomEvent('nav-leave'));
        }}
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {/* The animated snake oval border — active whenever hovered, exactly 2 dashes (one per line) */}
        <svg className={styles.svgBorder}>
          <rect
            className={`${styles.animatedRect} ${isHovered ? styles.rectActive : ''}`}
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            rx="21.25"
            pathLength="100"
          />
        </svg>

        <AnimatePresence mode="wait">
          {!isHovered ? (
            <motion.div
              key="icon"
              className={styles.menuIcon}
              exit={{ opacity: 0, x: -10 }}
            >
              <motion.div
                id="nav-line-top-target"
                className={styles.hamburgerLine}
                animate={{ x: isHovered ? 20 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                id="nav-line-bottom-target"
                className={styles.hamburgerLine}
                animate={{ x: isHovered ? -20 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="links"
              className={styles.linksWrapper}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {links.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link href={link.href} className={styles.navItem}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}

