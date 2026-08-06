'use client';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImmersiveShowcase.module.css';
import Projects from './Projects';

import InteractiveTunnel from '../showcase/InteractiveTunnel';

export default function ImmersiveShowcase() {
  const [activePane, setActivePane] = useState<'works' | 'experience' | null>(
    null,
  );

  useEffect(() => {
    let savedScroll = window.scrollY;

    if (activePane === 'experience') {
      // The TunnelScroll relies on GSAP ScrollTrigger against the window.
      // We must reset scroll to 0 so the timeline starts at the first item,
      // and allow body scrolling so the user can scrub the timeline.
      savedScroll = window.scrollY;
      window.scrollTo(0, 0);
      document.body.style.overflow = '';
    } else if (activePane === 'works') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      if (activePane === 'experience') {
        // Restore the scroll position when the modal closes
        window.scrollTo(0, savedScroll);
      }
    };
  }, [activePane]);

  return (
    <section className={styles.container}>
      <div className={styles.splitContainer}>
        {/* Left Pane: Works */}
        <motion.div
          layoutId="pane-works"
          className={`${styles.pane} ${styles.paneLeft}`}
          onClick={() => setActivePane('works')}
          whileHover="hover"
          transition={{ type: 'spring', bounce: 0.1, duration: 0.7 }}
        >
          <motion.div
            className={styles.paneBg}
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Live Miniature Preview for Works */}
          <div className={styles.previewGraphicWorks}>
            <div className={styles.miniatureWrapper}>
              <Projects isModal={true} isPreview={true} />
            </div>
          </div>
          <div className={styles.paneContent}>
            <h2 className={styles.paneTitle}>Selected Works</h2>
            <div className={styles.arrowIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Right Pane: Experience */}
        <motion.div
          layoutId="pane-experience"
          className={`${styles.pane} ${styles.paneRight}`}
          onClick={() => setActivePane('experience')}
          whileHover="hover"
          transition={{ type: 'spring', bounce: 0.1, duration: 0.7 }}
        >
          <motion.div
            className={styles.paneBg}
            variants={{ hover: { scale: 1.05 } }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* iMac Visual Preview for Experience */}
          <div className={styles.previewGraphic}>
            <div className={styles.imacContainer}>
              <div className={styles.imacBody}>
                <div className={styles.imacScreenBezel}>
                  <div className={styles.imacCamera}></div>
                  <div className={styles.imacScreen}>
                    <div className={styles.imacScreenContent}></div>
                  </div>
                </div>
                <div className={styles.imacChin}></div>
              </div>
              <div className={styles.imacStand}></div>
              <div className={styles.imacFoot}></div>
            </div>
          </div>
          <div className={styles.paneContent}>
            <h2 className={styles.paneTitle}>Experience</h2>
            <div className={styles.arrowIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modals */}
      <AnimatePresence>
        {activePane && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              layoutId={`pane-${activePane}`}
              className={styles.modalContent}
              style={{ borderRadius: 0, backgroundColor: '#000' }}
            >
              <button
                className={styles.closeBtn}
                onClick={() => setActivePane(null)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              {activePane === 'works' && (
                <div className={styles.scrollableContent}>
                  <div className={styles.projectsWrapper}>
                    <Projects isModal={true} />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Experience Tunnel at the root of the document to avoid layout conflicts with GSAP */}
      {activePane === 'experience' &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              minHeight: '100vh',
              zIndex: 99999,
              background: '#000',
            }}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setActivePane(null)}
              style={{ position: 'fixed', zIndex: 100000 }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <InteractiveTunnel
              projects={[
                {
                  id: 'luno',
                  year: 'Feb 2025 - Dec 2025',
                  role: 'Founder',
                  title: 'Founder',
                  company: 'Luno Tech',
                },
                {
                  id: 'orrayson',
                  year: 'Jan 2026 - Jul 2026',
                  role: 'Tech & Operations Associate',
                  title: 'Tech & Operations Associate',
                  company: 'Orrayson Studio',
                },
                {
                  id: 'tat',
                  year: 'Jun 2026 - Present',
                  role: 'Founding Member & Tech Head',
                  title: 'Founding Member & Tech Head',
                  company: 'TAT (The Ads Tag)',
                },
                {
                  id: 'indie',
                  year: 'Jun 2026 - Present',
                  role: 'Digital Experience Designer',
                  title: 'Digital Experience Designer',
                  company: 'Independent',
                },
              ]}
              zSpacing={2500}
              initialZ={4000}
            />
          </div>,
          document.body,
        )}
    </section>
  );
}
