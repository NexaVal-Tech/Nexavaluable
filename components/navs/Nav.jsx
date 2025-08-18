import React from 'react'
import { useEffect, useState } from "react";
import {MenuOutlined} from "@ant-design/icons";
import Link from "next/link";
import { PrimaryBtn } from "../Button/Buttons";
function Nav() {
  const [path, setPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
      console.log("Current path:", window.location.pathname);
    }
  }, []);
  

  return (
    <div className="w-[90.50%] sm:w-2/4 bg-[#0B0B0D]  mt-2  p-2 sm:p-2 text-white rounded-full flex items-center justify-between sm:items-center wd50 sm:max-w-[700px]">
      <div className="w-[40%] sm:w-[25%] ">
        <img
          className=" "
          src="/images/logos/logo.svg "
          alt="nevavaltech logo"
        />
      </div>

      <div className=" w-[30%] hidden  sm:block ">
        <ul className="flex  items-center justify-around  ">
          {path === "/" ? (
            <div className="flex items-center justify-center gap-1 ">
              <div className="circle w-[8px] h-[8px] bg-white  rounded-full"></div>
              <li className="text-[white] font-[Geist] text-[14px]">
                <Link href="/">Home</Link>
              </li>
            </div>
          ) : (
            <li className="text-[#C4C7CC] font-[Geist] text-[14px] ">
              <Link href="/">Home</Link>
            </li>
          )}

          {path === "/contact" ? (
            <div className="flex items-center justify-center gap-2">
              <div className="circle w-[10px] h-[10px] bg-white rounded-full"></div>
              <li className="text-[white] font-[Geist] text-[14px]">
                <Link href="/contact">Contact Us</Link>
              </li>
            </div>
          ) : (
            <li className="text-[#C4C7CC] font-[Geist] text-[14px] ">
              <Link href="/contact">Contact Us</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="w-[35%] hidden  sm:block">
        <PrimaryBtn />
      </div>

      <div className="menu sm:hidden">
        <img src="/icons/menu.svg" alt="menu" className="w-[30px] h-[30px]" />
      </div>
    </div>
  );
}

export default Nav