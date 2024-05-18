import React from 'react'
import Nav from '@/components/nav'
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function HomePage() {
  return (
    <div className="flex justify-end mr-20 content-center h-restscreen">
      <Carousel className="w-full max-w-xs self-center">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex items-center justify-center p-0 border-0">
                  <img src="/images/cyberpunk.jpg" alt="Cyberpunk image" className="w-full h-auto"/>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}