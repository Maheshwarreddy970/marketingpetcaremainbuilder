import React from 'react';
import { Star, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

const FiveStars = ({ color }: { color?: string }) => (
    <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className="w-[18px] h-[18px]"
                style={{ color: color || '#8c863a', fill: color || '#8c863a' }}
            />
        ))}
    </div>
);

const fallbackStatImageCard = {
    type: 'stat-image',
    image: 'https://res.cloudinary.com/doscyny4j/image/upload/v1785220338/gos_q5rxld.avif',
    heading: '1200+',
    subtext: 'Happy Pets Delivered Quarterly',
    bg: '#1e0c05',
    textColor: '#ffffff',
    iconColor: '#ffffff'
};

const CardRenderer = ({ card }: { card: any }) => {
    if (card.type === 'stat-numeric') {
        return (
            <div className={cn("rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[280px] shadow-sm", card.className)} style={{ backgroundColor: card.bg || '#a35c38' }}>
                <h3 className="font-medium text-[48px] tracking-[-1px] mb-4" style={{ color: card.scoreColor || '#ffffff' }}>
                    {card.score || '4.96'}
                    <span className="text-[36px] ml-0.5">{card.scale || '/5'}</span>
                </h3>
                <FiveStars color={card.starColor || '#ffffff'} />
                <p className="text-[14px] mt-3 opacity-90 font-medium" style={{ color: card.textColor || '#ffffff' }}>
                    {card.subtext || '5-Star Reviews'}
                </p>
            </div>
        );
    }

    if (card.type === 'stat-image') {
        return (
            <div className={cn("relative rounded-2xl overflow-hidden min-h-[280px] group shadow-sm", card.className)} style={{ backgroundColor: card.bg || '#111111' }}>
                {card.image && (
                    <img src={card.image} alt={card.subtext || 'Stat Image'} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105 z-0" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                    <Smile className="w-12 h-12 mb-4" strokeWidth={1.5} style={{ color: card.iconColor || '#ffffff' }} />
                    <h3 className="font-medium text-[40px] tracking-tight mb-1" style={{ color: card.textColor || '#ffffff' }}>{card.heading || '1200+'}</h3>
                    <p className="text-[16px] font-medium" style={{ color: card.textColor || '#ffffff' }}>{card.subtext || 'Happy Pets Delivered'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("border rounded-2xl p-8 flex flex-col justify-between min-h-[280px] h-full shadow-sm", card.className)} style={{ backgroundColor: card.bg || '#faf3ec', borderColor: card.borderColor || '#ece5de' }}>
            <div>
                <FiveStars color={card.starColor || '#8c863a'} />
                <p className="text-[16px] leading-[1.6] mt-6" style={{ color: card.textColor || '#625b5b' }}>{card.text || 'Great grooming experience!'}</p>
            </div>
            <div className="flex items-center gap-4 mt-8">
                {card.avatar && (
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white border border-gray-100">
                        <img src={card.avatar} alt={card.name || 'Avatar'} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                )}
                <div>
                    <h4 className="font-medium text-[16px]" style={{ color: card.titleColor || '#1e0c05' }}>{card.name || 'Anonymous Client'}</h4>
                    <p className="text-[14px]" style={{ color: card.textColor || '#625b5b' }}>{card.role || 'Pet Parent'}</p>
                </div>
            </div>
        </div>
    );
};

export default function ReviewsSection({ data }: { data?: any }) {
    if (!data) return null;

    const heading = data.heading?.text || data.heading || "The reviews say it all";
    const description = data.description?.text || data.description || "Our rating truly speaks for itself.";
    const rawCols = data.columns || {};

    let col1 = [...(rawCols.col1 || [])];
    let col2 = [...(rawCols.col2 || [])];
    let col3 = [...(rawCols.col3 || [])];

    const allCards = [...col1, ...col2, ...col3];
    const hasStatImage = allCards.some((card) => card.type === 'stat-image');

    if (!hasStatImage) {
        col3 = [fallbackStatImageCard, ...col3];
    }

    const columns = [col1, col2, col3];

    return (
        <section id='reviews' className={cn("py-20 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg || '#fffaf8' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
                <div className="flex flex-col items-center text-center max-w-[614px] mb-12 lg:mb-16">
                    <SmartHeading 
    as="h2"
    text={data.heading?.text || data.heading}
    className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
    style={{ color: data.heading?.color || data.headingColor }}
/>
                    <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor || '#625b5b' }}>
                        {description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {columns.map((colCards, colIdx) => (
                        <div key={`col-${colIdx}`} className="flex flex-col gap-6">
                            {colCards.map((card, cardIdx) => (
                                <div key={`col${colIdx}-${cardIdx}`} className={card.type === 'review' && colCards.length === 1 ? 'h-full' : ''}>
                                    <CardRenderer card={card} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}