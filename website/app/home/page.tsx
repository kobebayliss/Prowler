"use client"

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const carouselNames =[
  "Ghost of Tsushima",
  "Sea of Thieves",
  "Cyberpunk 2077",
  "Elden Ring",
  "No Man's Sky",
];

const carouselImages = [
  "tsushima.jpg",
  "seaofthieves.jpg",
  "cyberpunk.jpeg",
  "eldenring.jpeg",
  "nomanssky.jpeg",
];

export default function HomePage() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(0);
  const [initialScreenWidth, setInitialScreenWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
      setInitialScreenWidth(window.screen.width);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/browse?search=${searchTerm}`);
  };

  const homewidth = 1200;

  return (
    <div className="w-full largewidth:w-[1300px] mx-auto">
      <div className={`w-full flex my-10 small:my-28 flex-col items-center mx-auto`}>
        <p className="text-offwhite text-center text-[40px] font-intersemibold mb-3 mx-auto small:text-[70px]">Spend less on games.</p>
        <p className="text-offwhite text-center text-[18px] font-inter mb-10 w-[500px]">
          Find the lowest prices for thousands of games simply by searching, 
          or browse through games on the browse tab.
        </p>
        <form className="w-[400px]" onSubmit={handleSearchSubmit}>
            <div className="relative">
                <IoIosSearch className="absolute text-offwhite w-auto h-[70%] ml-3 top-1/2 transform -translate-y-1/2"/>
                <input
                className="w-full pl-19 p-4 text-[18px] placeholder:font-intersemibold placeholder:text-grey text-offwhite font-inter 
                rounded-searchbox bg-lightmidnight focus:outline-none focus:ring-1 focus:ring-offwhite transition-all duration-100" 
                placeholder="Search for a game..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </form>
      </div>
      <div className="small:mt-44 mt-[84px] flex w-[90%] mx-auto">
        <Carousel plugins={plugin.current ? [plugin.current] : []}
          className="w-full transition-all content-center mb-10"
          onMouseEnter={() => { setIsHovered(true); plugin.current?.stop(); }}
          onMouseLeave={() => { setIsHovered(false); plugin.current?.reset(); }}
        >
          <CarouselContent> 
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="bg-transparent">
                  <CardContent className="flex p-0">
                    {image ? (
                      <a className="relative w-full overflow-hidden rounded-carousel" href="#">
                        <img
                          src={`/images/${image}`}
                          alt="Game Image" 
                          className="h-full w-full hover:brightness-80 transition-all duration-200"/>
                        <div 
                        className={`flex flex-col items-center absolute bottom-0 w-full h-popup 
                        bg-midnight z-10 transition-all duration-200 justify-center
                        ${isHovered ? 'animate-slideup' : 'animate-slidedown'}`}>
                          <p className="font-inter text-2xl text-offwhite mb-1">{carouselNames[index]}</p>
                          <div className="flex mb-1 items-center">
                            <FaSteam className="text-offwhite mr-seperate h-logos w-auto"/>
                            <p className="font-interlight text-prices text-offwhite mt-em">$59.99</p>
                            <div className="bg-grey h-line w-0.2 mt-em mx-linemargin"/>
                            <p className="font-interlight text-prices text-offwhite mt-em">$59.99</p>
                            <SiEpicgames className="text-offwhite ml-seperate h-logos w-auto"/>
                          </div>
                        </div>
                      </a>
                      ) : (
                      <div className="w-full h-full bg-gray-200 rounded-4xl" />
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
