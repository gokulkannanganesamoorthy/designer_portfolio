'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperienceStack({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} style={{ position: 'relative', paddingBottom: '20vh', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ textAlign: 'center', paddingTop: '15vh', paddingBottom: '10vh' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>The Stack</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>A tactile history.</p>
      </div>
      
      {projects.map((p, i) => (
        <Card key={p.id} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}

function Card({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Calculate top offset for sticky behavior (stacking cards)
  const topOffset = `calc(20vh + ${index * 30}px)`;
  
  // Parallax subtle scale/fade as it sticks
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: topOffset,
        height: '55vh',
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto 80vh auto', // Huge margin to force scrolling
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--bg-secondary)', // Solid fallback
          backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid var(--border-color)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '32px',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.1)',
          padding: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1.5rem',
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
      >
        <div style={{ 
          fontSize: '0.9rem', 
          color: 'var(--color-orange, #ff6b00)', 
          letterSpacing: '3px', 
          textTransform: 'uppercase',
          fontWeight: 600 
        }}>
          [{project.year}]
        </div>
        <h3 style={{ 
          fontSize: 'clamp(3rem, 6vw, 6rem)', 
          fontWeight: 800, 
          margin: 0, 
          lineHeight: 1,
          letterSpacing: '-0.03em',
          background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {project.company}
        </h3>
        <p style={{ 
          fontSize: '1.5rem', 
          color: 'var(--text-secondary)',
          fontWeight: 400
        }}>
          {project.role}
        </p>
      </motion.div>
    </div>
  );
}
