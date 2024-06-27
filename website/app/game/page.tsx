"use client"

import React, { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

interface Game {
    game_id: number;
    game_name: string;
    steam_on_sale: string;
    steam_price: string;
    steam_normal_price: string;
    epic_on_sale: string;
    epic_price: string;
    epic_normal_price: string;
    game_developer: string;
    game_description: string;
    game_image: string;
}

function useTextOverflow(ref: React.RefObject<HTMLDivElement>, lines: number, isExpanded: boolean) {
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
    const descriptionRef = useRef(null);
    const isOverflow = useTextOverflow(descriptionRef, 6, isExpanded);
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(null);
    const idQuery = useSearchParams();
    const id = idQuery.get('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api");
                const games = response.data;
                const selectedGame = games.find((g: Game) => g.game_id === parseInt(id as string, 10));
                if (selectedGame) {
                    setGame(selectedGame);
                } else {
                    console.error("game not found");
                }
            } catch (error) {
                console.error("error fetching games:", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!game) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <div className="grid-width:grid grid-width:grid-cols-[360px_auto] grid-width:w-[94.890510948%] w-[90%] mx-auto game-width:w-[1300px]">
                <div className="flex flex-col grid-width:mt-5 grid-width:mr-8 justify-center">
                    <p className="text-offwhite font-inter text-[2.4em] mx-auto grid-width:mx-0 mt-3 grid-width:mt-0 line-clamp-4">{game.game_name}</p>
                    <p className="text-offwhite font-interlight text-[1.05em] mx-auto grid-width:mx-0">Reviews: Mostly Positive (632,221)</p>
                    <div className="h-px w-full bg-lightermidnight mt-3"/>
                    <div className="flex bg-lightmidnight w-full mx-auto h-[92px] price-width:h-[110px] mt-[20px] rounded-lg">
                        <a href="#" className="w-[49.8%] rounded-l-lg transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/steam.png" alt="Steam logo" className="mr-3 w-auto h-[30px] price-width:h-[40px]"/>
                                <p className="text-offwhite font-inter text-[18px] price-width:text-[23px]">{game.steam_price}</p>
                            </div>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5">View Steam page</p>
                        </a>
                        <div className={`w-[1.5px] bg-lightermidnight self-center transition-all duration-150 ${isHovered ? 'h-[100%]' : 'h-[50%]'}`}/>
                        <a href="#" className="w-[50%] rounded-r-2xl transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/epic.png" alt="Epic Games logo" className="mr-3 w-auto h-[30px] price-width:h-[40px]"/>
                                <p className="text-offwhite font-inter text-[18px] price-width:text-[23px]">{game.epic_price}</p>
                            </div>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5">View Epic page</p>
                        </a>
                    </div>
                    <div className="h-px w-full bg-lightermidnight mt-5"/>
                    <div className="mt-5 w-full">
                        <p className="font-interlight text-offwhite text-[15px] mx-auto grid-width:mx-0 line-clamp-8">
                        A storm is coming. Venture into the complete Ghost of Tsushima DIRECTOR’S CUT on PC; forge your own path through this open-world action adventure and uncover its hidden wonders. Brought to you by Sucker Punch Productions, Nixxes Software and PlayStation Studios.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col grid-width:ml-2 mt-6 justify-center">
                    <div className="h-px w-full bg-lightermidnight mb-8 block grid-width:hidden"/>
                    <img src="/images/test.jpg" alt="Game picture" className="rounded-lg w-full h-auto"/>
                </div>
            </div>
            <div className="w-[90%] grid-width:w-[94.890510948%] game-width:w-[1300px] mx-auto">
                <div className="h-px w-full mt-6 bg-lightermidnight"/>
                <div className="grid-width:grid grid-width:grid-cols-[auto_480px]">
                    <div>
                        <div className={`font-interlight text-offwhite grid-width:mr-20 mt-5 text-[15px]`}>
                            {game.game_description}
                        </div>
                        {isOverflow && !isExpanded && (
                            <p className="font-inter mb-4 text-offwhite text-[15.5px] mt-1 cursor-pointer"
                            onClick={() => setIsExpanded(true)}>Click to read more</p>)}
                        {isExpanded && (
                            <p className="font-inter mb-4 text-offwhite text-[15.5px] mt-1 cursor-pointer"
                            onClick={() => setIsExpanded(false)}>Click to show less</p>)}
                    </div>
                    <div className="grid grid-cols-3 gap-x-4 mt-10 grid-width:mt-6 mb-12 grid-width:mb-0">
                            <div className="flex">
                                <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                                <div className="mt-2.5 ml-4 text-inter text-[17px] grid-width:text-[20px]">
                                    <p className="text-darkerwhite">Genres</p>
                                    <p className="text-offwhite">Action, Multiplayer</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                                <div className="mt-2.5 ml-4 text-inter text-[17px] grid-width:text-[20px]">
                                    <p className="text-darkerwhite">Developer</p>
                                    <p className="text-offwhite line-clamp-2">Arrowhead Game Studios</p>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-[1.5px] h-[125px] bg-offwhite"/>
                                <div className="mt-2.5 ml-4 text-inter text-[17px] grid-width:text-[20px]">
                                    <p className="text-darkerwhite">Publisher</p>
                                    <p className="text-offwhite">Playstation PC LLC</p>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="mt-3 mb-10 text-offwhite">
                    <p className="flex justify-center grid-width:justify-start font-inter text-[20px]">System Requirements</p>
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
            </div>
        </div>
    );
}
