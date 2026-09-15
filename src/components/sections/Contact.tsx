'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';

type Phase = 'IDLE' | 'EXPANDING' | 'TEXT_SCROLLING' | 'FORM_ACTIVE';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<Phase>('IDLE');
  
  // Magnetic button effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (phase !== 'IDLE') return; // Disable magnetic effect when active
    if (!buttonRef.current || !sectionRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    const triggerDistance = 400;

    if (dist < triggerDistance) {
      if (!isHovered) setIsHovered(true);
      const pullX = (e.clientX - btnCenterX) * 0.2;
      const pullY = (e.clientY - btnCenterY) * 0.2;
      gsap.to(buttonRef.current, { x: pullX, y: pullY, duration: 1, ease: 'power3.out' });
    } else {
      if (isHovered) {
        setIsHovered(false);
        gsap.to(buttonRef.current, { x: 0, y: 0, duration: 1.5, ease: 'elastic.out(1, 0.3)' });
      }
    }
  }, [isHovered, phase]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleStartDialogue = () => {
    if (phase !== 'IDLE') return;
    
    setPhase('EXPANDING');
    document.body.style.overflow = 'hidden'; // Fallback
    if ((window as any).lenis) (window as any).lenis.stop(); // Stop Lenis scroll
    
    if (!buttonRef.current || !overlayRef.current || !titleRef.current) return;
    
    const btnRect = buttonRef.current.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;
    
    // Position overlay exactly at button center
    gsap.set(overlayRef.current, {
      x: btnCenterX,
      y: btnCenterY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1,
      display: 'block'
    });
    
    // Hide default button
    gsap.to(buttonRef.current, { opacity: 0, duration: 0.3 });
    
    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('FORM_ACTIVE');
      }
    });
    
    // 1. Expand overlay (now white/bg color)
    tl.to(overlayRef.current, {
      scale: 25, 
      duration: 1.2,
      ease: 'power4.inOut'
    });
    
    // 2. Animate title (shrinks, moves left, then top)
    const titleRect = titleRef.current.getBoundingClientRect();
    
    // Fix title to the viewport so we can reliably animate it to the top-left
    gsap.set(titleRef.current, {
      position: 'fixed',
      top: titleRect.top,
      left: titleRect.left,
      width: titleRect.width,
      margin: 0,
      zIndex: 50,
    });

    tl.add(() => setPhase('TEXT_SCROLLING'), "-=0.3");

    // Remove the line break (combine into one line) right as it starts moving
    tl.add(() => {
      const br = titleRef.current?.querySelector('br');
      if (br) br.style.display = 'none';
      const space = titleRef.current?.querySelector('.titleSpace');
      if (space) (space as HTMLElement).style.display = 'inline';
      
      // We must unset the fixed width so it can expand to one line
      gsap.set(titleRef.current, { width: 'auto', whiteSpace: 'nowrap' });
    }, "-=1.0");
    
    // First, shrink and move left
    tl.to(titleRef.current, {
      left: '4vw', // padding/margin approximation
      scale: 0.8,
      duration: 0.6,
      ease: 'power2.inOut',
      transformOrigin: 'left center'
    }, "-=1.0");

    // Then move to top
    tl.to(titleRef.current, {
      top: '4vh',
      scale: 0.5,
      duration: 0.8,
      ease: 'power3.inOut'
    }, "-=0.2");
  };

  const closeForm = () => {
    // Quick reset
    gsap.to(overlayRef.current, { scale: 0, opacity: 0, duration: 0.6, ease: "power3.inOut" });
    gsap.to(buttonRef.current, { opacity: 1, duration: 0.6, delay: 0.3 });
    
    // Reset title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          if (titleRef.current) {
            titleRef.current.style.position = '';
            titleRef.current.style.zIndex = '';
            const br = titleRef.current.querySelector('br');
            if (br) br.style.display = '';
            const space = titleRef.current.querySelector('.titleSpace');
            if (space) (space as HTMLElement).style.display = 'none';
            gsap.set(titleRef.current, { clearProps: "all" });
          }
        }
      });
    }

    setPhase('IDLE');
    document.body.style.overflow = ''; // Unlock scrolling
    if ((window as any).lenis) (window as any).lenis.start(); // Start Lenis scroll
  };

  return (
    <section ref={sectionRef} className={styles.contact} id="contact">
      <div className={styles.container}>
        
        <h2 ref={titleRef} className={styles.title}>
          Let's build something<br/><span className="titleSpace" style={{display: 'none'}}> </span>people actually remember.
        </h2>
        
        <button 
          ref={buttonRef}
          onClick={handleStartDialogue}
          className={styles.centerpieceBtn}
          style={{ pointerEvents: phase === 'IDLE' ? 'auto' : 'none' }}
        >
          <span className={styles.btnText}>Start The<br/>Dialogue</span>
        </button>

      </div>
      
      {/* Full screen overlay */}
      <div 
        ref={overlayRef}
        className={styles.fullscreenOverlay}
      />
      
      {/* Form Sequence */}
      <AnimatePresence>
        {phase === 'FORM_ACTIVE' && (
          <ContactForm onComplete={closeForm} />
        )}
      </AnimatePresence>

      {/* Close Button */}
      <AnimatePresence>
        {(phase === 'TEXT_SCROLLING' || phase === 'FORM_ACTIVE') && (
          <motion.button
            className={styles.closeBtn}
            onClick={closeForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
      
    </section>
  );
}
