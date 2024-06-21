"use client"

import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

interface Game {
    game_id: number;
    game_name: string;
    game_image: string;
    steam_price: string;
    epic_price: string;
}

function BrowsePageContent() {
    const [games, setGames] = useState<Game[]>([]);
    const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);
    const [buttonName, setButtonName] = useState('Show');
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [extraGenres, setExtraGenres] = useState(false);
    const [genreButton, setGenreButton] = useState('More');
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(searchQuery);

    useEffect(() => {
        setButtonName(showFilter ? 'Hide' : 'Show');
    }, [showFilter]);

    useEffect(() => {
        setGenreButton(extraGenres ? 'Less' : 'More');
    }, [extraGenres]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined" && window.innerWidth < 821) {
                setShowFilter(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3000/api")
            .then(response => {
                if (searchQuery) {
                    const filteredGames = response.data.filter((game: Game) =>
                        game.game_name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setGames(filteredGames);
                } else {
                    setGames(response.data);
                }
            })
            .catch(error => {
                console.error("There was an error fetching the game's information: ", error);
            });
    }, [searchQuery]);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/browse?search=${searchTerm}`);
    };

    return (
        <div>
            <div className="flex pt-4 pb-5 ml-7 items-center">
                <p className="text-offwhite font-inter text-xll browsewidth:text-3xl">Browsing Games</p>
                <p className="text-grey hidden font-inter text-base ml-14 browsewidth:block mt-0.5">{games.length} {games.length === 1 ? 'Result' : 'Results'}</p>
                <div className="hidden browsewidth:flex ml-auto mr-6">
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-10 rounded-lg justify-center items-center mr-2.5">
                        <IoIosSearch className="text-offwhite h-8 w-auto"/>
                    </a>
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-38 rounded-lg justify-center items-center mr-3"
                    onClick={() => { setShowFilter(!showFilter); setClickedButton(true); }}
                    >
                        <p className="text-offwhite font-inter text-filter mr-2.5">{buttonName} Filters</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                    <a href="#" 
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Sort</p>
                        <FaSortAlphaDown className="text-offwhite h-6 w-auto"/>
                    </a>
                </div>
                <div className="flex browsewidth:hidden ml-auto mr-3">
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center mr-3">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Filter</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                </div>
            </div>
            <div className="flex">
                <div className={`absolute z-100 ${clickedButton ? 'block' : 'hidden'}`}>
                    <div className={`w-filters h-full
                    ${showFilter ? 'animate-slideout' : 'animate-slideback -translate-x-220'}`}>
                        <div className="flex justify-center mt-5">
                            <Switch className="mt-0.5"/>
                            <p className="ml-3 text-2xl text-offwhite font-inter">On Sale</p>
                        </div>
                        <div className="w-80% mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="flex font-inter text-xl text-offwhite ml-6 mt-3">Price Range</p>
                        <div className="flex justify-center mt-5 mx-6">
                        </div>
                        <div className="w-80% mt-6 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="text-offwhite font-inter text-2xl mt-3 ml-6 mb-2">Genres</p>
                        <div className="flex ml-6 mt-1.5 items-center">
                            <Checkbox id="genre1"/>
                            <label htmlFor="genre1" className="text-offwhite text-base font-interlight self-center ml-2.5">Indie</label>
                        </div>
                        <div className="flex ml-6 mt-1.5 items-center">
                            <Checkbox id="genre2"/>
                            <label htmlFor="genre2" className="text-offwhite text-base font-interlight self-center ml-2.5">Action</label>
                        </div>
                        <div className="flex ml-6 mt-1.5 items-center">
                            <Checkbox id="genre3"/>
                            <label htmlFor="genre3" className="text-offwhite text-base font-interlight self-center ml-2.5">Adventure</label>
                        </div>
                        <div className="flex ml-6 mt-1.5 items-center">
                            <Checkbox id="genre4"/>
                            <label htmlFor="genre4" className="text-offwhite text-base font-interlight self-center ml-2.5">Casual</label>
                        </div>
                        <div className={`${extraGenres ? 'block' : 'hidden'}`}>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre5"/>
                                <label htmlFor="genre5" className="text-offwhite text-base font-interlight self-center ml-2.5">RPG</label>
                            </div>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre6"/>
                                <label htmlFor="genre6" className="text-offwhite text-base font-interlight self-center ml-2.5">Simulation</label>
                            </div>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre7"/>
                                <label htmlFor="genre7" className="text-offwhite text-base font-interlight self-center ml-2.5">Strategy</label>
                            </div>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre8"/>
                                <label htmlFor="genre8" className="text-offwhite text-base font-interlight self-center ml-2.5">Singleplayer</label>
                            </div>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre9"/>
                                <label htmlFor="genre9" className="text-offwhite text-base font-interlight self-center ml-2.5">Early Access</label>
                            </div>
                            <div className="flex ml-6 mt-1.5 items-center">
                                <Checkbox id="genre10"/>
                                <label htmlFor="genre10" className="text-offwhite text-base font-interlight self-center ml-2.5">Free to Play</label>
                            </div>
                        </div>
                        <div className={`w-full transition-all duration-100`}>
                            <div className="ml-6 mt-3">
                                <button className="text-offwhite text-base font-inter hover:underline cursor-pointer"
                                onClick={() => { setExtraGenres(!extraGenres) }}>
                                Show {genreButton}</button>
                            </div>
                            <div className="w-80% mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        </div>
                    </div>
                </div>
                <div className={`flex transition-all duration-200 ease-out w-full px-6 ${showFilter ? 'ml-showfilter pl-0' : ''}`}>
                    <div className={`grid transition-transform gap-x-6 gap-y-8 grid-cols-1 pb-8 w-full
                    ${showFilter ? 'filtertablet:grid-cols-2 filterlg:grid-cols-3': 'tablet:grid-cols-2 lg:grid-cols-3'}`}>
                        {games.map((game) => {
                            let gameName = game.game_name as string || "";
                            let isLong = 0;
                            if (gameName.length > 27) gameName = gameName.substring(0, 27) + '...', isLong = 1;

                            return (
                                <a href="#" key={game.game_id}>
                                    <div className="w-card bg-lightmidnight rounded-searchbox hover:scale-103 
                                    transition-all duration-200 hover:ring-1 hover:ring-offwhite">
                                        <div className="flex items-end justify-center">
                                            <div className={`absolute flex py-2 px-4 bg-lightmidnight items-center rounded-popup 
                                            content-center transition-all duration-150 mb-3 triangle-div text-center 
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

export default function BrowsePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowsePageContent />
        </Suspense>
    );
}