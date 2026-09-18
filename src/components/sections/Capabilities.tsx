'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Capabilities.module.css';

gsap.registerPlugin(ScrollTrigger);

interface CapabilityItem {
  num: string;
  title: string;
  tagline: string;
  description: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    num: '01',
    title: 'Experiences',
    tagline:
      'Websites Experiences, Portfolios, that make a brand feel different.',
    description:
      'Strategy, design, interaction and development - brought together into one experience.',
  },
  {
    num: '02',
    title: 'Systems',
    tagline: 'CRMs, dashboards and internal business platforms.',
    description:
      'No generic dashboards. No unnecessary features. Just a CRM shaped around for your people, process and growth.',
  },
  // {
  //   num: '03',
  //   title: 'Operations',
  //   tagline: 'The operating system, ERP, and automations behind your business.',
  //   description:
  //     'Finance, inventory, operations and workflows unified into a tailored, lightning-fast internal platform built for your business.',
  // },
];

export default function Capabilities() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const TOTAL_CARDS = 3;
  const targetIndexRef = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = scrollContainerRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Force strict CSS on the containers via GSAP to override ANY external stylesheets
      gsap.set(track, {
        display: 'flex',
        flexWrap: 'nowrap',
        width: 'fit-content',
        overflow: 'visible',
      });

      const wrapper = track.parentElement;
      if (wrapper) {
        gsap.set(wrapper, { overflow: 'hidden', width: '100%' });
      }

      // Calculate exact distance by summing children, totally avoiding scrollWidth bugs
      const getScrollAmount = () => {
        let totalWidth = 0;
        const children = Array.from(track.children) as HTMLElement[];
        children.forEach((child) => {
          totalWidth += child.offsetWidth + 24; // width + gap
        });

        // We need to move left by (totalWidth - viewport width) plus a little padding
        const amount = totalWidth - window.innerWidth + 120;
        return Math.max(0, amount);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          // Pin at the top so the title stays perfectly fixed at the top of the screen
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const estimatedIndex = Math.min(
              TOTAL_CARDS - 1,
              Math.max(0, Math.round(progress * (TOTAL_CARDS - 1))),
            );

            if (estimatedIndex !== targetIndexRef.current) {
              setActiveIndex(estimatedIndex);
              targetIndexRef.current = estimatedIndex;
            }

            setCanScrollLeft(progress > 0.01);
            setCanScrollRight(progress < 0.99);
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
      });

      // Crucial: Wait for fonts/images to layout before measuring
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, sectionRef);

    return () => ctx.revert();
  }, [TOTAL_CARDS]);

  const scrollTo = (direction: 'left' | 'right') => {
    const nextIdx =
      direction === 'right'
        ? Math.min(TOTAL_CARDS - 1, targetIndexRef.current + 1)
        : Math.max(0, targetIndexRef.current - 1);

    const st = ScrollTrigger.getAll().find(
      (t) => t.trigger === sectionRef.current,
    );
    if (st) {
      const start = st.start;
      const end = st.end;
      const progress = nextIdx / (TOTAL_CARDS - 1);
      const targetY = start + progress * (end - start);

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(targetY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.capabilitiesSection}
      id="capabilities"
    >
      <div className={styles.capabilities}>
        {/* ─── Storytelling Narrative Header ─── */}
        <div className={styles.header}>
          <div className={styles.headlineRow}>
            <div className={styles.logoRow}>
              <h2 className={styles.wordmark}>What Gokul Makes ?</h2>
              <p className={styles.tagline}>
                Two ways I turn ideas into <br /> useful digital experiences.
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

            {/* Card 04: Matching Light CTA Card */}
            <div
              className={`${styles.folioCard} ${styles.ctaCard}`}
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.largeIndex}>03</span>
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
