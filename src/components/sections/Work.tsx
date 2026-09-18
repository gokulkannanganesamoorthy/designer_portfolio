'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Work.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    name: 'Castella',
    type: 'E-Commerce Platform',
    url: '/assets/works/castella.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADQAwCdASoUAA0APzmEuVOvKKWisAgB4CcJYwAAOXDWVhGcsQV3UGAA+MIMVpaSeotx2RYKOraNOIZsC0Vsu9M5eW3XGs2EdEsy6Qp0NUg00kO/0sFZbLJDrpeuHv55A0QQrb5z+XkokUTIsiolJ0AA',
  },
  {
    name: 'GRE',
    type: 'Corporate Website',
    url: '/assets/works/GRE.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABwAwCdASoUAA0APzmIulOvKSWisAgB4CcJaQAAWlb7sEYs03gA/tUJLLpmGOVe5Ks7ltWP73D0cQzhgAA=',
  },
  {
    name: 'Luminary',
    type: 'Web Application',
    url: '/assets/works/luminary.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwAwCdASoUAA0APzmGuVQvKSWjMAgB4CcJaQAD46oGeLO6Oe2F6AD+zs8VnXiREoCsFzYc9l1n6RIrvSiUIENnYSy//S7PRdrE2xzXbriLSnb8aW9Vm+v/SbV73RWlx/xUFcho8c+cAAAA',
  },
  {
    name: 'TAT',
    type: 'Mobile Application',
    url: '/assets/works/tat2.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACwAwCdASoUAA0APzmEuVOvKKWisAgB4CcJZwAAQb9BnBo/Vi+/oAD2vN3lkU67UzIGwhlZZHznYGp6cXQHHBpLEm81dXqRRWR1o+Dr8B+9REkEJ6icOzJ1JcM5OsqswsD5oCmthf2AvzU+tg/u4RxH+0VK9uNSqN0U2thhlsIxyUCb/Lv9U/KEYfYqcAAA',
  },
  {
    name: 'Orrayson',
    type: 'Brand Identity',
    url: '/assets/works/orrayson.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoUAA0APzmIulQvKSWjMAgB4CcJaQAAW+1mwXzSRNvnsAD81eUbNN/TlLB6HA5i50BTrbdSyfrj8/n3gBF6BtgPQktJIdyfWQ4AAA==',
  },
  {
    name: 'Lexo',
    type: 'SaaS Dashboard',
    url: '/assets/works/lexo.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoUAAwAPzmGuVOvKSWisAgB4CcJQAALvgjZ77K9/NlEIAAA/t/mvhMbD45ZY7APcyj66yJBe8K0Tt+rgQ9T/ICpVir4vrr1WkEBKDv2zeET+hAgAAA=',
  },
  {
    name: 'Village Woods',
    type: 'Real Estate Platform',
    url: '/assets/works/village-woods.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAA0APzmGuVQvKSWjMAgB4CcJYwCdABR9jY0YkZ4AAP4G5AhM71laUXCGh8N9GzyCsn2XrBUSNnoPi6NvZa2l+NLDSgAA',
  },
  {
    name: 'Replica',
    type: 'Design System',
    url: '/assets/works/tat2.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACwAwCdASoUAA0APzmEuVOvKKWisAgB4CcJZwAAQb9BnBo/Vi+/oAD2vN3lkU67UzIGwhlZZHznYGp6cXQHHBpLEm81dXqRRWR1o+Dr8B+9REkEJ6icOzJ1JcM5OsqswsD5oCmthf2AvzU+tg/u4RxH+0VK9uNSqN0U2thhlsIxyUCb/Lv9U/KEYfYqcAAA',
  },
];

// Group into 4 columns to easily render the staggered matrix
// Col 1: idx 0, 4
// Col 2: idx 1, 5
// Col 3: idx 2, 6
// Col 4: idx 3, 7
const COLUMNS = [
  [PROJECTS[0], PROJECTS[4]],
  [PROJECTS[1], PROJECTS[5]],
  [PROJECTS[2], PROJECTS[6]],
  [PROJECTS[3], PROJECTS[7]],
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !matrixRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial state: all cards pushed down below viewport and invisible
      gsap.set(cardsRef.current, {
        y: '100vh',
        opacity: 0,
        scale: 0.95,
      });

      // 2. The Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%', // Lots of scroll room to reveal 8 items comfortably
          scrub: 1, // Smooth scrub
          pin: true,
          anticipatePin: 1,
        },
      });

      // 3. Sequentially animate items 0 to 7 (row by row)
      // Since we populated cardsRef in a way that index matches 0..7, we can just map through them.
      // Wait, we render column by column, so we need to sort the cardsRef array by project index to animate 0..7.
      // Actually, we can attach the data-index to the card and just iterate 0..7.
      const sortedCards = Array.from({ length: 8 }).map((_, i) =>
        cardsRef.current.find((el) => el?.getAttribute('data-index') === String(i))
      );

      sortedCards.forEach((card, i) => {
        if (!card) return;
        tl.to(
          card,
          {
            y: '0vh',
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            duration: 1,
          },
          i * 0.4 // Staggered start times for the scrub
        );
      });

      // Hold at the end
      tl.to({}, { duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="c-work-section" id="work">
      <div className="c-work__header">
        <h2 className="c-work__wordmark">WORKS</h2>
        <p className="c-work__tagline">
          Things I’ve built, <br /> shaped and shipped.
        </p>
      </div>

      <div ref={matrixRef} className="c-work__matrix">
        {COLUMNS.map((column, colIdx) => (
          <div key={colIdx} className={`c-work__matrix-col c-work__matrix-col--${colIdx + 1}`}>
            {column.map((project, rowIdx) => {
              // Calculate original global index (0 to 7) for sequential animation
              const globalIdx = rowIdx * 4 + colIdx;

              return (
                <div
                  key={project.name}
                  ref={(el) => {
                    // Just push them, we sort by data-index in the effect
                    if (el && !cardsRef.current.includes(el)) {
                      cardsRef.current.push(el);
                    }
                  }}
                  data-index={globalIdx}
                  className="c-work__matrix-card"
                >
                  <div className="c-work__matrix-card-inner">
                    <div
                      className="c-work__matrix-image-wrap"
                      style={{
                        backgroundImage: `url("${project.blurDataUrl}")`,
                      }}
                    >
                      <img
                        className="c-work__matrix-image"
                        src={project.url}
                        alt={`${project.name} — Design Project by Gokul Kannan`}
                        loading={globalIdx < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                    <div className="c-work__matrix-meta">
                      <h3 className="c-work__matrix-title">{project.name}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
