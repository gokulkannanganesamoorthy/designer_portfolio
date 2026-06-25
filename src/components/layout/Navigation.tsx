"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Navigation.module.css";

const links = [
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Process", href: "/process" },
  { name: "Contact", href: "/contact" },
];

interface NavigationProps {
  delay?: number;
}

export default function Navigation({ delay = 0 }: NavigationProps) {
  return (
    <motion.nav 
      className={styles.nav}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay, ease: [0.2, 0, 0, 1] }}
    >
      {links.map((link) => (
        <Link key={link.name} href={link.href} className={styles.navItem}>
          <span>{link.name}</span>
          <span className={styles.dash}>—</span>
        </Link>
      ))}
    </motion.nav>
  );
}
