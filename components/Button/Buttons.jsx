import React from 'react'
import {ScrollFadeIn} from '../Animations/ScrollAnimation'
export  const PrimaryBtn = () => {
  return (
    <div className="flex-[1.2] text-[400] bg-white rounded-full text-center font-[Geist] text-[#5B1EF6] py-1 px-2 text-[14px]">
      Book a free discorvery call
    </div>
  );
};



export const PrimaryBtns = () => {
  return (
    <div
      className="prbtns
      bg-white
      text-[#5B1EF6]
      border-2
      border-[#5B1EF6]
      text-[14px]
      "
    >
      Book a free discorvery call
    </div>
  );
};






 export  const  SecondryBtn = () => {
  return (
    <ScrollFadeIn>
      <div
        className="
        prbtns
    bg-[#5B1EF6] rounded-full 
     font-[Geist] text-white text-[14px] flex items-center justify-center gap-2
    "
      >
        Book a free discorvery call
        <span>
          <img src="/icons/arrow_right_circle_line.svg" alt="" />
        </span>
      </div>
    </ScrollFadeIn>
  );
};




 export const SecondryBtns = () => {
   return (
     <ScrollFadeIn>
       <div
         className="
        prbtns
    bg-[#5B1EF6] rounded-full 
     font-[Geist] text-white text-[14px] flex items-center justify-center gap-2
    "
       >
         Book a free discorvery call
       </div>
     </ScrollFadeIn>
   );
 };