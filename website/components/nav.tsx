"use client"

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRightAlt } from "react-icons/cg";

export default function Nav() {
  return (
    <div className="sticky top-0 z-50 bg-midnight w-full backdrop-blur supports-[backdrop-filter]:bg-midnight/65">
      <div className="flex h-14 justify-between barwidth:justify-center items-center">
        <div className="flex items-center ml-4.5 mr-0 barwidth:ml-0 barwidth:mr-[700px]">
          <a className="flex items-center h-16 px-2 mr-6" href="../home">
            <img className="h-[26px] w-auto mr-2.5" src="/images/prowlerlogo.png" alt="Prowler Logo" />
            <p className="font-intersemibold text-[20px] text-offwhite">prowler</p>
          </a>
          <div className="hidden navwidth:block">
            <ul className="flex items-center gap-8 ml-5 mt-0.5">
              <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200" href="../browse">Browse</a>
              <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200" href="#">FAQs</a>
              <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200" href="#">Contact</a>
              <a className="font-intersemibold text-[15px] text-grey hover:text-offwhite px-1 py-0.5 transition-colors duration-200" href="#">GitHub</a>
            </ul>
          </div>
        </div>
        <div className="flex mr-2.5 small:mr-4.5 barwidth:mr-0">
          <div className="hidden navwidth:flex mr-1 h-[40px]">
            <a className="font-intersemibold text-[15px] text-offwhite mr-3 px-3.5 flex flex-col justify-center h-full rounded-md bg-lightmidnight" href="#">Login</a>
            <a className="flex bg-offwhite hover:bg-darkwhite rounded-md h-[40px] my-auto items-center px-2 transition-all duration-200" href="#">
              <p className="ml-1.5 font-intersemibold text-[15px]">Sign Up</p>
              <img className="h-7 w-7 ml-1" src="/images/arrowtopright.png" alt="Arrow" />
            </a>
          </div>
          <a className="px-1.5 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-200 cursor-pointer navwidth:hidden">
            <CgMenuRightAlt className="text-offwhite h-8 w-8 navwidth:hidden"/>
          </a>
        </div>
      </div>
      <div className="w-full h-px bg-lightmidnight"></div>
    </div>
  );
}
