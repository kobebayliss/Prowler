"use client";

import * as React from "react";
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";


export default function BrowsePage() {
    const cardCount = 18;

    return (
        <div>
            <div className="flex py-4 items-center">
                <p className="text-offwhite font-inter text-3xl ml-9">Browsing Games</p>
                <p className="text-grey font-inter text-base ml-14 mt-0.5">1254 Results</p>
                <div className="flex py-2.5 ml-auto mr-6">
                    <a href="#" className="flex hover:bg-lightmidnight transition-colors duration-200 h-10 w-10 rounded-lg justify-center items-center mr-2.5">
                        <IoIosSearch className="text-offwhite h-8 w-auto"/>
                    </a>
                    <a href="#" className="flex hover:bg-lightmidnight transition-colors duration-200 h-10 w-38 rounded-lg justify-center items-center mr-3">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Show Filters</p>
                        <FaFilter className="text-offwhite h-5.5 w-auto"/>
                    </a>
                    <a href="#" className="flex hover:bg-lightmidnight transition-colors duration-200 h-10 w-26 rounded-lg justify-center items-center">
                        <p className="text-offwhite font-inter text-filter mr-2.5">Sort</p>
                        <FaSortAlphaDown className="text-offwhite h-6 w-auto"/>
                    </a>
                </div>
            </div>
        <div className="flex justify-center w-full">
            <div className="grid gap-x-6 gap-y-8 grid-cols-1 tablet:grid-cols-2 lg:grid-cols-3 mt-1 pb-8 w-full px-9">
                {Array.from({ length: cardCount }).map((_, index) => (
                    <a href="#">
                        <div key={index} className="h-card w-card bg-lightmidnight rounded-xl hover:scale-103 transition-all duration-300">
                            <Image
                                src="/images/tsushima.jpg"
                                alt="Game image"
                                width={10000}
                                height={10000}
                                className="w-full h-cardimage rounded-t-xl"
                            />
                            <div className="flex flex-col items-center">
                            <p className="font-inter text-2xl text-offwhite mt-top">Ghost of Tsushima</p>
                            <div className="flex mt-topper items-center">
                                <FaSteam className="text-offwhite mr-seperate h-logos w-auto"/>
                                <p className="font-interlight text-prices text-offwhite mt-em">$59.99</p>
                                <div className="bg-grey h-line w-0.2 mt-em mx-linemargin"/>
                                <p className="font-interlight text-prices text-offwhite mt-em">$59.99</p>
                                <SiEpicgames className="text-offwhite ml-seperate h-logos w-auto"/>
                            </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
        </div>
    );
}