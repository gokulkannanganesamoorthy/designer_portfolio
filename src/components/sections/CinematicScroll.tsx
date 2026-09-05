'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import styles from './CinematicScroll.module.css';

/* ────────────────────────────────────────────
   DATA — Your story, told through scroll
   ──────────────────────────────────────────── */

interface Token {
  type: 'text' | 'em' | 'brand' | 'break';
  value: string;
}

const storyTokens: Token[] = [
  { type: 'text', value: "Hello, I'm" },
  { type: 'brand', value: ' Gokul Kannan' },
  { type: 'break', value: '' },
  { type: 'text', value: 'Digital Experience Designer' },
  { type: 'text', value: ' & Founder of' },
  { type: 'em', value: ' Luno Tech.' },
  { type: 'break', value: '' },
  { type: 'text', value: 'I design the experiences' },
  { type: 'text', value: ' people' },
  { type: 'em', value: ' remember' },
  { type: 'text', value: ' — not just the ones they notice.' },
  { type: 'break', value: '' },
  { type: 'text', value: 'Every transition has weight.' },
  { type: 'text', value: ' Every pixel has intention.' },
  { type: 'text', value: ' Every interaction' },
  { type: 'em', value: ' has a reason to exist.' },
  { type: 'break', value: '' },
  { type: 'text', value: 'I work at the intersection of' },
  { type: 'em', value: ' strategy,' },
  { type: 'em', value: ' design' },
  { type: 'text', value: ' and' },
  { type: 'em', value: ' code' },
  {
    type: 'text',
    value:
      ' — building digital products for brands that care about how they are perceived.',
  },
];

/* ────────────────────────────────────────────
   INDIVIDUAL WORD COMPONENT
   Each word fades/translates in at its own
   scroll-mapped point
   ──────────────────────────────────────────── */

function Word({
  word,
  wordIndex,
  totalWords,
  scrollYProgress,
}: {
  word: string;
  wordIndex: number;
  totalWords: number;
  scrollYProgress: any;
}) {
  // Each word gets a tiny window in the scroll range to reveal
  const start = wordIndex / totalWords;
  const end = start + 1 / totalWords;

  const rawOpacity = useTransform(scrollYProgress, [start, end], [0.08, 1]);
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 30 });
  const rawY = useTransform(scrollYProgress, [start, end], [8, 0]);
  const y = useSpring(rawY, { stiffness: 200, damping: 30 });

  return (
    <motion.span className={styles.word} style={{ opacity, y }}>
      {word}
    </motion.span>
  );
}

/* ────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────── */

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Flatten tokens into individual words, keeping styling metadata
  const wordsWithMeta = useMemo(() => {
    const result: { word: string; type: Token['type'] }[] = [];
    storyTokens.forEach((token) => {
      if (token.type === 'break') {
        result.push({ word: '\n', type: 'break' });
        return;
      }
      token.value
        .split(' ')
        .filter(Boolean)
        .forEach((w) => {
          result.push({ word: w, type: token.type });
        });
    });
    return result;
  }, []);

  const totalWords = wordsWithMeta.filter((w) => w.type !== 'break').length;
  let wordCounter = 0;

  // Scroll progress indicator (the line at the bottom)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const springLineWidth = useSpring(lineWidth, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className={styles.outerContainer}>
      {/* The sticky viewport */}
      <div className={styles.stickyFrame}>
        {/* Top nav — minimal */}
        <nav className={styles.nav}>
          <span className={styles.navName}>Gokul Kannan</span>
          <div className={styles.navLinks}>
            <a
              href="https://linkedin.com/in/gokulkannanganesamoorthy"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/gokulmakes"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a href="mailto:hello@gokulmakes.in">Let's Talk</a>
          </div>
        </nav>

        {/* The scroll-reveal text */}
        <div className={styles.textContainer}>
          <p className={styles.storyText}>
            {wordsWithMeta.map((item, i) => {
              if (item.type === 'break') {
                return <br key={`br-${i}`} />;
              }

              const currentWordIndex = wordCounter;
              wordCounter++;

              return (
                <span
                  key={i}
                  className={
                    item.type === 'brand'
                      ? styles.brandWord
                      : item.type === 'em'
                        ? styles.emWord
                        : undefined
                  }
                >
                  <Word
                    word={item.word}
                    wordIndex={currentWordIndex}
                    totalWords={totalWords}
                    scrollYProgress={scrollYProgress}
                  />{' '}
                </span>
              );
            })}
          </p>
        </div>

        {/* Scroll progress line */}
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            style={{ width: springLineWidth }}
          />
        </div>
      </div>
    </section>
  );
}
