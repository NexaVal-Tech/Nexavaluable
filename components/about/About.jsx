"use client";
import React from "react";

function About() {
  return (
    <section className="w-full flex items-center justify-center my-10 sm:my-28 md:my-32">
      <div className="w-[100%] rounded-[40px] flex items-center justify-center pb-5 max-w-[1400px]">
        <div className="w-[95%]">
          
          {/* Flex wrapper */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-8 text-black">
            
            {/* Left: Heading */}
            <div className="sm:w-1/3 about-heading md:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">About us</h2>
            </div>
            
            {/* Right: Paragraphs */}
            <div className="sm:w-2/3 space-y-5 text-black/80 leading-relaxed font-semibold">
              <p className="text-lg sm:text-xl md:text-2xl">
                Nexaval combines design, development, and AI automation to save
                founders time, cut costs, and speed up launch, so you can focus on
                growth.
              </p>
              <p className="text-lg sm:text-xl md:text-2xl">
                Quality is our benchmark. From concept to launch, we design and
                create digital experiences that stand out and stand the test of
                time.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
