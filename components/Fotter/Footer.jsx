import React from 'react'
import { PrimaryBtn } from "../Button/Buttons";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6"; 
function Footer() {
 
  return (
    // <footer className="mt-10 w-[100%] h-[800px] bg-[#0B0B0D] ">
    //   <div className="w-[100%] h-[40%] footerbg"></div>
    //   <div></div>
    // </footer>

    <div>
      <section
        className="relative flex justify-center px-4 sm:py-12 bg-[#0B0B0D] footerbg mt-5"
        data-aos="zoom-in"
      >
        {/* Glow Background */}
        <div className="absolute inset-0 flex justify-center -z-10">
          <div className="w-[90%] max-w-5xl h-[300px] rounded-[40px] " />
        </div>
        {/* Pill Box */}
        <div className="w-full max-w-5xl rounded-[30px] px-3 sm:px-10 md:px-16 py-5 sm:py-12 text-center footer mt-5 ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight  text-[#FFFFFF] font-[Geist] ">
            Join thousands of startups 
             <br className="hidden sm:block " />
             building with Nexaval Tech
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90">
            Let’s bring your product to life.
          </p>
          <div className="mt-6 inline-block">
            <PrimaryBtn />
          </div>
        </div>
      </section>
      {/* Footer */}
     <footer className="bg-[#0B0B0D] px-6 sm:px-10 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-4">
            <img src="./images/logos/logo.svg" alt="Logo" />
            <p className="mt-4 text-sm text-white/50">
              Turn your bold ideas into real products.
            </p>
            <p className="mt-6 text-xs text-white">© 2025 nexavaltech. All rights reserved.</p>
          </div>

          {/* Contact */}
          <div className="md:col-span-2" id="contact">
            <h3 className="text-xs font-medium text-white/50">CONTACT US</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>info@nexavaluable.com</li>
              <li>+1 (276) 252-8415</li>
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-medium text-white/50">FOLLOW US</h3>
            <div className="flex gap-4 mt-3">
              <a href="https://linkedin.com/company/nexavaltech" target="_blank" className="text-white/70 hover:text-white text-xl">
                <FaLinkedin />
              </a>
              <a href="https://x.com/nexavaltech?s=21&t=9tFp9MOEMwLJO-CS7YB80Q" target="_blank" className="text-white/70 hover:text-white text-xl">
                <FaXTwitter />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default Footer