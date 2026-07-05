"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

type Layout = "center" | "left" | "stagger";
type InputStyle = "minimal" | "highlight" | "ghost";

export default function Contact() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [interest, setInterest] = useState("");
  const [email, setEmail] = useState("");

  const isFormFilled = name && profession && interest && email;

  return (
    <section className={styles.container} id="contact">
      <div className={`${styles.content} ${styles['layout-center']}`}>
        <h2 className={styles.title}>Start a Conversation</h2>
        
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.paragraph}>
            <span className={styles.line1}>Hi, my name is{" "}</span>
            <div className={`${styles.inputWrapper} ${styles['input-minimal']}`} data-value={name || "your name"}>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="your name" className={styles.input} />
            </div>
            <span className={styles.line2}>, and my profession is{" "}</span>
            <div className={`${styles.inputWrapper} ${styles['input-minimal']}`} data-value={profession || "your profession"}>
              <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} placeholder="your profession" className={styles.input} />
            </div>
            <span className={styles.line3}>. I'd like to collaborate on{" "}</span>
            <div className={`${styles.inputWrapper} ${styles['input-minimal']}`} data-value={interest || "what you're building"}>
              <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="what you're building" className={styles.input} />
            </div>
            <span className={styles.line4}>. You can reach me at{" "}</span>
            <div className={`${styles.inputWrapper} ${styles['input-minimal']}`} data-value={email || "your email"}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" className={styles.input} />
            </div>
            <span className={styles.line5}>.</span>
          </div>
          
          <motion.button 
            type="submit" 
            className={`${styles.submitBtn} ${isFormFilled ? styles.ready : ""}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
}
