'use client';
import React, { useRef, useEffect, useState } from 'react';
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

export default function ExperienceOrbital({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // We plot items every 40 degrees along the circle
    const degreeStep = 40;
    const totalDegrees = (projects.length - 1) * degreeStep; 
    
    let ctx = gsap.context(() => {
      // Pin the container and rotate the ring
      gsap.to(ringRef.current, {
        rotation: totalDegrees, // rotate clockwise so items from the bottom (higher angles) come up to 9 o'clock
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${projects.length * 800}`, // 800px scroll per item
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const newIndex = Math.round(progress * (projects.length - 1));
            setActiveIndex(newIndex);
          }
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
           backgroundColor: 'var(--bg-primary)', 
           overflow: 'hidden', 
           position: 'relative',
           color: 'var(--text-primary)'
        }}
     >
        
        {/* Left Side: Active Content Panel */}
        <div style={{ 
           position: 'absolute', 
           left: '10%', 
           top: '50%', 
           transform: 'translateY(-50%)', 
           zIndex: 10, 
           width: '400px',
           maxWidth: '80vw'
        }}>
           <h2 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '2rem' }}>
              Orbital Timeline
           </h2>
           
           <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              padding: '2.5rem',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
           }}>
              <div style={{ color: 'var(--color-orange)', marginBottom: '1rem', letterSpacing: '2px', fontSize: '0.9rem' }}>
                 [{projects[activeIndex]?.year}]
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', lineHeight: 1.1 }}>
                 {projects[activeIndex]?.company}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
                 {projects[activeIndex]?.role}
              </p>
           </div>
        </div>

        {/* Right Side: The Giant Ring */}
        <div style={{
           position: 'absolute',
           right: '-40vw', // offset to the right
           top: '50%',
           transform: 'translateY(-50%)',
           width: '100vw',
           height: '100vw',
           minWidth: '1000px',
           minHeight: '1000px',
           borderRadius: '50%',
           border: '1px dashed rgba(255,255,255,0.1)',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           pointerEvents: 'none',
        }}>
           {/* Inner solid ring */}
           <div style={{
              position: 'absolute',
              width: '96%',
              height: '96%',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.03)',
           }} />

           <div ref={ringRef} style={{ width: '100%', height: '100%', position: 'relative', borderRadius: '50%' }}>
              {projects.map((p, i) => {
                 // Start at 9 o'clock (180 degrees)
                 // Subsequent items are spaced by -40 degrees (so they are further down the circle)
                 const angle = 180 - (i * 40); 
                 const rad = angle * (Math.PI / 180);
                 const radius = 50; // 50%
                 
                 // Center coordinates in %
                 const x = 50 + radius * Math.cos(rad);
                 const y = 50 + radius * Math.sin(rad);

                 return (
                    <div key={p.id} style={{
                       position: 'absolute',
                       left: `${x}%`,
                       top: `${y}%`,
                       // Rotate the node so the text flows along the curve
                       transform: `translate(-50%, -50%) rotate(${angle - 180}deg)`, 
                       width: '16px',
                       height: '16px',
                       backgroundColor: activeIndex === i ? 'var(--color-orange)' : 'var(--text-secondary)',
                       borderRadius: '50%',
                       boxShadow: activeIndex === i ? '0 0 30px var(--color-orange)' : 'none',
                       transition: 'background-color 0.4s ease, box-shadow 0.4s ease'
                    }}>
                       {/* Line connecting dot to text */}
                       <div style={{
                          position: 'absolute',
                          left: '16px',
                          top: '50%',
                          width: '40px',
                          height: '1px',
                          background: activeIndex === i ? 'var(--color-orange)' : 'var(--border-color)',
                          transition: 'background 0.4s ease'
                       }} />

                       {/* Label on the ring */}
                       <div style={{
                          position: 'absolute',
                          left: '66px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          whiteSpace: 'nowrap',
                          fontSize: '1.25rem',
                          color: activeIndex === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: activeIndex === i ? 600 : 400,
                          transition: 'color 0.4s ease, font-weight 0.4s ease',
                          opacity: activeIndex === i ? 1 : 0.4
                       }}>
                          {p.company}
                       </div>
                    </div>
                 )
              })}
           </div>
        </div>
     </div>
  );
}
