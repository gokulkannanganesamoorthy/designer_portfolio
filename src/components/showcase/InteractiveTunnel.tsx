'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './InteractiveTunnel.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface InteractiveTunnelProps {
  projects: {
    id: string;
    title: string;
    role: string;
    year: string;
    company: string;
  }[];
  zSpacing?: number;
  initialZ?: number;
}

const Typewriter = ({
  text,
  isActive,
  playTick,
  speed = 40,
}: {
  text: string;
  isActive: boolean;
  playTick: () => void;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        if (text[currentIndex] !== ' ') {
          playTick();
        }
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isActive, text, playTick, speed]);

  return (
    <>
      {displayedText}
      {isActive && currentIndex < text.length && (
        <span className="blinking-cursor" style={{ opacity: 0.7 }}>█</span>
      )}
    </>
  );
};

const InteractiveTunnel: React.FC<InteractiveTunnelProps> = ({
  projects = [],
  zSpacing = 2500,
  initialZ = 4000,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<Record<number, boolean>>({ 0: true });

  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const playTick = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Use a triangle wave for a very clean, neat digital "blip"
    osc.type = 'triangle';
    
    // High frequency for a neat sound
    const baseFreq = 2000 + Math.random() * 50;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, ctx.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    // CRITICAL: Lower the volume to 0.05 to prevent clipping/crackling when multiple keys type at once
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    window.addEventListener('pointerdown', initAudio);
    window.addEventListener('keydown', initAudio);
    window.addEventListener('wheel', initAudio);
    return () => {
      window.removeEventListener('pointerdown', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('wheel', initAudio);
    };
  }, []);

  // Only add a "Nothing" card at the end. The user wants the first card to literally be the first project.
  const extendedProjects = [
    ...projects,
    { id: 'end', year: '', company: 'Nothing', role: '' }
  ];

  const totalDepth = extendedProjects.length * zSpacing + initialZ;
  
  // Track card width dynamically to keep perfect 3D corner alignment on mobile
  const [cardWidth, setCardWidth] = useState(500);
  useEffect(() => {
    const handleResize = () => {
      setCardWidth(window.innerWidth <= 768 ? window.innerWidth * 0.9 : 500);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCornerX = (index: number) => {
    // Use Math.abs to safely handle negative indices for the infinite forward/backward lines
    const isLeft = Math.abs(index % 2) === 0;
    const center = isLeft ? -350 : 350;
    return isLeft ? center + (cardWidth / 2) : center - (cardWidth / 2);
  };

  useEffect(() => {
    if (!extendedProjects.length) return;

    let ctx = gsap.context(() => {
      // 1. Main Scroll Z Physics
      gsap.fromTo(
        sceneRef.current,
        { z: 0 },
        {
          z: totalDepth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: `+=${totalDepth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const currentZ = self.progress * totalDepth;
              
              const newActive: Record<number, boolean> = {};
              let changed = false;
              
              extendedProjects.forEach((_, i) => {
                const cardZ = i * zSpacing + initialZ;
                if (currentZ > cardZ - 3000 && currentZ < cardZ + 1500) {
                  newActive[i] = true;
                } else {
                  newActive[i] = false;
                }
              });

              setActiveIndices(prev => {
                for (const key in newActive) {
                  if (prev[key] !== newActive[key]) changed = true;
                }
                return changed ? { ...prev, ...newActive } : prev;
              });
            }
          },
        }
      );

      // Fade out cards as they pass the camera
      gsap.utils.toArray('.interactive-card').forEach((card: any, i) => {
        const triggerStart = i * zSpacing + initialZ - 800;
        const triggerEnd = i * zSpacing + initialZ + 500;
        
        gsap.to(card, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${triggerStart} top`,
            end: () => `top+=${triggerEnd} top`,
            scrub: true,
          },
        });
      });

      // 2. Mouse Parallax Tilt (Subtle)
      const rotateXTo = gsap.quickTo(sceneRef.current, "rotationX", { duration: 0.8, ease: "power3" });
      const rotateYTo = gsap.quickTo(sceneRef.current, "rotationY", { duration: 0.8, ease: "power3" });

      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;

        rotateXTo(y * -2);
        rotateYTo(x * 2);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [extendedProjects.length, zSpacing, initialZ, totalDepth]);

  return (
    <div>
      <section className={styles.tunnelSection} ref={sectionRef}>
        <div className={styles.tunnelOverlay} />
        <h2 className={styles.tunnelLabel}>[ INTERACTIVE ARCHIVE ]</h2>

        <div className={styles.tunnelViewport}>
        <div className={styles.tunnelScene} ref={sceneRef}>
          
          {/* Render individual curve segments to bypass browser 3D culling bugs */}
          {/* Array goes from i = -3 to i = extendedProjects.length + 2 to create infinite forward and backward lines */}
          {Array.from({ length: extendedProjects.length + 6 }, (_, idx) => idx - 3).map((i) => {
            const zPos = -(i * zSpacing) - initialZ;
            const startX = 500 + getCornerX(i);
            const endX = 500 + getCornerX(i + 1);
            const d = `M ${startX},0 C ${startX},${zSpacing / 2} ${endX},${zSpacing / 2} ${endX},${zSpacing}`;

            return (
              <div
                key={`line-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '1000px',
                  height: `${zSpacing}px`,
                  marginLeft: '-500px',
                  transformOrigin: 'top center',
                  transform: `translate3d(0, ${cardWidth / 2}px, ${zPos}px) rotateX(90deg)`,
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              >
                <svg width="100%" height="100%" viewBox={`0 0 1000 ${zSpacing}`} style={{ overflow: 'visible' }}>
                  <path
                    d={d}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            );
          })}

          {extendedProjects.map((project, i) => {
              const zPos = -(i * zSpacing) - initialZ;
              const xOffset = i % 2 === 0 ? -350 : 350;
              const initRotateY = i % 2 === 0 ? '15deg' : '-15deg';

              return (
                <div
                  key={project.id || i}
                  className={`${styles.cardContainer} interactive-card`}
                  style={{
                    transform: `translate3d(calc(-50% + ${xOffset}px), -50%, ${zPos}px) rotateY(${initRotateY})`,
                  }}
                >
                  <div className={styles.card}>
                    {project.year && (
                      <div className={styles.cardYear}>
                        [<Typewriter text={project.year} isActive={activeIndices[i]} playTick={playTick} speed={50} />]
                      </div>
                    )}
                    <h3 className={styles.cardCompany}>
                      <Typewriter text={project.company} isActive={activeIndices[i]} playTick={playTick} speed={40} />
                    </h3>
                    {project.role && (
                      <div className={styles.cardRole}>
                        <Typewriter text={project.role} isActive={activeIndices[i]} playTick={playTick} speed={30} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InteractiveTunnel;
