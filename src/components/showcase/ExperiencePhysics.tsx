'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
}

export default function ExperiencePhysics({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Randomize initial positions within a bounded area
  const [nodes, setNodes] = useState<{ id: string, x: number, y: number }[]>([]);

  useEffect(() => {
    // Generate initial random positions avoiding the very edges
    const newNodes = projects.map((p, i) => {
      // Distribute them in a loose circle
      const angle = (i / projects.length) * Math.PI * 2;
      const radius = 200;
      return {
        id: p.id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    });
    setNodes(newNodes);
  }, [projects]);

  // We won't track live position for lines because framer-motion doesn't easily expose live x/y to React state without heavy performance cost, 
  // but we can make the nodes themselves highly interactive.
  // To keep it simple and performant, we'll let framer-motion handle the layout physics.

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#111',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: '#555', fontFamily: 'monospace' }}>
        [ INTERACTIVE PHYSICS MODE ]<br/>
        DRAG NODES TO EXPLORE
      </div>

      {nodes.map((node, i) => {
        const p = projects.find(proj => proj.id === node.id)!;
        return (
          <motion.div
            key={node.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }}
            initial={{ x: node.x, y: node.y, scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              width: '280px',
              padding: '2rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              cursor: 'grab',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {p.company}
            </div>
            <div style={{ color: '#aaa', fontSize: '1rem', marginBottom: '1rem' }}>
              {p.role}
            </div>
            <div style={{ 
              display: 'inline-block',
              padding: '0.25rem 0.75rem', 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              borderRadius: '50px',
              fontSize: '0.75rem',
              color: '#fff',
              alignSelf: 'flex-start'
            }}>
              {p.year}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
