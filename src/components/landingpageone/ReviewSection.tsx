import React from 'react';
import { CalendarDays, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatsBanner({ data }: { data: any }) {
    if (!data) return null;

    const ratingObj = data.rating || {};
    const experienceObj = data.experience || {};
    const starCount = Number.isFinite(Number(ratingObj.stars)) && Number(ratingObj.stars) >= 0 ? Number(ratingObj.stars) : 5;

    return (
        <section id='number' className={cn("py-16 md:py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
                
                <div className="max-w-[408px] w-full">
                    <h2 className={cn("text-center lg:text-left text-[22px] md:text-[24px] font-medium leading-[1.35] tracking-[-0.7px]", data.heading?.className)} style={{ color: data.heading?.color || data.headingColor }} dangerouslySetInnerHTML={{ __html: data.heading?.text || data.heading || "" }} />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-20 md:gap-[120px]">
                   {/* Ratings Block */}
                    <a href={data.rating?.href || "#reviews"} className={cn("flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity", data.rating?.className)}>
                        <div className="text-[32px] font-medium tracking-[-1px] flex items-center" style={{ color: data.rating?.scoreColor }}>
                            {data.rating?.score}
                            <span className="ml-1 text-[28px] opacity-90">{data.rating?.max}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 mb-2">
                            {[...Array(starCount)].map((_, index) => (
                                <Star key={index} className="w-[17px] h-[17px]" style={{ color: data.rating?.starColor, fill: data.rating?.starColor }} />
                            ))}
                        </div>
                        <p className="text-[14px]" style={{ color: data.rating?.labelColor }}>{data.rating?.label}</p>
                    </a>

                    <div className={cn("flex flex-col items-center text-center", experienceObj.className)}>
                        <CalendarDays className="w-10 h-10 stroke-[1.5]" style={{ color: experienceObj.iconColor }} />
                        <div className="flex flex-col mt-4">
                            <h3 className="text-[18px] font-semibold leading-snug" style={{ color: experienceObj.titleColor }}>{experienceObj.title}</h3>
                            <p className="text-[14px] mt-1 opacity-90" style={{ color: experienceObj.subColor }}>{experienceObj.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}