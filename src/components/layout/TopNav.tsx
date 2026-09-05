'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import styles from './TopNav.module.css';

const NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Philosophy', href: '#manifesto' },
  { label: 'Services', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];

export default function TopNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Expand when scrolling down past 100px, collapse when at very top
      if (scrollY > 100) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
      
      lastScrollY.current = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`${styles.nav} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.pillContainer}>
        {/* Hamburger Icon (Visible when collapsed) */}
        <div className={styles.hamburger}>
          <span className={styles.line} />
          <span className={styles.line} />
        </div>

        {/* Links (Visible when expanded) */}
        <div className={styles.linksWrapper}>
          <a href="/" className={styles.logo}>GM</a>
          <div className={styles.divider} />
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${styles.link} ${activeSection === item.href ? styles.active : ''}`}
              onClick={(e) => handleClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
