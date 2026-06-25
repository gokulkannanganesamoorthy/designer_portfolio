"use client";

import { motion } from "framer-motion";
import styles from "./Manifesto.module.css";

export default function Manifesto() {
  return (
    <motion.div
      className={styles.manifestoContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
    >
      <p className={styles.manifestoText}>
        I intentionally don’t introduce myself as a web developer, UI designer, or frontend engineer. 
        Those titles describe tools. They don’t describe what I actually do. <br /><br />
        <span className={styles.highlight}>I design experiences.</span>
      </p>
    </motion.div>
  );
}
