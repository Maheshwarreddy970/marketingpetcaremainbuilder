import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function FAQSection({ data }: { data: any }) {
    if (!data || !data.items || data.items.length === 0) return null;

    return (
        <section 
            id='faq' 
            className={cn("py-20 w-full overflow-hidden", data.section?.className)} 
            style={{ backgroundColor: data.section?.bg || data.bg || '#ffffff' }}
        >
            <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center">
                
                <div className="flex flex-col items-center text-center mb-12">
                   <SmartHeading 
    as="h2"
    text={data.heading?.text || data.heading}
    className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
    style={{ color: data.heading?.color || data.headingColor }}
/>
                    <p 
                        className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} 
                        style={{ color: data.description?.color || data.descColor }}
                    >
                        {data.description?.text || data.description}
                    </p>
                </div>

                <div className={cn("w-full flex flex-col", data.styling?.className)}>
                    {data.items.map((item: any, index: number) => (
                        <details 
                            key={index} 
                            className={cn("group [&_summary::-webkit-details-marker]:hidden border-b last:border-b-0", item.className)}
                            style={{ borderColor: data.styling?.dividerColor || '#ece5de' }}
                        >
                            <summary className="flex cursor-pointer items-center justify-between gap-4 py-6 outline-none">
                                <h3 
                                    className="font-medium text-[18px] md:text-[20px]"
                                    style={{ color: data.styling?.questionColor || data.questionColor || '#1e0c05' }}
                                >
                                    {item.question}
                                </h3>
                                <div 
                                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/5 group-open:bg-black/10 transition-colors"
                                    style={{ color: data.styling?.iconColor || '#1e0c05' }}
                                >
                                    <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                                </div>
                            </summary>
                            
                            <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                <p 
                                    className="text-[16px] leading-[1.6]"
                                    style={{ color: data.styling?.answerColor || data.answerColor || '#625b5b' }}
                                >
                                    {item.answer}
                                </p>
                            </div>
                        </details>
                    ))}
                </div>

            </div>
        </section>
    );
}