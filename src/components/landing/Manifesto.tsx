"use client";

import { motion } from "framer-motion";
import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <div className={styles.manifestoContainer}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
      >
        <p className={styles.manifestoText}>
          Titles describe tools. <br />
          Experiences describe people. <br /><br />
          <span className={styles.highlight}>I design experiences.</span>
        </p>
      </motion.div>
    </div>
  );
}
