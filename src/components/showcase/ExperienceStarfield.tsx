"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import styles from "./ExperienceStarfield.module.css";

const experienceData = [
  { year: "2024", role: "Senior UX Designer", company: "Studio X", description: "Led redesign of core digital products and established a new design system." },
  { year: "2022", role: "Product Designer", company: "TechCorp", description: "Spearheaded UI/UX for the flagship mobile application." },
  { year: "2020", role: "UI Designer", company: "Creative Agency", description: "Worked on various client projects, creating engaging landing pages." },
  { year: "2018", role: "Junior Designer", company: "Startup Inc", description: "Assisted in branding and web design." },
];

function CameraController({ scrollProgress }: { scrollProgress: any }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    // Scroll progress maps to Z position from 0 to -100
    const targetZ = -(scrollProgress.get() * 100);
    
    // Smooth camera Z movement
    camera.position.z += (targetZ - camera.position.z) * 0.1;

    // Mouse parallax
    const targetX = (state.pointer.x * 2);
    const targetY = (state.pointer.y * 2);
    
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    
    // Always look forward but slightly offset by mouse
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, camera.position.z - 10);
  });

  return null;
}

function ExperienceNodes() {
  return (
    <>
      {experienceData.map((exp, index) => {
        const zPos = -10 - (index * 25);
        const xPos = index % 2 === 0 ? -5 : 5;
        
        return (
          <group key={index} position={[xPos, 0, zPos]}>
            {/* Glowing orb */}
            <mesh>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
            
            {/* HTML Overlay for crisp text */}
            <Html center distanceFactor={15} zIndexRange={[100, 0]} className={styles.htmlNode}>
              <div className={styles.nodeCard}>
                <div className={styles.yearCol}>{exp.year}</div>
                <h3 className={styles.roleText}>{exp.role}</h3>
                <h4 className={styles.companyText}>{exp.company}</h4>
                <p className={styles.descText}>{exp.description}</p>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default function ExperienceStarfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll to power forward flight
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className={styles.viewport} ref={containerRef}>
      <div className={styles.scrollHint}>
        Scroll down to warp speed
      </div>
      
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={["#020202"]} />
          <ambientLight intensity={0.5} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <ExperienceNodes />
          <CameraController scrollProgress={scrollYProgress} />
        </Canvas>
      </div>

      <div style={{ height: `${experienceData.length * 150}vh` }} />
    </div>
  );
}
