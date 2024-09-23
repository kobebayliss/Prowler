"use client"

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ScaleLoader from "react-spinners/ScaleLoader";

// I need to define data types for variables from api here due to typescript specific error
interface Game {
    game_id: number;
    name: string;
    reviews: string;
    steam_on_sale: string;
    steam_price: string;
    steam_normal_price: string;
    steam_link: string;
    epic_on_sale: string;
    epic_price: string;
    epic_normal_price: string;
    epic_link: string;
    developer: string;
    publisher: string;
    short_desc: string;
    long_desc: string;
    banner: string;
    images: string;
    specs: string;
    genres: string[];
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

function GamePageContent() {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const descriptionRef = useRef(null);
    const isOverflow = useTextOverflow(descriptionRef, 4, isExpanded);
    const router = useRouter();
    const [game, setGame] = useState<Game | null>(null);
    const idQuery = useSearchParams();
    const id = idQuery.get('id');
    const [loading, setLoading] = useState<boolean>(true);

    // Axios statement to retrieve data from games api page (in /api/games) for the specific game's id, with loading logic too
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/games?id=${id}`);
                const selectedGame = response.data;

                if (selectedGame) {
                    setGame(selectedGame);
                } else {
                    console.error("Game not found");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching game:", error);
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="mx-auto flex flex-col items-center text-offwhite text-[20px] mb-10 mt-28">
                <p className="text-center mb-4">Fetching game details...</p>
                <ScaleLoader 
                    color="#EFEFEF"
                    height={20}
                    margin={2}
                    width={3}
                    loading
                />
            </div>
        );
    }

    if (!game) {
        return <div>Game not found</div>;
    }
    
    // Formatting some fields from database so I can use them correctly, eg. changing prices from strings to floats
    let imageUrls = game.images.replace(/[{}"]/g, '').split(',');
    imageUrls = imageUrls.map(url => url.trim()).filter((url, index, self) => self.indexOf(url) === index);

    let publisherFormatting = game.publisher.replace(/[{}"]/g, '').split(',');
    let publisherFinal = publisherFormatting.join(', ');
    
    let steamPrice = parseFloat(game.steam_price)
    let epicPrice = parseFloat(game.epic_price)

    let epicExists = epicPrice != -1

    return (
        <div className="w-auto mx-8 browse-width:mx-auto browse-width:w-[1320px]">
            <div className="grid-width:grid grid-width:grid-cols-[360px_auto] grid-width:mb-6 grid-width:mt-5 grid-width:w-[92.890510948%] w-full">
                <div className="flex flex-col grid-width:mr-8 justify-center">
                    <p className="text-offwhite font-inter text-[2.4em] mx-auto grid-width:mx-0 mt-3 grid-width:mt-0 line-clamp-2">{game.name}</p>
                    <p className="text-offwhite font-interlight text-[1.05em] mx-auto grid-width:mx-0">{game.reviews}</p>
                    <div className="h-px w-full bg-lightermidnight mt-3"/>
                    <div className="flex bg-lightmidnight w-full mx-auto h-[96px] mt-[20px] rounded-lg">
                        {/* Prices box */}
                        <a href={game.steam_link} target="_blank" rel="noopener noreferrer" className="w-[49.8%] rounded-l-lg 
                        transition-all duration-150 hover:bg-lightermidnight flex flex-col justify-center"
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/steam.png" alt="Steam logo" className="mr-3 w-auto h-[32px]"/>
                                {/* Conditionally rendering free if price is 0 */}
                                <p className="text-offwhite font-inter text-[23px]">{steamPrice == 0 ? ( <p>Free</p> ) : ( <p>${steamPrice}</p> )}</p>
                            </div>
                            <p className="font-interlight text-center text-darkerwhite text-[13px] mt-2.5">View Steam page</p>
                        </a>
                        <div className={`w-[1.5px] bg-lightermidnight self-center transition-all duration-150 ${isHovered ? 'h-[100%]' : 'h-[50%]'}`}/>
                        {/* Conditional epic link if it exists, otherwise # and unclickable */}
                        <a href={epicExists ? game.epic_link : "#"} target="_blank" rel="noopener noreferrer" 
                        className={`w-[50%] rounded-r-2xl transition-all duration-150 hover:bg-lightermidnight flex flex-col 
                        justify-center ${epicExists ? 'pointer-events-auto' : 'pointer-events-none' }`}
                        onMouseEnter={() => { setIsHovered(true); }}
                        onMouseLeave={() => { setIsHovered(false); }}>
                            <div className="flex justify-center items-center">
                                <img src="/images/epic.png" alt="Epic Games logo" className="mr-3 w-auto h-[32px]"/>
                                <p className="text-offwhite font-inter text-[23px]">
                                    {/* Conditionally rendering N/A if game doesn't exist on epic, or free if price = 0 */}
                                    {epicExists ? epicPrice == 0 ? ( <p>Free</p> ) : ( <p>${epicPrice}</p> ) : ( <p>N/A</p> )}
                                </p>
                            </div>
                            <p className={`font-interlight text-center text-darkerwhite text-[13px] ${epicExists ? 'mt-2.5' : 'mt-0'}`}>
                            {epicExists ? (<p>View Epic page</p>) : (<></>)}</p>
                        </a>
                    </div>
                    <div className="h-px w-full bg-lightermidnight mt-5"/>
                    <div className="mt-5 mb-5 grid-width:mb-0 w-full">
                        {/* Here I clamp the maximum vertical number of lines to 8 so that the formatting of this section remains consistent */}
                        <p className="font-interlight text-offwhite text-[15px] mx-auto grid-width:mx-0 line-clamp-8">
                            {game.short_desc}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col grid-width:ml-[50px] justify-center">
                    <div className="h-px w-full bg-lightermidnight mb-8 block grid-width:hidden"/>
                    {/* Autoplaying carousel of game's images */}
                    <Carousel plugins={[Autoplay({delay: 1800,}),]} opts={{loop: true,}}>
                    <div className="absolute top-0 left-0 h-full w-[60px] pointer-events-none bg-gradient-to-r from-[rgba(8,9,10,1)] via-[rgba(8,9,10,1)] via-10% to-[rgba(0,212,255,0)] to-100% z-10"></div>
                    <div className="absolute top-0 right-0 h-full w-[60px] pointer-events-none bg-gradient-to-l from-[rgba(8,9,10,1)] via-[rgba(8,9,10,1)] via-10% to-[rgba(0,212,255,0)] to-100% z-10"></div>
                        <CarouselContent>
                            {/* Mapping game images to carousel items to infinitely loop through them */}
                            {imageUrls.map((url, index) => (
                                <CarouselItem key={index}>
                                    <img src={url} alt={`Game screenshot ${index + 1}`} className="rounded-lg h-[411px] w-[732px]"/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            <div className="w-full">
                <div className="h-px w-full bg-lightermidnight"/>
                <div className="grid-width:grid grid-width:grid-cols-[auto_auto] mt-7">
                    <div>
                        <div className={`font-interlight text-offwhite grid-width:mr-24 text-[15px]`}>
                            {game.long_desc}
                        </div>
                        {/* If the description is too long, adding a read more button so that the page isn't automatically filled with a huge amount of text */}
                        {isOverflow && !isExpanded && (
                            <p className="font-inter mb-4 text-offwhite text-[15.5px] mt-1 cursor-pointer"
                            onClick={() => setIsExpanded(true)}>Click to read more</p>)}
                        {isExpanded && (
                            <p className="font-inter mb-4 text-offwhite text-[15.5px] mt-1 cursor-pointer"
                            onClick={() => setIsExpanded(false)}>Click to show less</p>)}
                    </div>
                    <div className="mt-10 grid-width:mt-0 mb-12 grid-width:mb-0 grid-width:justify-end max-w-[320px]">
                        <div className="flex">
                            <div className="w-[1.5px] block grid-width:hidden h-[auto] mr-4 bg-offwhite"/>
                            <div className="mt-2 text-inter grid-width:text-right mb-2.5 text-[17px] grid-width:text-[20px]">
                                <p className="text-darkerwhite">Genres</p>
                                <p className="text-offwhite mb-3.5">{game.genres.join(', ')}</p>
                                <p className="text-darkerwhite">Developer</p>
                                <p className="text-offwhite mb-3.5">{game.developer}</p>
                                <p className="text-darkerwhite">Publisher</p>
                                <p className="text-offwhite">{publisherFinal}</p>
                            </div>
                            <div className="w-[1.5px] hidden grid-width:block h-[auto] ml-4 bg-offwhite"/>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-10 text-offwhite">
                    <p className="flex justify-center grid-width:justify-start font-inter text-[20px]">System Requirements</p>
                    <div className="w-full mt-2 text-[13.5px] bg-midnight items-start rounded-lg font-interlight">
                    {/* Mapping the specs array and splitting it at each colon. This means that I can apply custom css classes to each side
                    so that the user can easily read this section and isn't overwhelmed. This can cause issues if the specs have a colon
                    which isn't corresponding to a field (look at website too see what I mean if this is confusing) but that's very rare */}
                    {game.specs.replace(/[{}"]/g, '').split(',').map((spec, index) => {
                        const [key, value] = spec.split(':');
                        return (
                            <div key={index} className="flex">
                                <p className="mb-[3px] text-darkerwhite font-inter">{key ? key.trim() : 'Unknown'}:</p>
                                <p className="font-interlight">&nbsp;{value ? value.trim() : 'N/A'}</p>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
    </div>
    );
}

export default function GamePage() {
    return (
        <Suspense fallback={<div className="text-offwhite font-inter flex justify-center text-[16px] mt-10">Loading...</div>}>
            <GamePageContent/>
        </Suspense>
    );
}