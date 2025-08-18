import React from 'react'
import { useEffect, useState } from "react";
import { SecondryBtn } from '../Button/Buttons'

import Link from 'next/link'
function Menu() {
   const [path, setPath] = useState("");
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        setPath(window.location.pathname);
        console.log("Current path:", window.location.pathname);
      }
    }, []);


    
  return (
    <div
      className="w-[300px] bg-white h-[150px] absolute right-6 top-16 rounded-md flex flex-col items-center justify-center "
      data-aos="flip-down"
    >
      <nav>
        <ul className="text-black mb-2 font-[Geist] text-[20px]">
          {path !== "/" ? (
            <li>
              <Link href="/">Home</Link>
            </li>
          ) : (
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
          )}
        </ul>
      </nav>
      <div className=" inline-block ">
        <SecondryBtn />
      </div>
    </div>
  );
}

export default Menu