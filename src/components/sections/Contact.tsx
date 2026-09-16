'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';

type Phase =
  | 'IDLE'
  | 'SCROLLING'
  | 'EXPANDING'
  | 'TEXT_SCROLLING'
  | 'FORM_ACTIVE'
  | 'CLOSING';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState<Phase>('IDLE');

  const originRef = useRef<{
    titleTop: number;
    titleLeft: number;
    titleWidth: number;
    btnCenterX: number;
    btnCenterY: number;
  }>({
    titleTop: 0,
    titleLeft: 0,
    titleWidth: 0,
    btnCenterX: 0,
    btnCenterY: 0,
  });

  // Magnetic button effect
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
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
    },
    [isHovered, phase],
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const runDialogueAnimation = () => {
    if (!buttonRef.current || !overlayRef.current || !titleRef.current) return;

    // Lock scroll
    document.body.style.overflow = 'hidden';
    if ((window as any).lenis) (window as any).lenis.stop();

    setPhase('EXPANDING');

    // Dispatch async to prevent any React render layout shifts from interfering with GSAP setup
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('contact-open'));
    }, 0);

    // Reset any magnetic translation on the button
    gsap.set(buttonRef.current, { x: 0, y: 0 });

    // 1. Measure EVERYTHING first, before mutating any layout!
    const btnRect = buttonRef.current.getBoundingClientRect();
    const titleRect = titleRef.current.getBoundingClientRect();
    const line1Old = line1Ref.current?.getBoundingClientRect();
    const line2Old = line2Ref.current?.getBoundingClientRect();

    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    originRef.current = {
      titleTop: titleRect.top,
      titleLeft: titleRect.left,
      titleWidth: titleRect.width,
      btnCenterX,
      btnCenterY,
    };

    // 2. Now apply layout-altering properties
    gsap.set(overlayRef.current, {
      x: btnCenterX,
      y: btnCenterY,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1,
      display: 'block',
    });

    // Fix button to viewport at its exact current location so it doesn't jump
    gsap.set(buttonRef.current, {
      position: 'fixed',
      top: btnRect.top,
      left: btnRect.left,
      width: btnRect.width,
      height: btnRect.height,
      margin: 0,
      zIndex: 10,
    });

    // Hide default button
    gsap.to(buttonRef.current, { opacity: 0, duration: 0.3 });

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('FORM_ACTIVE');
      },
    });

    // 1. Expand overlay
    tl.to(overlayRef.current, {
      scale: 25,
      duration: 1.2,
      ease: 'power4.inOut',
    });

    // 2. Fix title to viewport at its exact current location
    gsap.set(titleRef.current, {
      position: 'fixed',
      top: titleRect.top,
      left: titleRect.left,
      width: titleRect.width,
      margin: 0,
      zIndex: 50,
    });

    tl.add(() => setPhase('TEXT_SCROLLING'), '-=0.3');

    // Remove the line break (combine into one line) right as it starts moving
    tl.add(() => {
      const br = titleRef.current?.querySelector('br');
      if (br) br.style.display = 'none';
      const space = titleRef.current?.querySelector('.titleSpace');
      if (space) (space as HTMLElement).style.display = 'inline';

      gsap.set(titleRef.current, { width: 'auto', whiteSpace: 'nowrap' });

      // Animate the merge smoothly manually
      if (line1Ref.current && line2Ref.current && line1Old && line2Old) {
        const line1New = line1Ref.current.getBoundingClientRect();
        const line2New = line2Ref.current.getBoundingClientRect();
        const currentScale =
          (gsap.getProperty(titleRef.current, 'scale') as number) || 1;

        gsap.fromTo(
          line1Ref.current,
          {
            x: (line1Old.left - line1New.left) / currentScale,
            y: (line1Old.top - line1New.top) / currentScale,
          },
          { x: 0, y: 0, duration: 1.0, ease: 'power3.inOut' },
        );
        gsap.fromTo(
          line2Ref.current,
          {
            x: (line2Old.left - line2New.left) / currentScale,
            y: (line2Old.top - line2New.top) / currentScale,
          },
          { x: 0, y: 0, duration: 1.0, ease: 'power3.inOut' },
        );
      }
    }, '-=1.0');

    // First, shrink and move left
    tl.to(
      titleRef.current,
      {
        left: '4vw',
        scale: 0.8,
        duration: 0.6,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      },
      '-=1.0',
    );

    // Then move to top
    tl.to(
      titleRef.current,
      {
        top: '4vh',
        scale: 0.5,
        duration: 0.8,
        ease: 'power3.inOut',
      },
      '-=0.2',
    );
  };

  const handleStartDialogue = () => {
    if (phase !== 'IDLE') return;

    const section = sectionRef.current;
    if (!section) {
      runDialogueAnimation();
      return;
    }

    // Check if section is currently aligned with the viewport
    const sectionRect = section.getBoundingClientRect();
    const isAligned = Math.abs(sectionRect.top) < 15;

    if (!isAligned) {
      setPhase('SCROLLING');
      let executed = false;
      const runOnce = () => {
        if (executed) return;
        executed = true;
        runDialogueAnimation();
      };

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(section, {
          duration: 0.5,
          onComplete: runOnce,
        });
        setTimeout(runOnce, 600); // Fallback in case onComplete doesn't fire
      } else {
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(runOnce, 500);
      }
    } else {
      runDialogueAnimation();
    }
  };

  const closeForm = () => {
    if (phase !== 'FORM_ACTIVE' && phase !== 'TEXT_SCROLLING') return;
    setPhase('CLOSING');

    const closeTl = gsap.timeline({
      onComplete: () => {
        if (titleRef.current) {
          gsap.set(titleRef.current, { clearProps: 'all' });
          const br = titleRef.current.querySelector('br');
          if (br) br.style.display = '';
          const space = titleRef.current.querySelector('.titleSpace');
          if (space) (space as HTMLElement).style.display = 'none';
        }

        // Critical: preserve display: inline-block so bounding rects work for next open
        if (line1Ref.current) {
          gsap.set(line1Ref.current, { clearProps: 'transform,x,y' });
          line1Ref.current.style.display = 'inline-block';
        }
        if (line2Ref.current) {
          gsap.set(line2Ref.current, { clearProps: 'transform,x,y' });
          line2Ref.current.style.display = 'inline-block';
        }

        if (buttonRef.current) {
          gsap.set(buttonRef.current, { clearProps: 'all' });
        }

        if (overlayRef.current) {
          gsap.set(overlayRef.current, {
            display: 'none',
            scale: 0,
            clearProps: 'all',
          });
        }

        setPhase('IDLE');
        document.body.style.overflow = ''; // Unlock scrolling
        if ((window as any).lenis) (window as any).lenis.start(); // Start Lenis scroll

        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('contact-close'));
        }, 0);
      },
    });

    // 1. Move title back from 4vh down to originRef.current.titleTop
    if (titleRef.current && originRef.current.titleTop) {
      closeTl.to(
        titleRef.current,
        {
          top: originRef.current.titleTop,
          scale: 0.8,
          duration: 0.8,
          ease: 'power3.inOut',
        },
        0,
      );

      // 2. Move title from left: 4vw back to originRef.current.titleLeft and scale: 1
      closeTl.to(
        titleRef.current,
        {
          left: originRef.current.titleLeft,
          scale: 1,
          duration: 0.6,
          ease: 'power2.inOut',
          transformOrigin: 'left center',
        },
        1.0,
      );

      // 3. Split the single line back into two lines in motion!
      closeTl.add(() => {
        if (!titleRef.current || !line1Ref.current || !line2Ref.current) return;

        const line1Before = line1Ref.current.getBoundingClientRect();
        const line2Before = line2Ref.current.getBoundingClientRect();

        const br = titleRef.current.querySelector('br');
        if (br) br.style.display = '';
        const space = titleRef.current.querySelector('.titleSpace');
        if (space) (space as HTMLElement).style.display = 'none';

        titleRef.current.style.width = originRef.current.titleWidth
          ? `${originRef.current.titleWidth}px`
          : '';
        titleRef.current.style.whiteSpace = '';

        const line1After = line1Ref.current.getBoundingClientRect();
        const line2After = line2Ref.current.getBoundingClientRect();
        const currentScale =
          (gsap.getProperty(titleRef.current, 'scale') as number) || 1;

        gsap.fromTo(
          line1Ref.current,
          {
            x: (line1Before.left - line1After.left) / currentScale,
            y: (line1Before.top - line1After.top) / currentScale,
          },
          { x: 0, y: 0, duration: 1.0, ease: 'power3.inOut' },
        );
        gsap.fromTo(
          line2Ref.current,
          {
            x: (line2Before.left - line2After.left) / currentScale,
            y: (line2Before.top - line2After.top) / currentScale,
          },
          { x: 0, y: 0, duration: 1.0, ease: 'power3.inOut' },
        );
      }, 0.6);
    }

    // 4. Shrink overlay back to button center
    if (overlayRef.current) {
      closeTl.to(
        overlayRef.current,
        {
          scale: 0,
          duration: 1.2,
          ease: 'power4.inOut',
        },
        0.6,
      );
    }

    // 5. Fade button back in
    if (buttonRef.current) {
      closeTl.to(
        buttonRef.current,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        1.5,
      );
    }
  };

  return (
    <section ref={sectionRef} className={styles.contact} id="contact">
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.title}>
          <span ref={line1Ref} style={{ display: 'inline-block' }}>
            Let's build something
          </span>
          <br />
          <span className="titleSpace" style={{ display: 'none' }}>
            &nbsp;
          </span>
          <span ref={line2Ref} style={{ display: 'inline-block' }}>
            people remember.
          </span>
        </h2>

        <button
          ref={buttonRef}
          onClick={handleStartDialogue}
          className={styles.centerpieceBtn}
          style={{ pointerEvents: phase === 'IDLE' ? 'auto' : 'none' }}
        >
          <span className={styles.btnText}>
            Start The
            <br />
            Dialogue
          </span>
        </button>
      </div>

      {/* Full screen overlay */}
      <div ref={overlayRef} className={styles.fullscreenOverlay} />

      {/* Form Sequence */}
      <AnimatePresence>
        {phase === 'FORM_ACTIVE' && <ContactForm onComplete={closeForm} />}
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
