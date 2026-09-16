"use client";

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { submitContactFormAction } from '@/actions/contact';
import SmartHeading from '../ui/SmartHeading';

export default function ContactSection({ data, slug }: { data: any, slug?: string }) {
    if (!data) return null;

    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [serverError, setServerError] = useState("");

    // Form states
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [errors, setErrors] = useState({ name: "", email: "", phone: "", message: "" });
    const [touched, setTouched] = useState({ name: false, email: false, phone: false, message: false });

    // Inline Validation Logic
    useEffect(() => {
        const newErrors = { name: "", email: "", phone: "", message: "" };
        
        if (touched.name && form.name.length < 2) newErrors.name = "Name must be at least 2 characters.";
        if (touched.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Please enter a valid email address.";
        if (touched.phone && form.phone.replace(/\D/g, '').length < 10) newErrors.phone = "Phone number must be at least 10 digits.";
        if (touched.message && form.message.length < 10) newErrors.message = "Message must be at least 10 characters long.";

        setErrors(newErrors);
    }, [form, touched]);

    // Check if form is completely valid
    const isFormValid = 
        form.name.length >= 2 && 
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && 
        form.phone.replace(/\D/g, '').length >= 10 && 
        form.message.length >= 10;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid || !slug) return;
        
        setStatus("loading");
        setServerError("");

        const formData = new FormData(e.currentTarget);
        const res = await submitContactFormAction(formData);

        if (res.success) {
            setStatus("success");
            setForm({ name: "", email: "", phone: "", message: "" });
            setTouched({ name: false, email: false, phone: false, message: false });
            setTimeout(() => setStatus("idle"), 6000); // Reset form after 6 seconds
        } else {
            setStatus("error");
            setServerError(res.error || "Something went wrong.");
        }
    };

    return (
        <section id='contact' className={cn("py-24 w-full overflow-hidden", data.section?.className)} style={{ backgroundColor: data.section?.bg || data.bg || "#ffffff" }}>
            <div className="max-w-3xl mx-auto px-6 md:px-12 flex flex-col items-center">
                
                <div className="text-center mb-12 max-w-2xl">
                    <SmartHeading 
    as="h2"
    text={data.heading?.text || data.heading}
    className={cn("font-medium text-4xl md:text-[48px] leading-[1.2] tracking-[-1.5px] mb-4", data.heading?.className)} 
    style={{ color: data.heading?.color || data.headingColor }}
/>
                    <p className={cn("text-base md:text-[18px] leading-[1.6]", data.description?.className)} style={{ color: data.description?.color || data.descColor }}>
                        {data.description?.text || data.description || "Have questions? Send us a message and we'll reply directly to your email."}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full bg-white/60 backdrop-blur-xl border border-black/5 p-8 md:p-10 rounded-[24px] shadow-sm flex flex-col gap-6">
                    {/* CRITICAL: Passes the website slug to backend securely */}
                    {slug && <input type="hidden" name="slug" value={slug} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Full Name *</label>
                            <input name="name" value={form.name} onChange={handleInputChange} onBlur={handleBlur} type="text" placeholder="John Doe" className={cn("px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-1 bg-white/80 transition-all text-gray-900", errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-black/10 focus:border-black focus:ring-black")} />
                            {errors.name && <span className="text-[12px] text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.name}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label suppressHydrationWarning={true} className="text-sm font-semibold text-gray-800 ml-1">Email Address *</label>
                            <input name="email" value={form.email} onChange={handleInputChange} onBlur={handleBlur} type="email" placeholder="john@example.com" className={cn("px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-1 bg-white/80 transition-all text-gray-900", errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-black/10 focus:border-black focus:ring-black")} />
                            {errors.email && <span className="text-[12px] text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.email}</span>}
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-800 ml-1">Phone Number *</label>
                        <input name="phone" value={form.phone} onChange={handleInputChange} onBlur={handleBlur} type="tel" placeholder="(555) 123-4567" className={cn("px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-1 bg-white/80 transition-all text-gray-900", errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-black/10 focus:border-black focus:ring-black")} />
                        {errors.phone && <span className="text-[12px] text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.phone}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-800 ml-1">Message *</label>
                        <textarea name="message" value={form.message} onChange={handleInputChange} onBlur={handleBlur} rows={4} placeholder="How can we help you and your pet?" className={cn("px-4 py-3.5 rounded-xl border focus:outline-none focus:ring-1 bg-white/80 transition-all resize-none text-gray-900", errors.message ? "border-red-400 focus:border-red-500 focus:ring-red-500" : "border-black/10 focus:border-black focus:ring-black")} />
                        {errors.message && <span className="text-[12px] text-red-500 flex items-center gap-1 ml-1"><AlertCircle size={12}/> {errors.message}</span>}
                    </div>

                    {/* Server/Subscription Errors */}
                    {status === "error" && <p className="text-red-600 text-[14px] font-medium bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-2"><AlertCircle className="mt-0.5 shrink-0" size={16}/> {serverError}</p>}
                    
                    {/* Success Message */}
                    {status === "success" && <div className="flex items-center gap-2 text-green-700 font-medium bg-green-50/80 border border-green-200 p-4 rounded-xl"><CheckCircle2 size={20} /> Your message has been sent! We will contact you soon.</div>}

                    {/* Submit Button */}
                    <button disabled={!isFormValid || status === "loading" || status === "success" || !slug} type="submit" className={cn("mt-2 w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-[16px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md", data.button?.className)} style={{ backgroundColor: data.button?.bg || "#a35c38", color: data.button?.text || "#ffffff" }}>
                        {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> {data.button?.label || "Send Message"}</>}
                    </button>
                </form>

            </div>
        </section>
    );
}