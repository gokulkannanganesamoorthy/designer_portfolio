'use client';

import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        <div className={styles.top}>
          <h2>Let&apos;s build<br />something iconic.</h2>
          <a href="mailto:hello@gokulmakes.in" className={styles.email}>
            hello@gokulmakes.in
          </a>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.col}>
            <span>Social</span>
            <div className={styles.links}>
              <Link href="https://twitter.com/gokulkannan" target="_blank">Twitter / X</Link>
              <Link href="https://linkedin.com/in/gokulkannan" target="_blank">LinkedIn</Link>
            </div>
          </div>
          
          <div className={styles.col}>
            <span>Local Time</span>
            <p className={styles.time}>
              {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>

          <div className={styles.colRight}>
            <p>© {new Date().getFullYear()} Gokul Kannan</p>
            <p>Designed & engineered from scratch.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
