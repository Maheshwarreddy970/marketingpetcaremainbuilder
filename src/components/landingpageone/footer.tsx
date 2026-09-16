import React from 'react';
import { cn } from '@/lib/utils';

// Helper function to turn `text` into <strong>text</strong>
const renderWithBold = (text: string) => {
    if (!text || typeof text !== 'string') return text;
    
    // Split by backticks. Every odd index will be the text inside the backticks.
    const parts = text.split('`');
    
    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return <strong key={index} className="font-bold">{part}</strong>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
    });
};

export default function Footer({ data }: { data: any }) {
    if (!data) return null;

    // Gracefully handle both the new nested schema and the old flat schema
    const logo = data.logo || {};
    const info = data.info || {};
    const socials = data.socials || {};
    const styling = data.styling || data; // Fallback to root data if styling object doesn't exist

    // 🔥 DYNAMIC LINKS ARRAYS FROM JSON
    const quickLinks = data.quickLinks || [];
    const legalLinks = data.legalLinks || [];

    // Check if map URL exists
    const hasMap = !!info.mapEmbedUrl;

    // Safely check if disclaimer exists and is not empty
    const hasDisclaimer = typeof data.disclaimer === 'string' && data.disclaimer.trim().length > 0;

    return (
        <footer
            id='footer'
            className={cn("px-6 pt-16 pb-16 font-sans overflow-hidden", data.section?.className)}
            style={{ backgroundColor: data.section?.bg || data.bg }}
        >
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* 🔥 Legal Disclaimer Block - MOVED TO TOP */}
                {hasDisclaimer && (
                    <div className="pb-8 border-b border-black/10">
                        <p className=" text-justify" style={{ color: styling.mutedColor }}>
                            {/* Run the text through our bolding helper */}
                            {renderWithBold(data.disclaimer)}
                        </p>
                    </div>
                )}

                {/* Grid layout */}
                <div className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 gap-10 items-start",
                    hasMap ? "lg:grid-cols-12" : "md:grid-cols-4"
                )}>

                    {/* Logo */}
                    <div className={cn(hasMap && "sm:col-span-2 lg:col-span-3")}>
                        <div className="flex items-center gap-3">
                            <a href="#" className={cn("group hover:opacity-80 transition-opacity", logo.className)}>
                                {logo.src ? (
                                    <img src={logo.src} alt={logo.alt || "Business Logo"} className="h-14 w-auto max-w-full object-contain object-left" />
                                ) : (
                                    <span className="font-bold text-xl" style={{ color: styling.textColor }}>Logo</span>
                                )}
                            </a>
                        </div>
                    </div>

                    {/* 🔥 DYNAMIC Quick Links */}
                    {quickLinks.length > 0 && (
                        <div className={cn(hasMap && "lg:col-span-2")}>
                            <nav aria-label="Quick links">
                                <h4 className="text-sm font-normal mb-5 tracking-wide" style={{ color: styling.mutedColor }}>Quick Links</h4>
                                <ul className="space-y-4">
                                    {quickLinks.map((link: any, index: number) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-base font-medium hover:opacity-75 transition-opacity"
                                                style={{ color: styling.textColor }}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}

                    {/* 🔥 DYNAMIC Legal Links */}
                    {legalLinks.length > 0 && (
                        <div className={cn(hasMap && "lg:col-span-2")}>
                            <nav aria-label="Legal documents">
                                <h4 className="text-sm font-normal mb-5 tracking-wide" style={{ color: styling.mutedColor }}>Legal</h4>
                                <ul className="space-y-4">
                                    {legalLinks.map((link: any, index: number) => (
                                        <li key={index}>
                                            <a
                                                href={link.href}
                                                className="text-base font-medium hover:opacity-75 transition-opacity"
                                                style={{ color: styling.textColor }}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}

                    {/* Contact Info */}
                    <div className={cn(hasMap && "lg:col-span-2")}>
                        <div>
                            <h4 className="text-sm font-normal mb-5 tracking-wide uppercase" style={{ color: styling.mutedColor }}>
                                {info.heading || "Locations"}
                            </h4>
                            <address className="not-italic space-y-4 text-base font-normal leading-relaxed" style={{ color: styling.textColor }}>
                                
                                {/* 🔥 APPLIED renderWithBold TO ADDRESS SO BACKTICKS WORK HERE! */}
                                <p className="whitespace-pre-line">{renderWithBold(info.address)}</p>
                                
                                {info.phone?.label && (
                                    <p>
                                        <a href={info.phone.href} className="hover:opacity-75 transition-opacity">
                                            {info.phone.label}
                                        </a>
                                    </p>
                                )}
                                {info.email?.label && (
                                    <p>
                                        <a href={info.email.href} className="hover:opacity-75 transition-opacity">
                                            {info.email.label}
                                        </a>
                                    </p>
                                )}
                            </address>
                        </div>
                    </div>

                </div>

                {/* 🗺️ Google Map & Storefront Side-by-Side */}
                {(hasMap || info.storefrontImage?.src) && (
                    <div className="w-full flex flex-col mt-4">
                        <h4 className="text-sm font-semibold mb-4 tracking-wider uppercase" style={{ color: styling.mutedColor }}>
                            {info.storefrontImage?.src ? "Location & Storefront" : "Our Location"}
                        </h4>

                        <div className={cn("grid gap-4", hasMap && info.storefrontImage?.src ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}>

                            {info.storefrontImage?.src && (
                                <div className="relative w-full h-[300px] rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                                    <img
                                        src={info.storefrontImage.src}
                                        alt="Our Storefront"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            )}

                            {hasMap && (
                                <div className="relative w-full h-[300px] bg-slate-100 rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">Loading map...</div>
                                    <iframe
                                        src={info.mapEmbedUrl}
                                        title="Location Map"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        className="absolute inset-0 w-full h-full z-10 transition-all"
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* Bottom Footer Section */}
                <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-center sm:text-left" style={{ color: styling.mutedColor }}>
                        {renderWithBold(data.copyright)}
                    </p>

                    <div className="flex items-center gap-2.5">
                        {socials.facebook && (
                            <a
                                href={socials.facebook}
                                className="w-[26px] h-[26px] rounded-full flex items-center justify-center transition-transform hover:scale-105"
                                style={{ backgroundColor: styling.iconBg, color: styling.iconText }}
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" /></svg>
                            </a>
                        )}
                        {socials.instagram && (
                            <a
                                href={socials.instagram}
                                className="w-[26px] h-[26px] rounded-full flex items-center justify-center transition-transform hover:scale-105"
                                style={{ backgroundColor: styling.iconBg, color: styling.iconText }}
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                        )}
                    </div>
                </div>

            </div>
        </footer>
    );
}