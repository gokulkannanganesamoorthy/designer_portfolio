'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CinematicTunnel.module.css';

gsap.registerPlugin(ScrollTrigger);

export interface CinematicTunnelProps {
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

  useEffect(() => {
    if (!isActive) {
      // Don't immediately clear if not active to avoid snapping, or do clear?
      // Clearing when not active resets it for the next scroll.
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        // Only tick on non-space characters
        if (text[currentIndex] !== ' ') {
          playTick();
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isActive, text, speed, playTick]);

  return (
    <span>
      {displayedText}
      {isActive && displayedText.length < text.length && (
        <span className={styles.blinkingCursor} />
      )}
    </span>
  );
};

const CinematicTunnel: React.FC<CinematicTunnelProps> = ({
  projects = [],
  zSpacing = 2500,
  initialZ = 2500,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [activeIndices, setActiveIndices] = useState<Record<number, boolean>>({});

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playTick = useCallback(() => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== 'running') return;
    
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      
      // Randomize pitch slightly for organic typewriter feel
      const freq = 600 + Math.random() * 200;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors during rapid firing
    }
  }, []);

  useEffect(() => {
    if (!projects.length) return;

    let ctx = gsap.context(() => {
      const totalDepth = projects.length * zSpacing + initialZ;

      // Move the camera/scene forward on scroll
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
          },
        }
      );

      // Animate each card
      gsap.utils.toArray('.cinematic-card').forEach((card: any, i) => {
        // Trigger for fading the card and triggering typing effect
        const triggerStart = i * zSpacing + initialZ - 800;
        const triggerEnd = i * zSpacing + initialZ + 800;

        gsap.to(card, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: () => `top+=${triggerStart} top`,
            end: () => `top+=${triggerEnd} top`,
            scrub: true,
            onEnter: () => {
              setActiveIndices(prev => ({ ...prev, [i]: true }));
            },
            onLeave: () => {
              setActiveIndices(prev => ({ ...prev, [i]: false }));
            },
            onEnterBack: () => {
              setActiveIndices(prev => ({ ...prev, [i]: true }));
            },
            onLeaveBack: () => {
              setActiveIndices(prev => ({ ...prev, [i]: false }));
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length, zSpacing, initialZ]);

  // Handle first interaction to unlock audio context
  useEffect(() => {
    const unlock = () => initAudio();
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('scroll', unlock, { once: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('scroll', unlock);
    };
  }, [initAudio]);

  return (
    <section className={styles.tunnelSection} ref={sectionRef}>
      <div className={styles.tunnelOverlay} />
      <h2 className={styles.tunnelLabel}>[ CINEMATIC EXPERIENCE ]</h2>

      <div className={styles.tunnelViewport}>
        <div className={styles.tunnelScene} ref={sceneRef}>
          {projects.map((project, i) => {
            const zPos = -(i * zSpacing) - initialZ;
            
            // Alternate left/right and rotation for a dynamic path
            const xPos = i % 2 === 0 ? '-30vw' : '30vw';
            const rotateY = i % 2 === 0 ? '15deg' : '-15deg';

            return (
              <div
                key={project.id || i}
                className={`${styles.cardContainer} cinematic-card`}
                style={{
                  transform: `translate3d(calc(-50% + ${xPos}), -50%, ${zPos}px) rotateY(${rotateY})`,
                }}
              >
                <div className={styles.card}>
                  <div className={styles.cardYear}>
                    <Typewriter
                      text={project.year}
                      isActive={!!activeIndices[i]}
                      playTick={playTick}
                      speed={30}
                    />
                  </div>
                  <h3 className={styles.cardCompany}>
                    <Typewriter
                      text={project.company}
                      isActive={!!activeIndices[i]}
                      playTick={playTick}
                      speed={60}
                    />
                  </h3>
                  <div className={styles.cardRole}>
                    <Typewriter
                      text={project.role}
                      isActive={!!activeIndices[i]}
                      playTick={playTick}
                      speed={40}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CinematicTunnel;
