'use client';

import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { personalInfo } from '@/lib/data';

export default function Contact() {
  return (
    <section className={styles.container} id="contact">
      <motion.h2 
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
      >
        HAVE SOMETHING<br />WORTH BUILDING?
      </motion.h2>
      
      <motion.p 
        className={styles.subheading}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        Tell me what you're working on.<br />I'll tell you what I'd change.
      </motion.p>

      <motion.form 
        className={styles.conversationalForm}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1, delay: 0.5, ease: [0.2, 0, 0, 1] }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          Hi, my name is 
          <input type="text" placeholder="your name" className={styles.inputField} /> 
          and I am a 
          <input type="text" placeholder="profession / company" className={styles.inputField} />.
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          I am currently building 
          <input type="text" placeholder="what you're building" className={styles.inputField} style={{ width: '300px' }} />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          and you can reach me at 
          <input type="email" placeholder="your email address" className={styles.inputField} />.
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" className={styles.submitBtn}>
            START A CONVERSATION
          </button>
        </div>
      </motion.form>

      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span className={styles.footerTitle}>{personalInfo.name.toUpperCase()}</span>
          <span>{personalInfo.title}</span>
          <span>{personalInfo.role}, {personalInfo.company}</span>
          <span style={{ marginTop: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-cormorant), serif', fontSize: '1rem' }}>
            Designing the Invisible.<br />Building things people remember.
          </span>
        </div>
        <div className={styles.footerRight}>
          <a href="mailto:hello@gokulmakes.in" className={styles.footerLink}>EMAIL</a>
          <a href="#" className={styles.footerLink}>LINKEDIN</a>
          <a href="#" className={styles.footerLink}>INSTAGRAM</a>
        </div>
      </footer>
    </section>
  );
}
