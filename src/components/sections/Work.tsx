'use client';

import React, { useEffect, useRef, useCallback } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxInnerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const minTranslateRef = useRef(0);

  const updateBounds = useCallback(() => {
    if (!containerRef.current || !parallaxInnerRef.current) return;
    const containerW = containerRef.current.clientWidth;
    const contentW = parallaxInnerRef.current.scrollWidth;
    minTranslateRef.current = Math.min(0, -(contentW - containerW));
    targetXRef.current = Math.max(minTranslateRef.current, Math.min(0, targetXRef.current));
  }, []);

  const slideBy = useCallback((direction: -1 | 1) => {
    updateBounds();
    const containerW = containerRef.current?.clientWidth || 360;
    // Step roughly one column width
    const step = direction * Math.min(containerW * 0.78, 420);
    const minT = minTranslateRef.current;
    targetXRef.current = Math.max(minT, Math.min(0, targetXRef.current - step));
  }, [updateBounds]);

  useEffect(() => {
    const container = containerRef.current;
    const inner = parallaxInnerRef.current;
    if (!container || !inner) return;

    updateBounds();

    let animationFrameId: number;

    // --- Vertical Parallax on Scroll ---
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top;
      const speeds = [0.06, -0.04, 0.08, -0.05];

      colRefs.current.forEach((col, idx) => {
        if (col) {
          const speed = speeds[idx] || 0.05;
          col.style.transform = `translate3d(0, ${(progress * speed).toFixed(2)}px, 0)`;
        }
      });
    };

    // --- Mobile Touch Gestures ---
    let isTouching = false;
    let isHorizontalGesture: boolean | null = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTargetX = 0;
    let lastTouchX = 0;
    let lastTouchTime = 0;
    let touchVelocityX = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      updateBounds();
      isTouching = true;
      isHorizontalGesture = null;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTargetX = targetXRef.current;
      lastTouchX = touchStartX;
      lastTouchTime = performance.now();
      touchVelocityX = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouching || e.touches.length !== 1) return;
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const dx = clientX - touchStartX;
      const dy = clientY - touchStartY;

      if (isHorizontalGesture === null) {
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
          if (Math.abs(dx) >= Math.abs(dy)) {
            isHorizontalGesture = true;
          } else {
            isHorizontalGesture = false;
            isTouching = false;
            return;
          }
        } else {
          return;
        }
      }

      if (isHorizontalGesture) {
        if (e.cancelable) e.preventDefault();

        const now = performance.now();
        const dt = Math.max(now - lastTouchTime, 8);
        touchVelocityX = (clientX - lastTouchX) / dt;
        lastTouchX = clientX;
        lastTouchTime = now;

        const minT = minTranslateRef.current;
        let newX = touchStartTargetX + dx;
        // Rubber-band resistance if dragged past ends
        if (newX > 0) {
          newX = newX * 0.35;
        } else if (newX < minT) {
          newX = minT + (newX - minT) * 0.35;
        }
        targetXRef.current = newX;
      }
    };

    const onTouchEnd = () => {
      if (!isTouching) return;
      isTouching = false;

      if (isHorizontalGesture) {
        const minT = minTranslateRef.current;
        // Dampened momentum ("hydraulic soft-close furniture" feel)
        const cappedVelocity = Math.max(-2.2, Math.min(2.2, touchVelocityX));
        const projectedX = targetXRef.current + cappedVelocity * 180;
        targetXRef.current = Math.max(minT, Math.min(0, projectedX));
      }
    };

    // --- Desktop Mouse Drag ---
    let isMouseDown = false;
    let mouseStartX = 0;
    let mouseStartTargetX = 0;
    let lastMouseX = 0;
    let lastMouseTime = 0;
    let mouseVelocityX = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      updateBounds();
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartTargetX = targetXRef.current;
      lastMouseX = mouseStartX;
      lastMouseTime = performance.now();
      mouseVelocityX = 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const dx = e.clientX - mouseStartX;
      const now = performance.now();
      const dt = Math.max(now - lastMouseTime, 8);
      mouseVelocityX = (e.clientX - lastMouseX) / dt;
      lastMouseX = e.clientX;
      lastMouseTime = now;

      const minT = minTranslateRef.current;
      let newX = mouseStartTargetX + dx;
      if (newX > 0) {
        newX = newX * 0.3;
      } else if (newX < minT) {
        newX = minT + (newX - minT) * 0.3;
      }
      targetXRef.current = newX;
    };

    const onMouseUp = () => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const minT = minTranslateRef.current;
      const cappedVelocity = Math.max(-2, Math.min(2, mouseVelocityX));
      const projectedX = targetXRef.current + cappedVelocity * 180;
      targetXRef.current = Math.max(minT, Math.min(0, projectedX));
    };

    // --- Wheel / Trackpad horizontal swipe ---
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) > 1.5) {
        if (e.cancelable) e.preventDefault();
        updateBounds();
        const minT = minTranslateRef.current;
        // Dampened step
        const step = Math.sign(delta) * Math.min(Math.abs(delta), 90) * 0.9;
        targetXRef.current = Math.max(minT, Math.min(0, targetXRef.current - step));
      }
    };

    // --- RAF Animation Loop: Soft-Close Damping ---
    const tick = () => {
      const diff = targetXRef.current - currentXRef.current;
      // High-damping lerp factor for luxury soft-close cushion
      currentXRef.current += diff * 0.08;

      if (inner) {
        inner.style.transform = `translate3d(${currentXRef.current.toFixed(2)}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // Attach listeners
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    container.addEventListener('touchend', onTouchEnd, { passive: true });
    container.addEventListener('touchcancel', onTouchEnd, { passive: true });

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('wheel', onWheel, { passive: false });

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateBounds);

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchcancel', onTouchEnd);

      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      container.removeEventListener('wheel', onWheel);

      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBounds);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updateBounds]);

  return (
    <section ref={sectionRef} className="c-work-section" id="work">
      <div className="c-home">
        {/* Architectural Header with WORKS Wordmark, Tagline & Glide Arrows */}
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
          <div className="c-home__meta-col">
            <p className="c-home__tagline">
              A few things worth <br /> seeing.
            </p>
            <div className="c-home__nav-btns">
              <button
                type="button"
                onClick={() => slideBy(-1)}
                className="c-home__nav-btn"
                aria-label="Previous works"
                title="Slide left"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => slideBy(1)}
                className="c-home__nav-btn"
                aria-label="Next works"
                title="Slide right"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Staggered Parallax Gallery with Fluid Mobile Touch Swipe & Soft-Close Inertia */}
        <div
          ref={containerRef}
          className="c-home__parallax"
          data-lenis-prevent="true"
        >
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
                          draggable={false}
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
