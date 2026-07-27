"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "react-3d-tunnel-scroll/style.css";

gsap.registerPlugin(ScrollTrigger);

interface TunnelScrollProps {
  projects: { id: string; title: string; img: string }[];
  zSpacing?: number;
  label?: string | null;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export default function TunnelScroll({
  projects = [],
  zSpacing = 3000,
  label = "",
  backgroundColor = "#040404",
  textColor = "#f7f4ed",
  className = ""
}: TunnelScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;

    const container = containerRef.current;
    const scene = sceneRef.current;

    // Mouse tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * -20;
      
      gsap.to(scene, {
        rotationY: x,
        rotationX: y,
        ease: "power2.out",
        duration: 1
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll tunnel effect
    const totalDepth = projects.length * zSpacing;
    
    const ctx = gsap.context(() => {
      gsap.to(scene, {
        z: totalDepth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: `+=${totalDepth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });
    }, container);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, [projects, zSpacing]);

  return (
    <section 
      className={`tunnel-3d-section ${className}`} 
      ref={containerRef}
      style={{ backgroundColor, color: textColor }}
    >
      {label && (
        <div className="tunnel-3d-overlay">
          <p className="tunnel-label">{label}</p>
        </div>
      )}
      
      <div className="tunnel-3d-viewport">
        <div className="tunnel-3d-scene" ref={sceneRef}>
          {projects.map((project, index) => {
            const zPos = -(index * zSpacing);
            const xPos = index % 2 === 0 ? "-35vw" : "35vw";
            const rotateY = index % 2 === 0 ? "25deg" : "-25deg";

            return (
              <div 
                key={project.id || index}
                className="tunnel-3d-poster"
                style={{
                  transform: `translate3d(calc(-50% + ${xPos}), -50%, ${zPos}px) rotateY(${rotateY})`
                }}
              >
                <div className="tunnel-poster-wrapper">
                  <img src={project.img} alt={project.title} className="tunnel-poster-img" />
                </div>
                <div className="tunnel-poster-meta" style={{ borderTopColor: "rgba(255,255,255,0.2)" }}>
                  {project.id && <span className="tunnel-id">[{project.id}]</span>}
                  <h3 className="tunnel-title">{project.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
