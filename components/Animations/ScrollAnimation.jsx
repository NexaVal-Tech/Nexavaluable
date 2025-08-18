"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export  const  ScrollFadeIn =({ children, delay = 0 }) =>{
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}






export const  FadeInCard=({ children })=> {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // starting state
      whileInView={{ opacity: 1, y: 0 }} // when in view
      viewport={{ once: true, amount: 0.2 }} // trigger when 20% visible
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}



export const  FadeUpOnScroll=({ children })=> {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 }); // 30% visible

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="fade-up-item"
    >
      {children}
    </motion.div>
  );
}



// import * as motion from "motion/react-client";

export  const ZoomAnimation = ({ children }) => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
     
    >
      {children}
    </motion.div>
  );
};


