'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperienceStack from './ExperienceStack';
import ExperienceFilmstrip from './ExperienceFilmstrip';
import ExperienceOrbital from './ExperienceOrbital';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
}

interface InteractiveTunnelProps {
  projects: Project[];
}

type ThemeMode = 'stack' | 'filmstrip' | 'orbital';

const InteractiveTunnel: React.FC<InteractiveTunnelProps> = ({ projects }) => {
  const [theme, setTheme] = useState<ThemeMode>('stack');

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Theme Switcher */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999999, // Ensure it sits above the modal
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          padding: '0.5rem',
          borderRadius: '50px',
          display: 'flex',
          gap: '0.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(0,0,0,0.1)'
        }}
      >
        {(['stack', 'filmstrip', 'orbital'] as ThemeMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setTheme(mode)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '40px',
              border: 'none',
              background: theme === mode ? 'var(--text-primary)' : 'transparent',
              color: theme === mode ? 'var(--bg-primary)' : 'var(--text-primary)',
              fontWeight: 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {theme === 'stack' && (
          <motion.div key="stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ExperienceStack projects={projects} />
          </motion.div>
        )}
        {theme === 'filmstrip' && (
          <motion.div key="filmstrip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ExperienceFilmstrip projects={projects} />
          </motion.div>
        )}
        {theme === 'orbital' && (
          <motion.div key="orbital" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <ExperienceOrbital projects={projects} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveTunnel;
