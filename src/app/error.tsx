"use client";
import React, { useEffect } from "react";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Common/Icons";


export const metadata: Metadata = {
    title: "Serious Error | GameZone",
    description: "We're working on it",
    // other metadata
};

export default function Error500Page({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Page Error:", error);
    }, [error]);

    return (
        <main>
            {/* <Breadcrumb title={"Error"} pages={["error"]} /> */}
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
                        <div className="text-center">
                            {/* <Image
                                src="/images/500.svg"
                                alt="500"
                                className="mx-auto mb-8 w-1/2 sm:w-auto"
                                width={288}
                                height={190}
                            /> */}

                            <h1 className="mx-auto mb-8 w-1/2 sm:w-auto text-[#3C50E0] text-6xl">
                                Error 500!
                            </h1>

                            <h2 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                                Sorry, an error occured
                            </h2>

                            <p className="max-w-[410px] w-full mx-auto mb-7.5">
                                We are fixing it...
                            </p>

                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                            >
                                <ArrowIcon />
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
