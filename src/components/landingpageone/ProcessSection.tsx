import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function ProcessSection({ data }: { data: any }) {
    if (!data) return null;

    return (
        <section id='process' className={cn("py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg }}>
            <div className="mx-auto px-6 md:px-12 flex flex-col items-center relative">
                <div>
                    <div className="flex flex-col items-center text-center max-w-[537px] mx-auto mb-16 lg:mb-[96px]">
                        <SmartHeading 
                            as="h2"
                            text={data.heading?.text || data.heading}
                            className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
                            style={{ color: data.heading?.color || data.headingColor }}
                        />                        
                        <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }} dangerouslySetInnerHTML={{ __html: data.description?.text || data.description || "" }} />
                    </div>
                </div>

                <div className={cn("relative w-full max-w-[1064px] mx-auto", data.styling?.className)}>
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 rounded-full" style={{ background: `linear-gradient(to bottom, ${data.styling?.lineColor || data.lineColor}, ${data.styling?.lineColor || data.lineColor} 90%, transparent)` }} />

                    <div className="flex flex-col gap-16 lg:gap-[116px] relative">
                        {data.steps?.map((step: any, index: number) => {
                            const isEven = index % 2 !== 0;
                            return (
                                <div key={step.id || index} className={cn(`flex flex-col lg:flex-row items-center gap-8 lg:gap-[116px] w-full ${isEven ? 'lg:flex-row-reverse' : ''}`, step.className)}>
                                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                                        <div className="w-full max-w-[474px]">
                                            <div className="relative w-full aspect-[474/284] rounded-2xl overflow-hidden shadow-sm border border-black/5" style={{ backgroundColor: data.section?.bg || data.bg }}>
                                                {step.image && <img src={step.image} alt={step.title} className="object-cover absolute inset-0 w-full h-full" />}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 border-4 shadow-sm" style={{ backgroundColor: data.styling?.lineColor || data.lineColor, borderColor: data.section?.bg || data.bg }} />

                                    <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-start text-left'}`}>
                                        <div className="w-full max-w-[474px]">
                                            <div className="flex flex-col">
                                                {/* 🔥 ENLARGED STEP BADGE */}
                                                <div className={`mb-5 inline-flex px-5 py-2.5 border border-black/10 rounded-[14px] w-fit shadow-sm ${isEven ? 'lg:ml-auto' : ''}`} style={{ backgroundColor: data.section?.bg || data.bg }}>
                                                    <span className="font-bold text-[16px] md:text-[18px] tracking-wide" style={{ color: step.titleColor }}>Step {step.id || index + 1}</span>
                                                </div>
                                                <h3 className="font-medium text-[24px] md:text-[30px] leading-[1.28] tracking-[-1px] mb-3" style={{ color: step.titleColor }}>{step.title}</h3>
                                                <p className="text-[16px] md:text-[18px] leading-[1.6]" style={{ color: step.descColor }} dangerouslySetInnerHTML={{ __html: step.description || "" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}