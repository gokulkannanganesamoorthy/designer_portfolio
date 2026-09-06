'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from './ThemeToggle';
import styles from './BottomHUD.module.css';
import { motion } from 'framer-motion';

interface BottomHUDProps {
  delay?: number;
}

export default function BottomHUD({ delay = 0 }: BottomHUDProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <>
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3" 
        loop 
        preload="auto"
      />
      <motion.div 
        className={styles.hudContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.pill}>
          
          {/* Audio Toggle */}
          <button 
            className={styles.iconBtn} 
            onClick={toggleAudio}
            aria-label="Toggle Sound"
          >
            <div className={`${styles.equalizer} ${!isPlaying ? styles.paused : ''}`}>
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>
          </button>

          <div className={styles.divider} />

          {/* Theme Toggle from Uiverse */}
          <ThemeToggle />

        </div>
      </motion.div>
    </>
  );
}
