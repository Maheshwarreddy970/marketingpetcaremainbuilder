import React from 'react'
import WorldMapDemo from './world-map'
import { AVAILABILITY_CONTENT } from './data'


function CheckIcon() {
    return (
        <svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-shrink-0 h-8 w-8"
        >
            <g clipPath="url(#clip0_294_975)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2969 32.25C7.59612 32.25 0.546875 25.1962 0.546875 16.5C0.546875 7.80375 7.59612 0.75 16.2969 0.75C24.9931 0.75 32.0469 7.80375 32.0469 16.5C32.0469 25.1962 24.9931 32.25 16.2969 32.25Z"
                    fill="#0553fc"
                    fillOpacity="0.1"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.3007 25.6952C11.2232 25.6952 7.10938 21.5788 7.10938 16.5038C7.10938 11.4289 11.2232 7.3125 16.3007 7.3125C21.3757 7.3125 25.4921 11.4289 25.4921 16.5038C25.4921 21.5788 21.3757 25.6952 16.3007 25.6952Z"
                    fill="#0553fc"
                />
                <path
                    d="M16.3007 25.6952C11.2232 25.6952 7.10938 21.5788 7.10938 16.5038C7.10938 11.4289 11.2232 7.3125 16.3007 7.3125C21.3757 7.3125 25.4921 11.4289 25.4921 16.5038C25.4921 21.5788 21.3757 25.6952 16.3007 25.6952Z"
                    stroke="#0553fc"
                    strokeWidth="1.96875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M20.3832 14.4619L15.2768 19.5684L12.2148 16.5037"
                    stroke="#F2F1FF"
                    strokeWidth="1.96875"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_294_975">
                    <rect
                        width={32}
                        height={33}
                        fill="white"
                        transform="translate(0.296875)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default function Availability() {
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-3 my-16 md:my-24 tracking-tight text-center mt-40 md:mt-40">
                <div className="w-fit px-3 md:text-base text-sm py-1 rounded-3xl gap-2 border-[1.3px] border-[#D6D6D6] shadow-[0px_1px_2px_0px_#0000001A,0px_4px_4px_0px_#00000017,0px_9px_5px_0px_#0000000D,0px_16px_6px_0px_#00000003,0px_25px_7px_0px_#00000000]">
                    {AVAILABILITY_CONTENT.badge}
                </div>
                <h1 className="md:text-4xl font-semibold mb-2 lg:text-5xl text-2xl text-center">
                    {AVAILABILITY_CONTENT.title}
                </h1>
                <p className="text-center w-72 md:w-[670px] md:text-base lg:text-lg text-sm px-1">
                    {AVAILABILITY_CONTENT.description}
                </p>
            </div>
            <div className="w-4/5 mx-auto mt-10 md:mt-24">
                <div className="w-full aspect-[2/1] bg-[#FAFAFA] rounded-lg relative font-sans">
                    <WorldMapDemo />
                </div>
                <div className="w-full flex items-center justify-center">
                    <div className="w-4/5">
                        <div className="grid place-items-center gap-3 font-normal mb-16">
                            <h1 className="text-4xl text-brand font-bold">
                                <span>{AVAILABILITY_CONTENT.stats.number}</span>
                                {AVAILABILITY_CONTENT.stats.suffix}
                            </h1>
                            <p className="text-neutral-600 text-base">
                                {AVAILABILITY_CONTENT.stats.label}
                            </p>
                        </div>
                        <div className="my-10">
                            <div
                                className="flex flex-col lg:flex-row justify-center gap-10 lg:gap-16"
                                style={{ opacity: 1, transform: "none" }}
                            >
                                {AVAILABILITY_CONTENT.features.map((featureText, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                        <CheckIcon />
                                        <p className="font-medium">{featureText}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}