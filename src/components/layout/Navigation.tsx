'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { navigationLinks } from '@/lib/data';

export default function Navigation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      className={styles.navContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.5, ease: [0.2, 0, 0, 1] }}
    >
      <div 
        className={styles.signature}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.sigCircle}>G</div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={styles.sigText}
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 'auto', opacity: 1, marginLeft: '1rem' }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              DESIGNING THE INVISIBLE.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ul className={styles.linksWrapper}>
        {navigationLinks.map((link) => (
          <li key={link.name} className={styles.navItem}>
            <Link href={link.href} className={styles.navLink}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <button className={styles.mobileMenuBtn}>
        MENU
      </button>
    </motion.header>
  );
}
