"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./AudioToggle.module.css";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    // In a real scenario, you'd trigger a global audio context or HTMLAudioElement here
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      className={`${styles.toggle} mono`}
      onClick={toggleAudio}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
    >
      [ AMBIENT — {isPlaying ? "ON" : "OFF"} ]
    </motion.button>
  );
}
