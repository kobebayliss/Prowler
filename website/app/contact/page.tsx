"use client";

import * as React from "react";
import { useState, useEffect, Suspense } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BsCheck2Circle } from "react-icons/bs";

function ContactPageContent() {
    // Variables to keep track of where user is in the form process
    const [complete, setComplete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    // Function for sending off form whilst not redirecting user to a different page
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            // Fetching response from web3forms 
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            // Checking if data recieved successfully and error handling
            if (response.ok) {
                setLoading(false);
                setComplete(true);
            } else {
                console.error("Form submission failed");
                setLoading(false);
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            setLoading(false);
        }
    };

    return (
        <div className="contactwidth:w-[450px] contactwidth:mx-auto w-auto mx-10">
            {/* Simple static page for when user has successfully submitted form */}
            {complete ? (
                <div className="mx-auto mt-20 text-center flex flex-col items-center">
                    <BsCheck2Circle className="w-auto h-20 text-offwhite mb-6" />
                    <p className="text-offwhite text-[15px] font-inter">Form submitted successfully.</p>
                    <p className="text-offwhite text-[15px] font-inter">I will get back to you as soon as I can.</p>
                    <a className="bg-offwhite text-midnight mt-4 px-3 py-2 text-[13px] font-inter rounded-sm mx-auto 
                    hover:bg-darkwhite transition-all duration-200" href="../">Back to Home Page</a>
                </div>
            ) : (
                <>
                <p className="text-offwhite text-[44px] font-intersemibold flex justify-center mt-10">Contact Me</p>
                <p className="text-offwhite text-[15px] font-inter mx-auto mt-2 text-center">I am always working 
                to improve this site, so feel free to contact me if you notice any mistakes or encounter a problem.</p>

                {/* When user submits the form, calls the handleSubmit function */}
                <form onSubmit={handleSubmit} className="flex flex-col text-offwhite mx-auto mt-5">
                    <input type="hidden" name="access_key" value="fb47546a-eae6-4a69-8e7a-9edad4272b55"/>
                    <p className="text-grey font-inter text-left text-[13px] mb-1.5">Name</p>
                    <input type="text" name="name" required className="mb-4 py-2 px-3 rounded-sm bg-lmidnight text-offwhite font-inter
                    placeholder:text-grey ring-[1px] ring-lightermidnight placeholder:text-[13px]"/>

                    <p className="text-grey font-inter text-left text-[13px] mb-1.5">Email</p>
                    <input type="email" name="email" required className="mb-4 py-2 px-3 rounded-sm bg-lmidnight text-offwhite font-inter
                    placeholder:text-grey ring-[1px] ring-lightermidnight placeholder:text-[13px]"/>

                    <p className="text-grey font-inter text-left text-[13px] mb-1.5">Message</p>
                    <textarea name="message" required className="mb-6 py-2 px-3 rounded-sm bg-lmidnight text-offwhite font-inter
                    placeholder:text-grey ring-[1px] ring-lightermidnight placeholder:text-[13px]"/>
                    
                    {/* Checking that user is not a bot (web3forms handles this) */}
                    <input type="checkbox" name="botcheck" className="mb-6 hidden"/>
                    <input type="hidden" name="redirect" value="" />
                    {loading ? (
                        <div className="mt-1.5 mx-auto">
                            <ScaleLoader color="#EFEFEF" height={20} margin={2} width={3} loading/>
                        </div>
                    ) : (
                        <button type="submit" className="bg-offwhite text-midnight px-3 py-2 text-[13px] font-inter rounded-sm mx-auto 
                        hover:bg-darkwhite transition-all duration-200">Submit Message</button>
                    )}
                </form>
                </>
            )}
        </div>
    );
}

// This part renders the `ContactPageContent` component with a fallback UI that displays a loading message while the content is 
// being fetched or rendered. It uses React's Suspense to handle the loading state.
export default function ContactPage() {
    return (
        <Suspense fallback={<div className="text-offwhite font-inter flex justify-center text-[16px] mt-10">Loading...</div>}>
            <ContactPageContent />
        </Suspense>
    );
}
