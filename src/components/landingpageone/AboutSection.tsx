import { CircleCheck, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function AboutSection({ data }: { data: any }) {
    if (!data) return null;

    return (
        <section id='about' className={cn("pt-16 pb-10 lg:py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[108px] items-center">

                    {/* 🔥 FIXED MOBILE IMAGE SIZE: aspect-[4/3] on mobile, normal tall aspect on desktop */}
                    <div className={cn("relative w-full max-w-[552px] mx-auto lg:mx-0 aspect-[4/3] md:aspect-square lg:aspect-[552/640] rounded-3xl overflow-hidden shadow-sm", data.image?.className)}>
                        {(data.image?.src || data.image) && (
                            <img src={data.image?.src || data.image} alt="About Image" className="object-cover absolute inset-0 w-full h-full" />
                        )}
                    </div>

                    <div className="flex flex-col gap-8 lg:gap-[72px] max-w-[548px] mx-auto lg:mx-0">
                        <div className="flex flex-col gap-5">
                            <SmartHeading
                                as="h2"
                                text={data.heading?.text || data.heading}
                                className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-2", data.heading?.className)}
                                style={{ color: data.heading?.color || data.headingColor }}
                            />                            
                            <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }} dangerouslySetInnerHTML={{ __html: data.description?.text || data.description || "" }} />
                        </div>

                        <div className={cn("flex flex-col gap-8 lg:gap-10", data.featuresList?.className)}>
                            <ul className="flex flex-col gap-4">
                                {(data.featuresList?.features || data.features)?.map((feature: string, index: number) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <CircleCheck className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} style={{ color: data.featuresList?.featureIconColor || data.featureIconColor }} />
                                        <span className="font-medium text-base md:text-[18px] leading-[1.6]" style={{ color: data.featuresList?.featureColor || data.featureColor }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {data.cta && (
                                <div>
                                    <a href={data.cta.href || "#"} className={cn("group relative rounded-2xl py-3.5 px-6 flex items-center justify-center gap-2.5 w-fit overflow-hidden transition-all duration-300 hover:opacity-90 shadow-sm", data.cta.className)} style={{ backgroundColor: data.cta.bg, color: data.cta.text }}>
                                        <span className="font-medium text-[16px] whitespace-nowrap">{data.cta.label}</span>
                                        <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}