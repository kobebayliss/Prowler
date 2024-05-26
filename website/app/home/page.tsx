"use client";

import * as React from "react";
import { useRef, useState } from "react";
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

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="w-full content-center">
        <p className="text-offwhite text-title font-inter ml-10 mb-1">Spend less on games.</p>
        <p className="text-offwhite text-xl font-interlight ml-10 mb-8">
          Find the lowest prices for thousands of games simply by searching,<br />
          or browse through games on the browse tab.
        </p>
        <form className="w-34% ml-10 h-searchbox mb-40">   
            <div className="relative">
                <IoIosSearch className="absolute text-offwhite w-auto h-search ml-4.5 top-1/2 transform -translate-y-1/2"/>
                <input 
                className="w-full pl-19 p-4.5 text-search placeholder:font-inter placeholder:text-grey text-offwhite font-inter rounded-searchbox bg-lightmidnight focus:outline-none focus:ring-1 focus:ring-offwhite transition-all duration-100" 
                placeholder="Search for a game..."
                />
            </div>
        </form>
      </div>
      <div className="flex w-half justify-end relative">
        <Carousel 
          plugins={[plugin.current]}
          className="size-carouselsize transition-all content-center mr-10 h-[calc(100vh-65px)]"
          onMouseEnter={() => { setIsHovered(true); plugin.current.stop(); }}
          onMouseLeave={() => { setIsHovered(false); plugin.current.reset(); }}
        >
          <CarouselContent> 
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="bg-transparent">
                  <CardContent className="flex p-0">
                    {image ? (
                      <a className="relative w-full h-[calc(90vh-65px)] overflow-hidden rounded-4xl" href="#">
                        <Image
                          src={`/images/${image}`}
                          alt="Game Image" 
                          className="rounded-4xl hover:brightness-80 transition-all duration-200"
                          layout="fill"
                          objectFit="cover"
                        />
                        <div 
                        className={`flex flex-col items-center absolute bottom-0 w-full h-popup bg-lightmidnight rounded-b-4xl z-10 transition-all duration-200 
                        ${isHovered ? 'animate-slideup' : 'animate-slidedown'}`}>
                          <p className="font-inter text-2xl text-offwhite mt-top">{carouselNames[index]}</p>
                          <div className="flex mt-0.5">
                            <FaSteam className="text-offwhite mt-0.5 mr-5 h-logos w-auto"/>
                            <p className="font-interlight text-prices text-offwhite mt-2">$59.99</p>
                            <div className="bg-grey h-line w-0.2 mt-2.3 mx-8"/>
                            <p className="font-interlight text-prices text-offwhite mt-2">$59.99</p>
                            <SiEpicgames className="text-offwhite mt-0.5 ml-5 h-logos w-auto"/>
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
