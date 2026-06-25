"use client";

import { motion } from "framer-motion";
import styles from "./MicroscopicText.module.css";

const texts = [
  { text: "DETAILS", top: "15%", left: "30%" },
  { text: "SYSTEM", top: "70%", left: "70%" },
  { text: "MEMORY", top: "40%", left: "80%" },
  { text: "THE INVISIBLE", top: "80%", left: "20%" },
  { text: "RESTRAINT", top: "25%", left: "60%" },
  { text: "INTENTION", top: "50%", left: "15%" },
];

export default function MicroscopicText() {
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
