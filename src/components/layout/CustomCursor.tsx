'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center the cursor correctly regardless of its dynamic width/height
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3' });

    let activeMagneticElement: HTMLElement | null = null;
    let activeTextElement: HTMLElement | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (activeMagneticElement) {
        // Magnetic Pull: the cursor moves slightly towards the mouse, but stays bounded
        const rect = activeMagneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center of element to mouse
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        // Move the cursor 30% of the way towards the mouse from the center
        xTo(centerX + dx * 0.3);
        yTo(centerY + dy * 0.3);
      } else {
        xTo(e.clientX);
        yTo(e.clientY);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const magneticElement = target.closest('[data-magnetic="true"]') as HTMLElement;
      const textElement = target.closest('[data-cursor-text]') as HTMLElement;

      if (magneticElement && magneticElement !== activeMagneticElement) {
        activeMagneticElement = magneticElement;
        activeTextElement = null;
        
        const rect = magneticElement.getBoundingClientRect();
        gsap.to(cursor, { 
          width: rect.width + 16, 
          height: rect.height + 16, 
          borderRadius: '12px', 
          duration: 0.3,
          ease: 'power2.out'
        });
        
        if (textRef.current) {
          gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
        }
      } 
      else if (textElement && textElement !== activeTextElement) {
        activeTextElement = textElement;
        activeMagneticElement = null;
        
        const text = textElement.getAttribute('data-cursor-text');
        if (textRef.current) textRef.current.innerText = text || '';
        
        gsap.to(cursor, { 
          width: 90, 
          height: 90, 
          borderRadius: '50%',
          duration: 0.3,
          ease: 'power2.out'
        });
        if (textRef.current) {
          gsap.to(textRef.current, { opacity: 1, duration: 0.3, delay: 0.1 });
        }
      } 
      else if (!magneticElement && !textElement && (activeMagneticElement || activeTextElement)) {
        // Reset to default state
        activeMagneticElement = null;
        activeTextElement = null;
        
        gsap.to(cursor, { 
          width: 16, 
          height: 16, 
          borderRadius: '50%', 
          duration: 0.3,
          ease: 'power2.out'
        });
        if (textRef.current) {
          gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  return (
    <div 
      ref={cursorRef} 
      className={styles.cursor}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div ref={textRef} className={styles.cursorText}></div>
    </div>
  );
}
