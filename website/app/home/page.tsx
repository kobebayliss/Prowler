"use client"

import * as React from "react"
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const carouselImages = [
  "seaofthieves.jpg",
  "cyberpunk.jpg",
  "tsushima.jpg",
  "reddead.png",
  "tsushima.jpg",
]

export default function HomePage() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <div className="w-full content-center">
      <p className="text-offwhite text-title font-inter ml-14 mb-4">Spend less on games.</p>
      <p className="text-offwhite text-xl font-interlight ml-14 mb-14">Find the lowest prices for thousands of games simply by searching,<br/>  or browse through games on the browse tab.</p>
      <input 
        type="text"
        placeholder="Search for games here..." 
        className="h-16 ml-14 mb-60 p-5 w-70% rounded-2xl custom-placeholder input-focus bg-lightmidnight"
      />
      </div>
      <div className="flex justify-end mr-10 relative">
        <div className="absolute pointer-events-none h-carousel w-carousel self-center rounded-4xl bg-black z-10 opacity-0 hover:opacity-60 transition-all duration-200"/>
        <Carousel 
          plugins={[plugin.current]}
          className="self-center size-carouselsize z-0"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent> 
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="bg-transparent">
                  <CardContent className="flex p-0">
                    <Image
                      src={`/images/${image}`}
                      alt="Game Image" 
                      className="rounded-4xl"
                      width={1200}
                      height={1200}
                    />
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
  )
}
