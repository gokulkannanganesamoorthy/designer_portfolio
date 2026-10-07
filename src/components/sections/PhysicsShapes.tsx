'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// SVG Definitions for the wireframe shapes
const HeartSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const StarSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ConcentricCirclesSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const DiamondSquareSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <rect x="4" y="4" width="16" height="16" />
    <polygon points="12 4 20 12 12 20 4 12" />
  </svg>
);

const PillArrowSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <rect x="8" y="2" width="8" height="20" rx="4" />
    <path d="M12 22v-8" />
    <path d="M9 17l3-3 3 3" />
  </svg>
);

const HalfCircleSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <path d="M2 12 A 10 10 0 0 1 22 12 Z" />
  </svg>
);

const SHAPES_CONFIG = [
  { id: 'amp', type: 'text', content: '&', size: 140, weight: 300, shape: 'circle' as const },
  { id: 'at', type: 'text', content: '@', size: 120, weight: 200, shape: 'circle' as const },
  { id: 'heart', type: 'svg', component: HeartSVG, size: 90, shape: 'circle' as const },
  { id: 'star', type: 'svg', component: StarSVG, size: 100, shape: 'circle' as const },
  { id: 'circles', type: 'svg', component: ConcentricCirclesSVG, size: 110, shape: 'circle' as const },
  { id: 'diamond', type: 'svg', component: DiamondSquareSVG, size: 100, shape: 'rectangle' as const },
  { id: 'pill', type: 'svg', component: PillArrowSVG, size: 90, shape: 'rectangle' as const, width: 60, height: 140 },
  { id: 'bracket', type: 'text', content: '{ }', size: 100, weight: 200, shape: 'rectangle' as const, width: 120, height: 80 },
  { id: 'halfcircle', type: 'svg', component: HalfCircleSVG, size: 100, shape: 'circle' as const },
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
    const floor = Matter.Bodies.rectangle(width / 2, height + 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    Matter.World.add(world, [floor, leftWall, rightWall]);

    // Create bodies
    const newBodies = SHAPES_CONFIG.map((config, index) => {
      // Random starting positions above the viewport
      const x = (width / SHAPES_CONFIG.length) * index + Math.random() * 50;
      const y = -100 - Math.random() * 500;
      
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
    // Manually track mouse and apply forces to bodies within a radius
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const mousePos = { x: mouseX, y: mouseY };

      bodiesRef.current.forEach((body) => {
        const dist = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mousePos));
        if (dist < 180) {
          // Push away from mouse
          const forceDir = Matter.Vector.normalise(Matter.Vector.sub(body.position, mousePos));
          // Apply a significant force dependent on mass and distance
          const forceMag = (180 - dist) * 0.0003 * body.mass;
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
          // Matter.js positions are center-based, we translate by -50% to align
          el.style.transform = `translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad) translate(-50%, -50%)`;
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
        pointerEvents: 'none', // Critical so we can still click buttons
        zIndex: 1, // Behind the content but above background
      }}
    >
      {SHAPES_CONFIG.map((config, index) => (
        <div
          key={config.id}
          ref={(el) => { elementsRef.current[index] = el; }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform',
            color: 'var(--fg)',
            opacity: 0.15, // faint wireframe look like the reference
            width: config.width || config.size,
            height: config.height || config.size,
          }}
        >
          {config.type === 'text' ? (
            <span
              style={{
                fontFamily: 'var(--font-secondary), serif',
                fontSize: `${config.size}px`,
                fontWeight: config.weight,
                lineHeight: 1,
              }}
            >
              {config.content}
            </span>
          ) : (
            <div style={{ width: '100%', height: '100%' }}>
              {config.component && <config.component />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
