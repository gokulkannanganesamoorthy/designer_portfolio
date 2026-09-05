'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Clients.module.css';

const CLIENTS = [
  'Zerodha', 'Wild Stone', 'SuperYou', 'Jukku',
  'Beyond Snack', 'Vijay Sales', 'Prink', 'Cycle Pure',
  'Zerodha', 'Wild Stone', 'SuperYou', 'Jukku' // Duplicated for seamless loop
];

export default function Clients() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Slow, elegant infinite marquee
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 35, // Much slower and calmer
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.clients} id="clients">
      <div className={styles.header}>
        <span className="mono-label">[04] Selected Partners</span>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.fadeLeft} />
        
        <div ref={marqueeRef} className={styles.marqueeTrack}>
          {CLIENTS.map((client, index) => (
            <div key={index} className={styles.marqueeItem}>
              <span className={styles.clientName}>{client}</span>
              <span className={styles.separator}>✦</span>
            </div>
          ))}
        </div>
        
        <div className={styles.fadeRight} />
      </div>
    </section>
  );
}
