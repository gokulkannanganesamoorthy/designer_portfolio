'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperienceFilmstrip({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      
      const totalWidth = track.scrollWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalWidth * 1.5}`, // Make scrolling feel longer and smoother
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [projects.length]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height: '100vh', 
        overflow: 'hidden', 
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Title that stays fixed on the screen while content scrolls */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        zIndex: 10,
      }}>
        <h2 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--text-secondary)' }}>
          Experience Filmstrip
        </h2>
      </div>

      <div 
        ref={trackRef} 
        style={{ 
          display: 'flex', 
          height: '100vh', 
          width: `${projects.length * 100}vw` 
        }}
      >
        {projects.map((p, i) => (
          <div 
            key={p.id} 
            style={{ 
              width: '100vw', 
              height: '100vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
             {/* Huge background typography mask */}
             <div style={{
                position: 'absolute',
                fontSize: 'clamp(10rem, 20vw, 30rem)',
                fontWeight: 900,
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.05)',
                whiteSpace: 'nowrap',
                zIndex: 0,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                userSelect: 'none',
                pointerEvents: 'none'
             }}>
               {p.company.toUpperCase()}
             </div>
             
             {/* Foreground details */}
             <div style={{ 
                zIndex: 1, 
                display: 'flex', 
                flexDirection: 'column',
                gap: '1.5rem',
                padding: '3rem',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid var(--border-color)',
                maxWidth: '600px'
             }}>
                <div style={{ fontSize: '1rem', color: 'var(--color-orange)', letterSpacing: '3px' }}>
                  [{p.year}]
                </div>
                <h3 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
                  {p.company}
                </h3>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
                  {p.role}
                </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
