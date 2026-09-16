import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function CtaSection({ data }: { data: any }) {
    if (!data) return null;
    const gradientBg = data.section?.bg || data.bg || '#faf3ec';

    return (
        <section id='cta' className={cn("relative w-full overflow-hidden px-6 py-20 md:px-12 md:py-32 lg:px-20", data.section?.className)} style={{ backgroundColor: gradientBg }}>
            <div className="absolute inset-0 z-0">
                {(data.image?.src || data.image) && (
                    <img className={cn("h-full w-full object-cover object-right md:object-center opacity-60 mix-blend-multiply", data.image?.className)} src={data.image?.src || data.image} alt="CTA Background" />
                )}
                <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(243deg, transparent 20%, ${gradientBg} 50%, ${gradientBg} 80%)` }} />
            </div>

            <div className="relative z-10 mx-auto max-w-[1272px]">
                <div className="flex max-w-[540px] flex-col items-start gap-8 md:gap-10">
                    <div className="flex flex-col gap-4">
                        <SmartHeading
                            as="h2"
                            text={data.heading?.text || data.heading}
                            className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)}
                            style={{ color: data.heading?.color || data.headingColor }}
                        />                        <p className={cn("text-pretty font-sans text-base leading-relaxed sm:text-lg", data.description?.className)} style={{ color: data.description?.color || data.descColor }} dangerouslySetInnerHTML={{ __html: data.description?.text || data.description || "" }} />
                    </div>

                    <div className={data.cta?.className}>
                        <a href={data.cta?.href || "#"} className="group relative flex items-center justify-center gap-3.5 overflow-hidden rounded-2xl px-[22px] py-3.5 text-base font-medium transition-all duration-300 hover:shadow-lg active:scale-[0.98] hover:opacity-90" style={{ backgroundColor: data.cta?.bg || '#a35c38', color: data.cta?.text || '#ffffff' }}>
                            <svg className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{data.cta?.label}</span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}