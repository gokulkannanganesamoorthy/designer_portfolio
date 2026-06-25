"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./MicroscopicText.module.css";

const PHILOSOPHY_WORDS = [
  "DETAILS", "SYSTEM", "MEMORY", "RESTRAINT", "INTENTION", 
  "THE INVISIBLE", "TYPOGRAPHY", "NEGATIVE SPACE", "BREATHE"
];

interface WordData {
  text: string;
  top: string;
  left: string;
}

export default function MicroscopicText() {
  const [texts, setTexts] = useState<WordData[]>([]);

  useEffect(() => {
    // Pick 3 random words
    const shuffled = [...PHILOSOPHY_WORDS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    const positioned = selected.map(word => ({
      text: word,
      top: `${Math.floor(Math.random() * 70) + 15}%`, // 15% to 85%
      left: `${Math.floor(Math.random() * 80) + 10}%`, // 10% to 90%
    }));
    
    setTexts(positioned);
  }, []);

  return (
    <motion.div
      className={`${styles.container} mono`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.0 }}
    >
      {texts.map((item, index) => (
        <div
          key={index}
          className={styles.microText}
          style={{ top: item.top, left: item.left }}
        >
          {item.text}
        </div>
      ))}
    </motion.div>
  );
}
