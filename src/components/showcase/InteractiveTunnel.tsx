'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './InteractiveTunnel.module.css';

import ExperiencePhysics from './ExperiencePhysics';
import ExperienceCylinder from './ExperienceCylinder';
import ExperienceFlashlight from './ExperienceFlashlight';
import ExperienceMagnetic from './ExperienceMagnetic';

interface Project {
  id: string;
  year: string;
  company: string;
  role: string;
  title?: string;
}

export default function InteractiveTunnel({ projects }: { projects: Project[] }) {
  const [activeTheme, setActiveTheme] = useState<'physics' | 'cylinder' | 'flashlight' | 'magnetic'>('flashlight');

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait">
        {activeTheme === 'physics' && <ExperiencePhysics key="physics" projects={projects} />}
        {activeTheme === 'cylinder' && <ExperienceCylinder key="cylinder" projects={projects} />}
        {activeTheme === 'flashlight' && <ExperienceFlashlight key="flashlight" projects={projects} />}
        {activeTheme === 'magnetic' && <ExperienceMagnetic key="magnetic" projects={projects} />}
      </AnimatePresence>

      <div className={styles.themeSwitcher}>
        <div className={styles.switcherLabel}>Awwwards Concepts:</div>
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.switchBtn} ${activeTheme === 'physics' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTheme('physics')}
          >
            Physics Constellation
          </button>
          <button 
            className={`${styles.switchBtn} ${activeTheme === 'cylinder' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTheme('cylinder')}
          >
            3D Cylinder
          </button>
          <button 
            className={`${styles.switchBtn} ${activeTheme === 'flashlight' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTheme('flashlight')}
          >
            Flashlight
          </button>
          <button 
            className={`${styles.switchBtn} ${activeTheme === 'magnetic' ? styles.activeBtn : ''}`}
            onClick={() => setActiveTheme('magnetic')}
          >
            Magnetic Grid
          </button>
        </div>
      </div>
    </div>
  );
}
