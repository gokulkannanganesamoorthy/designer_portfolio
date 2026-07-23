"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./Navigation.module.css";
import { navigationLinks as links } from "@/lib/data";

interface NavigationProps {
  delay?: number;
}

export default function Navigation({ delay = 0 }: NavigationProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={styles.navContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay, ease: [0.2, 0, 0, 1] }}
    >
      <motion.nav 
        className={styles.navPill}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <AnimatePresence>
          {!isHovered ? (
            <motion.div 
              key="icon"
              className={styles.menuIcon}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ position: "absolute", originX: 0, left: 20 }}
            >
              <div className={styles.hamburgerLine} />
              <div className={styles.hamburgerLine} />
            </motion.div>
          ) : (
            <motion.div 
              key="links"
              className={styles.linksWrapper}
              initial={{ opacity: 0, width: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, width: "auto", filter: "blur(0px)" }}
              exit={{ opacity: 0, width: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              {links.map((link) => (
                <Link key={link.name} href={link.href} className={styles.navItem}>
                  <span>{link.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}
