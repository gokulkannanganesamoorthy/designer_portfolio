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
    
    // Clean sine wave for a crisp "cling/click" sound
    osc.type = 'sine';
    
    // High frequency that drops very slightly gives it a percussive "tink" sound
    const baseFreq = 1200 + Math.random() * 100;
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, ctx.currentTime + 0.03);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.002);
    // Fast decay so it doesn't ring out too long
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
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

  const totalDepth = projects.length * zSpacing + initialZ;

  // Generate SVG Path for Timeline
  const generatePath = () => {
    let d = `M 500,0 `;
    projects.forEach((_, i) => {
      const isLeft = i % 2 === 0;
      const targetX = isLeft ? 250 : 750;
      const targetZ = initialZ + i * zSpacing;
      
      if (i === 0) {
        d += `C 500,${targetZ / 2} ${targetX},${targetZ / 2} ${targetX},${targetZ} `;
      } else {
        const prevZ = initialZ + (i - 1) * zSpacing;
        const prevX = isLeft ? 750 : 250;
        const midZ = prevZ + zSpacing / 2;
        d += `C ${prevX},${midZ} ${targetX},${midZ} ${targetX},${targetZ} `;
      }
    });
    // Continue the line into the abyss
    const lastX = (projects.length - 1) % 2 === 0 ? 250 : 750;
    d += `L ${lastX},${totalDepth}`;
    return d;
  };

  useEffect(() => {
    if (!projects.length) return;

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
              
              // Trigger typing when card is within 3000px
              const newActive: Record<number, boolean> = {};
              let changed = false;
              
              projects.forEach((_, i) => {
                const cardZ = i * zSpacing + initialZ;
                // Active if the camera is approaching it, and deactivate if it's far behind the camera
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

        // Apply very subtle rotation
        rotateXTo(y * -2);
        rotateYTo(x * 2);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length, zSpacing, initialZ, totalDepth]);

  return (
    <div>
      <section className={styles.tunnelSection} ref={sectionRef}>
        <div className={styles.tunnelOverlay} />
        <h2 className={styles.tunnelLabel}>[ INTERACTIVE ARCHIVE ]</h2>

        <div className={styles.tunnelViewport}>
        <div className={styles.tunnelScene} ref={sceneRef}>
          {/* Timeline Curve */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: `${totalDepth}px`,
              transformOrigin: 'top center',
              transform: 'rotateX(90deg) translateY(0)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          >
            <svg width="100%" height="100%" viewBox={`0 0 1000 ${totalDepth}`} preserveAspectRatio="none">
              <path
                d={generatePath()}
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
            </svg>
          </div>

          {projects.map((project, i) => {
              const zPos = -(i * zSpacing) - initialZ;
              
              // Alternate left/right and give initial slight rotation to make it look like a tunnel
              const xPos = i % 2 === 0 ? '-25vw' : '25vw';
              const initRotateY = i % 2 === 0 ? '15deg' : '-15deg';

              return (
                <div
                  key={project.id || i}
                  className={`${styles.cardContainer} interactive-card`}
                  style={{
                    transform: `translate3d(calc(-50% + ${xPos}), -50%, ${zPos}px) rotateY(${initRotateY})`,
                  }}
                >
                  <div className={styles.card}>
                    <div className={styles.cardYear}>
                      [<Typewriter text={project.year} isActive={activeIndices[i]} playTick={playTick} speed={50} />]
                    </div>
                    <h3 className={styles.cardCompany}>
                      <Typewriter text={project.company} isActive={activeIndices[i]} playTick={playTick} speed={40} />
                    </h3>
                    <div className={styles.cardRole}>
                      <Typewriter text={project.role} isActive={activeIndices[i]} playTick={playTick} speed={30} />
                    </div>
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
