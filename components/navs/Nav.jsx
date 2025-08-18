import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { PrimaryBtn } from "../Button/Buttons";
import Menu from "../PhoneMenu/menu";

function Nav() {
  const [dropDown, setDropDown] = useState(false);
  const [path, setPath] = useState("");
  const dropdownRef = useRef(null);

  // Get current path
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);

  // Close dropdown on outside click, Escape key, or scroll
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setDropDown(false);
    }

    function handleScroll() {
      setDropDown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-[90.50%] sm:w-2/4 bg-[#0B0B0D] mt-2 p-2 sm:p-2 
      text-white rounded-full flex items-center justify-between sm:max-w-[700px]"
      ref={dropdownRef}
    >
      {/* Logo */}
      <div className="w-[40%] sm:w-[25%]">
        <img src="/images/logos/logo.svg" alt="nevavaltech logo" />
      </div>

      {/* Desktop Links */}
      <div className="w-[30%] hidden sm:block">
        <ul className="flex items-center justify-around">
          <li
            className={`font-[Geist] text-[14px] ${
              path === "/"
                ? "text-white flex items-center gap-2"
                : "text-[#C4C7CC]"
            }`}
          >
            {path === "/" && (
              <div className="w-[8px] h-[8px] bg-white rounded-full"></div>
            )}
            <Link href="/">Home</Link>
          </li>
          <li
            className={`font-[Geist] text-[14px] ${
              path === "/contact"
                ? "text-white flex items-center gap-2"
                : "text-[#C4C7CC]"
            }`}
          >
            {path === "/contact" && (
              <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
            )}
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      {/* Desktop CTA */}
      <div className="w-[35%] hidden sm:block">
        <PrimaryBtn />
      </div>

      {/* Mobile Menu */}
      {dropDown && <Menu />}

      {/* Menu Icon */}
      <div className="menu sm:hidden">
        <img
          src="/icons/menu.svg"
          alt="menu"
          className="w-[30px] h-[30px] cursor-pointer"
          onClick={() => setDropDown(!dropDown)}
        />
      </div>
    </div>
  );
}

export default Nav;
