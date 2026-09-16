import React from 'react';
import { cn } from '@/lib/utils';

export default function SterilizationSection({ data }: { data: any }) {
    if (!data) return null;

    const descText = data.description?.text || "";

    return (
        <section id="sterilization" className={cn("w-full overflow-hidden py-16 md:py-24", data.section?.className)} style={{ backgroundColor: data.section?.bg || '#faf3ec' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    
                    {/* LEFT COLUMN: The Typography matching the design */}
                    <div className="flex flex-col items-start text-left order-2 lg:order-1 pr-0 lg:pr-8">
                        
                        {/* Heading */}
                        <h2 className="text-5xl md:text-[56px] font-serif leading-tight font-bold mb-1 tracking-tight" style={{ color: data.heading?.color || '#4a2b18' }}>
                            {data.heading?.text}
                        </h2>
                        
                        {/* Script "Every Time" & Heart/Paw */}
                        <div className="flex items-center gap-3 mb-8">
                            <span className="font-['Playfair_Display'] italic text-5xl md:text-[60px] font-medium tracking-wide" style={{ color: data.heading?.scriptColor || '#68844d' }}>
                                {data.heading?.scriptText}
                            </span>
                            {/* Custom SVG Heart-Paw matching the design vibe */}
                            <svg width="42" height="42" viewBox="0 0 24 24" fill="currentColor" style={{ color: data.heading?.scriptColor || '#68844d' }}>
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>

                        {/* Paragraphs */}
                        <div className="text-base md:text-[17px] leading-[1.8] space-y-6 font-sans mb-10" style={{ color: data.description?.color || '#333333' }}>
                            {descText.split('\n').map((paragraph: string, i: number) => (
                                paragraph.trim() && <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Decorative Divider */}
                        <div className="flex items-center justify-center w-full max-w-[280px] gap-4 mb-8">
                            <div className="h-[2px] flex-1 rounded-full" style={{ backgroundColor: data.footer?.pawColor || '#68844d', opacity: 0.4 }}></div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ color: data.footer?.pawColor || '#68844d' }}>
                                <path d="M8.5 6.5C9.33 6.5 10 5.83 10 5s-.67-1.5-1.5-1.5S7 4.17 7 5s.67 1.5 1.5 1.5zM15.5 6.5c.83 0 1.5-.67 1.5-1.5S16.33 3.5 15.5 3.5 14 4.17 14 5s.67 1.5 1.5 1.5zM19.5 10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM4.5 10.5C5.33 10.5 6 9.83 6 9s-.67-1.5-1.5-1.5S3 8.17 3 9s.67 1.5 1.5 1.5zM12 11c-2.83 0-5.32 1.54-6.68 3.86C5.07 15.3 5 15.65 5 16c0 2.21 1.79 4 4 4 1.13 0 2.19-.48 2.94-1.3l.06-.06.06.06c.75.82 1.81 1.3 2.94 1.3 2.21 0 4-1.79 4-4 0-.35-.07-.7-.32-1.14C17.32 12.54 14.83 11 12 11z"/>
                            </svg>
                            <div className="h-[2px] flex-1 rounded-full" style={{ backgroundColor: data.footer?.pawColor || '#68844d', opacity: 0.4 }}></div>
                        </div>

                        {/* Tagline */}
                        <div className="font-['Playfair_Display'] italic text-[28px] tracking-wide w-full text-center lg:text-left" style={{ color: data.footer?.color || '#4a2b18' }}>
                            {data.footer?.tagline}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: The Cropped Image */}
                    {/* The object-[85%_center] perfectly crops out the left text, revealing only the machine! */}
                    <div className="order-1 lg:order-2 w-full h-[400px] md:h-[500px] lg:h-[650px] relative rounded-[32px] overflow-hidden shadow-lg border border-black/5">
                        <img 
                            src={data.image?.src} 
                            alt={data.image?.alt || "Sterilization Process"} 
                            className="absolute inset-0 w-full h-full object-cover object-[85%_center]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}