'use client';

import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className="mono-label">Got a project in mind?</span>
        </div>
        
        <h2 className={styles.title}>
          Ready to<br />Stand Out?
        </h2>
        
        <div className={styles.ctaWrapper}>
          <a href="mailto:hello@gokulmakes.in" className={styles.emailBtn}>
            Let's Talk
          </a>
          <span className={styles.emailText}>hello@gokulmakes.in</span>
        </div>
      </div>
    </section>
  );
}
