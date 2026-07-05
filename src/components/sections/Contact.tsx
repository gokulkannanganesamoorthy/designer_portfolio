"use client";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [interest, setInterest] = useState("");

  return (
    <section className={styles.container} id="contact">
      <div className={styles.content}>
        <h2 className={styles.title}>Start a Conversation</h2>
        
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.sentence}>
            <span>I am</span>
            <div className={styles.inputWrapper} data-value={name || "your name"}>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="your name"
                className={styles.input}
              />
            </div>
            <span>, my profession is</span>
            <div className={styles.inputWrapper} data-value={profession || "your profession"}>
              <input 
                type="text" 
                value={profession} 
                onChange={(e) => setProfession(e.target.value)} 
                placeholder="your profession"
                className={styles.input}
              />
            </div>
            <span>.</span>
          </div>
          
          <div className={styles.sentence}>
            <span>I'd like to talk about</span>
            <div className={styles.inputWrapper} data-value={interest || "what you're building"}>
              <input 
                type="text" 
                value={interest} 
                onChange={(e) => setInterest(e.target.value)} 
                placeholder="what you're building"
                className={styles.input}
              />
            </div>
            <span>.</span>
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
