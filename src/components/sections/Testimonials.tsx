'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './Testimonials.module.css';

import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const step = testimonials.length > 1 ? 1 / (testimonials.length - 1) : 1;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine the active index based on scroll progress
    let closestIndex = 0;
    let minDistance = 1;
    
    testimonials.forEach((_, i) => {
      const distance = Math.abs(latest - (i * step));
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });
    
    setActiveIndex(closestIndex);
  });

  return (
    <section 
      ref={containerRef} 
      className={styles.container} 
      id="testimonials"
      style={{ height: `${testimonials.length * 100}vh` }}
    >
      <div className={styles.stickyWrapper}>
        {testimonials.map((testimonial, i) => {
          // Input range: when this item is active, it's at `i * step`
          const inputMap = testimonials.map((_, idx) => idx * step);
          
          // Opacity: 1 when active, 0 otherwise
          const outputOpacity = testimonials.map((_, idx) => idx === i ? 1 : 0);
          const opacity = useTransform(scrollYProgress, inputMap, outputOpacity);

          // Y-axis translation: comes up from bottom, stays pinned, goes up
          const outputY = testimonials.map((_, idx) => idx < i ? 50 : idx === i ? 0 : -50);
          const y = useTransform(scrollYProgress, inputMap, outputY);

          // Scale: starts slightly smaller, grows to 1
          const outputScale = testimonials.map((_, idx) => idx < i ? 0.95 : idx === i ? 1 : 1.05);
          const scale = useTransform(scrollYProgress, inputMap, outputScale);

          // Blur effect
          const outputBlur = testimonials.map((_, idx) => idx === i ? 0 : 5);
          const blurValue = useTransform(scrollYProgress, inputMap, outputBlur);
          const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

          return (
            <motion.div 
              key={testimonial.id}
              className={styles.quoteContainer}
              style={{
                opacity,
                y,
                scale,
                filter,
                pointerEvents: i === activeIndex ? 'auto' : 'none'
              }}
            >
              <h2 className={styles.quoteText}>
                "{testimonial.text}"
              </h2>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{testimonial.name}</span>
                <span className={styles.authorRole}>{testimonial.role}</span>
              </div>
            </motion.div>
          );
        })}

        <div className={styles.progressIndicator}>
          {testimonials.map((_, i) => (
            <div 
              key={i} 
              className={`${styles.progressDot} ${i === activeIndex ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
