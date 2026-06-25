'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Telemetry.module.css';

export default function Telemetry() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' LOCAL',
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`${styles.telemetry} mono`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
    >
      <div className={styles.dataRow}>
        <span>{time}</span>
      </div>
    </motion.div>
  );
}
