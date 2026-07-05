"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Design Director, Nexus",
    text: "Gokul doesn't just design interfaces, he designs the feeling of using them. A rare talent."
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Founder, Aether",
    text: "The invisible cylinder effect you're looking at right now? Yeah, that's exactly why we hired him."
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "VP Product, Horizon",
    text: "He understands that the best design is the one you don't even realize you're using until it's gone."
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Creative Lead, Voda",
    text: "Every interaction is considered. Every pixel has a purpose. Pure digital craftsmanship."
  }
];

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
