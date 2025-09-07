import React from 'react'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { getAuthUser } from '../../lib/auth';
import { adminAuth } from '../../lib/Api'; // Import adminAuth from your api

function sideBar() {
const [path, setPath] = useState("")
const [isLoggingOut, setIsLoggingOut] = useState(false);
const user = getAuthUser();
const router = useRouter();

useEffect(()=>{
      console.log("useeffect is running")
      setPath(window.location.pathname);
//   const currentPath = window.location.pathname;
console.log(path);
})

const handleLogout = async () => {
  try {
    setIsLoggingOut(true);
    
    // Call the logout API
    await adminAuth.logout();
    
    // Clear tokens from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
      
      // Clear any other user-related data you might have stored
      localStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminUser");
    }
    
    // Redirect to login page
    router.push('/admin/login');
    
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if API call fails, clear local storage and redirect
    if (typeof window !== 'undefined') {
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      sessionStorage.removeItem("adminUser");
    }
    
    router.push('/admin/login');
  } finally {
    setIsLoggingOut(false);
  }
};

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
              <Link href={"/admin"}>
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
          {user?.name?.charAt(0) || 'E'}
        </div>
        <div className="profileIFor w-[50%] overflow-hidden">
          <h3 className=" !font-[Geist] !font-[400] text-[16px] ">{user?.name || 'Ejiro'}</h3>
          <p className="ProfileEmail text-[12px]">{user?.email?.substring(0, 10) || 'ejiro@gmail'}...</p>
        </div>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`logoutBtn ml-3 p-1 rounded hover:bg-gray-100 transition-colors duration-200 ${
            isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          title="Logout"
        >
          {isLoggingOut ? (
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <img src="/icons/log out.svg" alt="Logout" />
          )}
        </button>
      </div>
    </div>
  );
}

export default sideBar