"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Projects.module.css";

const projects = [
  {
    id: 1,
    title: "E-Commerce Reimagined",
    category: "Web Application",
    url: "shop.example.com",
    bgColor: "#f4f4f5"
  },
  {
    id: 2,
    title: "Financial Dashboard",
    category: "Product Design",
    url: "app.finance.co",
    bgColor: "#fafafa"
  },
  {
    id: 3,
    title: "Editorial Platform",
    category: "Digital Experience",
    url: "read.journal.net",
    bgColor: "#fcfcfc"
  }
];

export default function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate the horizontal movement based on scroll progress.
  // We want to move left by (number of cards - 1) * 100vw
  // 3 cards = 2 * -100vw, which is -66.66% of the 300vw container
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={targetRef} className={styles.carouselContainer} id="projects">
      <div className={styles.stickyContainer}>
        <motion.div style={{ x }} className={styles.carouselTrack}>
          {projects.map((project) => (
            <div key={project.id} className={styles.cardContainer}>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
              </div>
              
              {/* Screen in Screen wrapper */}
              <div className={styles.browserMockup}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.browserUrl}>{project.url}</div>
                </div>
                <div className={styles.browserContent} style={{ backgroundColor: project.bgColor }}>
                  <span className={styles.placeholderText}>Project Preview</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
