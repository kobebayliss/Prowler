"use client"

import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { Radio } from "lucide-react";

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
    // Defining all variables
    const [games, setGames] = useState<Game[]>([]);
    const [hoveredGameId, setHoveredGameId] = useState<number | null>(null);
    const [showFilter, setShowFilter] = useState(false);
    const [clickedButton, setClickedButton] = useState(false);
    const [buttonName, setButtonName] = useState('Show');
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [showExtraGenres, setShowExtraGenres] = useState(false);
    const [genreButton, setGenreButton] = useState('More');
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalResults, setTotalResults] = useState(0);
    const [customPage, setCustomPage] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [onlyDiscount, setOnlyDiscount] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    // I use these to dynamically map the genres (and price and sorting later down)
    const genres = ["Indie", "Action", "Adventure", "Casual", "RPG"];
    const extraGenres = ["Simulation", "Singleplayer", "Strategy", "Racing", "Free To Play"];
    const allGenres = ["Indie", "Action", "Adventure", "Casual", "RPG", "Simulation", "Singleplayer", "Strategy", "Racing", "Free To Play"];
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [clickedButton2, setClickedButton2] = useState(false);
    const [orderBy, setOrderBy] = useState(1);
    const [selectedRanges, setSelectedRanges] = useState<number[]>([]);
    const ranges = [
        { id: 1, label: "Free - $15" },
        { id: 2, label: "$15 - $40" },
        { id: 3, label: "$40 - $70" },
        { id: 4, label: "$70 - $100" },
        { id: 5, label: "$100+" },
    ];
    const sorting = [
        { id: 1, label: "Most Popular" },
        { id: 2, label: "Alphabetical" },
        { id: 3, label: "Price: Low to High" },
        { id: 4, label: "Price: High to Low" },
    ];
    const [respMenu, setRespMenu] = useState(false);

    useEffect(() => {
        setButtonName(showFilter ? 'Hide' : 'Show');
    }, [showFilter]);

    useEffect(() => {
        setGenreButton(showExtraGenres ? 'Less' : 'More');
    }, [showExtraGenres]);

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined" && window.innerWidth < 914) {
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
        const handleResize = () => {
            if (typeof window !== "undefined" && window.innerWidth > 914) {
                setRespMenu(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Retrieving information from api page, also sending specificities like filters etc
    useEffect(() => {
        setLoading(true);
        axios.get(`/api?pageNumber=${pageNumber}&search=${searchTerm}&discount=${onlyDiscount}&genres=${selectedGenres.join(',')}&priceranges=${selectedRanges.join(',')}&order=${orderBy}`)
            .then(response => {
                const { games, totalResults } = response.data;
                setGames(games);
                setTotalResults(totalResults);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the game's information: ", error);
                setLoading(false);
            });
    }, [searchQuery, pageNumber, searchTerm, onlyDiscount, selectedGenres, selectedRanges, orderBy]);

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

    const handleRangeToggle = (rangeId: number) => {
        setSelectedRanges((prevRanges) =>
            prevRanges.includes(rangeId)
                ? prevRanges.filter((id) => id !== rangeId)
                : [...prevRanges, rangeId]
        );
    };

    const handleGame = (gameId: number) => {
        router.push(`/game?id=${gameId}`);
    };

    const goToPage = (page: number) => {
        setPageNumber(page);
    };

    // Pagination backend
    const isFirstPage = pageNumber === 1;
    const isLastPage = Math.ceil(totalResults / 48) === pageNumber;

    let paginationItems = [];

    const totalPages = Math.ceil(totalResults / 48);

    if (pageNumber > 1) {
        paginationItems.push(pageNumber - 1);
    }

    paginationItems.push(pageNumber);

    if (pageNumber < totalPages) {
        paginationItems.push(pageNumber + 1);
    }

    paginationItems.sort((a, b) => a - b);

    paginationItems = paginationItems.filter(page => page > 0 && page <= totalPages);


    return (
        <div>
        <div className={`w-full z-50 top-[100vh] h-[100vh] overflow-y-auto fixed bg-midnight transition-transform ease-in-out duration-400
            ${respMenu ? 'translate-y-[-100%]' : ''}`}>
            {loading && (
                <div className="top-[13px] left-[20px] absolute">
                    <ScaleLoader color="#EFEFEF" height={20} margin={2} width={3} loading/>
                </div>
            )}
            <div className="flex justify-center mt-[11px] text-[19px] font-inter text-offwhite">
                <p>Filters</p>
            </div>
            <div className="absolute right-2.5 top-[9px] text-offwhite w-auto text-[24px] hover:bg-lightmidnight cursor-pointer p-1 
            rounded-[5px] transition-all duration-150" onClick={() => {setRespMenu(false)}}>
                <RxCross2/>
            </div>
            <div className={`${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                <div className="w-full mt-3 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                <div className="grid grid-cols-[56%_auto]">
                    <div className="flex ml-6">
                        <div>
                            <p className="text-[19px] font-inter text-offwhite my-3">Sort By</p>
                            {/* Responsive radio menu for sorting */}
                            <RadioGroup value={orderBy.toString()} onValueChange={(value) => setOrderBy(parseInt(value))} className="flex flex-col gap-[8px] mb-4.5">
                                {sorting.map((sort) => (
                                    <div key={sort.id} className="flex items-center">
                                        <RadioGroupItem value={sort.id.toString()} id={sort.id.toString()} className="h-5 w-5 text-offwhite" />
                                        <Label htmlFor={sort.id.toString()} className="text-offwhite font-interlight ml-3 text-base leading-none">
                                            {sort.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="h-full w-[2px] bg-lightmidnight ml-auto"/>
                    </div>
                    <div className="flex flex-col justify-center h-full items-center">
                        {/* Responsive on sale filter and dynamic search */}
                        <div className="flex items-center">
                            <Switch onClick={handleDiscountToggle} checked={onlyDiscount}/>
                            <p className="ml-3 text-[19px] text-offwhite font-inter">On Sale</p>
                        </div>
                        <input 
                            type="text"
                            value={searchTerm}
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`ease-in-out transition-all duration-200 h-10 px-3 rounded-md bg-lightmidnight text-offwhite 
                            font-inter placeholder:text-grey focus:outline-none focus:ring-1 focus:ring-offwhite w-[140px] mt-5`}
                        />
                    </div>
                </div>
                <div className="w-full h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                {/* Below are the genres and price range filtering systems which are near identical */}
                <div className="my-3 ml-6">
                    <p className="text-offwhite font-inter text-[19px] mb-3">Price Range</p>
                    <div className="flex flex-col gap-y-[10px] mb-4">
                        {ranges.map((range) => (
                            <div key={range.id} className="flex items-center mr-5">
                                <Checkbox id={range.label} checked={selectedRanges.includes(range.id)} onClick={() => handleRangeToggle(range.id)}/>
                                <Label htmlFor={range.label} className="text-offwhite font-interlight ml-3 text-base leading-none">
                                    {range.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                <div className="ml-6 my-3">
                    <p className="text-offwhite font-inter text-[19px] mb-3">Genres</p>
                    <div className="flex flex-col gap-y-[10px] pb-3">
                        {allGenres.map((genre) => (
                            <div key={genre} className="flex items-center mr-5">
                                <Checkbox id={genre} checked={selectedGenres.includes(genre)} onClick={() => handleGenreToggle(genre)} />
                                <Label htmlFor={genre} className="text-offwhite font-interlight ml-3 text-base leading-none">
                                    {genre}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="relative browse-width:w-[1320px] browse-width:mx-auto w-auto mx-8 overflow-hidden">
            <div className="flex py-5 items-center">
                <p className="text-offwhite font-inter text-[24px] tinywidth:text-[27px] browsewidth:text-[32px]">Browsing Games</p>
                <div className="ml-8 browsewidth:ml-12 tinywidth:flex hidden">
                    <FaSteam className="text-offwhite h-logos w-auto"/>
                    <div className="bg-grey h-[32px] w-0.2 mt-em mx-linemargin" />
                    <SiEpicgames className="text-offwhite h-logos w-auto"/>
                </div>
                <p className="text-grey hidden font-inter text-base ml-12 browsewidth:block mt-0.5">
                    {totalResults} {totalResults === 1 ? 'Result' : 'Results'}
                </p>
                <div className="hidden filter2width:flex ml-auto">
                    {/* This button disappears when clicked and extends into search input */}
                    <button
                    className={`flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-10 rounded-lg justify-center items-center mr-2 ${showSearch ? 'hidden' : 'block'}`} 
                    onClick={() => { setShowSearch(true) }}>
                        <IoIosSearch className="text-offwhite h-8 w-auto"/>
                    </button>
                    <input 
                        type="text"
                        value={searchTerm}
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onBlur={() => setShowSearch(false)}
                        className={`ease-in-out py-1 px-3 rounded-md bg-lmidnight text-offwhite font-inter
                        placeholder:text-grey ring-[1px] ring-lightermidnight placeholder:text-[13px]
                        ${showSearch ? 'w-[180px] duration-250 relative mr-2' : 'w-0 h-0 duration-0 absolute opacity-0 pointer-events-none'}`}
                    />
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-40 rounded-md justify-center items-center mr-3"
                    onClick={() => { setShowFilter(!showFilter); setClickedButton(true); }}>
                        <p className="text-offwhite font-inter text-filter mr-2.5">{buttonName} Filters</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                    <button
                    className={`flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 px-4 rounded-md justify-center items-center ${showSortMenu? 'rounded-t-md rounded-b-none bg-lightmidnight' : 'rounded-md'}`}
                    onClick={() => { setShowSortMenu(!showSortMenu); setClickedButton2(true); }}>
                        <p className="text-offwhite font-inter text-filter mr-2.5">Sort</p>
                        <FaSortAmountDownAlt className="text-offwhite h-6 w-auto"/>
                    </button>
                    {showSortMenu && (
                        <div className="bg-lightmidnight mt-10 rounded-tl-md rounded-b-md right-0 flex flex-col absolute 
                        text-[16px] text-right font-inter px-4 py-2.5 gap-y-[1px] z-50">
                            {/* Sorting menu and conditionally making them darker to show they are selected */}
                            <p className={`underline-animation2 transition-all duration-150 cursor-pointer
                            ${orderBy == 1 ? 'text-darkerwhite' : 'text-offwhite hover:text-darkerwhite'}`} 
                            onClick={() => { setOrderBy(1) }}>Most Popular</p>
                            <p className={`underline-animation2 transition-all duration-150 cursor-pointer
                            ${orderBy == 2 ? 'text-darkerwhite' : 'text-offwhite hover:text-darkerwhite'}`} 
                            onClick={() => { setOrderBy(2) }}>Alphabetical</p>
                            <p className={`underline-animation2 transition-all duration-150 cursor-pointer
                            ${orderBy == 3 ? 'text-darkerwhite' : 'text-offwhite hover:text-darkerwhite'}`} 
                            onClick={() => { setOrderBy(3) }}>Price: Low to High</p>
                            <p className={`underline-animation2 transition-all duration-150 cursor-pointer
                            ${orderBy == 4 ? 'text-darkerwhite' : 'text-offwhite hover:text-darkerwhite'}`} 
                            onClick={() => { setOrderBy(4) }}>Price: High to Low</p>
                        </div>
                    )}
                </div>
                <div className="flex filter2width:hidden ml-auto">
                    <button
                    className="flex hover:bg-lightmidnight transition-colors duration-200 
                    h-10 w-26 rounded-lg justify-center items-center" onClick={() => {setRespMenu(!respMenu)}}>
                        <p className="text-offwhite font-inter text-filter mr-2.5">Filter</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </button>
                </div>
            </div>
            <div className="flex min-h-[640px]">
                {/* I ensure that users cannot click on filters whilst the page is loading, so that they do not spam and cause issues */}
                <div className={`absolute z-100 ${clickedButton ? 'block' : 'hidden'} ${loading ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                    <div className={`w-filters h-full
                    ${showFilter ? 'animate-slideout' : 'animate-slideback'}`}>
                        <div className="flex justify-center items-center mt-5">
                            <Switch onClick={handleDiscountToggle} checked={onlyDiscount}/>
                            <p className="ml-3 text-2xl text-offwhite font-inter">On Sale</p>
                        </div>
                        <div className="w-80% mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="text-offwhite font-inter text-2xl mt-3 ml-5 mb-2">Price Range</p>
                        <div className="flex flex-col gap-y-[10px] ml-5 mt-3">
                        {/* Ranges and genres again for regular filter menu, again dynamically having them checked if they are selected for consistency */}
                        {ranges.map((range) => (
                            <div key={range.id} className="flex items-center mr-5">
                                <Checkbox id={`range-${range.id}`} checked={selectedRanges.includes(range.id)} onClick={() => handleRangeToggle(range.id)} />
                                <Label htmlFor={`range-${range.id}`} className="text-offwhite font-interlight ml-3 text-base leading-none">
                                    {range.label}
                                </Label>
                            </div>
                        ))}
                        </div>
                        <div className="w-80% mt-5 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        <p className="text-offwhite font-inter text-2xl mt-3 ml-5 mb-2">Genres</p>
                        <div className="flex flex-col gap-y-[10px] ml-5 mt-3">
                            {allGenres.map((genre, index) => {
                                const isExtraGenre = index >= 5;
                                if (!isExtraGenre || (isExtraGenre && showExtraGenres)) {
                                    return (
                                        <div key={genre} className="flex items-center mr-5">
                                            <Checkbox 
                                                id={`genre-${index}`} 
                                                checked={selectedGenres.includes(genre)} 
                                                onClick={() => handleGenreToggle(genre)} 
                                            />
                                            <Label 
                                                htmlFor={`genre-${index}`} 
                                                className="text-offwhite font-interlight ml-3 text-base leading-none"
                                            >
                                                {genre}
                                            </Label>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div className={`w-full transition-all duration-100`}>
                            <div className="ml-5 mt-3">
                                <button className="text-offwhite text-base font-inter hover:underline cursor-pointer"
                                onClick={() => { setShowExtraGenres(!showExtraGenres) }}>
                                Show {genreButton}</button>
                            </div>
                            <div className="w-80% mt-4 h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
                        </div>
                    </div>
                </div>
                <div className={`transition-all duration-200 ease-out w-full ${showFilter ? 'ml-showfilter pl-0' : ''}`}>
                    {loading ? (
                        <div className="mx-auto flex flex-col items-center text-offwhite text-[18px] mb-10 mt-8">
                            <p className="text-center mb-4">Fetching games..</p>
                            <ScaleLoader color="#EFEFEF" height={20} margin={2} width={3} loading/>
                        </div>
                    ) : (
                        <>
                        <div className={`grid transition-transform gap-x-6 gap-y-8 grid-cols-1 pb-2 w-full
                        ${showFilter ? 'filtertablet:grid-cols-2 filterlg:grid-cols-3': 'tablet:grid-cols-2 lg:grid-cols-3'}`}>
                        {/* Mapping the array of games returned from api page and defining variables as needed */}
                        {games.map((game) => {
                            let gameName = game.name || "";
                            let isLong = 0;
                            let steamOnSale = game.steam_on_sale === "1";
                            let steamPrice = parseFloat(game.steam_price);
                            let steamNormalPrice = parseFloat(game.steam_normal_price.replace(/[^\d.-]/g, ''));
                            let epicOnSale = game.epic_on_sale === "1";
                            let epicPrice = parseFloat(game.epic_price);
                            let epicNormalPrice = parseFloat(game.epic_normal_price.replace(/[^\d.-]/g, ''));
                            let steamDiscount = 0;
                            let epicDiscount = 0;
                            // Shortening games names which are too long
                            if (gameName.length > 30) gameName = gameName.substring(0, 30) + '...', isLong = 1;
                            // Below I calculate both the epic and steam discount %
                            if (steamOnSale) {
                                let normalPrice1 = steamNormalPrice;
                                let salePrice1 = steamPrice;
                                
                                if (normalPrice1 > 0) {
                                    steamDiscount = Math.round(((normalPrice1 - salePrice1) / normalPrice1) * 100);
                                }
                            }

                            if (epicOnSale) {
                                let normalPrice2 = epicNormalPrice;
                                let salePrice2 = epicPrice;
                                
                                if (normalPrice2 > 0) {
                                    epicDiscount = Math.round(((normalPrice2 - salePrice2) / normalPrice2) * 100);
                                }
                            }

                            return (
                                // When a game is clicked, call the function and pass the game id to take user to that game's page
                                <a href={`/game?id=${game.game_id}`} onClick={() => handleGame(game.game_id)} key={game.game_id}>
                                    <div className="w-card bg-lightmidnight rounded-searchbox hover:scale-103 transition-all duration-200">
                                        <div className="flex items-end justify-center">
                                            <div className={`absolute flex py-2 px-4 bg-lightmidnight items-center rounded-popup 
                                                content-center transition-all duration-150 mb-3 triangle-div text-center 
                                                // Conditionally rendering a small popup for long game names
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
                                                        {/* If statement to render Free for games of price 0 */}
                                                        {steamPrice == 0 ? ( <p>Free</p> ) : ( <p>${steamPrice}</p> )}
                                                    </p>
                                                </div>
                                                <div className="bg-grey h-[32px] w-0.2 mt-0.5 mx-[22px]" />
                                                <div className="flex w-40 justify-start items-center">
                                                    <p className="font-interlight text-prices text-offwhite">
                                                        {/* Again conditionally rendering N/A if game wasn't available on epic, or free if it was 0 */}
                                                        {epicPrice == -1 ? ( <p>N/A</p> ) : epicPrice == 0 ? ( <p>Free</p> ) : ( <p>${epicPrice}</p> )}
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
                        {totalResults == 0 ? 
                            // Simple no results message to help users diagnose the error
                            ( <p className="text-offwhite flex justify-center mt-5 text-[20px]">No Results.</p> ) :
                            (<div className="flex mx-6 text-offwhite justify-center font-inter mt-3.5 mb-6">
                                <a href="#" className={`flex mr-3.5 items-center font-inter transition-colors duration-200 text-[16px] px-3.5 h-[38px] rounded-md 
                                // Here, I conditionally grey out the first button if the page number is one and make it unclickable, do the 
                                same thing with last and current page, also changing current page number to 1 on click.
                                ${isFirstPage ? 'text-[#4f4f54] pointer-events-none' : 'text-offwhite hover:bg-lightmidnight'}`} onClick={() => goToPage(1)} >
                                    <RxDoubleArrowLeft />
                                    <p className="ml-1 mr-2">First</p>
                                </a>
                                {/* Mapping pagination item array for the page numbers at the bottom to display current page and +- 1 */}
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
                            </div>)}
                        </>
                    )};
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