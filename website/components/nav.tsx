"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRightAlt } from "react-icons/cg";
import { TiArrowRightThick } from "react-icons/ti";

export default function Nav() {
  const [showMenu, setShowMenu] = useState(false);
  const [pressedMenu, setPressedMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState("");

  const handleMouseOver = (link) => {
    setHoveredLink(link);
  };

  const handleMouseOut = () => {
    setHoveredLink("");
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="z-50 bg-midnight w-full backdrop-blur supports-[backdrop-filter]:bg-midnight/80 relative">
        <div className="flex h-14 justify-between barwidth:justify-center items-center">
          <div className="flex items-center ml-4.5 mr-0 barwidth:ml-0 barwidth:mr-[700px]">
            <a className="flex items-center h-16 px-2 mr-6" href="../home">
              <img className="h-[26px] w-auto mr-2.5" src="/images/prowlerlogo.png" alt="Prowler Logo" />
              <p className="font-intersemibold text-[20px] text-offwhite">Prowler</p>
            </a>
            <div className="hidden navwidth:block">
              <ul className="flex items-center gap-8 ml-5 mt-0.5">
                <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200 underline-animation1" href="../browse">Browse</a>
                <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200 underline-animation1" href="#">FAQs</a>
                <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200 underline-animation1" href="#">Contact</a>
                <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200 underline-animation1" href="#">GitHub</a>
              </ul>
            </div>
          </div>
          <div className="flex mr-3 small:mr-4.5 barwidth:mr-0">
            <div className="flex mr-1 h-[40px]">
              <a className="font-intersemibold text-[15px] text-offwhite mr-3 px-3.5 flex flex-col justify-center h-full rounded-md bg-lightmidnight hover:bg-[#252525]" href="#">Login</a>
              <a className="flex bg-offwhite hover:bg-darkwhite rounded-md h-[40px] my-auto items-center px-2 transition-all duration-200" href="#">
                <p className="ml-1.5 font-intersemibold text-[15px]">Sign Up</p>
                <img className="h-7 w-7 ml-1" src="/images/arrowtopright.png" alt="Arrow" />
              </a>
            </div>
            <a className="ml-2 w-8 rounded-md hover:bg-lightmidnight transition-colors duration-200 cursor-pointer navwidth:hidden relative flex flex-col items-center justify-center"
              onClick={() => { setShowMenu(!showMenu); setPressedMenu(true) }}>
              <div
                className={`block w-[60%] h-0.5 rounded-sm bg-offwhite transition-transform duration-200 
                ${showMenu ? 'rotate-45 translate-y-1' : ''} `}
              />
              <div
                className={`block w-[60%] h-0.5 rounded-sm bg-offwhite mt-2 transition-transform duration-200 
                ${showMenu ? '-rotate-45 -translate-y-1.5' : ''} `}
              />
            </a>
          </div>
        </div>
        <div className="w-full h-px bg-lightmidnight"></div>
      </div>
      <div className="w-full flex justify-center relative">
        <div className={`h-navwidth:hidden absolute text-offwhite w-[84%] z-40 h-[280px] navwidth:hidden block
        rounded-b-xl outline outline-1 outline-lightmidnight bg-midnight backdrop-blur supports-[backdrop-filter]:bg-midnight/80 
        ${showMenu ? 'animate-menudown pointer-events-auto' : 'animate-menuup pointer-events-none'} ${pressedMenu ? 'block' : 'hidden'}`}
          style={{ top: 0 }}>
          <div className="flex mt-4 flex-col w-full absolute">
            {["../browse", "../faq", "../contact", "../github"].map((href, index) => (
              <a className="flex items-center self-center px-4 mt-4.5 underline-animation" key={index} href={href}  onMouseOver={() => handleMouseOver(href)} onMouseOut={handleMouseOut}>
                <p
                  className={`font-inter text-offwhite text-[20px] px-2 py-1 z-20 transition-opacity
                  ${showMenu ? 'opacity-100' : 'opacity-0'} ${hoveredLink === href ? 'duration-200' : 'duration-200'}`}
                >
                  {index === 0 ? "Browse" : index === 1 ? "FAQs" : index === 2 ? "Contact" : "GitHub"}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
