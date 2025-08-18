"use client";
import React from "react";
import { motion } from "framer-motion";
import { FadeUpOnScroll } from "../Animations/ScrollAnimation";

const images = [
  "/images/firstcard.png",
  "/images/secondCard.png",
  "/images/lastCard.png",
];

function ScrollingCards() {
  return (
    <FadeUpOnScroll>
      <div className="relative w-full overflow-hidden py-6 ">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 25, // speed of scroll (adjust as needed)
            repeat: Infinity,
          }}
        >
          {/* We duplicate the images array to create the infinite loop */}
          {[...images, ...images,].map((src, i) => (
            <div
              key={i}
              className="min-w-[300px] sm:min-w-[500px] h-[200px] sm:h-[360px] rounded-2xl   overflow-hidden"
            >
              <img
                src={src}
                alt={`scroll-card-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </FadeUpOnScroll>
  );
}

export default ScrollingCards;
