import React from 'react'
import { useState, useEffect } from 'react';
import Link from "next/link";
function sideBar() {
const [path, setPath] = useState("")


useEffect(()=>{
      console.log("useeffect is running")
      setPath(window.location.pathname);
//   const currentPath = window.location.pathname;
console.log(path);
})

  return (
    <div className="w-[250px]  h-100 p-3 sticky flex flex-col justify-between text-[Inter] border-r-2">
      <div className="w-[95%]">
        <div className="logo">
          <img src="/images/logos/darklogo.svg" alt="dark logo" />
        </div>
        <div className="nav mt-4">
          <ul className=" w-full">
            {path === "/admin" ? (
              <Link href={"/"}>
                <li className="w-full flex items-center justify-between bg-[#F0F1F2] p-2 rounded-[8px] ">
                  <div className="flex gap-2">
                    <img
                      src="/icons/Homes.svg"
                      alt=""
                      height="20px"
                      width="20px"
                    />
                    <span className="font-[500] font-[Inter]">Home</span>
                  </div>
                  <span>
                    <img src="/icons/Rignagle.svg" alt="" />
                  </span>
                </li>
              </Link>
            ) : (
              <Link href={"./"}>
                <li className="w-full flex items-center justify-between p-2 rounded-[8px] ">
                  <div className="flex gap-2">
                    <img
                      src="/icons/Homes.svg"
                      alt=""
                      height="20px"
                      width="20px"
                    />
                    <span className="font-[500] font-[Inter]">Home</span>
                  </div>
                  <span>
                    <img src="/icons/Rignagle.svg" alt="" />
                  </span>
                </li>
              </Link>
            )}
            {path === "/admin/email" ? (
              <Link href={"/admin/email"}>
                <li className="w-full flex items-center justify-between mt-4 p-2  bg-[#F0F1F2] rounded-[8px]">
                  <div className="flex gap-2">
                    <img
                      src="/icons/mail_line.svg"
                      alt=""
                      height="20px"
                      width="20px"
                    />
                    <span className="font-[500] font-[Inter]">Email</span>
                  </div>
                  <span>
                    <img src="/icons/Rignagle.svg" alt="" />
                  </span>
                </li>
              </Link>
            ) : (
              <Link href={"/admin/email"}>
                <li className="w-full flex items-center justify-between mt-4 p-2  rounded-[8px]">
                  <div className="flex gap-2">
                    <img
                      src="/icons/mail_line.svg"
                      alt=""
                      height="20px"
                      width="20px"
                    />
                    <span className="font-[500] font-[Inter]">Email</span>
                  </div>
                  <span>
                    <img src="/icons/Rignagle.svg" alt="" />
                  </span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>

      <div className="profile w-[95%] mb-2  flex items-center justify-between">
        <div className="profileImg w-[50px] h-[50px] bg-[#F0F1F2] rounded-full font-[Inter] font-[400] flex items-center justify-center text-center">
          Ejiro
        </div>
        <div className="profileIFor w-[50%] overflow-hidden">
          <h3 className=" !font-[Geist] !font-[400] text-[16px] ">Ejiro</h3>
          <p className="ProfileEmail text-[12px]">ejiro@gmail...</p>
        </div>
        <div className="logoutBtn ml-3">
          <img src="/icons/log out.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default sideBar