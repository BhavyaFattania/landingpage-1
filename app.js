import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import "./styles.css"; // Make sure to create a CSS file for your styles.

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="image-section">
      <div ref={ref}>
        <img src={`/${id}.jpg`} alt={`Image ${id}`} className="parallax-image" />
      </div>
      <motion.h2 style={{ y }} className="parallax-caption">{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="dots"></div>
        </div>
        <h1>UNLOCK <span>TRANSLATION</span></h1>
        <p>Transform your text with true-to-life, contextual translations</p>
        <div className="buttons">
          <button className="get-started">GET STARTED</button>
          <button className="dev-docs">DEV DOCS</button>
        </div>
      </div>

      {/* Parallax image sections */}
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}

      {/* Progress bar */}
      <motion.div className="progress" style={{ scaleX }} />
    </>
  );
}
