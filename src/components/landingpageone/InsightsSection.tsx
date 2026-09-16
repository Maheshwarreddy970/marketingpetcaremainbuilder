import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function InsightsSection({ data }: { data: any }) {
    if (!data) return null;

    const insights = data.items || [];

    // 🔥 FIX: Safely extract text. If it is exactly "", it won't accidentally render the object!
    const headingText = data.heading?.text !== undefined ? data.heading.text : data.heading;
    const descText = data.description?.text !== undefined ? data.description.text : data.description;

    return (
        <section id='insights' className={cn("py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
                
                <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
                  <SmartHeading 
                    as="h2"
                    text={headingText}
                    className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
                    style={{ color: data.heading?.color || data.headingColor }}
                  />
                  <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }}>
                      {descText}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 w-full">
                    {insights.map((insight: any, index: number) => (
                        <div key={insight.id || index} className={cn("w-full", insight.className)}>
                            <article className="flex flex-col group cursor-pointer rounded-2xl overflow-hidden" style={{ backgroundColor: data.styling?.cardBg || data.cardBg || 'transparent' }}>
                                <div className="relative w-full aspect-[408/252] rounded-2xl overflow-hidden mb-6 shadow-sm border border-gray-100">
                                    {insight.image && (
                                        <img
                                            src={insight.image}
                                            alt={insight.title || "Blog Post"}
                                            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col items-start px-1">
                                    <div className="inline-flex items-center justify-center border border-gray-200 rounded-lg px-3 py-1 mb-4" style={{ backgroundColor: data.styling?.cardDateBg || data.cardDateBg }}>
                                        <span className="font-medium text-[14px] leading-[1.6]" style={{ color: data.styling?.cardDateText || data.cardDateText }}>
                                            {insight.date}
                                        </span>
                                    </div>
                                    <h3 className="font-medium text-[22px] md:text-[24px] leading-[1.3] tracking-[-0.7px] transition-colors duration-300 hover:opacity-80" style={{ color: data.styling?.cardTitle || data.cardTitle }}>
                                        {insight.title}
                                    </h3>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}