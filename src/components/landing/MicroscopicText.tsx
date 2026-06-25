"use client";

import { motion } from "framer-motion";
import styles from "./MicroscopicText.module.css";

const texts = [
  { text: "INTENTIONALITY", top: "15%", left: "30%" },
  { text: "NEGATIVE SPACE", top: "70%", left: "70%" },
  { text: "TYPOGRAPHY", top: "40%", left: "80%" },
  { text: "THE INVISIBLE", top: "80%", left: "20%" },
  { text: "LOOK CLOSER", top: "25%", left: "60%" },
];

export default function MicroscopicText() {
  return (
    <motion.div
      className={`${styles.container} mono`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
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
