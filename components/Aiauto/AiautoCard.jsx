import React from 'react'
import {SecondryBtn} from '../Button/Buttons'
import {FadeUpOnScroll} from '../Animations/ScrollAnimation'
function AiautoCard() {
  return (
    <div className="container mt-5 bg-[#FFFFFF1A]  ">
      <div
        className="m-auto sm:h-[400px] flex flex-col 
 sm:flex-row sm:justify-between

 gap-10
        "
      >
        <div
          className=" md:w-[45%] flex gap-2 h-2/4 flex-col  "
          data-aos="fade-right  "
        >
          <p
            className="aiauto cd-title text-center sm:!text-left  leading-3 "
            data-aos="fade-right  "
          >
            AI Automation & Cybersecurity Solutions
          </p>
          <div className="cd-description text-center sm:!text-left mt-2">
            We leverage advanced AI to streamline your operations and deliver
            robust, end-to-end cybersecurity to protect your organization from
            emerging threats.
          </div>
          <FadeUpOnScroll>
            <div className="w-full  mt-3 flex items-center justify-center sm:items-start sm:justify-start">
              <SecondryBtn />
            </div>
          </FadeUpOnScroll>
        </div>

        <div className="image sm:w-[45%] overflow-hidden" data-aos="zoom-in-up">
          <div className="aiimage">
            <img src="./images/aiImage.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiautoCard