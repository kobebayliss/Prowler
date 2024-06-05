import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { CgMenuRightAlt } from "react-icons/cg";

export default function Nav() {
  return (
    <div className="sticky top-0 z-50 bg-midnight w-full backdrop-blur supports-[backdrop-filter]:bg-midnight/65">
      <div className="flex h-16 justify-between items-center">
        <div className="flex items-center">
          <a className="flex items-center h-16" href="../home">
            <img className="h-14 w-auto pl-6" src="/images/prowlerlogo.png" alt="Prowler Logo" />
            <div className="font-azosans text-header text-offwhite pr-8 mt-1">Prowler</div>
          </a>
          <div className="hidden navwidth:block">
            <ul className="flex items-center gap-6 ml-5">
              <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1.5 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="../browse">Browse</a>
              <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1.5 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="#">FAQs</a>
              <a className="font-inter text-base text-grey hover:text-offwhite px-3 py-1.5 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="#">Report Error</a>
            </ul>
          </div>
        </div>
        <div className="flex">
          <div className="hidden navwidth:block">
            <a className="font-inter text-base text-offwhite mr-2 px-3 py-2 rounded-md hover:bg-lightmidnight transition-colors duration-200" href="#">Login</a>
            <a href="#">
              <Button className="mr-3">
                <p className="ml-3">Sign Up</p>
                <img className="h-7 w-7 ml-1" src="/images/arrowtopright.png" alt="Arrow" />
              </Button>
            </a>
          </div>
          <a className="px-1.5 py-1 mr-2 rounded-md hover:bg-lightmidnight transition-colors duration-200 cursor-pointer navwidth:hidden">
            <CgMenuRightAlt className="text-offwhite h-8 w-8 navwidth:hidden"/>
          </a>
        </div>
      </div>
      <div className="w-full h-px bg-lightmidnight"></div>
    </div>
  );
}
