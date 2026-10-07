'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// SVG Definitions for all shapes with perfectly uniform wireframe strokes (strokeWidth="1")
const AmpersandSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 19.5c-1.3 1.3-3.2 1.8-5 1.2-2.2-.8-3.5-3.1-2.7-5.3.7-1.8 2.3-2.9 3.7-4.3 1.5-1.5 1.8-3.7.6-5.1-1.3-1.5-3.5-1.4-4.6.2-1 1.5-.6 3.4.7 4.7L17 20" />
    <line x1="8" y1="16" x2="13.5" y2="15" />
  </svg>
);

const AtSignSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);

const InfinitySVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.18 8c5.1 0 5.1 8 0 8-3.06 0-4.97-4-6.18-4-1.2 0-3.12 4-6.18 4-5.1 0-5.1-8 0-8 3.06 0 4.97 4 6.18 4 1.2 0 3.12-4 6.18-4z" />
  </svg>
);

const AsteriskSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="4.2" y1="7.5" x2="19.8" y2="16.5" />
    <line x1="4.2" y1="16.5" x2="19.8" y2="7.5" />
  </svg>
);

const HashSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="9" x2="20" y2="9" />
    <line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" />
    <line x1="16" y1="3" x2="14" y2="21" />
  </svg>
);

const BracketsSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2-2 2 1 0 2 .5 2 2v2c0 2 1 3 3 3" />
    <path d="M16 4c2 0 3 1 3 3v2c0 1.5 1 2 2 2-1 0-2 .5-2 2v2c0 2-1 3-3 3" />
  </svg>
);

const QuestionMarkSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 9a3 3 0 0 1 5.5 1.5c0 2-3 2.8-3 4.2" />
    <circle cx="12" cy="18.5" r="0.75" />
  </svg>
);

const SlashesSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="20" x2="13" y2="4" />
    <line x1="12" y1="20" x2="18" y2="4" />
  </svg>
);

const SectionSymSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5.5a3.5 3.5 0 0 0-7 0c0 2.5 3.5 3.5 3.5 5a2.5 2.5 0 0 1-5 0" />
    <path d="M9 18.5a3.5 3.5 0 0 0 7 0c0-2.5-3.5-3.5-3.5-5a2.5 2.5 0 0 1 5 0" />
  </svg>
);

const Num01SVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="8" height="14" rx="4" />
    <path d="M17 5v14" />
    <path d="M14 8l3-3" />
  </svg>
);

const ArrowSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="10 5 19 5 19 14" />
  </svg>
);

const TildeSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12c2.5-4 5.5-4 8 0s5.5 4 8 0" />
  </svg>
);

const HeartSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ConcentricCirclesSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const DiamondSquareSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" />
    <polygon points="12 4 20 12 12 20 4 12" />
  </svg>
);

const PillArrowSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="20" rx="4" />
    <path d="M12 22v-8" />
    <path d="M9 17l3-3 3 3" />
  </svg>
);

const HalfCircleSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12 A 10 10 0 0 1 22 12 Z" />
  </svg>
);

const CursorArrowSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l6.5 16 2.5-6.5 6.5-2.5L4 4z" />
    <line x1="13" y1="13" x2="19" y2="19" />
  </svg>
);

const PlusSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

const GlobeSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="4.5" ry="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M4.5 7.5h15" />
    <path d="M4.5 16.5h15" />
  </svg>
);

const EyeSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SmileySVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="9" y1="9" x2="9" y2="10" />
    <line x1="15" y1="9" x2="15" y2="10" />
    <path d="M7.5 14.5a5 5 0 0 0 9 0" />
  </svg>
);

const PenToolSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L3 17l4 4 15-9-10-10z" />
    <circle cx="12" cy="11" r="2" />
    <path d="M3 17l3 3" />
  </svg>
);

const Cube3DSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 21 7.2 12 12.4 3 7.2 12 2" />
    <polygon points="3 7.2 12 12.4 12 22 3 16.8 3 7.2" />
    <polygon points="12 12.4 21 7.2 21 16.8 12 22 12 12.4" />
  </svg>
);

const CrosshairSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="1" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="23" />
    <line x1="1" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="23" y2="12" />
  </svg>
);

const FlowerBadgeSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4-4z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

const LightningSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 11 14 10 22 21 9 13 9 13 2" />
  </svg>
);

const CommandKeySVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 9a3 3 0 1 0-3-3v3h-6V6a3 3 0 1 0-3 3h3v6H6a3 3 0 1 0 3 3v-3h6v3a3 3 0 1 0 3-3h-3V9h3z" />
  </svg>
);

const SparkleSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 7.52 7.52 12 2 12c5.48 0 9.95 4.48 10 10 .05-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" />
  </svg>
);

const TagCodeSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const SpiralSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12a1 1 0 0 0 1-1 2 2 0 0 0-2-2 3 3 0 0 0-3 3 4 4 0 0 0 4 4 5 5 0 0 0 5-5 6 6 0 0 0-6-6 7 7 0 0 0-7 7 8 8 0 0 0 8 8" />
  </svg>
);

// All 32 shapes are wireframe SVGs with identical strokeWidth="1"
const SHAPES_CONFIG = [
  // Creative Typographic Wireframe SVGs
  { id: 'amp-1', component: AmpersandSVG, size: 85, shape: 'circle' as const },
  { id: 'at', component: AtSignSVG, size: 85, shape: 'circle' as const },
  { id: 'infinity', component: InfinitySVG, size: 85, shape: 'rectangle' as const, width: 95, height: 60 },
  { id: 'asterisk-1', component: AsteriskSVG, size: 85, shape: 'circle' as const },
  { id: 'hash', component: HashSVG, size: 80, shape: 'rectangle' as const, width: 80, height: 80 },
  { id: 'bracket', component: BracketsSVG, size: 80, shape: 'rectangle' as const, width: 85, height: 70 },
  { id: 'question', component: QuestionMarkSVG, size: 85, shape: 'circle' as const },
  { id: 'slashes', component: SlashesSVG, size: 80, shape: 'rectangle' as const, width: 80, height: 70 },
  { id: 'section-sym', component: SectionSymSVG, size: 85, shape: 'circle' as const },
  { id: 'num-01', component: Num01SVG, size: 80, shape: 'rectangle' as const, width: 85, height: 65 },
  { id: 'arrow-glyph', component: ArrowSVG, size: 80, shape: 'rectangle' as const, width: 80, height: 80 },
  { id: 'tilde', component: TildeSVG, size: 85, shape: 'rectangle' as const, width: 90, height: 50 },

  // Vector Wireframe Symbols
  { id: 'globe', component: GlobeSVG, size: 95, shape: 'circle' as const },
  { id: 'heart', component: HeartSVG, size: 85, shape: 'circle' as const },
  { id: 'star', component: StarSVG, size: 85, shape: 'circle' as const },
  { id: 'eye', component: EyeSVG, size: 85, shape: 'rectangle' as const, width: 95, height: 70 },
  { id: 'smiley', component: SmileySVG, size: 85, shape: 'circle' as const },
  { id: 'circles', component: ConcentricCirclesSVG, size: 90, shape: 'circle' as const },
  { id: 'diamond', component: DiamondSquareSVG, size: 85, shape: 'rectangle' as const },
  { id: 'pill', component: PillArrowSVG, size: 80, shape: 'rectangle' as const, width: 55, height: 110 },
  { id: 'halfcircle', component: HalfCircleSVG, size: 85, shape: 'circle' as const },
  { id: 'cursor', component: CursorArrowSVG, size: 80, shape: 'circle' as const },
  { id: 'plus', component: PlusSVG, size: 75, shape: 'circle' as const },
  { id: 'pentool', component: PenToolSVG, size: 80, shape: 'rectangle' as const, width: 80, height: 80 },
  { id: 'cube', component: Cube3DSVG, size: 85, shape: 'circle' as const },
  { id: 'crosshair', component: CrosshairSVG, size: 85, shape: 'circle' as const },
  { id: 'flower', component: FlowerBadgeSVG, size: 85, shape: 'circle' as const },
  { id: 'lightning', component: LightningSVG, size: 80, shape: 'rectangle' as const, width: 65, height: 95 },
  { id: 'cmd', component: CommandKeySVG, size: 80, shape: 'circle' as const },
  { id: 'sparkle', component: SparkleSVG, size: 85, shape: 'circle' as const },
  { id: 'tagcode', component: TagCodeSVG, size: 80, shape: 'rectangle' as const, width: 85, height: 70 },
  { id: 'spiral', component: SpiralSVG, size: 85, shape: 'circle' as const },
];

export default function PhysicsShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [isInView, setIsInView] = useState(false);
  const simulationStarted = useRef(false);

  // Setup intersection observer to start simulation only when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || simulationStarted.current || !containerRef.current) return;
    simulationStarted.current = true;

    const engine = engineRef.current;
    const world = engine.world;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create boundaries (walls + floor)
    const wallOptions = { isStatic: true, render: { visible: false } };
    
    // We raise the floor (y = height - 50) so elements rest completely above the container border
    const floor = Matter.Bodies.rectangle(width / 2, height - 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2 - 300, 100, height * 4, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2 - 300, 100, height * 4, wallOptions);
    Matter.World.add(world, [floor, leftWall, rightWall]);

    // Create bodies
    const slotWidth = width / SHAPES_CONFIG.length;
    const newBodies = SHAPES_CONFIG.map((config, index) => {
      // Spread across viewport width evenly with slight organic jitter
      const x = Math.max(
        40,
        Math.min(width - 40, slotWidth * (index + 0.5) + (Math.random() - 0.5) * (slotWidth * 0.8))
      );
      // Stagger drop heights rhythmically so they shower down gracefully
      const y = -100 - (index % 6) * 70 - Math.random() * 500;
      
      let body;
      const options = {
        restitution: 0.6, // Bounciness
        friction: 0.1,
        frictionAir: 0.01,
        angle: Math.random() * Math.PI * 2,
      };

      if (config.shape === 'circle') {
        body = Matter.Bodies.circle(x, y, config.size / 2.2, options);
      } else {
        const w = config.width || config.size;
        const h = config.height || config.size;
        body = Matter.Bodies.rectangle(x, y, w, h, options);
      }
      return body;
    });

    bodiesRef.current = newBodies;
    Matter.World.add(world, newBodies);

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const mousePos = { x: mouseX, y: mouseY };

      bodiesRef.current.forEach((body) => {
        const dist = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mousePos));
        if (dist < 200) {
          const forceDir = Matter.Vector.normalise(Matter.Vector.sub(body.position, mousePos));
          const forceMag = (200 - dist) * 0.0004 * body.mass;
          Matter.Body.applyForce(body, body.position, Matter.Vector.mult(forceDir, forceMag));
        }
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Run Engine & Sync to DOM
    let animationFrameId: number;
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    const updateDOM = () => {
      bodiesRef.current.forEach((body, index) => {
        const el = elementsRef.current[index];
        if (el) {
          el.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateDOM);
    };
    updateDOM();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {SHAPES_CONFIG.map((config, index) => {
        const w = config.width || config.size;
        const h = config.height || config.size;
        const Component = config.component;
        return (
          <div
            key={config.id}
            ref={(el) => { elementsRef.current[index] = el; }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginLeft: -w / 2,
              marginTop: -h / 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              willChange: 'transform',
              color: 'var(--fg)',
              opacity: 0.65,
              width: w,
              height: h,
            }}
          >
            <div style={{ width: '100%', height: '100%' }}>
              <Component />
            </div>
          </div>
        );
      })}
    </div>
  );
}
