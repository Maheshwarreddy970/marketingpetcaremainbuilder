import React from 'react';
import { cn } from '@/lib/utils';
import SmartHeading from '../ui/SmartHeading';

export default function FounderSection({ data }: { data: any }) {
    if (!data) return null;

    // Safely extract text to prevent Object-as-Child React crashes
    const headingText = data.heading?.text !== undefined ? data.heading.text : data.heading;
    const subheadingText = data.subheading?.text !== undefined ? data.subheading.text : data.subheading;
    const descText = data.description?.text !== undefined ? data.description.text : data.description;
    
    // Safely extract signature properties (handles both text and image scenarios)
    const signatureText = data.signature?.text !== undefined ? data.signature.text : (typeof data.signature === 'string' ? data.signature : null);
    const signatureSrc = data.signature?.src;

    const images = data.images || [];

    return (
        <section id="founder" className={cn("py-20 md:py-32 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || '#ffffff' }}>
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text & Bio */}
                    <div className="flex flex-col items-start text-left order-2 lg:order-1">
                        {subheadingText && (
                            <h3 className={cn("hidden md:block text-sm md:text-base font-bold uppercase tracking-widest mb-4", data.subheading?.className)} style={{ color: data.subheading?.color || '#994500' }}>
                                {subheadingText}
                            </h3>
                        )}

                        <SmartHeading
                            as="h2"
                            text={headingText}
                            className={cn("hidden md:block font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-6", data.heading?.className)}
                            style={{ color: data.heading?.color || data.headingColor || '#1e0c05' }}
                        />

                        <div className={cn("text-base md:text-lg leading-[1.8] space-y-6", data.description?.className)} style={{ color: data.description?.color || '#625b5b' }}>
                            {/* We split by \n so you can have paragraphs in the JSON */}
                            {typeof descText === 'string' && descText.split('\n').map((paragraph: string, i: number) => (
                                paragraph.trim() && <p key={i}>{paragraph}</p>
                            ))}
                        </div>

                        {/* 🔥 SMART SIGNATURE RENDERING */}
                        {(signatureSrc || signatureText) && (
                            <div className={cn("mt-10", data.signature?.className)}>
                                {signatureSrc ? (
                                    <img 
                                        src={signatureSrc} 
                                        alt={data.signature?.alt || "Helen's Signature"} 
                                        className="h-16 md:h-20 w-auto object-contain drop-shadow-sm opacity-90"
                                    />
                                ) : (
                                    <div className="font-['Playfair_Display'] italic text-3xl" style={{ color: data.signature?.color || '#1e0c05' }}>
                                        {signatureText}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Staggered 4-Image Grid */}
                    <div className={cn("relative w-full order-1 lg:order-2", data.imageGrid?.className)}>
                        <div>
                            {subheadingText && (
                                <h3 className={cn("block md:hidden text-center text-sm font-bold uppercase tracking-widest mb-4", data.subheading?.className)} style={{ color: data.subheading?.color || '#994500' }}>
                                    {subheadingText}
                                </h3>
                            )}

                            <SmartHeading
                                as="h2"
                                text={headingText}
                                className={cn("block md:hidden text-center font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-6", data.heading?.className)}
                                style={{ color: data.heading?.color || data.headingColor || '#1e0c05' }}
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 md:gap-6 items-center">
                            
                            {/* Left Column of Images (Normal) */}
                            <div className="space-y-4 md:space-y-6">
                                {images[0] && (
                                    <div className="group rounded-[30px] overflow-hidden shadow-lg aspect-square border border-gray-100/50">
                                        <img
                                            src={images[0].src}
                                            alt={images[0].alt || "Helen"}
                                            className={cn("w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105", images[0].className)}
                                        />
                                    </div>
                                )}
                                {images[1] && (
                                    <div className="group rounded-[30px] overflow-hidden shadow-lg aspect-[4/5] border border-gray-100/50">
                                        <img
                                            src={images[1].src}
                                            alt={images[1].alt || "Pet"}
                                            className={cn("w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105", images[1].className)}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Right Column of Images (Pushed Down for Staggered Effect) */}
                            <div className="space-y-4 md:space-y-6 pt-12 md:pt-20">
                                {images[2] && (
                                    <div className="group rounded-[30px] overflow-hidden shadow-lg aspect-[4/5] border border-gray-100/50">
                                        <img
                                            src={images[2].src}
                                            alt={images[2].alt || "Pet"}
                                            className={cn("w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105", images[2].className)}
                                        />
                                    </div>
                                )}
                                {images[3] && (
                                    <div className="group rounded-[30px] overflow-hidden shadow-lg aspect-square border border-gray-100/50">
                                        <img
                                            src={images[3].src}
                                            alt={images[3].alt || "Clinic"}
                                            className={cn("w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105", images[3].className)}
                                        />
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}