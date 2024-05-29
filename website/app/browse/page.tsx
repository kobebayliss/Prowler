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

export default function BrowsePage() {
    const [games, setGames] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

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
            <div className="flex py-4 items-center">
                <p className="text-offwhite font-inter text-3xl ml-9">Browsing Games</p>
                <p className="text-grey font-inter text-base ml-14 mt-0.5">{games.length} {games.length === 1 ? 'Result' : 'Results'}</p>
                <div className="flex py-2.5 ml-auto mr-6">
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-10 rounded-lg justify-center items-center mr-2.5">
                        <IoIosSearch className="text-offwhite h-8 w-auto"/>
                    </a>
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-38 rounded-lg justify-center items-center mr-3">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Show Filters</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </a>
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Sort</p>
                        <FaSortAlphaDown className="text-offwhite h-6 w-auto"/>
                    </a>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <div className="grid gap-x-6 gap-y-8 grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 mt-1 pb-8 w-full px-9">
                    {games.map((game) => {
                        let gameName = game.game_name;
                        if (gameName.length > 28) gameName = gameName.substring(0,28) + '...';
                        
                            return (
                            <a href="#" key={game.game_id}>
                                <div className="w-card bg-lightmidnight rounded-xl hover:scale-103 
                                transition-all duration-200 hover:ring-1 hover:ring-offwhite">
                                    <Image
                                        src={game.game_image}
                                        alt="Game image"
                                        width={10000}
                                        height={10000}
                                        className="w-full h-auto rounded-t-xl"
                                    />
                                    <div className={`absolute h-8 px-4 bg-lightmidnight items-center rounded-popup content-center transition-all duration-150 
                                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                        <p className="text-offwhite font-inter">{game.game_name}</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div>
                                            <p 
                                            className="font-inter text-2xl text-offwhite mt-top max-w-sm overflow-hidden whitespace-nowrap"
                                            onMouseEnter={() => { setIsHovered(true); }}
                                            onMouseLeave={() => { setIsHovered(false); }}>
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
    );
}
