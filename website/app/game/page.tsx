"use client"

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function GamePageContent() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="game_grid h-[calc(100vh-65px)]">
            <div className="flex flex-col ml-8 mt-3">
                <p className="text-offwhite font-inter text-[2.4em]">Ghost of Tsushima</p>
                <p className="text-offwhite font-interlight text-[1.05em]">Reviews: Mostly Positive (632,221)</p>
                <img src="/images/test.jpg" alt="Game picture" className="mt-5 rounded-lg w-full h-auto"/>
                <div className="mt-auto grid grid-cols-3 gap-x-4 h-full items-center">
                    <div className="flex">
                        <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                        <div className="mt-2.5 ml-5 text-inter text-[22px]">
                            <p className="text-darkerwhite">Genres</p>
                            <p className="text-offwhite">Action, Multiplayer</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                        <div className="mt-2.5 ml-5 text-inter text-[22px]">
                            <p className="text-darkerwhite">Developer</p>
                            <p className="text-offwhite">Arrowhead Game Studios</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                        <div className="mt-2.5 ml-5 text-inter text-[22px]">
                            <p className="text-darkerwhite">Publisher</p>
                            <p className="text-offwhite">Playstation PC LLC</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col ml-6 mr-6 mt-6">
                <div className="flex bg-lightmidnight w-full h-[134px] rounded-2xl">
                    <a href="#" className="w-[49.8%] rounded-l-2xl transition-all duration-180 hover:bg-lightermidnight"
                    onMouseEnter={() => { setIsHovered(true); }}
                    onMouseLeave={() => { setIsHovered(false); }}>
                        <p>Hi</p>
                    </a>
                    <div className={`w-[1.5px] bg-offwhite self-center transition-all duration-180 ${isHovered ? 'h-[100%]' : 'h-[60%]'}`}/>
                    <a href="#" className="w-[50%] rounded-r-2xl transition-all duration-180 hover:bg-lightermidnight"
                     onMouseEnter={() => { setIsHovered(true); }}
                     onMouseLeave={() => { setIsHovered(false); }}>
                        <p>Hi</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
