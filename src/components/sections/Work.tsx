'use client';

import React, { useEffect, useRef } from 'react';
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
        url: '/assets/works/tat.png',
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
        name: 'Luminary 2',
        url: '/assets/works/luminary2.png',
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
        name: 'TAT 2',
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

  useEffect(() => {
    let targetOffset = 0;
    let currentOffset = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      // Pan smoothly by up to +/- 5vw
      targetOffset = normX * -5;
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
      currentOffset += (targetOffset - currentOffset) * 0.07;
      if (parallaxInnerRef.current) {
        // Base translation is -9vw so Col 1 aligns perfectly touching the left of the ViV logo
        const totalX = -9 + currentOffset;
        parallaxInnerRef.current.style.transform = `translate3d(${totalX}vw, 0, 0)`;
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
        {/* ViV-Style Architectural Header with WORKS Wordmark & Tagline */}
        <div className="c-home__logo-row">
          <svg
            className="c-home__logo-svg"
            viewBox="0 0 620 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="WORKS"
          >
            <text
              x="0"
              y="125"
              fontFamily="var(--font-display), 'Space Grotesk', -apple-system, sans-serif"
              fontSize="160"
              fontWeight="700"
              letterSpacing="-0.04em"
              fill="currentColor"
            >
              WORKS
            </text>
          </svg>
          <p className="c-home__tagline">
            A few things worth <br /> seeing.
          </p>
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
