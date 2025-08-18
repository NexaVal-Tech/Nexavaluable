import React from 'react'
import { PrimaryBtns } from "../Button/Buttons";
import { ZoomAnimation,FadeInCard, FadeUpOnScroll } from "../Animations/ScrollAnimation";
function ambitiousCard() {

  const Card = ({ title, description})=>{
    return (
      <FadeUpOnScroll>
        <div className=" bg-white p-4 rounded-[24px] max-h-[fit] ">
          <h5 className="cd-title">{title}</h5>
          <p className="cd-description ">{description}</p>
        </div>
      </FadeUpOnScroll>
    );
  }



  return (
    <div
      className="w-full  
      flex items-center justify-center 
      sm:pt-5
     
     
    "
    >
      <div className="  ambinution  w-[98%] rounded-[40px] flex items-center justify-center pb-5 border-5 border-white-100  max-w-[1200px]">
        <div className="containt-holder  w-[90%] ">
          <div className=" sm:w-[55%] m-auto mt-5  text-white">
            <FadeInCard>
              <div className="amb-style pt-7 ">
                For ambitious founders and fast-growing teams.
              </div>
            </FadeInCard>
            <p className="amp-p mt-2">
              We help you move from concept to launch with a full stack of
              creative and technical services.{" "}
            </p>
            <div className="flex items-center justify-center mt-4">
              <PrimaryBtns />
            </div>
          </div>

          <div className=" mt-4   grid  sm:grid-cols-3 gap-5 ">
            <Card
              title="Product Strategy"
              description={
                "We help shape your idea into a clear plan so you’re building something people actually want"
              }
            />

            <Card
              title="Brand Identity Design"
              description={
                "We design the visuals and story behind your brand so you show up consistently and confidently."
              }
            />

            <Card
              title="UI/UX Design"
              description={
                "We create clean, intuitive interfaces that make it easy for users to do what they came to do. No guesswork, no friction."
              }
            />

            <Card
              title="Web Development"
              description={
                "We build fast, responsive websites that look great, work well, and grow with your business."
              }
            />
            <Card
              title="Mobile App Development"
              description={
                "We design and build mobile apps that are smooth, stable, and easy to use whether it’s iOS, Android, or both."
              }
            />

            <Card
              title="SEO"
              description={
                "We set you up with the right structure, tools, and keywords so your site ranks better and attracts the right people."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ambitiousCard