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
];

export default function Work() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a scale-down effect for each card as the next one scrolls over it
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const isLastCard = i === cardsRef.current.length - 1;
        
        if (!isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            animation: gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              y: -50,
              ease: 'none',
            }),
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="c-work-section" id="work">
      <div className="c-work__header">
        <h2 className="c-work__wordmark">WORKS</h2>
        <p className="c-work__tagline">
          Things I’ve built, <br /> shaped and shipped.
        </p>
      </div>

      <div className="c-work__stack">
        {PROJECTS.map((project, index) => (
          <div
            key={project.name}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="c-work__card"
            style={{ 
              // Stacking offsets: each card sticks slightly lower than the last
              top: `calc(15vh + ${index * 20}px)` 
            }}
          >
            <div className="c-work__card-inner">
              <div
                className="c-work__card-image-wrap"
                style={{
                  backgroundImage: `url("${project.blurDataUrl}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <img
                  className="c-work__card-image"
                  src={project.url}
                  alt={`${project.name} — Design Project by Gokul Kannan`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <div className="c-work__card-meta">
                <h3 className="c-work__card-title">{project.name}</h3>
                <span className="c-work__card-type">{project.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
