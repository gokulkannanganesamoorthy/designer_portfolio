"use client";

import { motion } from "framer-motion";
import styles from "./GridBackground.module.css";

export default function GridBackground() {
  return (
    <motion.div
      className={styles.gridBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
    />
  );
}
