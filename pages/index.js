import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react'

export default function Home() {
    const [date, setDate] = useState(new Date());
    const [info, setInfo] = useState({ ip: "" });
    const [showMore, setShowMore] = useState(false);

    const currentDate = new Date();
    const startDate = new Date(date.getFullYear(), 0, 0);
    const itsDay = date.toLocaleTimeString([], {hour: '2-digit'}) >= 6 && date.toLocaleTimeString([], {hour: '2-digit'}) <= 11;


    // Get current time
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date(), 1000));

        return function cleanup() {
            clearInterval(timer);
        }
    });

    // Get current position by IP
    useEffect(() => {
        fetch("https://ip.nf/me.json", {method: "get"})
            .then((response) => response.json())
            .then((data) => {
                setInfo({ ...data })
            });
    }, []);

    return (
        <div class={`${ itsDay ? "wallpaperDay" : "wallpaperNight" } w-full h-[100vh]`}>
            <Head>
                <title>Frontend Mentor - Clock App</title>

                <meta charSet="UTF-8" />
                <meta name="description" content="Your challenge is to build out this clock application and get it looking as close to the design as possible. You'll be using external APIs to set the data based on the visitor's location and generate random programming quotes. " />
                <meta name="keywords" content="Frontend Mentor, Moro Samuele, NextJs, React, Clock App" />
                <meta name="author" content="Moro Samuele" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="w-full h-full float-left">
                <div className="h-full px-[165px] pt-[56px] pb-[98px] flex flex-col justify-between">
                    {
                        !showMore &&
                            <div className="w-full flex flex-col max-w-[540px]">
                                <div className="flex space-x-2">
                                    <p className="text-white">“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”</p>
                                    <div className="relative w-[35px] h-[35px] cursor-pointer opacity-[0.5] transition-all hover:opacity-100">
                                        <Image
                                            src="/images/refresh-arrow.svg"
                                            layout="fill"
                                        />
                                    </div>
                                </div>
                                <h5 className="text-white mt-[13px]">Ada Lovelace</h5>
                            </div>
                    }
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex space-x-[16px] items-center">
                                <div className="relative w-[24px] h-[24px]">
                                    <Image
                                        src={`/images/${ itsDay ? "sun" : "moon" }.svg`}
                                        layout="fill"
                                    />
                                </div>
                                <h4 className="text-white">Good { itsDay ? "morning" : "evening" }, it's currently</h4>
                            </div>
                            <h1 className="text-white mt-[16px]">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
                            <h3 className="text-white mt-[16px]">In {info.ip.city !== "" ? info.ip.city : "Unknown" }, {info.ip.country_code}</h3>
                        </div>

                        {
                            !showMore ?
                                <div className="flex items-end">
                                    <div className="group cursor-pointer w-[146px] h-[56px] rounded-full bg-white justify-end items-center flex" onClick={() => setShowMore(!showMore)}>
                                        <p className="text-[1rem] text-black opacity-[0.5] uppercase tracking-[5px] font-bold">
                                            More
                                        </p>
                                        <div className="bg-halfBlack w-[40px] h-[40px] relative rounded-full mr-[8px] ml-[10px] flex justify-center items-center transition-all group-hover:bg-[#999]">
                                            <Image
                                                src="/images/arrow-button.svg"
                                                width="16"
                                                height="10"
                                                className="mt-[2px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            :
                                <div className="flex items-end">
                                    <div className="group cursor-pointer w-[146px] h-[56px] rounded-full bg-white justify-end items-center flex" onClick={() => setShowMore(!showMore)}>
                                        <p className="text-[1rem] text-black opacity-[0.5] uppercase tracking-[5px] font-bold">
                                            Less
                                        </p>
                                        <div className="bg-halfBlack w-[40px] h-[40px] relative rounded-full mr-[8px] ml-[10px] flex justify-center items-center transition-all group-hover:bg-[#999]">
                                            <Image
                                                src="/images/arrow-button.svg"
                                                width="16"
                                                height="10"
                                                className="mt-[-2px] transform rotate-180"
                                            />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {
                    showMore &&
                        <div className={`backdrop-blur-md ${ itsDay ? "bg-white/75 text-black" : "bg-black/75 text-white" } h-1/2 absolute w-full bottom-0`}>
                            <div className="w-full h-full px-[165px] py-[74px] grid grid-cols-2">
                                <div className="grid grid-cols-1 border-r-[1px] border-r-halfBlack/[0.25]">
                                    <div className="flex flex-col space-y-[9px] mb-[42px]">
                                        <h6>Current timezone</h6>
                                        <h2>{info.ip.city !== "" ? info.ip.city : "Unknown"}</h2>
                                    </div>
                                    <div className="flex flex-col space-y-[9px]">
                                        <h6>Day of the year</h6>
                                        <h2>{Math.floor((date - startDate) / (1000 * 60 * 60 * 24))}</h2>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 ml-[94px]">
                                    <div className="flex flex-col space-y-[9px] mb-[42px]">
                                        <h6>Day of the week</h6>
                                        <h2>{date.getDay()}</h2>
                                    </div>
                                    <div className="flex flex-col space-y-[9px]">
                                        <h6>Week number</h6>
                                        <h2>{Math.ceil(Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000)) / 7)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
