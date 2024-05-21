"use client"

import * as React from "react";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { db } from "@/config/db.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
        <p className="text-offwhite text-title font-inter ml-12 mb-4">Spend less on games.</p>
        <p className="text-offwhite text-xl font-interlight ml-12 mb-13">
          Find the lowest prices for thousands of games simply by searching,<br />
          or browse through games on the browse tab.
        </p>
        <input 
          type="text"
          placeholder="Search for games here..." 
          className="h-15 ml-12 mb-searchmargin p-5 w-75% rounded-2xl custom-placeholder input-focus bg-lightmidnight"
        />
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
                          className="rounded-4xl hover:brightness-80 transition-all duration-150"
                          layout="fill"
                          objectFit="cover"
                        />
                        <div 
                        className={`flex flex-col items-center absolute bottom-0 w-full h-popup bg-lightmidnight rounded-b-4xl z-10 transition-all duration-200 
                        ${isHovered ? 'animate-slideup' : 'animate-slidedown'}`}>
                          <p className="font-inter text-2xl text-offwhite mt-top">Ghost of Tsushima</p>
                          <div className="flex">
                            <p className="font-interlight text-prices text-offwhite mt-2">$59.99</p>
                            <div className="bg-grey h-line w-0.2 mt-2.3 mx-8"/>
                            <p className="font-interlight text-prices text-offwhite mt-2">$59.99</p>
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
