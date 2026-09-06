'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic button effect (much larger pull radius for the centerpiece)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!buttonRef.current || !sectionRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    const triggerDistance = 400; // Very large radius for this centerpiece

    if (dist < triggerDistance) {
      if (!isHovered) setIsHovered(true);
      
      const pullX = (e.clientX - btnCenterX) * 0.2;
      const pullY = (e.clientY - btnCenterY) * 0.2;
      
      gsap.to(buttonRef.current, {
        x: pullX,
        y: pullY,
        duration: 1,
        ease: 'power3.out',
      });
    } else {
      if (isHovered) {
        setIsHovered(false);
        gsap.to(buttonRef.current, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    }
  }, [isHovered]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section ref={sectionRef} className={styles.contact} id="contact">
      <div className={styles.container}>
        
        <h2 className={styles.title}>
          Let's build something<br/>people actually remember.
        </h2>
        
        <a 
          ref={buttonRef}
          href="mailto:hello@gokulmakes.in" 
          className={styles.centerpieceBtn}
        >
          <span className={styles.btnText}>Start The<br/>Dialogue</span>
        </a>

      </div>
    </section>
  );
}
