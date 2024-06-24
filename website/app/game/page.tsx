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
                    <a href="#" className="w-[49.8%] rounded-l-2xl transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                    onMouseEnter={() => { setIsHovered(true); }}
                    onMouseLeave={() => { setIsHovered(false); }}>
                        <div className="flex mt-1 justify-center items-center">
                            <img src="/images/steam.png" alt="Steam logo" className="mr-4 w-auto h-[48px]"/>
                            <p className="text-offwhite font-inter text-[26px]">NZ$ 59.99</p>
                        </div>
                        <p className="font-interlight text-center text-darkerwhite text-[13px] mt-3">Click to view Steam page</p>
                    </a>
                    <div className={`w-[1.5px] bg-offwhite self-center transition-all duration-150 ${isHovered ? 'h-[100%]' : 'h-[60%]'}`}/>
                    <a href="#" className="w-[50%] rounded-r-2xl transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                     onMouseEnter={() => { setIsHovered(true); }}
                     onMouseLeave={() => { setIsHovered(false); }}>
                        <div className="flex mt-2 justify-center items-center">
                            <img src="/images/epic.png" alt="Epic Games logo" className="mr-4 w-auto h-[48px]"/>
                            <p className="text-offwhite font-inter text-[26px]">NZ$ 59.99</p>
                        </div>
                        <p className="font-interlight text-center text-darkerwhite text-[13px] mt-3">Click to view Epic Games page</p>
                    </a>
                </div>
                <a href="#" className="bg-lightmidnight rounded-2xl flex-grow mb-6 mt-6 w-full hover:bg-lightermidnight transition-all duration-150">
                    <p className="font-interlight text-offwhite text-[15.5px] mx-4 mt-3">For the very first time on PC, play through Jin Sakai’s journey and discover the complete Ghost of Tsushima experience in this Director’s Cut. In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan. As the island burns in the wake of the first wave of the Mongol assault, courageous samurai warrior Jin Sakai stands resolute. As one of the last surviving members of his clan, Jin is resolved to do whatever it takes, at any cost, to protect his people and reclaim his home. He must set aside the traditions that have shaped him as a warrior to forge a new path, the path of the Ghost, and wage an unconventional war for the freedom of Tsushima. Experience Ghost of Tsushima with unlocked framerates and a variety of graphics options tailored to a wide range of hardware, ranging from high-end PCs to portable PC gaming devices.*
Get a view of even more of the action with support for Ultrawide (21:9), Super Ultrawide (32:9) and even 48:9 Triple Monitor support.*
Boost performance with upscaling and frame generation technologies like NVIDIA DLSS 3, AMD FSR 3 and Intel XeSS. NVIDIA Reflex and image quality-enhancing NVIDIA DLAA are also supported.**
Japanese lip sync – enjoy a more authentic experience with lip sync for Japanese voiceover, made possible by cinematics being rendered in real time by your PC.
Choose how you</p>
                    <p className="font-inter text-offwhite text-[15.5px] ml-4 mt-1.5">Click to read more</p>
                </a>
            </div>
        </div>
    );
}
