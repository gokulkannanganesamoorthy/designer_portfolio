'use client';

import React, { useEffect, useRef, useState } from 'react';
import './Work.css';

interface WorkItem {
  name: string;
  url: string;
  width: number;
  height: number;
}

interface GalleryColumn {
  col: number;
  items: WorkItem[];
}

const GALLERY_DATA: GalleryColumn[] = [
  {
    col: 1,
    items: [
      {
        name: 'Castella',
        url: '/assets/works/castella.png',
        width: 2880,
        height: 1800,
      },
      {
        name: 'GRE',
        url: '/assets/works/GRE.png',
        width: 2880,
        height: 1800,
      },
    ],
  },
  {
    col: 2,
    items: [
      {
        name: 'Luminary',
        url: '/assets/works/luminary.png',
        width: 2880,
        height: 1800,
      },
      {
        name: 'TAT',
        url: '/assets/works/tat2.png',
        width: 2880,
        height: 1800,
      },
    ],
  },
  {
    col: 3,
    items: [
      {
        name: 'Orrayson',
        url: '/assets/works/orrayson.png',
        width: 2880,
        height: 1800,
      },
      {
        name: 'Lexo',
        url: '/assets/works/lexo.png',
        width: 2880,
        height: 1800,
      },
    ],
  },
  {
    col: 4,
    items: [
      {
        name: 'Village Woods',
        url: '/assets/works/village-woods.png',
        width: 2880,
        height: 1800,
      },
      {
        name: 'TAT',
        url: '/assets/works/tat2.png',
        width: 2880,
        height: 1800,
      },
    ],
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxInnerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const manualOffsetRef = useRef(0);

  const scrollBy = (direction: 'left' | 'right') => {
    // Step by ~22vw per click
    const step = 22;
    const maxOffset = 0;
    const minOffset = -55; // max horizontal scroll range in vw

    if (direction === 'left') {
      manualOffsetRef.current = Math.min(maxOffset, manualOffsetRef.current + step);
    } else {
      manualOffsetRef.current = Math.max(minOffset, manualOffsetRef.current - step);
    }
    setCanScrollLeft(manualOffsetRef.current < 0);
    setCanScrollRight(manualOffsetRef.current > minOffset);
  };

  useEffect(() => {
    let mouseOffset = 0;
    let currentOffset = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      // Gentle subtle pan by up to +/- 3vw
      mouseOffset = normX * -3;
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top;
      const speeds = [0.06, -0.04, 0.08, -0.05, 0.07];

      colRefs.current.forEach((col, idx) => {
        if (col) {
          const speed = speeds[idx] || 0.05;
          col.style.transform = `translate3d(0, ${progress * speed}px, 0)`;
        }
      });
    };

    const tick = () => {
      const target = manualOffsetRef.current + mouseOffset;
      currentOffset += (target - currentOffset) * 0.08;
      if (parallaxInnerRef.current) {
        parallaxInnerRef.current.style.transform = `translate3d(${currentOffset}vw, 0, 0)`;
      }
      animationFrameId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="c-work-section" id="work">
      <div className="c-home">
        {/* Unified Architectural Header with WORKS Wordmark, Tagline & Controls */}
        <div className="c-home__header">
          <div className="c-home__logo-row">
            <h2 className="c-home__wordmark">WORKS</h2>
            <p className="c-home__tagline">
              A few things worth <br /> seeing.
            </p>
          </div>
          <div className="c-home__nav-btns">
            <button
              type="button"
              className={`c-home__nav-btn ${!canScrollLeft ? 'c-home__nav-btn--disabled' : ''}`}
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              aria-label="Previous work column"
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
              className={`c-home__nav-btn ${!canScrollRight ? 'c-home__nav-btn--disabled' : ''}`}
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              aria-label="Next work column"
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

        {/* Staggered Parallax Gallery */}
        <div className="c-home__parallax">
          <div ref={parallaxInnerRef} className="c-home__parallax-inner">
            <div className="c-home__gallery">
              {GALLERY_DATA.map((colData, colIndex) => (
                <div
                  key={colData.col}
                  ref={(el) => {
                    colRefs.current[colIndex] = el;
                  }}
                  className={`c-home__gallery-col c-home__gallery-col--${colData.col}`}
                  data-col={colData.col}
                >
                  {colData.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="c-home__gallery-item">
                      <div className="c-home__gallery-media-wrap">
                        <img
                          className="c-home__gallery-media"
                          src={item.url}
                          width={item.width}
                          height={item.height}
                          alt={`${item.name} — Design Project by Gokul Kannan`}
                          loading={
                            colIndex < 2 && itemIndex === 0 ? 'eager' : 'lazy'
                          }
                        />
                      </div>
                      <span className="c-home__gallery-item-name">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
