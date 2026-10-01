import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
    className?: string;
    fill?: string;
    opacity?: number;   // light strength (0 - 1)
    delay?: string;     // e.g. "0.75s"
    id?: string;        // unique filter id per spotlight
};

export const Spotlight = ({
    className,
    fill = "white",
    opacity = 0.5,
    delay = "0.75s",
    id = "spotlight-filter",
}: SpotlightProps) => {
    return (
        <svg
            className={cn(
                "animate-spotlight pointer-events-none absolute z-[1] opacity-0 mix-blend-screen",
                "h-[200%] w-[160%] lg:h-[190%] lg:w-[100%]",
                className
            )}
            style={{ animationDelay: delay }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 3787 2842"
            fill="none"
        >
            <g filter={`url(#${id})`}>
                <ellipse
                    cx="1924.71"
                    cy="273.501"
                    rx="1924.71"
                    ry="273.501"
                    transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
                    fill={fill}
                    fillOpacity={opacity}
                />
            </g>
            <defs>
                <filter
                    id={id}
                    x="0.860352"
                    y="0.838989"
                    width="3785.16"
                    height="2840.26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
                </filter>
            </defs>
        </svg>
    );
};