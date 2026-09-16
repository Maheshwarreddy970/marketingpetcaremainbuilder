import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function ComparisonSection({ data }: { data: any }) {
    if (!data) return null;

    // Check if the right column was hidden in the JSON
    const isSingleColumn = !data.rightColumn || data.rightColumn?.className?.includes('hidden');

    return (
        <section id='comparison' className={cn("py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg || '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
                <div className="flex flex-col items-center text-center max-w-[628px] mb-12 lg:mb-16">
                    <SmartHeading
                        as="h2"
                        text={data.heading?.text || data.heading}
                        className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)}
                        style={{ color: data.heading?.color || data.headingColor }}
                    />
                    <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }}>
                        {data.description?.text || data.description}
                    </p>
                </div>

                <div className={cn(
                    "relative w-full mx-auto flex flex-col items-stretch",
                    isSingleColumn ? "max-w-3xl" : "max-w-[950px] md:flex-row"
                )}>

                    {/* LEFT COLUMN (Always shows) */}
                    <div
                        className={cn(
                            "w-full p-8 md:p-10 lg:p-12",
                            isSingleColumn
                                ? "rounded-[22px] shadow-sm border border-gray-100"
                                : "md:w-1/2 border border-gray-200 border-b-0 md:border-b md:border-r-0 rounded-t-[22px] md:rounded-t-none md:rounded-l-[22px]",
                            data.leftColumn?.className
                        )}
                        style={{ backgroundColor: data.leftColumn?.bg || data.leftBg }}
                    >
                        {!isSingleColumn && (
                            <h3 className="font-medium text-[24px] leading-[1.3] tracking-[-0.7px] mb-6" style={{ color: data.leftColumn?.textColor || data.leftText }}>We Offer</h3>
                        )}

                        <ul className={cn("flex flex-col", isSingleColumn ? "gap-2" : "")}>
                            {data.leftColumn?.offers?.map((item: string, index: number) => (
                                <li key={index} className={cn(
                                    "flex items-center gap-4",
                                    isSingleColumn ? "py-[14px]" : "py-[18px] border-b border-white/20 last:border-b-0"
                                )}>
                                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 stroke-[2]" style={{ color: data.leftColumn?.iconColor || data.leftIcon }} />
                                    <span className="text-[16px] md:text-[18px] font-medium leading-[1.6] opacity-90" style={{ color: data.leftColumn?.textColor || data.leftText }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ONLY SHOW RIGHT COLUMN AND VS BADGE IF isSingleColumn IS FALSE */}
                    {!isSingleColumn && (
                        <>
                            {/* VS BADGE */}
                            <div className={cn("absolute md:mt-0 16 left-1/2 -rotate-10 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center", data.vsBadge?.className)}>
                                <div className="rounded-full w-[60px] h-[60px] md:w-[64px] md:h-[64px] border-[4px] flex items-center justify-center shadow-md" style={{ backgroundColor: data.vsBadge?.bg || data.vsBg, color: data.vsBadge?.text || data.vsText, borderColor: data.section?.bg || data.bg || '#ffffff' }}>
                                    <span className="font-medium text-[20px] md:text-[22px] tracking-[-1px] uppercase">vs</span>
                                </div>
                            </div>

                            {/* RIGHT COLUMN */}
                            <div className={cn("w-full md:w-1/2 p-8 md:p-10 lg:p-12 border-gray-300 border-r border-y rounded-b-[22px] md:rounded-bl-[0px] md:rounded-r-[22px]", data.rightColumn?.className)} style={{ backgroundColor: data.rightColumn?.bg || data.rightBg }}>
                                <h3 className="font-medium text-[24px] leading-[1.3] tracking-[-0.7px] mb-6" style={{ color: data.rightColumn?.textColor || data.rightText }}>Other offers</h3>
                                <ul className="flex flex-col">
                                    {data.rightColumn?.offers?.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center gap-4 py-[18px] border-b border-gray-200/50 last:border-b-0">
                                            <XCircle className="w-5 h-5 flex-shrink-0 stroke-[1.5]" style={{ color: data.rightColumn?.iconColor || data.rightIcon }} />
                                            <span className="text-[15px] md:text-[16px] leading-[1.6]" style={{ color: data.rightColumn?.textColor || data.rightText }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </section>
    );
}



