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

const CursorArrowSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </svg>
);

const PlusSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Expanded elements configuration
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
  // Additional elements for a denser feel
  { id: 'cursor', type: 'svg', component: CursorArrowSVG, size: 90, shape: 'circle' as const },
  { id: 'plus', type: 'svg', component: PlusSVG, size: 80, shape: 'circle' as const },
  { id: 'asterisk', type: 'text', content: '*', size: 160, weight: 200, shape: 'circle' as const },
  { id: 'hash', type: 'text', content: '#', size: 120, weight: 300, shape: 'rectangle' as const, width: 100, height: 100 },
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
    
    // We raise the floor significantly (y = height - 50) 
    // so the elements rest 100px higher and absolutely don't clip out of bounds at the bottom.
    const floor = Matter.Bodies.rectangle(width / 2, height - 50, width * 2, 100, wallOptions);
    const leftWall = Matter.Bodies.rectangle(-50, height / 2, 100, height * 2, wallOptions);
    const rightWall = Matter.Bodies.rectangle(width + 50, height / 2, 100, height * 2, wallOptions);
    Matter.World.add(world, [floor, leftWall, rightWall]);

    // Create bodies
    const newBodies = SHAPES_CONFIG.map((config, index) => {
      // Random starting positions above the viewport, spread across the width
      const x = (width / SHAPES_CONFIG.length) * index + Math.random() * 50;
      const y = -100 - Math.random() * 500;
      
      let body;
      const options = {
        restitution: 0.2, // Gentle soft bounce instead of high elasticity
        friction: 0.2,
        frictionAir: 0.045, // Soft fluid-like air damping to prevent runaway speed
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

    // Engine settings: Gentle gravity
    world.gravity.y = 0.8;

    // Speed limiter to completely eliminate the "bomb blast" explosion effect on fast swipes
    const MAX_SPEED = 5;
    const MAX_ANGULAR_SPEED = 0.04;

    const handleBeforeUpdate = () => {
      bodiesRef.current.forEach((body) => {
        const currentSpeed = Matter.Vector.magnitude(body.velocity);
        if (currentSpeed > MAX_SPEED) {
          const clamped = Matter.Vector.mult(
            Matter.Vector.normalise(body.velocity),
            MAX_SPEED
          );
          Matter.Body.setVelocity(body, clamped);
        }
        if (Math.abs(body.angularVelocity) > MAX_ANGULAR_SPEED) {
          Matter.Body.setAngularVelocity(
            body,
            Math.sign(body.angularVelocity) * MAX_ANGULAR_SPEED
          );
        }
      });
    };
    Matter.Events.on(engine, 'beforeUpdate', handleBeforeUpdate);

    // Mouse & Touch Interaction (Smooth, low-intensity push)
    const applyPointerForce = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const posX = clientX - rect.left;
      const posY = clientY - rect.top;
      const pointerPos = { x: posX, y: posY };
      const radius = 140;

      bodiesRef.current.forEach((body) => {
        const diff = Matter.Vector.sub(body.position, pointerPos);
        const dist = Matter.Vector.magnitude(diff);
        if (dist < radius && dist > 2) {
          // Smooth falloff: close proximity doesn't cause massive spikes
          const falloff = Math.pow((radius - dist) / radius, 1.5);
          const forceDir = Matter.Vector.normalise(diff);
          const forceMag = falloff * 0.00007 * body.mass;
          Matter.Body.applyForce(body, body.position, Matter.Vector.mult(forceDir, forceMag));
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      applyPointerForce(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        applyPointerForce(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

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
      window.removeEventListener('touchmove', handleTouchMove);
      Matter.Events.off(engine, 'beforeUpdate', handleBeforeUpdate);
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
      {SHAPES_CONFIG.map((config, index) => {
        const w = config.width || config.size;
        const h = config.height || config.size;
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
              opacity: 0.65, // Increased opacity significantly for a bold, darker look
              width: w,
              height: h,
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
        );
      })}
    </div>
  );
}
