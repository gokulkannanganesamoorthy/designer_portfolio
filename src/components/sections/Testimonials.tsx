"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Testimonials.module.css";

import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate the rotation.
  // 4 items, 90 degrees apart.
  // When scroll = 0, rotateX = 0.
  // When scroll = 1, rotateX = -270deg (to show the 4th item which is at 270deg).
  const rotateX = useTransform(scrollYProgress, [0, 1], ["0deg", `-${(testimonials.length - 1) * 90}deg`]);

  return (
    <section ref={targetRef} className={styles.container} id="testimonials">
      <div className={styles.stickyContainer}>
        <div className={styles.perspective}>
          <motion.div style={{ rotateX }} className={styles.cylinder}>
            {testimonials.map((testimonial, index) => {
              // Calculate the angle for this item
              const angle = index * 90;
              return (
                <div 
                  key={testimonial.id} 
                  className={styles.testimonialItem}
                  style={{
                    transform: `rotateX(${angle}deg) translateZ(40vh)`
                  }}
                >
                  <p className={styles.quote}>"{testimonial.text}"</p>
                  <div className={styles.author}>
                    <span className={styles.name}>{testimonial.name}</span>
                    <span className={styles.role}>{testimonial.role}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
