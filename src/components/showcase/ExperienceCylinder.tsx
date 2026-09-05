'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperienceCylinder({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the rotation angle based on the number of items.
  // E.g. 4 items = 360 / 4 = 90 degrees each.
  // Actually, we might not want a full 360 if we don't want them to loop perfectly, 
  // but a cylinder implies a wheel.
  // Let's make the total rotation (projects.length - 1) * theta
  const theta = 360 / Math.max(projects.length, 6); // Keep theta manageable
  const radius = Math.max(300, (200 / Math.tan(Math.PI / Math.max(projects.length, 6))));

  // Map scroll progress to wheel rotation
  // When progress is 0, rotation is 0. 
  // When progress is 1, rotation is -(projects.length - 1) * theta
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -(projects.length - 1) * theta]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${projects.length * 100}vh`,
        backgroundColor: '#0a0a0a',
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px',
          overflow: 'hidden'
        }}
      >
        <motion.div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            rotateX
          }}
        >
          {projects.map((p, i) => {
            const itemAngle = i * theta;
            
            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '80vw',
                  maxWidth: '800px',
                  height: '200px',
                  marginLeft: '-40vw',
                  marginTop: '-100px',
                  transform: `rotateX(${itemAngle}deg) translateZ(${radius}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  backfaceVisibility: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ color: '#fff', fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {p.company}
                </div>
                <div style={{ color: '#888', fontSize: '1.25rem', marginTop: '0.5rem' }}>
                  {p.role} &nbsp;—&nbsp; {p.year}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Ambient Lighting Overlays */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40vh',
          background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40vh',
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />
      </div>
    </div>
  );
}
