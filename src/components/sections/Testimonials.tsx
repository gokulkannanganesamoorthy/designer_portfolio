'use client';

import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, wrap, useScroll, useVelocity, useSpring } from 'framer-motion';
import styles from './Testimonials.module.css';
import { testimonials } from '@/lib/data';

// We duplicate the testimonials a few times so the marquee seamlessly loops
const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll(); // to potentially tie speed to scroll
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const [isHovered, setIsHovered] = useState(false);
  const directionFactor = useRef<number>(-1);

  useAnimationFrame((t, delta) => {
    // base speed is 1. When hovered, slow it down to 0.2
    let moveBy = directionFactor.current * (isHovered ? 0.5 : 2) * (delta / 1000) * 100;

    // Add scroll velocity factor
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  // The wrap function bounds the x value. The range depends on the width of the content.
  // We'll estimate width based on card size. For production, measuring ref is better, but this works for fixed-ish sizes.
  const x = useTransform(baseX, (v) => `${wrap(-30, -60, v)}%`);

  return (
    <section className={styles.container}>
      <div 
        className={styles.marqueeContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div className={styles.marqueeContent} style={{ x }}>
          {marqueeItems.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className={styles.testimonialCard}
              whileHover={{ scale: 1.05, backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className={styles.quote}>"{testimonial.text}"</p>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{testimonial.name}</span>
                <span className={styles.authorRole}>{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Missing imports for useScroll, useVelocity in the file above. I will fix it.
