import React from 'react'
import {SecondryBtn} from '../Button/Buttons'
import {FadeUpOnScroll} from '../Animations/ScrollAnimation'
function Hero() {
  return (
    <div
      className="w-[100%] m-auto mt-5  py-3 
    "
    >
      <div className=" sm:w-[90%] m-auto flex items-center justify-center  mt-5  gap-5">
        <div
          className=" sm:w-[90%]  m-auto 
        text-center   flex flex-col gap-3"
        >
         

          <div className="heroText heroTextFont font-[500]  w-[90%] m-auto sm:w-full text-[50px] sm:text-[70px] mt-5 ">
            <div data-aos="fade-up">
              Your Trusted Tech Team. <br /> From
              <span className="heroStyledText"> Idea to Launch.</span>
            </div>
          </div>

          <div className="">
            <p
              className="sm:w-[55%] w-[90%] m-auto   sm:text-[14px] ptBody sm:mt-5 cd-description "
              data-aos="zoom-in"
            >
              Nexaval combines design, development, and AI automation to save
              founders time, cut costs, and speed up launch, so you can focus on
              growth.
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