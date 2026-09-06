'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
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
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    x: 12,
    transition: { duration: 0.25, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

export default function Navigation({ delay = 8 }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (current) => {
    // On mobile, never hide the nav bar to eliminate scroll re-render jitter & lag
    if (isMobile) return;

    const previous = scrollY.getPrevious() || 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (current > 80 && !visible) {
      setVisible(true);
    }
  });

  useEffect(() => {
    const checkViewport = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Immediately visible on mobile or if already scrolled down
      if (mobile || window.scrollY > 80) {
        setVisible(true);
      }
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    const handleSequenceDone = () => {
      setVisible(true);
    };

    window.addEventListener('hero-sequence-done', handleSequenceDone);

    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('hero-sequence-done', handleSequenceDone);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileOpen]);

  const handleLinkClick = useCallback((href: string) => {
    setIsMobileOpen(false);
    setIsHovered(false);

    const target = document.querySelector(href);
    if (target) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(target, { offset: -30, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const handlePillClick = () => {
    if (isMobile) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsHovered((prev) => !prev);
    }
  };

  return (
    <>
      <motion.div
        className={styles.navContainer}
        animate={{
          y: !isMobile && hidden && !isMobileOpen ? -100 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          visibility: visible ? 'visible' : 'hidden',
        }}
      >
        <motion.nav
          className={styles.navPill}
          onClick={handlePillClick}
          onHoverStart={() => {
            if (!isMobile) {
              setIsHovered(true);
              window.dispatchEvent(new CustomEvent('nav-hover'));
            }
          }}
          onHoverEnd={() => {
            if (!isMobile) {
              setIsHovered(false);
              window.dispatchEvent(new CustomEvent('nav-leave'));
            }
          }}
          transition={{ duration: 0.2 }}
          aria-label="Navigation Menu"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handlePillClick();
            }
          }}
        >
          {/* The animated snake oval border on desktop hover */}
          {!isMobile && (
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
          )}

          <AnimatePresence mode="wait">
            {!isHovered || isMobile ? (
              <motion.div
                key="icon"
                className={styles.menuIcon}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  id="nav-line-top-target"
                  className={styles.hamburgerLine}
                  animate={{
                    rotate: isMobileOpen ? 45 : 0,
                    y: isMobileOpen ? 3.5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  id="nav-line-bottom-target"
                  className={styles.hamburgerLine}
                  animate={{
                    rotate: isMobileOpen ? -45 : 0,
                    y: isMobileOpen ? -3.5 : 0,
                  }}
                  transition={{ duration: 0.2 }}
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
                    <a
                      href={link.href}
                      className={styles.navItem}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </motion.div>

      {/* Luxury Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            data-lenis-prevent="true"
          >
            <div className={styles.mobileHeader}>
              <span className={styles.mobileBrand}>GOKUL KANNAN</span>
              <button
                type="button"
                className={styles.mobileCloseBtn}
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <nav className={styles.mobileNavLinks}>
              {links.map((link, idx) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    <span className={styles.mobileNavNum}>0{idx + 1}</span>
                    <span className={styles.mobileNavText}>{link.name}</span>
                  </a>
                </div>
              ))}
            </nav>

            <div className={styles.mobileFooter}>
              <p className={styles.mobileTagline}>Digital Experience Designer</p>
              <span className={styles.mobileStatus}>● Available for select projects</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
