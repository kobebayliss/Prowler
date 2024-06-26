"use client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function useTextOverflow(ref, lines, isExpanded) {
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (ref.current) {
                setIsOverflow(ref.current.scrollHeight > ref.current.clientHeight);
            }
        };

        checkOverflow();

        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [ref, lines, isExpanded]);

    return isOverflow;
}

export default function GamePageContent() {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const description = "For the very first time on PC, play through Jin Sakai’s journey and discover the complete Ghost of Tsushima experience in this Director’s Cut. In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan. As the island burns in the wake of the first wave of the Mongol assault, courageous samurai warrior Jin Sakai stands resolute. As one of the last surviving members of his clan, Jin is resolved to do whatever it takes, at any cost, to protect his people and reclaim his home. He must set aside the traditions that have shaped him as a warrior to forge a new path, the path of the Ghost, and wage an unconventional war for the freedom of Tsushima. Experience Ghost of Tsushima with unlocked framerates and a variety of graphics options tailored to a wide range of hardware, ranging from high-end PCs to portable PC gaming devices. Get a view of even more of the action with support for Ultrawide (21:9), Super Ultrawide (32:9) and even 48:9 Triple Monitor support. Boost performance with upscaling and frame generation technologies like NVIDIA DLSS 3, AMD FSR 3 and Intel XeSS. NVIDIA Reflex and image quality-enhancing NVIDIA DLAA are also supported. Japanese lip sync – enjoy a more authentic experience with lip sync for Japanese voiceover, made possible by cinematics being rendered in real time by your PC.";
    const descriptionRef = useRef(null);
    const isOverflow = useTextOverflow(descriptionRef, 8, isExpanded);

    return (
        <div>
            <div className="grid-width:grid grid-width:grid-cols-2 grid-width:w-[94.890510948%] w-[92%] mx-auto game-width:w-[1300px]">
                <div className="flex flex-col mt-2 grid-width:mt-5 grid-width:mr-8">
                    <p className="text-offwhite font-inter text-[2.4em] mx-auto">Ghost of Tsushima</p>
                    <p className="text-offwhite font-interlight text-[1.05em] mx-auto">Reviews: Mostly Positive (632,221)</p>
                    <div className="h-px w-full bg-lightermidnight mt-3"/>
                    <div className="mt-3 w-full">
                        <p className="font-interlight text-offwhite text-[15px] mx-auto grid-width:mx-0">
                        A storm is coming. Venture into the complete Ghost of Tsushima DIRECTOR’S CUT on PC; forge your own path through this open-world action adventure and uncover its hidden wonders. Brought to you by Sucker Punch Productions, Nixxes Software and PlayStation Studios.
                        </p>
                    </div>
                    <div className="h-px w-full bg-lightermidnight mt-3"/>
                    <div className="my-3 text-offwhite">
                        <p className="flex justify-center font-inter text-[20px]">System Requirements</p>
                        <div className="w-full mt-2 text-[13.5px] bg-midnight items-start rounded-lg font-interlight">
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">OS:</p>
                                <p className="font-interlight">&nbsp;Windows 10 64-bit</p>
                            </div>
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">Processor:</p>
                                <p className="font-interlight">&nbsp;Intel Core i3-7100 or AMD Ryzen 3 1200</p>
                            </div>
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">Memory:</p>
                                <p className="font-interlight">&nbsp;8 GB RAM</p>
                            </div>
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">Graphics:</p>
                                <p className="font-interlight">&nbsp;NVIDIA GeForce GTX 960 or AMD Radeon RX 5500 XT</p>
                            </div>
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">Storage:</p>
                                <p className="font-interlight">&nbsp;75 GB available space</p>
                            </div>
                            <div className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">Additional Notes:</p>
                                <p className="font-interlight">&nbsp;SSD Recommended</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-px w-full bg-lightermidnight"/>
                    <div className="grid grid-cols-3 gap-x-4 mt-6 mb-6 grid-width:mb-0">
                        <div className="flex">
                            <div className="w-[1.5px] h-[125px] bg-offwhite hidden genre-width:block"/>
                            <div className="mt-2.5 ml-5 text-inter text-[20px]">
                                <p className="text-darkerwhite">Genres</p>
                                <p className="text-offwhite">Action, Multiplayer</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[1.5px] h-[125px] bg-offwhite hidden genre-width:block"/>
                            <div className="mt-2.5 ml-5 text-inter text-[20px]">
                                <p className="text-darkerwhite">Developer</p>
                                <p className="text-offwhite line-clamp-2">Arrowhead Game Studios</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-[1.5px] h-[125px] bg-offwhite hidden genre-width:block"/>
                            <div className="mt-2.5 ml-5 mr-5 grid-width:mr-0 text-inter text-[20px]">
                                <p className="text-darkerwhite">Publisher</p>
                                <p className="text-offwhite">Playstation PC LLC</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col grid-width:ml-2 justify-center">
                    <div className="h-px w-full bg-lightermidnight mb-8 block grid-width:hidden"/>
                    <img src="/images/test.jpg" alt="Game picture" className="rounded-lg w-full h-auto"/>
                    <div className="flex bg-lightmidnight w-[65%] min-w-[280px] mx-auto h-[92px] price-width:h-[110px] mt-[32px] rounded-lg">
                        <a href="#" className="w-[49.8%] rounded-l-lg transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/steam.png" alt="Steam logo" className="mr-3 w-auto h-[30px] price-width:h-[40px]"/>
                                <p className="text-offwhite font-inter text-[18px] price-width:text-[23px]">$59.99</p>
                            </div>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5 hidden price-width:block">Click to view Steam page</p>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5 block price-width:hidden">View Steam page</p>
                        </a>
                        <div className={`w-[1.5px] bg-lightermidnight self-center transition-all duration-150 ${isHovered ? 'h-[100%]' : 'h-[50%]'}`}/>
                        <a href="#" className="w-[50%] rounded-r-2xl transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/epic.png" alt="Epic Games logo" className="mr-3 w-auto h-[30px] price-width:h-[40px]"/>
                                <p className="text-offwhite font-inter text-[18px] price-width:text-[23px]">$59.99</p>
                            </div>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5 hidden price-width:block">Click to view Epic page</p>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5 block price-width:hidden">View Epic page</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="h-px w-[94.890510948%] game-width:w-[1300px] mt-6 mx-auto bg-lightermidnight"/>
            <div ref={descriptionRef} className={`font-interlight text-offwhite w-[89.743589743%] desc-width:w-[700px] mx-auto mt-5 text-[15px] ${isExpanded ? 'line-clamp-none' : 'line-clamp-8'}`}>
                            {description}
                    </div>
                        {isOverflow && !isExpanded && (
                            <p className="font-inter mb-4 flex justify-center text-offwhite text-[15.5px] mt-1.5 cursor-pointer"
                            onClick={() => setIsExpanded(true)}>Click to read more</p>)}
                        {isExpanded && (
                            <p className="font-inter mb-4 flex justify-center text-offwhite text-[15.5px] mt-1.5 cursor-pointer"
                            onClick={() => setIsExpanded(false)}>Click to show less</p>)}
        </div>
    );
}
