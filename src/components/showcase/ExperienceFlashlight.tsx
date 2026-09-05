'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperienceFlashlight({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Flashlight state
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const step = projects.length > 1 ? 1 / (projects.length - 1) : 1;

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: `${projects.length * 150}vh`,
        backgroundColor: '#000',
        cursor: 'none'
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}
      >
        {/* Flashlight Mask Layer */}
        <motion.div
          animate={{
            opacity: isHovering ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none',
            background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0,0,0,0.98) 80%, rgba(0,0,0,1) 100%)`,
          }}
        />

        {/* Content Layer (Hidden by default, revealed by flashlight mask above) */}
        {/* Actually, it's better to use CSS clip-path or mask-image for a true reveal, but the radial gradient above acts as a "darkness" overlay that has a transparent hole in it. */}

        {projects.map((p, i) => {
          const inputMap = projects.map((_, idx) => idx * step);
          const outputOpacity = projects.map((_, idx) => idx === i ? 1 : 0);
          const outputScale = projects.map((_, idx) => idx < i ? 0.9 : idx === i ? 1 : 1.1);
          const outputY = projects.map((_, idx) => idx < i ? 50 : idx === i ? 0 : -50);

          const opacity = useTransform(scrollYProgress, inputMap, outputOpacity);
          const scale = useTransform(scrollYProgress, inputMap, outputScale);
          const y = useTransform(scrollYProgress, inputMap, outputY);

          return (
            <motion.div
              key={p.id}
              style={{
                position: 'absolute',
                opacity,
                scale,
                y,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                padding: '0 2rem'
              }}
            >
              <h2 style={{
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                fontWeight: 900,
                color: '#fff',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase'
              }}>
                {p.company}
              </h2>
              <div style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                color: '#888',
                marginTop: '1rem',
                fontWeight: 500
              }}>
                {p.role}
              </div>
              <div style={{
                marginTop: '2rem',
                display: 'flex',
                gap: '2rem',
                color: '#555',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em'
              }}>
                <span>{p.year}</span>
                <span>ID: {p.id}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Custom Cursor Dot */}
        <motion.div
          animate={{
            x: mousePos.x - 4,
            y: mousePos.y - 4,
            opacity: isHovering ? 1 : 0
          }}
          transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          style={{
            position: 'absolute',
            width: 8,
            height: 8,
            backgroundColor: '#fff',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: '0 0 20px 4px rgba(255,255,255,0.8)'
          }}
        />
      </div>
    </div>
  );
}
