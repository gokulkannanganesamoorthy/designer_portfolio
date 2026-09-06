'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  const isTweeningRef = useRef(false);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cards = Array.from(
      scrollContainerRef.current.querySelectorAll(`.${styles.folioCard}`),
    ) as HTMLElement[];
    if (!cards.length) return;

    const containerLeft =
      scrollContainerRef.current.getBoundingClientRect().left;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
    if (!isTweeningRef.current) {
      targetIndexRef.current = closestIndex;
    }
  };

  const slideToCard = (targetIdx: number) => {
    if (!scrollContainerRef.current) return;
    const cards = Array.from(
      scrollContainerRef.current.querySelectorAll(`.${styles.folioCard}`),
    ) as HTMLElement[];
    if (!cards.length) return;

    const clampedIdx = Math.max(0, Math.min(cards.length - 1, targetIdx));
    targetIndexRef.current = clampedIdx;

    const targetCard = cards[clampedIdx];
    if (!targetCard) return;

    const containerLeft =
      scrollContainerRef.current.getBoundingClientRect().left;
    const cardLeft = targetCard.getBoundingClientRect().left;
    const targetScroll =
      scrollContainerRef.current.scrollLeft + (cardLeft - containerLeft);

    isTweeningRef.current = true;

    // "like premium furniture, if you force close also it'll close slowly"
    // Power4.out hydraulic deceleration with 1.3s glide:
    gsap.to(scrollContainerRef.current, {
      scrollLeft: targetScroll,
      duration: 1.3,
      ease: 'power4.out',
      overwrite: 'auto',
      onUpdate: checkScroll,
      onComplete: () => {
        isTweeningRef.current = false;
        checkScroll();
      },
    });
  };

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

    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // Damped horizontal wheel / trackpad scrolling
    let wheelTarget = el.scrollLeft;
    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontal =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;

      e.preventDefault();
      const rawDelta = e.shiftKey ? e.deltaY : e.deltaX;

      // Soft-close compression of violent/fast movements:
      const sign = Math.sign(rawDelta);
      const mag = Math.abs(rawDelta);
      const dampenedDelta = sign * Math.min(mag * 0.65, 140);

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
        duration: 1.1,
        ease: 'power3.out',
        overwrite: 'auto',
        onUpdate: checkScroll,
        onComplete: () => {
          isTweeningRef.current = false;
          checkScroll();
        },
      });

      // Soft-close snap to nearest card when wheel scrolling rests:
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (!isTweeningRef.current) {
          slideToCard(targetIndexRef.current);
        }
      }, 200);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    // Drag-to-slide with luxury soft-close release:
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    const onPointerDown = (e: PointerEvent) => {
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
      checkScroll();
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
      el.removeEventListener('scroll', checkScroll);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      clearTimeout(wheelTimeout);
    };
  }, []);

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
