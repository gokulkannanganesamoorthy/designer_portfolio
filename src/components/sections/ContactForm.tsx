'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onComplete: () => void;
}

const STEPS = [
  {
    id: 'name',
    label: "What's your name?",
    placeholder: 'Your Name',
    type: 'text',
  },
  {
    id: 'details',
    label: 'Tell me a little about the project',
    placeholder: 'I need someone who can help me with...',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Where can i contact you?',
    placeholder: 'me@domain.com',
    type: 'email',
  },
];

export default function ContactForm({ onComplete }: ContactFormProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });
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
      setDirection(1);
      setStep(step + 1);
    } else {
      // Submit form
      onComplete();

      // Simple mailto fallback since no backend
      const mailtoLink = `mailto:hello@gokulmakes.in?subject=Project Inquiry from ${formData.name}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nDetails:\n${formData.details}`,
      )}`;
      window.location.href = mailtoLink;
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext();
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: 'blur(10px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)'
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: 'blur(10px)'
    })
  };

  return (
    <motion.div
      className={styles.formOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)', transition: { duration: 0.35 } }}
    >
      <div className={styles.formContainer}>
        <AnimatePresence>
          {step > 0 && (
            <motion.button
              className={styles.backBtn}
              onClick={handleBack}
              initial={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
            >
              ← Back
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            className={styles.stepWrapper}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
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
              disabled={
                !formData[STEPS[step].id as keyof typeof formData].trim()
              }
            >
              {step === STEPS.length - 1 ? 'Send it' : 'Next'}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator fixed to bottom right of viewport */}
      <div className={styles.progressHeader}>
        <span className={styles.stepCount}>
          0{step + 1} / 0{STEPS.length}
        </span>
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
