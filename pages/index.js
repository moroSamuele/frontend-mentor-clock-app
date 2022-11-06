import { data } from 'autoprefixer';
import Head from 'next/head'
import Image from 'next/image';
import { useEffect, useState } from 'react'


export default function Home() {
    const [date, setDate] = useState(new Date());
    const [info, setInfo] = useState({ ip: "" });
    const [showMore, setShowMore] = useState(false);
    const [quote, setQuotes] = useState({
        'quote': '“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”',
        'author': 'Ada Lovelace',
    });

    const currentDate = new Date();
    const startDate = new Date(date.getFullYear(), 0, 0);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);


    // Get current time
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date(), 1000));

        return function cleanup() {
            clearInterval(timer);
        }
    });

    // Get current position by IP
    useEffect(() => {
        fetch("https://ipapi.co/json/", {method: "get"})
            .then((response) => response.json())
            .then((data) => {
                setInfo({ ...data })
            });

        if ( data.lon !== undefined ) {
            fetch("https://api.sunrise-sunset.org/json?lat=" + info.lat + "&lng=" + info.lon, {method: "get"})
                .then(res => res.json())
                .then(data => {
                    const sunrise = new Date(data.results.sunrise);
                    const sunset = new Date(data.results.sunset);
                    setSunrise(sunrise.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                    setSunset(sunset.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
                });
        }
    }, []);


    const itsDay = date.toLocaleTimeString([], {hour: '2-digit',  minute:'2-digit'}) >= sunrise && date.toLocaleTimeString([], {hour: '2-digit',  minute:'2-digit'}) <= sunset;

    // Get randomized quotes
    const randomQuote = () => {
        fetch('https://dummyjson.com/quotes/random')
            .then(res => res.json())
            .then((data) => {
                setQuotes({
                    'quote': data.quote,
                    'author': data.author,
                })
            });
    }


    return (
        <div className={`${ itsDay ? "wallpaperDay" : "wallpaperNight" } w-full h-full fixed`}>
            <Head>
                <title>Frontend Mentor - Clock App</title>

                <meta charSet="UTF-8" />
                <meta name="description" content="Your challenge is to build out this clock application and get it looking as close to the design as possible. You'll be using external APIs to set the data based on the visitor's location and generate random programming quotes. " />
                <meta name="keywords" content="Frontend Mentor, Moro Samuele, NextJs, React, Clock App" />
                <meta name="author" content="Moro Samuele" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <div className="w-full h-full float-left flex justify-center items-center">
                <div className="h-full w-[calc(100%-54px)] pt-[40px] pb-[40px] sm:w-[calc(100%-128px)] sm:pb-[64px] sm:pt-[64px] md:w-[calc(100%-340px)] md:pt-[56px] md:pb-[56px] flex flex-col justify-between">
                    {
                        !showMore &&
                            <div className="w-full flex flex-col max-w-[540px]">
                                <div className="block">
                                    <p className="text-white float-left max-w-[calc(100%-24px)] xs:text-[12px] xs:leading-[22px]">{quote.quote}</p>
                                    <div className="float-left relative w-[16px] h-[16px] ml-[8px] mt-[6px] cursor-pointer opacity-[0.5] transition-all hover:opacity-100" onClick={randomQuote}>
                                        <Image
                                            src="/images/refresh-arrow.svg"
                                            layout="fill"
                                            alt="Refreshing quotes"
                                        />
                                    </div>
                                </div>
                                <h5 className="text-white mt-[13px] xs:text-[12px] xs:leading-[12px]">{quote.author}</h5>
                            </div>
                    }
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex flex-col mb-[48px] sm:mb-[80px] md:mb-0">
                            <div className="flex space-x-[16px] items-center">
                                <div className="relative w-[24px] h-[24px]">
                                    <Image
                                        src={`/images/${ itsDay ? "sun" : "moon" }.svg`}
                                        layout="fill"
                                        alt="Night & Day icon"
                                    />
                                </div>
                                <h4 className="text-white xs:text-[15px] sm:text-[18px]">Good { itsDay ? "morning" : "evening" }<span className="hidden sm:block md:block float-right">, it&#39;s currently</span></h4>
                            </div>
                            <h1 className="text-white mt-[16px] sm:mt-0 text-[100px] leading-[100px] sm:text-[175px] sm:leading-[175px] md:text-[200px] md:leading-[200px]">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
                            <h3 className="text-white mt-[16px] text-[15px] sm:mt-0 sm:text-[18px]">In {info.city !== "" ? info.city : "Unknown" }, {info.country_code}</h3>
                        </div>

                        {
                            !showMore ?
                                <div className="flex items-end">
                                    <div className="group cursor-pointer w-[115px] h-[39px] sm:w-[146px] sm:h-[56px] rounded-full bg-white justify-end items-center flex" onClick={() => setShowMore(!showMore)}>
                                        <p className="text-[12px] sm:text-[1rem] text-black opacity-[0.5] uppercase tracking-[5px] font-bold">
                                            More
                                        </p>
                                        <div className="bg-halfBlack w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] relative rounded-full mr-[4px] sm:mr-[8px] ml-[8px] sm:ml-[10px] flex justify-center items-center transition-all group-hover:bg-[#999]">
                                            <Image
                                                src="/images/arrow-button.svg"
                                                width="16"
                                                height="10"
                                                className="mt-[2px]"
                                                alt="Expand more informations"
                                            />
                                        </div>
                                    </div>
                                </div>
                            :
                                <div className="flex items-end">
                                    <div className="group cursor-pointer w-[115px] h-[39px] sm:w-[146px] sm:h-[56px] rounded-full bg-white justify-end items-center flex" onClick={() => setShowMore(!showMore)}>
                                        <p className="text-[12px] sm:text-[1rem] text-black opacity-[0.5] uppercase tracking-[5px] font-bold">
                                            Less
                                        </p>
                                        <div className="bg-halfBlack w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] relative rounded-full mr-[4px] sm:mr-[8px] ml-[8px] sm:ml-[10px] flex justify-center items-center transition-all group-hover:bg-[#999]">
                                            <Image
                                                src="/images/arrow-button.svg"
                                                width="16"
                                                height="10"
                                                className="mt-[-2px] transform rotate-180"
                                                alt="Expand less informations"
                                            />
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {
                    showMore &&
                        <div className={`backdrop-blur-md ${ itsDay ? "bg-white/75 text-black" : "bg-black/75 text-white" } h-[256px] sm:h-1/2 absolute w-full bottom-0`}>
                            <div className="w-full h-full px-[26px] py-[48px] sm:px-[64px] sm:py-[119px] md:px-[165px] md:py-[74px] flex flex-col space-y-[16px] sm:grid sm:grid-cols-2">
                                <div className="flex flex-col space-y-[16px] sm:grid sm:grid-cols-1 md:border-r-[1px] border-r-halfBlack/[0.25]">
                                    <div className="flex xs:items-center h-[28px] justify-between sm:flex-col sm:space-y-[9px] sm:mb-[42px]">
                                        <h6 className="text-[10px] sm:text-[0.938rem]">Current timezone</h6>
                                        <h2 className="text-[20px] leading-[20px] sm:text-[3.5rem] sm:leading-[68px]">{info.timezone}</h2>
                                    </div>
                                    <div className="flex xs:items-center h-[28px] justify-between sm:flex-col space-y-[9px]">
                                        <h6 className="text-[10px] sm:text-[0.938rem]">Day of the year</h6>
                                        <h2 className="text-[20px] leading-[20px] sm:text-[3.5rem] sm:leading-[68px]">{Math.floor((date - startDate) / (1000 * 60 * 60 * 24))}</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-[16px] sm:grid sm:grid-cols-1 sm:ml-[94px]">
                                    <div className="flex xs:items-center h-[28px] justify-between sm:flex-col space-y-[9px] sm:mb-[42px]">
                                        <h6 className="text-[10px] sm:text-[0.938rem]">Day of the week</h6>
                                        <h2 className="text-[20px] leading-[20px] sm:text-[3.5rem] sm:leading-[68px]">{date.getDay()}</h2>
                                    </div>
                                    <div className="flex xs:items-center h-[28px] justify-between sm:flex-col space-y-[9px]">
                                        <h6 className="text-[10px] sm:text-[0.938rem]">Week number</h6>
                                        <h2 className="text-[20px] leading-[20px] sm:text-[3.5rem] sm:leading-[68px]">{Math.ceil(Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000)) / 7)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
