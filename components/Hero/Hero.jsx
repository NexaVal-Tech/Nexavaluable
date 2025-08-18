import React from 'react'
import {SecondryBtn} from '../Button/Buttons'
import {FadeUpOnScroll} from '../Animations/ScrollAnimation'
function Hero() {
  return (
    <div
      className="w-[95%] m-auto mt-5  py-3 
    "
    >
      <div className=" sm:w-[90%] m-auto flex items-center justify-center  mt-5  gap-5">
        <div
          className=" sm:w-[90%]  m-auto 
        text-center   flex flex-col gap-3"
        >
          <p
            className="text-[#565B66] font-[Geist] font-[400] text-[18px] 
          sm:text-[20px] leading-[24px] trackin-[-2%]
         mt-5"
          >
            We don’t just build apps. We build startups.
          </p>

          <div className="heroText heroTextFont font-[500]  w-[90%] m-auto sm:w-full text-[50px] sm:text-[70px] ">
            <div data-aos="fade-up">
              Your Trusted Tech Team: From
              <span className="heroStyledText"> Idea to Launch</span>
            </div>
          </div>

          <div className="">
            <p
              className="sm:w-[55%] w-[90%] m-auto   sm:text-[14px] ptBody sm:mt-5 cd-description "
              data-aos="zoom-in"
            >
              Nexaval helps startups go from zero to launch with branding,
              design, apps, and end-to-end security at founder-friendly prices
            </p>
          </div>

          <div className=" mb-3 w-[100%] flex items-center justify-center mt-4">
            <SecondryBtn />
          </div>

          <FadeUpOnScroll />
        </div>
      </div>
    </div>
  );
}

export default Hero