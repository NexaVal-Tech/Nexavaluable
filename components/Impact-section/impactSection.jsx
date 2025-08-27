import { color } from 'motion';
import React from 'react'
import { FadeUpOnScroll } from '../Animations/ScrollAnimation';

function ImpactSection() {

// 
const Card = ({ number, title, descrption, style, textColor, nucolor }) => {
  return (
    <FadeUpOnScroll>
      <div
        className="impactCard
          sm:w-[250px]
          w-[90%]
          m-auto
          h-[350px]
          sm:h-[300px] flex flex-col "
        style={style}
      >
        <div
          className=" w-[90%]  mt-2 flex m-auto  font-[Geist]  tracking-wide  text-[#F26969] text-[20px] "
          style={nucolor}
        >
          {number}
        </div>

        <div className="text mb-3">
          <div className=" cd-title">{title}</div>
          <div className=" cd-description  " style={textColor}>
            {descrption}
          </div>
        </div>
      </div>
    </FadeUpOnScroll>
  );
};

  return (
    <div className="container text-center mt-5 max-width  mb-5">
      <div className="text">
        <div
          className=" cd-title
          font-[800] text-[35px] font-[Geist]  p-2"
        >
          <span
            className="text-[#F59E0B]
            "
          >
            Built for Impact <span> </span>- <span> </span>
          </span>
          Delivered with Excellence
        </div>

        <FadeUpOnScroll>
          <div className="col sm:w-[60%] m-auto">
            <div className="text-explain cd-description prbtns text-[14px] ">
              We design and build digital experiences with precision and
              purpose; blending innovative design, robust development, and best
              practices to create solutions that captivate users, drive growth,
              and stand the test of time.
            </div>
          </div>
        </FadeUpOnScroll>
      </div>

      <div
        className="container mt-5 h-fit 
       grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5



      "
      >
        <Card
          number={"[ 01 ]"}
          title={"Trusted Expert"}
          descrption={
            "You get a lean, senior team that thinks like founders. Every feature has a purpose -focused, fast, and accountable."
          }
          textColor={{
            color: "#565B66",
          }}
        />
        <Card
          number={"[ 02 ]"}
          title={"Exceptional Quality."}
          descrption={
            "We design and build digital experiences with precision and purpose; blending innovative design and robust development"
          }
          style={{
            background:
              "linear-gradient(163.36deg, #5B1EF6 -33.94%, #F59E0B 18.93%, #5B1EF6 48.37%, #DE492B 97.22%)",
            color: "white",
          }}
          nucolor={{ color: "white" }}
        />
        <Card
          number={"[ 03 ]"}
          title={"Security from Day One"}
          descrption={
            "We bake cybersecurity into every layer of your product. Keep users safe, data secure, and investors confident."
          }
          textColor={{
            color: "#565B66",
          }}
        />
        <Card
          number={"[ 04 ]"}
          title={"Founder-Friendly Pricing"}
          descrption={
            "You're early-stage, we get it. No bloated budgets. Top-tier quality, clear milestones without burning your runway."
          }
          textColor={{
            color: "#565B66",
          }}
        />
      </div>
    </div>
  );
   
  
}

export default ImpactSection;