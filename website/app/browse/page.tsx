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
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import ScaleLoader from "react-spinners/ScaleLoader";
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
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalResults, setTotalResults] = useState(0);
    const [customPage, setCustomPage] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [onlyDiscount, setOnlyDiscount] =useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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
        setLoading(true);
        axios.get(`/api?pageNumber=${pageNumber}&discount=${onlyDiscount}&genres=${selectedGenres.join(',')}`)
            .then(response => {
                const { games, totalResults } = response.data;
                if (searchQuery) {
                    const filteredGames = games.filter((game: Game) =>
                        game.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setGames(filteredGames);
                } else {
                    setGames(games);
                }
                setTotalResults(totalResults);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the game's information: ", error);
                setLoading(false);
            });
    }, [searchQuery, pageNumber, onlyDiscount, selectedGenres]);

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/browse?search=${searchTerm}`);
    };

    const handleDiscountToggle = () => {
        setOnlyDiscount(!onlyDiscount);
        setPageNumber(1);
    };

    const handleGenreToggle = (genre: string) => {
        setSelectedGenres((prevGenres) =>
            prevGenres.includes(genre)
                ? prevGenres.filter((g) => g !== genre)
                : [...prevGenres, genre]
        );
    };

    const handleGame = (gameId: number) => {
        router.push(`/game?id=${gameId}`);
    };

    const goToPage = (page: number) => {
        setPageNumber(page);
    };

    const isFirstPage = pageNumber === 1;
    const isLastPage = Math.ceil(totalResults / 48) === pageNumber;

    const paginationItems = [];

    if (pageNumber > 1) {
        paginationItems.push(pageNumber - 1);
    }

    paginationItems.push(pageNumber);

    if (pageNumber < Math.ceil(totalResults / 48)) {
        paginationItems.push(pageNumber + 1);
    }

    while (paginationItems.length < 3) {
        if (paginationItems[0] > 1) {
            paginationItems.unshift(paginationItems[0] - 1);
        } else {
            paginationItems.push(paginationItems[paginationItems.length - 1] + 1);
    }}

    return (
        <div className="relative browse-width:w-[1320px] browse-width:mx-auto overflow-hidden w-auto mx-8">
            <div className="flex pt-4 pb-5 items-center">
                <p className="text-offwhite font-inter text-[27px] tinywidth:text-[30px] browsewidth:text-[34px]">Browsing Games</p>
                <div className="ml-14 tinywidth:flex hidden">
                    <FaSteam className="text-offwhite h-logos w-auto"/>
                    <div className="bg-grey h-[32px] w-0.2 mt-em mx-linemargin" />
                    <SiEpicgames className="text-offwhite h-logos w-auto"/>
                </div>
                <p className="text-grey hidden font-inter text-base ml-14 browsewidth:block mt-0.5">
                    {totalResults} {totalResults === 1 ? 'Result' : 'Results'}
                </p>
                <div className="hidden browsewidth:flex ml-auto">
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
                <div className="flex browsewidth:hidden ml-auto">
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Filter</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                </div>
            </div>
            <div className="flex min-h-[640px]">
                <div className={`absolute z-100 ${clickedButton ? 'block' : 'hidden'}`}>
                    <div className={`w-filters h-full
                    ${showFilter ? 'animate-slideout' : 'animate-slideback -translate-x-220'}`}>
                        <div className="flex justify-center mt-5">
                            <Switch className="mt-0.5" onClick={handleDiscountToggle} checked={onlyDiscount}/>
                            <p className="ml-3 text-2xl text-offwhite font-inter">On Sale</p>
                        </div>
                        <div className="w-80% mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="flex font-inter text-xl text-offwhite ml-5 mt-3">Price Range</p>
                        <div className="flex flex-col justify-center mt-3 ml-5">
                            <div className="flex items-center">
                                <Checkbox id="range1"/>
                                <label htmlFor="range1" className="text-offwhite text-base font-interlight self-center ml-2.5">Free - $15</label>
                            </div>
                            <div className="flex mt-1 items-center">
                                <Checkbox id="range2"/>
                                <label htmlFor="range2" className="text-offwhite text-base font-interlight self-center ml-2.5">$15 - $40</label>
                            </div>
                            <div className="flex mt-1 items-center">
                                <Checkbox id="range3"/>
                                <label htmlFor="range3" className="text-offwhite text-base font-interlight self-center ml-2.5">$40 - $70</label>
                            </div>
                            <div className="flex mt-1 items-center">
                                <Checkbox id="range4"/>
                                <label htmlFor="range4" className="text-offwhite text-base font-interlight self-center ml-2.5">$70 - $100</label>
                            </div>
                            <div className="flex mt-1 items-center">
                                <Checkbox id="range5"/>
                                <label htmlFor="range5" className="text-offwhite text-base font-interlight self-center ml-2.5">$100+</label>
                            </div>
                        </div>
                        <div className="w-80% mt-6 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="text-offwhite font-inter text-2xl mt-3 ml-5 mb-2">Genres</p>
                        <div className="flex flex-col gap-y-[11px] ml-5 mt-3">
                            <div className="flex items-center mr-5">
                                <Checkbox id="Action" onClick={() => handleGenreToggle("Action")} />
                                <label htmlFor="Action" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Action</label>
                            </div>
                            <div className="flex items-center mr-5">
                                <Checkbox id="Adventure" onClick={() => handleGenreToggle("Adventure")} />
                                <label htmlFor="Adventure" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Adventure</label>
                            </div>
                            <div className="flex items-center mr-5">
                                <Checkbox id="RPG" onClick={() => handleGenreToggle("RPG")} />
                                <label htmlFor="RPG" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">RPG</label>
                            </div>
                            <div className="flex items-center mr-5">
                                <Checkbox id="Shooter" onClick={() => handleGenreToggle("Shooter")} />
                                <label htmlFor="Shooter" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Shooter</label>
                            </div>
                            {extraGenres && (
                                <>
                                    <div className="flex items-center mr-5">
                                        <Checkbox id="Simulation" onClick={() => handleGenreToggle("Simulation")} />
                                        <label htmlFor="Simulation" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Simulation</label>
                                    </div>
                                    <div className="flex items-center mr-5">
                                        <Checkbox id="Strategy" onClick={() => handleGenreToggle("Strategy")} />
                                        <label htmlFor="Strategy" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Strategy</label>
                                    </div>
                                    <div className="flex items-center mr-5">
                                        <Checkbox id="Sports" onClick={() => handleGenreToggle("Sports")} />
                                        <label htmlFor="Sports" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Sports</label>
                                    </div>
                                    <div className="flex items-center mr-5">
                                        <Checkbox id="Racing" onClick={() => handleGenreToggle("Racing")} />
                                        <label htmlFor="Racing" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Racing</label>
                                    </div>
                                    <div className="flex items-center mr-5">
                                        <Checkbox id="Puzzle" onClick={() => handleGenreToggle("Puzzle")} />
                                        <label htmlFor="Puzzle" className="text-offwhite font-interlight ml-3 text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Puzzle</label>
                                    </div>
                                </>
                            )}
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
                <div className={`transition-all duration-200 ease-out w-full ${showFilter ? 'ml-showfilter pl-0' : ''}`}>
                     {loading ? (
                        <div className="mx-auto flex flex-col items-center text-offwhite text-[18px] mb-10 mt-8">
                            <p className="text-center mb-4">Fetching games..</p>
                            <ScaleLoader 
                            color="#EFEFEF"
                            height={20}
                            margin={2}
                            width={3}
                            loading
                            />
                        </div>
                    ) : (
                        <div className={`grid transition-transform gap-x-6 gap-y-8 grid-cols-1 pb-2 w-full
                        ${showFilter ? 'filtertablet:grid-cols-2 filterlg:grid-cols-3': 'tablet:grid-cols-2 lg:grid-cols-3'}`}>
                        {games.map((game) => {
                            let gameName = game.name || "";
                            let isLong = 0;
                            let steamOnSale = game.steam_on_sale === "1";
                            let steamPrice = game.steam_price;
                            let steamNormalPrice = game.steam_normal_price;
                            let epicOnSale = game.epic_on_sale === "1";
                            let epicPrice = game.epic_price;
                            let epicNormalPrice = game.epic_normal_price;
                            let steamDiscount = 0;
                            let epicDiscount = 0;

                            if (gameName.length > 30) gameName = gameName.substring(0, 30) + '...', isLong = 1;

                            if (steamOnSale) {
                                let normalPrice1 = steamNormalPrice
                                let salePrice1 = steamPrice
                        
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
                                    <div className="w-card bg-lightmidnight rounded-searchbox hover:scale-103 transition-all duration-200">
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
                                                <p className="font-inter text-[18px] text-offwhite mt-[10px] max-w-sm overflow-hidden whitespace-nowrap"
                                                    onMouseEnter={() => setHoveredGameId(game.game_id)}
                                                    onMouseLeave={() => setHoveredGameId(null)}>
                                                    {gameName}
                                                </p>
                                            </div>
                                            <div className="flex mt-[6px] items-center pb-[16px]">
                                                <div className="flex w-40 justify-end items-center">
                                                    {steamOnSale && (
                                                        <p className="font-inter mr-3 text-[12px] bg-blue py-1 px-2 rounded-[4px] text-offwhite">
                                                            - {steamDiscount}%
                                                        </p>
                                                    )}
                                                    <p className="font-interlight text-prices text-offwhite">
                                                        ${steamPrice}
                                                    </p>
                                                </div>
                                                <div className="bg-grey h-[32px] w-0.2 mt-0.5 mx-[22px]" />
                                                <div className="flex w-40 justify-start items-center">
                                                    <p className="font-interlight text-prices text-offwhite">
                                                        ${game.epic_price}
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
                    )};
                    <div className="flex mx-6 text-offwhite justify-center font-inter mt-3.5 mb-6">
                        <a href="#" className={`flex mr-3.5 items-center font-inter transition-colors duration-200 text-[16px] px-3.5 h-[38px] rounded-md 
                        ${isFirstPage ? 'text-[#4f4f54] pointer-events-none' : 'text-offwhite hover:bg-lightmidnight'}`} onClick={() => goToPage(1)} >
                            <RxDoubleArrowLeft />
                            <p className="ml-1 mr-2">First</p>
                        </a>
                        {paginationItems.map((page, index) => (
                            <a key={index} href="#" className={`text-offwhite flex mr-1.5 items-center hover:bg-lightmidnight 
                            transition-colors duration-200 text-[16px] justify-center h-[38px] w-[38px] rounded-md 
                            ${page === pageNumber ? 'outline outline-[1.5px] outline-lightermidnight' : ''}`} onClick={() => goToPage(page)}>
                                <p>{page}</p>
                            </a>
                        ))}
                        <a href="#" className={`flex ml-3.5 items-center font-inter transition-colors duration-200 text-[16px] px-3.5 h-[38px] rounded-md
                        ${isLastPage ? 'text-[#4f4f54] pointer-events-none' : 'text-offwhite hover:bg-lightmidnight'}`} onClick={() => goToPage(Math.ceil(totalResults / 48))}>
                            <p className="mr-1 ml-1.5">Last</p>
                            <RxDoubleArrowRight />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BrowsePage() {
    return (
        <Suspense fallback={<div className="text-offwhite font-inter flex justify-center text-[16px] mt-10">Loading...</div>}>
            <BrowsePageContent/>
        </Suspense>
    );
}