import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';
import { ArrowRight } from 'lucide-react';

// 🔥 Outline Icons from react-icons
import { IoCutOutline } from "react-icons/io5";
import { PiToothLight, PiShowerLight, PiCatLight, PiPawPrintLight, PiDropLight } from "react-icons/pi";
import { LuWind, LuBrush } from "react-icons/lu";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { FiHeart, FiScissors } from "react-icons/fi";
import { TbDental } from "react-icons/tb";

const iconMappings = [
    { keywords: ['haircut', 'cut', 'scissor', 'trim', 'styling', 'shave'], component: IoCutOutline },
    { keywords: ['bath', 'tub', 'wash', 'cleansing', 'shampoo'], component: PiShowerLight },
    { keywords: ['dry', 'blow dry', 'wind', 'blow'], component: LuWind },
    { keywords: ['nail', 'clipping', 'claw', 'paw'], component: PiPawPrintLight },
    { keywords: ['brushing', 'brush', 'coat', 'comb', 'deshedding'], component: LuBrush },
    { keywords: ['rinse', 'breath', 'spray', 'perfume'], component: FaRegFaceGrinStars },
    { keywords: ['skin', 'treatment', 'nourishing', 'conditioner'], component: PiDropLight },
    { keywords: ['teeth', 'dental', 'plaque', 'tartar', 'mouth', 'scaling', 'smile', 'clean'], component: TbDental },
    { keywords: ['cat', 'feline', 'kitten'], component: PiCatLight },
    { keywords: ['health', 'care', 'protect', 'safe'], component: FiHeart },
];

const fallbackIcons = [TbDental, FiHeart, LuBrush, PiShowerLight];

const getIconForService = (service: any) => {
    const searchString = `${service.title || ''} ${service.description || ''} ${service.iconKey || ''}`.toLowerCase();
    for (const mapping of iconMappings) {
        if (mapping.keywords.some(keyword => searchString.includes(keyword))) return mapping.component;
    }
    return fallbackIcons[(service.title?.length || 0) % fallbackIcons.length];
};

export default function ServicesSection({ data }: { data: any }) {
    if (!data) return null;

    const services = data.items || [];
    const getGridClasses = (count: number) => {
        switch (count) {
            case 1: return "grid-cols-1 max-w-md mx-auto";
            case 2: return "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    return (
        <section id='services' className={cn("md:py-24 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg }}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

                <div className="flex flex-col items-center text-center max-w-[620px] mb-16">
                    <SmartHeading
                        as="h2"
                        text={data.heading?.text || data.heading}
                        className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-5", data.heading?.className)}
                        style={{ color: data.heading?.color || data.headingColor }}
                    />
                    <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }}>
                        {data.description?.text || data.description || ""}
                    </p>
                    {/* 🔥 THE NEW GUARANTEE STAMP */}
                    {data.guaranteeBadge?.src && (
                        <div className="shrink-0">
                            <img
                                src={data.guaranteeBadge.src}
                                alt={data.guaranteeBadge.alt}
                                className="w-44 h-44 md:w-56 md:h-56 object-contain mt-4 drop-shadow-xl animate-pulse-slow"
                            />
                        </div>
                    )}
                </div>

                <div className={cn("grid gap-6 w-full mb-12", getGridClasses(services.length))}>
                    {services.map((service: any, index: number) => {
                        const Icon = getIconForService(service);
                        const hasValidLink = service.href && service.href.trim() !== "" && service.href.trim() !== "#";

                        return (
                            <div key={index} className={cn("h-full", service.className)}>
                                <div
                                    className={cn("group flex flex-col h-full border rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white")}
                                    style={{
                                        backgroundColor: data.styling?.cardBg || data.cardBg,
                                        borderColor: data.styling?.cardBorder || data.cardBorder || "#e5e7eb"
                                    }}
                                >
                                    <div className="mb-6">
                                        <Icon className="w-11 h-11 transition-transform group-hover:scale-110 duration-300" style={{ color: data.styling?.iconColor || data.iconColor }} strokeWidth={1.5} />
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <h3 className="font-semibold text-[22px] leading-[1.3] mb-3" style={{ color: data.styling?.titleColor || data.titleColor }}>
                                            {service.title}
                                        </h3>
                                        <p className="text-[15px] leading-[1.6] mb-6 flex-grow whitespace-pre-line" style={{ color: data.description?.color || data.descColor }}>
                                            {service.description}
                                        </p>

                                        {service.priceLabel && (
                                            <div className="font-semibold text-[15px] mb-6" style={{ color: data.styling?.priceColor || data.priceColor }}>
                                                {service.priceLabel}
                                            </div>
                                        )}

                                        {service.ctaLabel && (
                                            hasValidLink ? (
                                                <a
                                                    href={service.href}
                                                    className="mt-auto flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold text-[15px] w-full transition-all duration-300 hover:opacity-90 shadow-sm"
                                                    style={{ backgroundColor: data.styling?.iconColor || data.iconColor || "#a35c38", color: "#ffffff" }}
                                                >
                                                    {service.ctaLabel} <ArrowRight className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <div
                                                    className="mt-auto flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold text-[15px] w-full opacity-60 cursor-not-allowed"
                                                    style={{ backgroundColor: data.styling?.iconColor || data.iconColor || "#a35c38", color: "#ffffff" }}
                                                >
                                                    {service.ctaLabel} <ArrowRight className="w-4 h-4" />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


