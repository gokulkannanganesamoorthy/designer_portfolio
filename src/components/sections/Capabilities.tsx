'use client';

import React, { useRef, useState, useEffect } from 'react';
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

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    const cardWidth = 480 + 28;
    const index = Math.min(
      CAPABILITIES.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth)),
    );
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 500;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

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
                <span className={styles.counterTotal}>
                  0{CAPABILITIES.length + 1}
                </span>
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
          <div ref={scrollContainerRef} className={styles.stripTrack}>
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

            {/* 04: CTA Invitation Card */}
            <div className={styles.endCapCard}>
              <div className={styles.cardHeader}>
                <span className={styles.endCapLabel}>[04 // NEXT STEP]</span>
                <span className={styles.largeIndex}>04</span>
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.endCapTitle}>Have an idea in mind?</h3>
                <p className={styles.endCapTagline}>
                  Let&apos;s turn your vision into an unfair digital advantage.
                </p>
                <p className={styles.endCapDesc}>
                  I take on a limited number of high-stakes builds per quarter. Direct collaboration from raw concept to finished flagship.
                </p>
              </div>

              <div className={styles.endCapFooter}>
                <a href="#contact" className={styles.endCapCta}>
                  <span>Initiate Dialogue</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
