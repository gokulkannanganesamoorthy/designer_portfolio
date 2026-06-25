'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './BusinessCard.module.css';
import Navigation from '../layout/Navigation';
import GridBackground from './GridBackground';
import Telemetry from './Telemetry';
import Manifesto from './Manifesto';
import MicroscopicText from './MicroscopicText';
import Signature from './Signature';
import ObserverOverlay from './ObserverOverlay';

export default function BusinessCard() {
  const [isDeconstructed, setIsDeconstructed] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro this session
    if (sessionStorage.getItem("hasSeenIntro") === "true") {
      setIsDeconstructed(true);
      return;
    }

    // Wait 2.2 seconds before deconstructing
    const timer = setTimeout(() => {
      setIsDeconstructed(true);
      sessionStorage.setItem("hasSeenIntro", "true");
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const transitionConfig = {
    duration: 1.5,
    ease: [0.2, 0, 0, 1],
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.scene}
        data-state={isDeconstructed ? 'scattered' : 'card'}
      >
        <div className={styles.cardLayout}>
          {/* Name Block */}
          <motion.div
            layout
            transition={transitionConfig}
            className={styles.nameBlock}
          >
            <div className={styles.name}>
              <div>Gokul</div>
              <div>Kannan</div>
              <div>Ganesamoorthy</div>
            </div>
          </motion.div>

          {/* Title / Slogan */}
          <motion.div
            layout
            transition={transitionConfig}
            className={styles.title}
          >
            <div className={styles.titleText}>
              <div>Digital Experience</div>
              <div>Designer</div>
            </div>
          </motion.div>

          {/* Look Closer */}
          <motion.div
            layout
            transition={{ ...transitionConfig, delay: 0.2 }}
            className={`${styles.lookCloser}`}
            onDoubleClick={() => {
              setTimeout(() => setIsGridVisible((prev) => !prev), 400);
            }}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              style={{ transform: 'rotate(180deg)' }}
              className={`${styles.lookCloserText} mono`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              Look Closer
            </motion.div>
          </motion.div>

          {/* Dash */}
          <motion.div
            layout
            transition={transitionConfig}
            className={styles.dash}
          >
            <div className={styles.dashText}>—</div>
          </motion.div>
        </div>

        {/* Navigation fades in after scattering */}
        {isDeconstructed && (
          <>
            {isGridVisible && <GridBackground />}
            <Telemetry />
            <Manifesto />
            <MicroscopicText />
            <Navigation delay={0.4} />
            <Signature />
            <ObserverOverlay />
            
            {/* Replay Option */}
            <motion.button
              onClick={() => {
                sessionStorage.removeItem("hasSeenIntro");
                window.location.reload();
              }}
              className="mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              whileHover={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                position: "absolute",
                top: "var(--page-margin)",
                right: "var(--page-margin)",
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
                fontSize: "0.5rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                zIndex: 50,
              }}
            >
              [ REPLAY ]
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
