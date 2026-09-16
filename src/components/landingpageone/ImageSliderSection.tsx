import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function ImageSliderSection({ data }: { data: any }) {
    if (!data || !data.items || data.items.length === 0) return null;

    // 1. Split data into two halves for the mobile two-row layout
    const halfIndex = Math.ceil(data.items.length / 2);
    const topRowItems = data.items.slice(0, halfIndex);
    const bottomRowItems = data.items.slice(halfIndex);

    // 2. Duplicate arrays for the seamless infinite scroll looping
    const scrollAll = [...data.items, ...data.items];
    const scrollTopRow = [...topRowItems, ...topRowItems];
    const scrollBottomRow = [...bottomRowItems, ...bottomRowItems];

    // Reusable image card to keep code clean
    const ImageCard = ({ item, index }: { item: any, index: number }) => (
        <li
            key={index}
            className={cn(
                "relative w-[180px] md:w-[320px] aspect-square shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm",
                item.className
            )}
        >
            {item.image && (
                <img
                    src={item.image}
                    alt={item.alt || "Gallery Image"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
            )}
        </li>
    );

    return (
        <section
            id='slider'
            className={cn("py-20 w-full overflow-hidden", data.section?.className)}
            style={{ backgroundColor: data.section?.bg || data.bg || '#ffffff' }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">

                <div className="flex flex-col items-center text-center max-w-[628px] mb-12">
                    <SmartHeading
                        as="h2"
                        text={data.heading?.text || data.heading}
                        className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)}
                        style={{ color: data.heading?.color || data.headingColor }}
                        highlightColor={data.heading?.highlightColor || data.headingColor}
                    />
                    <p
                        className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)}
                        style={{ color: data.description?.color || data.descColor }}
                    >
                        {data.description?.text || data.description}
                    </p>
                </div>

            </div>

            {/* 🔥 INFINITE SCROLL WRAPPERS */}
            <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                
                {/* DESKTOP: Single Row (Hidden on Mobile) */}
                <ul className="hidden md:flex w-max flex-nowrap items-center gap-4 animate-infinite-scroll hover:[animation-play-state:paused]">
                    {scrollAll.map((item, index) => (
                        <ImageCard item={item} index={index} key={`desktop-${index}`} />
                    ))}
                </ul>

                {/* MOBILE: Two Rows (Hidden on Desktop) */}
                <div className="flex md:hidden flex-col gap-4">
                    
                    {/* Top Row */}
                    <ul className="flex w-max flex-nowrap items-center gap-4 animate-infinite-scroll hover:[animation-play-state:paused]">
                        {scrollTopRow.map((item, index) => (
                            <ImageCard item={item} index={index} key={`mobile-top-${index}`} />
                        ))}
                    </ul>

                    {/* Bottom Row (Slightly offset visually so the images stagger nicely) */}
                    <ul className="flex w-max flex-nowrap items-center gap-4 animate-infinite-scroll hover:[animation-play-state:paused] ml-[-40px]">
                        {scrollBottomRow.map((item, index) => (
                            <ImageCard item={item} index={index} key={`mobile-bottom-${index}`} />
                        ))}
                    </ul>

                </div>
            </div>
        </section>
    );
}