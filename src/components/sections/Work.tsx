'use client';

import React, { useEffect, useRef } from 'react';
import './Work.css';

interface GalleryItem {
  col: number;
  artist: string;
  images: {
    url: string;
    width: number;
    height: number;
    bg?: string;
  }[];
}

const GALLERY_DATA: GalleryItem[] = [
  {
    col: 1,
    artist: 'Beth Sternbaum',
    images: [
      {
        // Blue swimmer image matching reference Image 2
        url: 'https://www.datocms-assets.com/196616/1774484687-221112_nike-hydrostrong_5316.jpg?auto=format&q=90&w=750',
        width: 800,
        height: 1200,
        bg: '#1494c3',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779918226-beauty-model-photography-beth-sternbaum-la-nyc-52.jpg?auto=format&q=90&w=750',
        width: 760,
        height: 1140,
        bg: '#e0ae2e',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779918224-beauty-model-photography-beth-sternbaum-la-nyc-63.jpg?auto=format&q=90&w=750',
        width: 760,
        height: 1140,
        bg: '#b7744c',
      },
    ],
  },
  {
    col: 2,
    artist: 'Arturo Torres',
    images: [
      {
        // Light blue foam sculpture dress
        url: 'https://www.datocms-assets.com/196616/1777465143-20180623_foam_test_585.jpg?auto=format&q=90&w=750',
        width: 1143,
        height: 1600,
        bg: '#1e9d98',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779142866-arturo-torres-advertising-photographer-lifestyle-fashion-sports88.jpg?auto=format&q=90&w=750',
        width: 1500,
        height: 2048,
        bg: '#d0833b',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779142867-arturo-torres-advertising-photographer-lifestyle-fashion-sports13.jpg?auto=format&q=90&w=750',
        width: 1000,
        height: 1500,
        bg: '#c15e26',
      },
    ],
  },
  {
    col: 3,
    artist: 'Cera Hensley',
    images: [
      {
        // Pastel purple & peach still life cosmetics (peeks under 2nd V)
        url: 'https://www.datocms-assets.com/196616/1777466641-cera-hensley-beauty-photography-stilllife-cosmetics-21.jpg?auto=format&q=90&w=750',
        width: 2583,
        height: 3228,
        bg: '#a7a1cf',
      },
      {
        // Post Malone with white cowboy hat
        url: 'https://www.datocms-assets.com/196616/1778795295-quinn-gravier-advertising-photographer-portraits-celebrity45.jpg?auto=format&q=90&w=750',
        width: 5462,
        height: 8189,
        bg: '#cfac4c',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1778868514-cera-hensley-x-peaceout.jpg?auto=format&q=90&w=750',
        width: 1280,
        height: 1600,
        bg: '#baadd1',
      },
    ],
  },
  {
    col: 4,
    artist: 'Quinn Gravier',
    images: [
      {
        // The Weeknd in red jacket
        url: 'https://www.datocms-assets.com/196616/1782286850-photo-jan-07-2026-3-32-47-pm.jpg?auto=format&q=90&w=750',
        width: 5352,
        height: 6690,
        bg: '#a86649',
      },
      {
        // Person with arm on green tiles / chest tattoo
        url: 'https://www.datocms-assets.com/196616/1778772904-danielle-moore-phils-skincare-mens-beauty-portrait.jpg?auto=format&q=90&w=750',
        width: 1536,
        height: 2048,
        bg: '#904640',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1774484653-byrum-20200305-nike-basketball-studio-0416.jpg?auto=format&q=90&w=750',
        width: 880,
        height: 1200,
        bg: '#428e96',
      },
    ],
  },
  {
    col: 5,
    artist: 'Jason Kent',
    images: [
      {
        // Black and white editorial portrait
        url: 'https://www.datocms-assets.com/196616/1778795294-quinn-gravier-advertising-photographer-portraits-celebrity47.jpg?auto=format&q=90&w=750',
        width: 1024,
        height: 1545,
        bg: '#434343',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779144620-jonathan-mannion-hiphop-music-rap-photography-advertising-photographer-sports48.jpg?auto=format&q=90&w=750',
        width: 759,
        height: 1140,
        bg: '#c8b3b0',
      },
      {
        url: 'https://www.datocms-assets.com/196616/1779948864-jason-kent-beauty-photographer-la-nyc-still-life107.jpg?auto=format&q=90&w=750',
        width: 912,
        height: 1140,
        bg: '#df9d06',
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
              fill="#000000"
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
                  {colData.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="c-home__gallery-item">
                      <div
                        className="c-home__gallery-media-wrap"
                        style={{ backgroundColor: img.bg || '#ededed' }}
                      >
                        <img
                          className="c-home__gallery-media"
                          src={img.url}
                          width={img.width}
                          height={img.height}
                          alt={colData.artist}
                          loading={
                            colIndex < 3 && imgIndex === 0 ? 'eager' : 'lazy'
                          }
                        />
                      </div>
                      <span className="c-home__gallery-item-name">
                        {colData.artist}
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
