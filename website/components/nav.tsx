import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button"

export default function Nav() {
  return (
    <div className="sticky top-0 z-50 bg-midnight w-full backdrop-blur supports-[backdrop-filter]:bg-midnight/70">
      <div className="flex justify-between items-center pb-1">
        <div className="flex items-start">
          <a className="flex" href="../home">
            <img className="h-14 w-auto mt-1 pl-6" src="/images/prowlerlogo.png" alt="Prowler Logo"></img>
            <div className="font-azosans text-header text-offwhite mt-3 pr-8">Prowler</div>
          </a>
          <ul className="flex items-center gap-8 ml-10 mt-4">
            <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="../browse">Browse</a>
            <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="../faqs">FAQs</a>
            <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="../report">Report Error</a>
          </ul>
        </div>
        <div className="flex items-end mr-3">
          <a className="font-inter text-base text-offwhite mb-2 mr-4 mt-3.5 px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="#">Login</a>
          <a href="../signup">
          <Button className="mb-4.5px">
            <p className="ml-3">Sign Up</p>
            <img className="h-7 w-7 ml-1" src="/images/arrowtopright.png" alt="Arrow"/>
          </Button>
          </a>
        </div>
      </div>
      <div className="w-full h-px bg-lightmidnight"></div>
    </div>
  );
}
