import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-start">
          <a className="flex" href="../home">
            <img className="h-14 w-auto mt-1 pl-6" src="/images/prowlerlogo.png" alt="Prowler Logo"></img>
            <div className="font-azosans text-header font-bold text-offwhite mt-3 pr-8">Prowler</div>
          </a>
          <ul className="flex items-center gap-8 ml-10 mt-4">
            <a className="font-galvji text-base text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-10" href="../browse">Browse</a>
            <a className="font-galvji text-base text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-10" href="../faqs">FAQs</a>
            <a className="font-galvji text-base text-offwhite px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-10" href="../report">Report Error</a>
          </ul>
        </div>
        <div className="flex items-end mr-4">
          <a className="font-galvji text-base text-offwhite mb-2 mr-4 px-3 py-1 rounded-md hover:bg-lightmidnight transition-colors duration-10" href="#">Login</a>
          <a className="flex bg-transparent bg-gradient-to-r from-button to-lightbutton hover:from-buttonhover hover:to-lightbuttonhover w-30 h-10 mt-2 text-offwhite font-galvji rounded-lg transition duration-100 font-bold place-content-center items-center mb-1" href="../signup">Sign Up<img className="h-4.5 w-4.5 ml-2" src="/images/arrowtopright.png" alt="Arrow"></img></a>
        </div>
      </div>
      <div className="w-full h-px bg-lightmidnight mt-1"></div>
    </div>
  );
}
