"use client"

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import Nav from "@/components/nav";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// 3 Arrays for carousel images so I can map in the carousel function
const carouselData = [
  {
    name: "Ghost of Tsushima",
    image: "tsushima.jpg",
    link: "/game?id=1033",
  },
  {
    name: "Sea of Thieves",
    image: "seaofthieves.jpg",
    link: "/game?id=1048",
  },
  {
    name: "Cyberpunk 2077",
    image: "cyberpunk.jpeg",
    link: "/game?id=5",
  },
  {
    name: "Elden Ring",
    image: "eldenring.jpeg",
    link: "/game?id=3",
  },
  {
    name: "No Man's Sky",
    image: "nomanssky.jpeg",
    link: "/game?id=175",
  },
];

export default function HomePage() {
  // Carousel settings
  const plugin = useRef(AutoScroll({ speed: 3, stopOnMouseEnter: true, stopOnInteraction: false }));

  const [isHovered, setIsHovered] = useState(Array(carouselData.length).fill(false));
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // When user submits a search, this function sends that variable via 
  // URL to browse page for search filtering
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/browse?search=${searchTerm}`);
  };

  // Functions for checking if user's mouse is over carousel images (to show extra details at bottom)
  const handleMouseEnter = (index: number) => {
    const newHoverState = isHovered.map((hovered, i) => (i === index ? true : hovered));
    setIsHovered(newHoverState);
    plugin.current?.stop();
  };
  const handleMouseLeave = (index: number) => {
    const newHoverState = isHovered.map((hovered, i) => (i === index ? false : hovered));
    setIsHovered(newHoverState);
    plugin.current?.reset();
  };

  return (
    <>
    {/* I need to manually place nav component here as root layout won't apply */}
    <Nav/>
    <div className="homewidth:w-[1320px] homewidth:mx-auto w-auto mx-5">
      <div className={`w-full flex my-[34px] small:my-28 flex-col items-center mx-auto`}>
        <p className="text-offwhite text-center text-[52px] font-intersemibold mb-3 mx-4 small:text-[70px]">Spend less on games.</p>
        <p className="text-offwhite text-center text-[18px] font-inter mb-10 max-w-[500px] mx-5">
          Find the lowest prices for thousands of games simply by searching, 
          or browse through games on the browse tab.
        </p>
        
        <form className="w-full z-20 max-w-[380px] mx-auto" 
        /* Calling search function upon search submit */ onSubmit={handleSearchSubmit}>
            <div className="relative w-auto mx-5">
                <IoIosSearch className="absolute text-offwhite w-auto h-[70%] ml-3 top-1/2 transform -translate-y-1/2"/>
                <input
                className="w-full pl-19 p-4 text-[18px] placeholder:font-inter text-offwhite font-inter bg-lmidnight
                rounded-searchbox placeholder:text-grey ring-[1px] ring-lightermidnight placeholder:text-[16px] transition-all duration-100" 
                placeholder="Search for a game..."
                /* Setting the search term */
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </form>
      </div>
      <div className="small:mt-40 mt-[84px] mx-5">
        {/* Carousel settings from above and ensuring that it infinitely loops */}
        <Carousel plugins={plugin.current ? [plugin.current] : []}
          opts={{ align:"start", loop:true }}
          className="transition-all content-center">
          <div className="absolute top-0 left-0 h-full w-[60px] pointer-events-none bg-gradient-to-r from-[rgba(8,9,10,1)] via-[rgba(8,9,10,1)] via-10% to-[rgba(0,212,255,0)] to-100% z-10"></div>
          <div className="absolute top-0 right-0 h-full w-[60px] pointer-events-none bg-gradient-to-l from-[rgba(8,9,10,1)] via-[rgba(8,9,10,1)] via-10% to-[rgba(0,212,255,0)] to-100% z-10"></div>
          <CarouselContent>
            {/* Mapping the carousel arrays from above */}
            {carouselData.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 small:basis-1/3">
                <Card className="bg-transparent">
                  <CardContent className="flex p-0">
                    {item.image ? (
                      <a
                        className="relative overflow-hidden rounded-[18px]"
                        href={item.link}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                      >
                        <img
                          src={`/images/${item.image}`}
                          alt="Game Image"
                          className="h-auto hover:brightness-80 transition-all duration-200"
                        />
                        <div
                          className={`flex flex-col items-center absolute bottom-0 w-full h-[50px] 
                          bg-lightmidnight z-10 transition-all duration-200 justify-center
                          ${isHovered[index] ? 'animate-slideup' : 'animate-slidedown'}`}
                        >
                          <p className="font-inter small:text-2xl text-offwhite mb-1">{item.name}</p>
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
        <p className="text-offwhite font-inter text-center max-w-[380px] text-[18px] mt-16 mx-auto">Our browse page offers thousands of games, able to be filtered and sorted to your needs.</p>
        <a className="flex mt-5 bg-offwhite w-[140px] hover:bg-darkwhite rounded-md h-[42px] justify-center items-center transition-all duration-200 mx-auto" href="../browse">
          <p className="font-intersemibold text-[16px]">Browse games</p>
        </a>
      </div>
      <div className="FAQwidth:max-w-[720px] FAQwidth:mx-auto small:mt-[134px] mt-[108px] mx-10">
        <p className="text-offwhite text-[32px] small:text-[40px] text-center flex justify-center font-inter mb-10">Frequently Asked Questions</p>
        {/* Accordion component from ui folder */}
        <Accordion type="single" collapsible className="w-full text-offwhite">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Prowler?</AccordionTrigger>
            <AccordionContent>
              Prowler is a react-based website developed with one purpose: to help users spend less on games. Currently, Prowler
              can provide the prices of thousands of games on Steam and Epic Games, as well as useful details about them. My goal
              is to make the process of purchasing games easier for all. All services are free.
            </AccordionContent>
          </AccordionItem>
          <div className="w-full h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does Prowler work?</AccordionTrigger>
            <AccordionContent>
              Prowler uses a robust and automated web scraping program to scrape Steam and Epic Games&#39; respective websites, storing
              thousands of games and their details in a database. This information is then pulled from the database to be displayed
              on this website.
            </AccordionContent>
          </AccordionItem>
          <div className="w-full h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
          <AccordionItem value="item-3">
            <AccordionTrigger>What are some upcoming features?</AccordionTrigger>
            <AccordionContent>
              My plans for upcoming features include account functionality with a customisable wishlist (including an option to 
              recieve emails when games go on sale) and adding more sellers.
            </AccordionContent>
          </AccordionItem>
          <div className="w-full h-0.5 bg-lightmidnight rounded-2xl mx-auto"/>
        </Accordion>
        <p className="mx-auto text-grey text-center text-[14px] font-interbold mt-32 small:mt-40 mb-20">Developed by Kobe Bayliss</p>
      </div>
    </div>
    </>
  );
}
