import React from 'react'
 import { PrimaryBtn } from "../Button/Buttons";
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
        <div
          className="w-full max-w-5xl rounded-[30px] px-3 sm:px-10 md:px-16 py-5 sm:py-12 text-center footergr mt-5 
          
         "
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-tight  text-[#FFFFFF] font-[Geist] ">
            Join thousands of startups
            <br className="hidden sm:block " />
            building with Nexaval Tech
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90">
            Let’s bring your product to life.
          </p>
          <div className="mt-6">
            <a href="#contact" className="inline-block ">
              <PrimaryBtn />
            </a>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        className="bg-[#0b0b0d] px-6 sm:px-10 md:px-16 py-12"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2">
              {/* <div
                className="h-9 w-9 rounded-full bg-gradient-to-r from-[#6A11FF] to-[#2AAEFF] 
                flex items-center justify-center text-white font-bold"
              >
                N
              </div> */}
              <span className="text-xl font-semibold">
                <img src="./images/logos/logo.svg" alt="" />
              </span>
            </div>
            <p className="mt-4 text-sm   text-white/50">
              Turn your bold ideas into real products. <br />
              We design, build, and grow digital products that matter.
            </p>
            <p className="mt-6 text-xs text-white">
              © 2025 nexavaltech. All rights reserved.
            </p>
          </div>
          {/* Services */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-medium text-white/50">SERVICES</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>Product Strategy</li>
              <li>Mobile App Development</li>
              <li>Web Development</li>
              <li>UI/UX</li>
              <li>Brand Identity</li>
              <li>SEO</li>
            </ul>
          </div>
          {/* Company */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-medium text-white/50">COMPANY</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms of Services</li>
            </ul>
          </div>
          {/* Contact */}
          <div className="md:col-span-2" id="contact">
            <h3 className="text-xs font-medium text-white/50">CONTACT US</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>Nexavaltech@gmail.com</li>
              <li>+234567788934</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer