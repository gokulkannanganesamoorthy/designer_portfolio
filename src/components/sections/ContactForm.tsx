'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onComplete: () => void;
}

const STEPS = [
  { id: 'name', label: "What's your name?", placeholder: 'John Doe', type: 'text' },
  { id: 'email', label: "What's your email?", placeholder: 'john@example.com', type: 'email' },
  { id: 'details', label: "Tell me about your project.", placeholder: 'I need a designer to...', type: 'text' },
];

export default function ContactForm({ onComplete }: ContactFormProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on step change after animation completes
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 450); // Slightly longer than the 400ms transition
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    const currentStepId = STEPS[step].id as keyof typeof formData;
    if (!formData[currentStepId].trim()) return;

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      // Submit form
      onComplete();
      
      // Simple mailto fallback since no backend
      const mailtoLink = `mailto:hello@gokulmakes.in?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nDetails:\n${formData.details}`
      )}`;
      window.location.href = mailtoLink;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <motion.div 
      className={styles.formOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.35 } }}
    >
      <div className={styles.formContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className={styles.stepWrapper}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <label className={styles.stepLabel}>{STEPS[step].label}</label>
            <input
              ref={inputRef}
              type={STEPS[step].type}
              className={styles.inputField}
              placeholder={STEPS[step].placeholder}
              value={formData[STEPS[step].id as keyof typeof formData]}
              onChange={(e) =>
                setFormData({ ...formData, [STEPS[step].id]: e.target.value })
              }
              onKeyDown={handleKeyDown}
            />
            <div className={styles.hint}>
              Press <span className={styles.enterKey}>Enter ↵</span> to continue
            </div>
            <button 
              className={styles.nextBtn} 
              onClick={handleNext}
              disabled={!formData[STEPS[step].id as keyof typeof formData].trim()}
            >
              {step === STEPS.length - 1 ? 'Submit' : 'Next'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator fixed to bottom right of viewport */}
      <div className={styles.progressHeader}>
        <span className={styles.stepCount}>0{step + 1} / 0{STEPS.length}</span>
        <div className={styles.progressTrack}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}
