'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './Navigation.module.css';
import { navigationLinks as links } from '@/lib/data';

interface NavigationProps {
  delay?: number;
}

export default function Navigation({ delay = 0 }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.navContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay, ease: [0.2, 0, 0, 1] }}
    >
      <motion.nav
        className={styles.navPill}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', originX: 0, left: 20 }}
            >
              <motion.div
                className={styles.hamburgerLine}
                animate={{ x: isHovered ? 20 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className={styles.hamburgerLine}
                animate={{ x: isHovered ? -20 : 0, opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="links"
              className={styles.linksWrapper}
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              exit={{ width: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.ul
                style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: 100 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                itemScope 
                itemType="http://schema.org/SiteNavigationElement"
              >
                {links.map((link) => (
                  <li key={link.name} itemProp="name">
                    <Link
                      href={link.href}
                      className={styles.navItem}
                      itemProp="url"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}
