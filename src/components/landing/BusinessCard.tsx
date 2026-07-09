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

import { personalInfo } from '@/lib/data';

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

  const titleWords = personalInfo.role.split(' ');
  const titleLine1 = titleWords.slice(0, 2).join(' '); // "Digital Experience"
  const titleLine2 = titleWords.slice(2).join(' '); // "Designer"

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
            className={`${styles.nameBlock} ${styles.name}`}
          >
            <div className={styles.primaryName}>{personalInfo.firstName}</div>
            <div className={styles.primaryName}>{personalInfo.lastName}</div>
            <div className={styles.surname}>{personalInfo.title}</div>
          </motion.div>

          {/* Title / Slogan */}
          <motion.div
            layout
            transition={transitionConfig}
            className={styles.title}
          >
            <div className={styles.titleText}>
              <div>{titleLine1}</div>
              <div>{titleLine2}</div>
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
            {isDeconstructed && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  sessionStorage.removeItem("hasSeenIntro");
                  window.location.reload();
                }}
                className="mono"
                initial={{ backgroundPosition: "0% -100%" }}
                animate={{ backgroundPosition: "0% 200%" }}
                transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
                style={{
                  position: "absolute",
                  top: 0,
                  right: "1.5rem",
                  background: "linear-gradient(180deg, #b0b0b0 20%, #000 50%, #b0b0b0 80%)",
                  backgroundSize: "100% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  border: "none",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  padding: 0,
                  margin: 0,
                  whiteSpace: "nowrap",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed"
                }}
              >
                [ REPLAY ]
              </motion.button>
            )}
            
            <motion.div
              className={`${styles.lookCloserText} mono`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            >
              {personalInfo.manifestoText}
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
          </>
        )}
      </div>
    </div>
  );
}
