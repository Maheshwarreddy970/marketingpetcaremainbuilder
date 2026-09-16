import React from 'react';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function GallerySection({ data }: { data: any }) {
    if (!data || !data.items) return null;

    return (
        <section
            id='gallery'
            className={cn("py-20 w-full overflow-hidden", data.section?.className)}
            style={{ backgroundColor: data.section?.bg || data.bg || '#fffaf8' }}
        >
            <div className="mx-auto px-6 md:px-12 flex flex-col items-center">

                <div className="flex flex-col items-center text-center max-w-[628px] mb-16 lg:mb-[94px]">
                    <SmartHeading 
                        as="h2"
                        text={data.heading?.text || data.heading}
                        className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
                        style={{ color: data.heading?.color || data.headingColor }}
                    />
                    <p
                        className={cn("text-base md:text-[18px] leading-[1.6] max-w-[537px]", data.description?.className)}
                        style={{ color: data.description?.color || data.descColor }}
                    >
                        {data.description?.text || data.description}
                    </p>
                </div>

                {/* 🔥 MOBILE VIEW (< 768px): Top labels, 3-column grid */}
                <div className="w-full flex flex-col gap-6 md:hidden">
                    {/* Before Section */}
                    <div className="flex flex-col w-full">
                        <div className="flex justify-center w-full mb-5">
                            <div
                                className="border border-gray-200 rounded-xl px-8 py-2 text-center font-bold text-[16px] shadow-sm uppercase tracking-wide"
                                style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg, color: data.styling?.badgeText || data.badgeText }}
                            >
                                Before
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {data.items.map((item: any, index: number) => (
                                <div key={`mob-before-${index}`} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
                                    {item.before && (
                                        <img src={item.before} alt={`Before ${item.alt || ''}`} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Arrows */}
                    <div className="grid grid-cols-3 gap-2 py-1">
                        {data.items.map((item: any, index: number) => (
                            <div key={`mob-arrow-${index}`} className="flex justify-center items-center">
                                <ArrowDown className="w-5 h-5 stroke-[2]" style={{ color: data.styling?.arrowColor || data.arrowColor }} />
                            </div>
                        ))}
                    </div>

                    {/* After Section */}
                    <div className="flex flex-col w-full">
                        <div className="flex justify-center w-full mb-5">
                            <div
                                className="border border-gray-200 rounded-xl px-8 py-2 text-center font-bold text-[16px] shadow-sm uppercase tracking-wide"
                                style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg, color: data.styling?.badgeText || data.badgeText }}
                            >
                                After
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {data.items.map((item: any, index: number) => (
                                <div key={`mob-after-${index}`} className="aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-200 relative">
                                    {item.after && (
                                        <img src={item.after} alt={`After ${item.alt || ''}`} className="absolute inset-0 w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 🖥️ DESKTOP VIEW (>= 768px): Original scrolling row layout */}
                <div className="hidden md:block w-full overflow-x-auto pb-6 scrollbar-hide">
                    <div className="min-w-max mx-auto flex flex-col pl-6 pr-12 md:pl-12">

                        <div className="relative flex items-center w-full">
                            <div className="absolute left-[100px] right-0 h-px bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
                            <div
                                className="w-[120px] flex-shrink-0 z-20 sticky left-0 py-2"
                                style={{ backgroundColor: data.section?.bg || data.bg || '#fffaf8' }} 
                            >
                                <div
                                    className="border border-gray-200 rounded-xl px-4 py-2 text-center font-semibold text-[16px] inline-block shadow-sm"
                                    style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg, color: data.styling?.badgeText || data.badgeText }}
                                >
                                    Before
                                </div>
                            </div>

                            <div className="flex flex-nowrap gap-8 z-10 pl-8">
                                {data.items.map((item: any, index: number) => (
                                    <div key={`before-${item.id || index}`} className={cn("w-[280px] md:w-[320px] shrink-0", item.className)}>
                                        <div
                                            className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                                            style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg }}
                                        >
                                            {item.before && (
                                                <img
                                                    src={item.before}
                                                    alt={`Before ${item.alt || ''}`}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex w-full py-8">
                            <div
                                className="w-[120px] flex-shrink-0 sticky left-0"
                                style={{ backgroundColor: data.section?.bg || data.bg || '#fffaf8' }}
                            />
                            <div className="flex flex-nowrap gap-8 pl-8">
                                {data.items.map((item: any, index: number) => (
                                    <div key={`arrow-${item.id || index}`} className="w-[280px] md:w-[320px] shrink-0 flex justify-center items-center">
                                        <ArrowDown
                                            className="w-5 h-5 stroke-[2]"
                                            style={{ color: data.styling?.arrowColor || data.arrowColor }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative flex items-center w-full">
                            <div className="absolute left-[100px] right-0 h-px bg-gray-200 top-1/2 -translate-y-1/2 z-0" />
                            <div
                                className="w-[120px] flex-shrink-0 z-20 sticky left-0 py-2"
                                style={{ backgroundColor: data.section?.bg || data.bg || '#fffaf8' }}
                            >
                                <div
                                    className="border border-gray-200 rounded-xl px-4 py-2 text-center font-semibold text-[16px] inline-block shadow-sm"
                                    style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg, color: data.styling?.badgeText || data.badgeText }}
                                >
                                    After
                                </div>
                            </div>

                            <div className="flex flex-nowrap gap-8 z-10 pl-8">
                                {data.items.map((item: any, index: number) => (
                                    <div key={`after-${item.id || index}`} className={cn("w-[280px] md:w-[320px] shrink-0", item.className)}>
                                        <div
                                            className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200"
                                            style={{ backgroundColor: data.styling?.badgeBg || data.badgeBg }}
                                        >
                                            {item.after && (
                                                <img
                                                    src={item.after}
                                                    alt={`After ${item.alt || ''}`}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}