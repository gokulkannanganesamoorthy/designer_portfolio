'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperienceMagnetic({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a chaotic masonry layout
  // We'll hardcode some randomized-looking positions (percentages) for the 4 items
  const positions = [
    { top: '10%', left: '10%', width: '400px' },
    { top: '40%', left: '50%', width: '350px' },
    { top: '60%', left: '15%', width: '450px' },
    { top: '20%', left: '70%', width: '300px' },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '120vh',
        backgroundColor: '#e5e5e5', // Light brutalist theme for contrast
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#000', fontFamily: 'monospace', fontWeight: 600 }}>
        [ MAGNETIC GRID ]<br/>
        HOVER OVER ITEMS
      </div>

      <motion.div style={{ width: '100%', height: '100%', y: smoothY }}>
        {projects.map((p, i) => {
          const pos = positions[i % positions.length];
          return (
            <MagneticItem key={p.id} project={p} position={pos} index={i} />
          );
        })}
      </motion.div>
    </div>
  );
}

function MagneticItem({ project: p, position, index }: { project: Project, position: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  // Mouse tracking relative to the item center
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull effect: move the item slightly towards the mouse
    const pullX = (e.clientX - centerX) * 0.2;
    const pullY = (e.clientY - centerY) * 0.2;
    
    setMousePos({ x: pullX, y: pullY });
  };

  const resetMouse = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Vibrant brand colors for hover states
  const colors = ['#FF3366', '#00C4B6', '#6633FF', '#FF9900'];
  const hoverColor = colors[index % colors.length];

  return (
    <motion.div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={resetMouse}
      animate={{
        x: mousePos.x,
        y: mousePos.y,
        backgroundColor: isHovered ? hoverColor : '#000',
        scale: isHovered ? 1.05 : 1,
        borderRadius: isHovered ? '24px' : '0px'
      }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 1 }}
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        width: position.width,
        padding: '3rem',
        cursor: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <motion.div 
        animate={{ color: isHovered ? '#fff' : '#e5e5e5' }}
        style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}
      >
        {p.company}
      </motion.div>
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        style={{ color: '#fff', fontSize: '1.25rem', marginTop: '1rem', fontWeight: 500 }}
      >
        {p.role}
      </motion.div>
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ delay: 0.1 }}
        style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginTop: '0.5rem', fontFamily: 'monospace' }}
      >
        {p.year}
      </motion.div>

      {/* Custom magnetic cursor dot */}
      {isHovered && (
        <motion.div
          layoutId="magneticCursor"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '10px',
            height: '10px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            pointerEvents: 'none',
            x: '-50%',
            y: '-50%'
          }}
        />
      )}
    </motion.div>
  );
}
