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
    name: string;
    reviews: string;
    steam_on_sale: string;
    steam_price: string;
    steam_normal_price: string;
    epic_on_sale: string;
    epic_price: string;
    epic_normal_price: string;
    developer: string;
    publisher: string;
    short_desc: string;
    long_desc: string;
    banner: string;
    images: string;
    specs: string;
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
        axios.get("/api")
            .then(response => {
                if (searchQuery) {
                    const filteredGames = response.data.filter((game: Game) =>
                        game.name.toLowerCase().includes(searchQuery.toLowerCase())
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

    const handleGame = (gameId: number) => {
        router.push(`/game?id=${gameId}`);
    };

    return (
        <div>
            <div className="flex pt-4 pb-5 ml-7 items-center">
                <p className="text-offwhite font-inter text-xll browsewidth:text-3xl">Browsing Games</p>
                <div className="flex ml-14">
                    <FaSteam className="text-offwhite h-logos w-auto"/>
                    <div className="bg-grey h-line w-0.2 mt-em mx-linemargin" />
                    <SiEpicgames className="text-offwhite h-logos w-auto"/>
                </div>
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
                            <Slider defaultValue={[50]} max={120} step={1}/>
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
                        let gameName = game.name || "";
                        let isLong = gameName.length > 27 ? 1 : 0;
                        let steamOnSale = game.steam_on_sale === "1";
                        let steamPrice = game.steam_price;
                        let steamNormalPrice = game.steam_normal_price;
                        let epicOnSale = game.epic_on_sale === "1";
                        let epicPrice = game.epic_price;
                        let epicNormalPrice = game.epic_normal_price;
                        let steamDiscount = 0;
                        let epicDiscount = 0;

                        if (steamOnSale) {
                            let normalPrice1 = parseFloat(steamNormalPrice.replace(/[^\d.-]/g, ''));
                            let salePrice1 = parseFloat(steamPrice.replace(/[^\d.-]/g, ''));
                    
                            if (normalPrice1 > 0) {
                                steamDiscount = Math.round(((normalPrice1 - salePrice1) / normalPrice1) * 100);
                            }
                        }

                        if (epicOnSale) {
                            let normalPrice2 = parseFloat(epicNormalPrice.replace(/[^\d.-]/g, ''));
                            let salePrice2 = parseFloat(epicPrice.replace(/[^\d.-]/g, ''));
                    
                            if (normalPrice2 > 0) {
                                epicDiscount = Math.round(((normalPrice2 - salePrice2) / normalPrice2) * 100);
                            }
                        }

                        return (
                            <a href={`/game?id=${game.game_id}`} onClick={() => handleGame(game.game_id)} key={game.game_id}>
                                <div className="w-card bg-lightmidnight rounded-searchbox hover:scale-103 
                                    transition-all duration-200 hover:ring-1 hover:ring-offwhite">
                                    <div className="flex items-end justify-center">
                                        <div className={`absolute flex py-2 px-4 bg-lightmidnight items-center rounded-popup 
                                            content-center transition-all duration-150 mb-3 triangle-div text-center 
                                            ${isLong && hoveredGameId === game.game_id ? 'opacity-100' : 'opacity-0'}`}>
                                            <p className="text-offwhite font-inter">{game.name}</p>
                                        </div>
                                        <Image
                                            src={game.banner}
                                            alt="Game image"
                                            width={10000}
                                            height={10000}
                                            className="w-full h-auto rounded-t-searchbox"
                                        />
                                    </div>
                                    <div className={`flex flex-col items-center transition-all duration-200 ${showFilter ? 'scale-86' : ''}`}>
                                        <div>
                                            <p className="font-inter text-2xl text-offwhite mt-[0.6em] max-w-sm overflow-hidden whitespace-nowrap"
                                                onMouseEnter={() => setHoveredGameId(game.game_id)}
                                                onMouseLeave={() => setHoveredGameId(null)}>
                                                {gameName}
                                            </p>
                                        </div>
                                        <div className="flex mt-topper items-center pb-[16px]">
                                            <div className="flex w-40 justify-end items-center">
                                                {steamOnSale && (
                                                    <p className="font-inter mr-3 text-[12px] bg-blue py-1 px-2 rounded-[4px] text-offwhite">
                                                        - {steamDiscount}%
                                                    </p>
                                                )}
                                                <p className="font-interlight text-prices text-offwhite">
                                                    {steamPrice}
                                                </p>
                                            </div>
                                            <div className="bg-grey h-line w-0.2 mt-em mx-linemargin" />
                                            <div className="flex w-40 justify-start items-center">
                                                <p className="font-interlight text-prices text-offwhite">
                                                    {game.epic_price}
                                                </p>
                                                {epicOnSale && (
                                                    <p className="font-inter ml-3 text-[12px] bg-blue py-1 px-2 rounded-[4px] text-offwhite">
                                                        - {epicDiscount}%
                                                    </p>
                                                )}
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