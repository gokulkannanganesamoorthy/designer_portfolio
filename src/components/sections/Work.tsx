'use client';

import React, { useEffect, useRef, useState } from 'react';
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
    scatter: { top: '10%', left: '5%', rotation: -8, width: '32vw', zIndex: 1 },
  },
  {
    name: 'GRE',
    type: 'Corporate Website',
    url: '/assets/works/GRE.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABwAwCdASoUAA0APzmIulOvKSWisAgB4CcJaQAAWlb7sEYs03gA/tUJLLpmGOVe5Ks7ltWP73D0cQzhgAA=',
    scatter: { top: '45%', left: '10%', rotation: 6, width: '28vw', zIndex: 2 },
  },
  {
    name: 'Luminary',
    type: 'Web Application',
    url: '/assets/works/luminary.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAACwAwCdASoUAA0APzmGuVQvKSWjMAgB4CcJaQAD46oGeLO6Oe2F6AD+zs8VnXiREoCsFzYc9l1n6RIrvSiUIENnYSy//S7PRdrE2xzXbriLSnb8aW9Vm+v/SbV73RWlx/xUFcho8c+cAAAA',
    scatter: { top: '20%', left: '35%', rotation: -4, width: '35vw', zIndex: 3 },
  },
  {
    name: 'TAT',
    type: 'Mobile Application',
    url: '/assets/works/tat2.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACwAwCdASoUAA0APzmEuVOvKKWisAgB4CcJZwAAQb9BnBo/Vi+/oAD2vN3lkU67UzIGwhlZZHznYGp6cXQHHBpLEm81dXqRRWR1o+Dr8B+9REkEJ6icOzJ1JcM5OsqswsD5oCmthf2AvzU+tg/u4RxH+0VK9uNSqN0U2thhlsIxyUCb/Lv9U/KEYfYqcAAA',
    scatter: { top: '65%', left: '30%', rotation: -10, width: '25vw', zIndex: 4 },
  },
  {
    name: 'Orrayson',
    type: 'Brand Identity',
    url: '/assets/works/orrayson.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACwAwCdASoUAA0APzmIulQvKSWjMAgB4CcJaQAAW+1mwXzSRNvnsAD81eUbNN/TlLB6HA5i50BTrbdSyfrj8/n3gBF6BtgPQktJIdyfWQ4AAA==',
    scatter: { top: '15%', left: '68%', rotation: 8, width: '30vw', zIndex: 5 },
  },
  {
    name: 'Lexo',
    type: 'SaaS Dashboard',
    url: '/assets/works/lexo.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoUAAwAPzmGuVOvKSWisAgB4CcJQAALvgjZ77K9/NlEIAAA/t/mvhMbD45ZY7APcyj66yJBe8K0Tt+rgQ9T/ICpVir4vrr1WkEBKDv2zeET+hAgAAA=',
    scatter: { top: '55%', left: '60%', rotation: -6, width: '34vw', zIndex: 6 },
  },
  {
    name: 'Village Woods',
    type: 'Real Estate Platform',
    url: '/assets/works/village-woods.webp',
    blurDataUrl:
      'data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACQAwCdASoUAA0APzmGuVQvKSWjMAgB4CcJYwCdABR9jY0YkZ4AAP4G5AhM71laUXCGh8N9GzyCsn2XrBUSNnoPi6NvZa2l+NLDSgAA',
    scatter: { top: '35%', left: '20%', rotation: 12, width: '22vw', zIndex: 7 },
  },
  {
    name: 'Replica', // Renamed 8th item so it's not a duplicate name
    type: 'Design System',
    url: '/assets/works/tat2.webp', // Using existing asset
    blurDataUrl:
      'data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAACwAwCdASoUAA0APzmEuVOvKKWisAgB4CcJZwAAQb9BnBo/Vi+/oAD2vN3lkU67UzIGwhlZZHznYGp6cXQHHBpLEm81dXqRRWR1o+Dr8B+9REkEJ6icOzJ1JcM5OsqswsD5oCmthf2AvzU+tg/u4RxH+0VK9uNSqN0U2thhlsIxyUCb/Lv9U/KEYfYqcAAA',
    scatter: { top: '40%', left: '50%', rotation: 4, width: '26vw', zIndex: 8 },
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State to manage hover z-indexing dynamically
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state of cards (invisible, scaled down, translated down)
      gsap.set(cardsRef.current, {
        opacity: 0,
        scale: 0.5,
        y: 100,
      });

      // Create a timeline that pins the section and scrubs the animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%', // 400vh of scrolling to complete the reveal
          scrub: 1, // Smooth scrubbing
          pin: true, // Pin the section so it acts like a canvas
          anticipatePin: 1,
        },
      });

      // Animate each card one by one into the timeline
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        tl.to(
          card,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'back.out(1.7)', // Nice springy scatter effect
          },
          // Stagger the start times so they appear consecutively
          i * 0.5
        );
      });
      
      // Add a bit of padding at the end of the timeline so it holds the final state
      tl.to({}, { duration: 1 });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="c-work-section" id="work">
      {/* Absolute Header within the pinned section */}
      <div className="c-work__header">
        <h2 className="c-work__wordmark">WORKS</h2>
        <p className="c-work__tagline">
          Things I’ve built, <br /> shaped and shipped.
        </p>
      </div>

      {/* The blank canvas where cards will scatter in */}
      <div ref={containerRef} className="c-work__canvas">
        {PROJECTS.map((project, index) => {
          // If hovered, bring to front (e.g. zIndex 99) and remove rotation
          const isHovered = hoveredIndex === index;
          const currentZIndex = isHovered ? 99 : project.scatter.zIndex;
          const currentRotation = isHovered ? 0 : project.scatter.rotation;
          const currentScale = isHovered ? 1.05 : 1;

          return (
            <div
              key={project.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="c-work__scatter-card"
              style={{
                top: project.scatter.top,
                left: project.scatter.left,
                width: project.scatter.width,
                zIndex: currentZIndex,
                transform: `rotate(${currentRotation}deg) scale(${currentScale})`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="c-work__scatter-card-inner">
                <div
                  className="c-work__scatter-image-wrap"
                  style={{
                    backgroundImage: `url("${project.blurDataUrl}")`,
                  }}
                >
                  <img
                    className="c-work__scatter-image"
                    src={project.url}
                    alt={`${project.name} — Design Project by Gokul Kannan`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="c-work__scatter-meta">
                  <h3 className="c-work__scatter-title">{project.name}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
