'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './Capabilities.module.css';

interface CapabilityItem {
  num: string;
  title: string;
  tagline: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    num: '01',
    title: 'Digital Experiences',
    tagline: 'Websites that make a brand feel different.',
    description:
      'Strategy, design, interaction and development — brought together into one experience.',
  },
  {
    num: '02',
    title: 'CRM',
    tagline: 'Systems built around how your business actually works.',
    description:
      'No generic dashboards. No unnecessary features. Just a CRM shaped around your people, process and growth.',
  },
  {
    num: '03',
    title: 'ERP',
    tagline: 'The operating system behind your business.',
    description:
      'Finance, inventory, operations and workflows unified into a tailored, lightning-fast internal platform built to scale.',
  },
];

export default function Capabilities() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const TOTAL_CARDS = 4;
  const targetIndexRef = useRef(0);
  const activeIndexRef = useRef(0);
  const canScrollLeftRef = useRef(false);
  const canScrollRightRef = useRef(true);
  const isTweeningRef = useRef(false);

  // Fast, layout-reflow-free scroll check using mathematical offset calculation
  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    const canLeft = scrollLeft > 15;
    const canRight = scrollLeft < scrollWidth - clientWidth - 15;

    if (canLeft !== canScrollLeftRef.current) {
      canScrollLeftRef.current = canLeft;
      setCanScrollLeft(canLeft);
    }
    if (canRight !== canScrollRightRef.current) {
      canScrollRightRef.current = canRight;
      setCanScrollRight(canRight);
    }

    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 24; // width + gap
    const estimatedIndex = Math.min(
      TOTAL_CARDS - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth)),
    );

    if (estimatedIndex !== activeIndexRef.current) {
      activeIndexRef.current = estimatedIndex;
      setActiveIndex(estimatedIndex);
    }
    if (!isTweeningRef.current) {
      targetIndexRef.current = estimatedIndex;
    }
  }, [TOTAL_CARDS]);

  const slideToCard = useCallback((targetIdx: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const firstCard = el.firstElementChild as HTMLElement | null;
    if (!firstCard) return;

    const clampedIdx = Math.max(0, Math.min(TOTAL_CARDS - 1, targetIdx));
    targetIndexRef.current = clampedIdx;

    const cardWidth = firstCard.offsetWidth + 24;
    const targetScroll = clampedIdx * cardWidth;

    isTweeningRef.current = true;

    // Fast, buttery 120fps glide without layout thrashing
    gsap.to(el, {
      scrollLeft: targetScroll,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
      onComplete: () => {
        isTweeningRef.current = false;
        checkScroll();
      },
    });
  }, [TOTAL_CARDS, checkScroll]);

  const scrollTo = (direction: 'left' | 'right') => {
    const nextIdx =
      direction === 'right'
        ? Math.min(TOTAL_CARDS - 1, targetIndexRef.current + 1)
        : Math.max(0, targetIndexRef.current - 1);

    slideToCard(nextIdx);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();

    // Damped horizontal wheel / trackpad scrolling for desktop
    let wheelTarget = el.scrollLeft;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;

      e.preventDefault();
      const rawDelta = e.shiftKey ? e.deltaY : e.deltaX;

      const sign = Math.sign(rawDelta);
      const mag = Math.abs(rawDelta);
      const dampenedDelta = sign * Math.min(mag * 0.7, 120);

      const maxScroll = el.scrollWidth - el.clientWidth;
      wheelTarget = Math.max(
        0,
        Math.min(
          maxScroll,
          (isTweeningRef.current ? wheelTarget : el.scrollLeft) + dampenedDelta,
        ),
      );

      isTweeningRef.current = true;
      gsap.to(el, {
        scrollLeft: wheelTarget,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
        onComplete: () => {
          isTweeningRef.current = false;
          checkScroll();
        },
      });

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (!isTweeningRef.current) {
          slideToCard(targetIndexRef.current);
        }
      }, 180);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    // Desktop Mouse Drag (Touch devices use native hardware-accelerated scroll-snap)
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    const onPointerDown = (e: PointerEvent) => {
      // NEVER hijack touch on mobile — let native 120fps hardware scrolling work!
      if (e.pointerType === 'touch') return;
      if ((e.target as HTMLElement).closest('a, button')) return;

      isDown = true;
      startX = e.pageX;
      scrollStart = el.scrollLeft;
      hasDragged = false;
      gsap.killTweensOf(el);
      isTweeningRef.current = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = (x - startX) * 0.9;
      if (Math.abs(walk) > 5) hasDragged = true;
      el.scrollLeft = scrollStart - walk;
    };

    const onPointerUp = () => {
      if (!isDown) return;
      isDown = false;
      if (hasDragged) {
        slideToCard(targetIndexRef.current);
      }
    };

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      clearTimeout(wheelTimeout);
    };
  }, [checkScroll, slideToCard]);

  return (
    <section className={styles.capabilitiesSection} id="capabilities">
      <div className={styles.capabilities}>
        {/* ─── Storytelling Narrative Header ─── */}
        <div className={styles.header}>
          <div className={styles.headlineRow}>
            <div className={styles.logoRow}>
              <h2 className={styles.wordmark}>What can i do ?</h2>
              <p className={styles.tagline}>
                Three ways I turn ideas into <br /> useful digital experiences.
              </p>
            </div>

            {/* Architectural Progress & Nav Controls */}
            <div className={styles.navControls}>
              <div className={styles.counter}>
                <span className={styles.counterCurrent}>
                  0{activeIndex + 1}
                </span>
                <span className={styles.counterDivider}>/</span>
                <span className={styles.counterTotal}>0{TOTAL_CARDS}</span>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => scrollTo('left')}
                  disabled={!canScrollLeft}
                  className={`${styles.navBtn} ${!canScrollLeft ? styles.navBtnDisabled : ''}`}
                  aria-label="Previous panel"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('right')}
                  disabled={!canScrollRight}
                  className={`${styles.navBtn} ${!canScrollRight ? styles.navBtnDisabled : ''}`}
                  aria-label="Next panel"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3 Large Horizontal / Stacked Panels ─── */}
        <div className={styles.stripWrapper}>
          <div
            ref={scrollContainerRef}
            className={styles.stripTrack}
            data-lenis-prevent="true"
          >
            {CAPABILITIES.map((item, idx) => (
              <div
                key={item.num}
                className={`${styles.folioCard} ${activeIndex === idx ? styles.folioCardActive : ''}`}
                tabIndex={0}
              >
                {/* Card Top: Architectural Index & Code */}
                <div className={styles.cardHeader}>
                  <span className={styles.largeIndex}>{item.num}</span>
                </div>

                {/* Card Middle: Title, Sharp Tagline, and Body Description */}
                <div className={styles.cardBody}>
                  <h3 className={styles.disciplineTitle}>{item.title}</h3>
                  <p className={styles.disciplineTagline}>{item.tagline}</p>
                  <p className={styles.disciplineDesc}>{item.description}</p>
                </div>

                {/* Subtle Ambient Hover Border */}
                <div className={styles.cardAccentBorder} />
              </div>
            ))}

            {/* Card 04: Matching Light CTA Card */}
            <div
              className={`${styles.folioCard} ${styles.ctaCard}`}
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.largeIndex}>04</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.disciplineTitle}>
                  Let’s make something.
                </h3>
                <p className={styles.disciplineTagline}>
                  Have something in mind?
                </p>
                <p className={styles.disciplineDesc}>
                  Bring me the idea. Let's Make it real soon.
                  <br /> <br />I only work with selected projects where
                  thoughtful design and technology can make a real difference.
                </p>
              </div>

              <div className={styles.ctaFooter}>
                <a href="#contact" className={styles.ctaButton}>
                  <span>Start a conversation</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>

              <div className={styles.cardAccentBorder} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
