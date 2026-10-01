"use client";

import React from "react";
import { HOW_IT_WORKS_CONTENT } from "./data";

interface CardProps {
    number: string;
    title: string;
    description: string;
    colorTheme?: string;
    className?: string;
    rotate?: string;
    colors?: {
        bg: string;
        text: string;
        border: string;
    };
}

const Pin = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
    </svg>
);

const Card = ({
    number,
    title,
    description,
    className = "",
    rotate = "",
    colors,
}: CardProps) => {
    return (
        <div
            // Added max-w-[280px] and mx-auto so it stays as a compact card on mobile instead of stretching
            className={`relative w-full max-w-[280px] mx-auto md:max-w-none md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
        >
            <div className="bg-white dark:bg-neutral-900 p-1.5 md:p-2 rounded-[20px] md:rounded-[25px] shadow-[0px_10px_20px_0px_#D3D3D3] dark:shadow-none border border-neutral-100 dark:border-neutral-800">
                {/* Scaled down pin size and margin for mobile */}
                <Pin className={`w-6 h-6 md:w-8 md:h-8 ${colors?.text} z-20 mb-3 md:mb-6 mx-auto`} />
                <div
                    // Scaled down padding and border radius for mobile
                    className={`${colors?.bg} border ${colors?.border} rounded-[12px] md:rounded-[15px] p-3 md:p-[15px] h-full flex flex-col relative overflow-hidden`}
                >
                    <span
                        // Scaled down number text size for mobile
                        className={`${colors?.text} text-3xl md:text-4xl font-handwriting mb-3 md:mb-5`}
                        style={{
                            fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif',
                        }}
                    >
                        {number}
                    </span>
                    {/* Scaled down title text size for mobile */}
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 leading-tight md:leading-none mb-2 md:mb-[10px]">
                        {title}
                    </h3>
                    {/* Scaled down description text size for mobile */}
                    <p className="text-xs md:text-sm/5 text-neutral-500 dark:text-neutral-400 tracking-tight">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function HowItWorks() {
    const { steps, positions, heading, description } = HOW_IT_WORKS_CONTENT;

    // Calculate dynamic height based on the number of steps
    let height = 1130;
    if (steps.length === 1) height = 400;
    else if (steps.length === 2) height = 450;
    else if (steps.length === 3) height = 800;
    else if (steps.length === 4) height = 900;
    else height = 1130;

    return (
        <div className="w-full mt-6 md:mt-10">

            {/* Steps Section */}
            {/* Reduced side padding and bottom padding for mobile */}
            <div className="bg-white max-md:pb-16 md:py-10 px-4 md:px-8 relative ">
                {/* Dotted Background Theme from Hero */}
                <div
                    className="absolute -z-10 top-0 left-0 w-full h-full opacity-50"
                    style={{
                        backgroundImage: "",
                        backgroundSize: "20px 20px",
                    }}
                />

                <div className="mx-auto relative z-10 ">
                    <div
                        // Reduced vertical spacing (space-y) between cards on mobile
                        className="relative w-full mx-auto flex flex-col space-y-6 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
                        style={{ "--md-height": `${height}px` } as React.CSSProperties}
                    >
                        {/* Animated SVG connecting line */}
                        {steps.length > 1 && (
                            <svg
                                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                                viewBox={`0 0 1000 ${height}`}
                                preserveAspectRatio="none"
                            >
                                {(() => {
                                    const pathD = steps.reduce((acc, _, index) => {
                                        if (index >= steps.length - 1) return acc;
                                        if (index === 0) return "M 290 150 C 500 150, 550 270, 710 270"; // Card 1 -> 2
                                        if (index === 1) return acc + " C 850 270, 500 350, 290 450"; // Card 2 -> 3
                                        if (index === 2) return acc + " C 290 600, 550 720, 750 720"; // Card 3 -> 4
                                        if (index === 3) return acc + " C 950 720, 500 800, 290 850"; // Card 4 -> 5
                                        return acc;
                                    }, "");
                                    return (
                                        <path
                                            d={pathD}
                                            stroke="currentColor"
                                            className="text-neutral-300 dark:text-neutral-700"
                                            strokeWidth="2"
                                            strokeDasharray="8 6"
                                            fill="none"
                                            strokeLinecap="round"
                                            vectorEffect="non-scaling-stroke"
                                        >
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                from="0"
                                                to="-140"
                                                dur="3s"
                                                repeatCount="indefinite"
                                            />
                                        </path>
                                    );
                                })()}
                            </svg>
                        )}

                        {/* Render Cards */}
                        {steps.map((step, index) => {
                            const position = positions[index % positions.length];

                            return (
                                <Card
                                    key={step.title}
                                    number={`0${index + 1}`}
                                    title={step.title}
                                    description={step.description}
                                    colors={step.colors}
                                    rotate={position.rotate}
                                    className={position.className}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}