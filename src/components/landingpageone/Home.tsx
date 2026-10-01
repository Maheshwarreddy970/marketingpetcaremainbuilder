"use client";

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';
import { Spotlight } from '../ui/Spotlight';
import AutoMaskImage from './AutoMaskImage';

export default function HeroSection({ data }: { data: any }) {
    // 1. Loading State
    const [isLoaded, setIsLoaded] = useState(false);

    // Failsafe: if there are no images at all, just load instantly
    useEffect(() => {
        if (!data?.image?.src && !data?.mobileImage?.src) {
            setIsLoaded(true);
        }
    }, [data]);

    if (!data) return null;

    const rawStars = data.socialProof?.stars;
    const parsedStars = Number(rawStars);
    const starCount = Number.isFinite(parsedStars) ? Math.max(0, Math.floor(parsedStars)) : 5;

    // Reusable animation class for staggered fading
    const getEntryAnimation = (delayMs: number) => cn(
        "transition-all duration-1000 ease-out transform",
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    );

    return (
        <section
            id='home'
            className={cn(
                "relative pt-12 w-full lg:min-h-[115vh] h-screen flex md:items-center overflow-hidden",
                data.section?.className
            )}
            style={{ backgroundColor: data.section?.bg }}
        >
            {/* ✨ MINIMAL LOADER */}
            <div
                className={cn(
                    "absolute inset-0 flex items-center justify-center z-50 transition-opacity duration-700 pointer-events-none",
                    isLoaded ? "opacity-0" : "opacity-100"
                )}
            >
                {/* Elegant subtle pulsing dot */}
                <div 
                    className="w-4 h-4 rounded-full animate-ping" 
                    style={{ backgroundColor: data.image?.imagecolor, opacity: 0.6 }} 
                />
            </div>

            {/* ✨ SPOTLIGHTS */}
            <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <Spotlight
                    id="spot-1"
                    className="-top-10 -left-10 md:-top-10 md:left-0"
                    fill="#FEFFF6"
                    opacity={0.55}
                    delay="0.5s"
                />
                <Spotlight
                    id="spot-2"
                    className="top-0 left-10 md:top-10 md:left-40"
                    fill="#FEFFF6"
                    opacity={0.45}
                    delay="1s"
                />
                <Spotlight
                    id="spot-3"
                    className="top-20 -left-32 md:top-40 md:left-10"
                    fill="#FEFFF6"
                    opacity={0.4}
                    delay="1.5s"
                />
            </div>

            {/* 🔥 DESKTOP IMAGE */}
            {data.image?.src && (
                <AutoMaskImage
                    src={data.image.src}
                    color={data.image?.imagecolor}
                    alt="Hero Background"
                    onReady={() => setIsLoaded(true)} // Tells the section it's ready
                    className={cn(
                        "absolute inset-0 w-full h-full z-0",
                        data.mobileImage?.src ? "hidden md:block" : "block"
                    )}
                    imgClassName={cn(
                        "object-cover object-[70%_center] md:object-center",
                        data.image?.className
                    )}
                />
            )}

            {/* 🔥 MOBILE IMAGE */}
            {data.mobileImage?.src && (
                <AutoMaskImage
                    src={data.mobileImage.src}
                    color={data.mobileImage?.imagecolor}
                    alt="Hero Background Mobile"
                    onReady={() => setIsLoaded(true)} // Tells the section it's ready
                    className="absolute inset-0 w-full h-full z-0 md:hidden block"
                    imgClassName={cn(
                        "object-cover object-center",
                        data.mobileImage?.className
                    )}
                />
            )}

            {/* 🔥 CONTENT */}
            <div className="relative z-10 w-full mx-auto px-6 md:px-12 lg:px-0 lg:ml-[10%]">
                <div className="flex flex-col max-w-[620px] py-20 md:py-0 pb-12">
                    <div className="flex flex-col gap-6 md:gap-8">
                        
                        {/* Announcement - Stagger 1 */}
                        {data.announcement && (
                            <div
                                className={cn(
                                    "inline-flex w-fit items-center px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase shadow-sm",
                                    getEntryAnimation(100),
                                    data.announcement?.className
                                )}
                                style={{
                                    backgroundColor: data.announcement?.bg || '#F28222',
                                    color: data.announcement?.textColor || '#ffffff',
                                    transitionDelay: '100ms'
                                }}
                            >
                                {data.announcement?.text}
                            </div>
                        )}

                        {/* Heading - Stagger 2 */}
                        <div className={getEntryAnimation(200)} style={{ transitionDelay: '200ms' }}>
                            <SmartHeading
                                as="h1"
                                text={data.heading?.text || data.heading}
                                className={cn(
                                    "text-5xl font-semibold md:font-normal md:text-7xl leading-[1.1] tracking-[-2px] lg:tracking-[-5px]",
                                    data.heading?.className
                                )}
                                style={{ color: data.heading?.color || data.headingColor }}
                            />
                        </div>

                        {/* Description - Stagger 3 */}
                        <p
                            className={cn(
                                "text-sm md:text-[18px] leading-[1.6] max-w-[380px] font-medium",
                                getEntryAnimation(300),
                                data.description?.className
                            )}
                            style={{ color: data.description?.color, transitionDelay: '300ms' }}
                            dangerouslySetInnerHTML={{ __html: data.description?.text || "" }}
                        />
                    </div>

                    {/* CTAs - Stagger 4 */}
                    <div 
                        className={cn("mt-8 md:mt-10 flex gap-3 md:gap-4", getEntryAnimation(500), data.cta?.className)}
                        style={{ transitionDelay: '500ms' }}
                    >
                        <a
                            href={data.cta?.href || "#"}
                            className={cn(
                                "group relative text-sm rounded-full py-3.5 px-8 flex items-center justify-center gap-[10px] w-fit overflow-hidden",
                                "transition-all duration-300 shadow-sm hover:opacity-90 hover:shadow-md"
                            )}
                            style={{
                                backgroundColor: data.cta?.bg || '#a35c38',
                                color: data.cta?.text || '#ffffff'
                            }}
                        >
                            <span className="font-medium text-[16px] whitespace-nowrap">
                                {data.cta?.label || "Book Online"}
                            </span>
                        </a>

                        {data.ctaSecondary && (
                            <a
                                href={data.ctaSecondary?.href || "#contact"}
                                className={cn(
                                    "group relative text-sm rounded-full py-3.5 px-8 flex items-center justify-center gap-[10px] w-full sm:w-fit overflow-hidden border-2",
                                    "transition-all duration-300 hover:bg-black/5 shadow-none",
                                    data.ctaSecondary?.className
                                )}
                                style={{
                                    backgroundColor: data.ctaSecondary?.bg || 'transparent',
                                    color: data.ctaSecondary?.text || '#a35c38',
                                }}
                            >
                                <span className="font-medium text-[16px] whitespace-nowrap">
                                    {data.ctaSecondary?.label || "Request via Form"}
                                </span>
                            </a>
                        )}
                    </div>

                    {/* Social Proof - Stagger 5 */}
                    <div 
                        className={cn("hidden md:flex flex-col gap-2 mt-6 md:mt-8", getEntryAnimation(700), data.socialProof?.className)}
                        style={{ transitionDelay: '700ms' }}
                    >
                        <div className="flex items-center gap-1 drop-shadow-md cursor-pointer hover:opacity-80 transition-opacity">
                            <a href={data.socialProof?.href || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                {[...Array(starCount)].map((_, index) => (
                                    <Star
                                        key={index}
                                        className="w-[18px] h-[18px]"
                                        style={{
                                            color: data.socialProof?.starColor || '#8c863a',
                                            fill: data.socialProof?.starColor || '#8c863a'
                                        }}
                                    />
                                ))}
                            </a>
                        </div>
                        <p
                            className="font-semibold text-[16px] opacity-100"
                            style={{ color: data.socialProof?.textColor }}
                        >
                            {data.socialProof?.text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}