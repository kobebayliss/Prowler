"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function BrowsePage() {
    const [games, setGames] = useState([]);
    const [hoveredGameId, setHoveredGameId] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8081/games")
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the game's information: ", error);
            });
    }, []);

    return (
        <div>
            <div className="flex pt-4 pb-5 ml-7 items-center">
                <p className="text-offwhite font-inter text-3xl">Browsing Games</p>
                <p className="text-grey font-inter text-base ml-14 mt-0.5">{games.length} {games.length === 1 ? 'Result' : 'Results'}</p>
                <div className="flex ml-auto mr-4">
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-10 rounded-lg justify-center items-center mr-2.5">
                        <IoIosSearch className="text-offwhite h-8 w-auto"/>
                    </a>
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-38 rounded-lg justify-center items-center mr-3"
                    onClick={() => { setShowFilter(!showFilter); setClickedButton(true) }}
                    >
                        <p className="text-offwhite font-inter text-filter mr-2.5">Show Filters</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Sort</p>
                        <FaSortAlphaDown className="text-offwhite h-6 w-auto"/>
                    </a>
                </div>
            </div>
            <div className="flex">
                <div className={`absolute z-100 ${clickedButton ? 'block' : 'hidden'}`}>
                    <div className={`bg-offwhite w-filters h-full
                    ${showFilter ? 'animate-slideout' : 'animate-slideback -translate-x-220'}`}>
                        <p>dhwdhaiwahi</p>
                    </div>
                </div>
                <div className={`flex transition-all duration-200 w-full ${showFilter ? 'ml-showfilter' : ''}`}>
                    <div className={`grid transition-transform gap-x-6 gap-y-8 grid-cols-1 pb-8 px-6
                    ${showFilter ? 'filtertablet:grid-cols-2 filterlg:grid-cols-3': 'tablet:grid-cols-2 lg:grid-cols-3'}`}>
                        {games.map((game) => {
                            let gameName = game.game_name;
                            let isLong = 0;
                            if (gameName.length > 28) gameName = gameName.substring(0, 28) + '...', isLong = 1;

                            return (
                                <a href="#" key={game.game_id}>
                                    <div className="w-card bg-lightmidnight rounded-searchbox hover:scale-103 
                                    transition-all duration-200 hover:ring-1 hover:ring-offwhite">
                                        <div className="flex items-end justify-center">
                                            <div className={`absolute flex h-8 px-4 bg-lightmidnight items-center rounded-popup 
                                            content-center transition-all duration-150 mb-3 triangle-div whitespace-nowrap
                                            ${isLong === 1 && hoveredGameId === game.game_id ? 'opacity-100' : 'opacity-0'}`}>
                                                <p className="text-offwhite font-inter">{game.game_name}</p>
                                            </div>
                                            <Image
                                                src={game.game_image}
                                                alt="Game image"
                                                width={10000}
                                                height={10000}
                                                className="w-full h-auto rounded-t-searchbox"
                                            />
                                        </div>
                                        <div className={`flex flex-col items-center transition-all duration-200 ${showFilter ? 'scale-86': ''}`}>
                                            <div>
                                                <p 
                                                className="font-inter text-2xl text-offwhite mt-top max-w-sm overflow-hidden whitespace-nowrap"
                                                onMouseEnter={() => setHoveredGameId(game.game_id)}
                                                onMouseLeave={() => setHoveredGameId(null)}>
                                                {gameName}
                                                </p>
                                            </div>
                                            <div className="flex mt-topper items-center pb-topper">
                                                <div className="flex w-40 justify-end">
                                                    <FaSteam className="text-offwhite h-logos w-auto"/>
                                                    <p className="font-interlight text-prices text-offwhite mt-em1 ml-pricesmargin">
                                                        {game.steam_price}
                                                    </p>
                                                </div>
                                                <div className="bg-grey h-line w-0.2 mt-em mx-linemargin"/>
                                                <div className="flex w-40">
                                                    <p className="font-interlight text-prices text-offwhite mt-em1 mr-pricesmargin">
                                                        {game.epic_price}
                                                    </p>
                                                    <SiEpicgames className="text-offwhite h-logos w-auto"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
