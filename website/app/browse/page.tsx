"use client";

import * as React from "react";
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";

export default function BrowsePage() {
    return (
        <div>
            <div className="flex py-4 items-center">
                <p className="text-offwhite font-inter text-3xl ml-9">Browsing Games</p>
                <p className="text-grey font-inter text-base ml-14 mt-0.5">1254 Results</p>
            </div>
        <div className="flex justify-center w-full">
            <div className="grid gap-x-6 gap-y-8 grid-cols-3 mt-1 pb-8">
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
                <div className="h-80 w-120 bg-lightmidnight rounded-xl"/>
            </div>
        </div>
        </div>
    );
}
