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
      <p className="text-offwhite text-title font-azosans self-center ml-8 mb-80">Spend less on games.</p>
      <div className="flex flex-grow justify-end mr-6">
        <Carousel 
          plugins={[plugin.current]}
          className="self-center size-carouselsize"
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
                      width={1300}
                      height={1300}
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
