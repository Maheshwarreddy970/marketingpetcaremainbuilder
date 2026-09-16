"use client";

import { useEffect, useState, useRef } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEditorStore } from "@/store/useEditorStore";
import { Loader2, ArrowLeft, ChevronDown, CheckCircle2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import WebsiteOne from "@/components/templates/WebsiteOne";
import { uploadImageAction } from "@/actions/upload";

// Make sure Input is imported from your components file!
import { ColorText, ButtonConfig, ImageUploader, Input } from "./components";

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <details className="group border-b border-gray-100 last:border-0 [&_summary::-webkit-details-marker]:hidden">
    <summary className="flex items-center justify-between cursor-pointer py-4 select-none outline-none">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-black">{title}</span>
      <ChevronDown size={16} className="text-gray-400 transition-transform group-open:rotate-180" />
    </summary>
    <div className="pb-6 space-y-4 animate-in fade-in slide-in-from-top-2">{children}</div>
  </details>
);

export default function LandingPageOneVisualEditor({ params }: { params: Promise<{ name: string }> }) {
  const [name, setName] = useState<string>("");

  const { config, currentSlug, setConfig, updateField, addArrayItem, removeArrayItem } = useEditorStore();

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  // Auto-save states
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const isFirstLoad = useRef(true);

  // 🔥 Inject Tailwind securely without upsetting React
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);

      const configScript = document.createElement("script");
      configScript.innerHTML = `
        tailwind.config = {
          theme: {
            extend: {
              keyframes: {
                'infinite-scroll': {
                  from: { transform: 'translateX(0)' },
                  to: { transform: 'translateX(calc(-100% - 1rem))' },
                }
              },
              animation: {
                'infinite-scroll': 'infinite-scroll 30s linear infinite',
              }
            }
          }
        }
      `;
      document.head.appendChild(configScript);
    }
  }, []);

  // Unwrap params and initialize data
  useEffect(() => {
    params.then((p) => {
      setName(p.name);
      const initializeData = async () => {
        try {
          if (currentSlug === p.name && config) {
            setLoading(false);
            return;
          }
          const docSnap = await getDoc(doc(db, "websites", p.name));
          if (docSnap.exists() && docSnap.data().websiteOneData) {
            setConfig(docSnap.data().websiteOneData, p.name);
          }
        } finally {
          setLoading(false);
        }
      };
      initializeData();
    });
  }, [params, currentSlug, config, setConfig]);

  // Auto-Save Logic
  useEffect(() => {
    if (currentSlug !== name) return;

    if (isFirstLoad.current) {
      if (config) isFirstLoad.current = false;
      return;
    }
    if (!config || !name) return;

    const timeoutId = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await setDoc(doc(db, "websites", name), {
          lastUpdated: new Date().toISOString(),
          websiteOneData: config
        }, { merge: true });

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err) {
        console.error("Auto-save failed:", err);
        setSaveStatus("idle");
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [config, name, currentSlug]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(path);

    try {
      const formData = new FormData();
      formData.append("file", file); // Appends the raw file

      // Calls the new Server Action
      const res = await uploadImageAction(formData);

      if (res.success) {
        updateField(path, res.url); // Updates Zustand with the new AVIF url
      } else {
        alert(`Upload failed: ${res.error}`);
      }
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploadingImage(null);
    }
  };

  if (loading || !config || currentSlug !== name) {
    return <div className="flex h-screen items-center justify-center bg-white"><Loader2 className="animate-spin text-black w-8 h-8" /></div>;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden bg-white text-black font-sans">

      {/* LEFT SIDEBAR: Visual Controls Only */}
      <div className="w-[420px] h-full flex flex-col shrink-0 bg-white shadow-2xl z-20">

        <div className="flex flex-col gap-5 px-6 pt-10 pb-5 border-b border-gray-100">
          <Link href={`/dashboard/${name}`} className="text-gray-400 hover:text-black flex items-center gap-1.5 text-sm font-medium w-fit transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-gray-800">Template 1: Visual Editor</h2>

            {/* Auto-Save Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              {saveStatus === "saving" && <><Loader2 size={14} className="animate-spin text-blue-500" /> <span className="text-blue-500">Saving...</span></>}
              {saveStatus === "saved" && <><CheckCircle2 size={14} className="text-green-500" /> <span className="text-green-500">Saved</span></>}
              {saveStatus === "idle" && <span className="text-gray-500">Up to date</span>}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-20 scrollbar-hide space-y-2">

          {/* THEME COLORS */}
          <Section title="Global Theme">
            <ColorText label="Primary Brand Color" colorValue={config.theme?.primaryColor} onColorChange={(v: string) => updateField('theme.primaryColor', v)} />
          </Section>

          {/* NAVBAR SECTION */}
          <Section title="Navigation Bar">
            <ColorText label="Background Color" colorValue={config.navbar?.section?.bg} onColorChange={(v: string) => updateField('navbar.section.bg', v)} />
            <ColorText label="Nav Link Color" colorValue={config.navbar?.styling?.linkColor} onColorChange={(v: string) => updateField('navbar.styling.linkColor', v)} />
            <ColorText label="Nav Hover Color" colorValue={config.navbar?.styling?.linkHoverColor} onColorChange={(v: string) => updateField('navbar.styling.linkHoverColor', v)} />
            <ImageUploader label="Logo Image" src={config.navbar?.logo?.src} isUploading={uploadingImage === 'navbar.logo.src'} onUpload={(e: any) => handleImageUpload(e, 'navbar.logo.src')} />
            <ButtonConfig label="CTA Button" textVal={config.navbar?.cta?.label} hrefVal={config.navbar?.cta?.href} bgCol={config.navbar?.cta?.bg} textCol={config.navbar?.cta?.text} onText={(v: string) => updateField('navbar.cta.label', v)} onHref={(v: string) => updateField('navbar.cta.href', v)} onBg={(v: string) => updateField('navbar.cta.bg', v)} onCol={(v: string) => updateField('navbar.cta.text', v)} />
          </Section>

          {/* HERO SECTION */}
          <Section title="Hero Section">
            <ColorText label="Background Color" colorValue={config.hero?.section?.bg} onColorChange={(v: string) => updateField('hero.section.bg', v)} />
            <ColorText label="Heading" textValue={config.hero?.heading?.text} colorValue={config.hero?.heading?.color} onTextChange={(v: string) => updateField('hero.heading.text', v)} onColorChange={(v: string) => updateField('hero.heading.color', v)} />
            <ColorText label="Description" textValue={config.hero?.description?.text} colorValue={config.hero?.description?.color} onTextChange={(v: string) => updateField('hero.description.text', v)} onColorChange={(v: string) => updateField('hero.description.color', v)} isTextArea />

            {/* 🔥 Added Dedicated Mobile Image Uploader */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ImageUploader label="Desktop Background Image" src={config.hero?.image?.src} isUploading={uploadingImage === 'hero.image.src'} onUpload={(e: any) => handleImageUpload(e, 'hero.image.src')} />
              <ImageUploader label="Mobile Background Image (Optional)" src={config.hero?.mobileImage?.src} isUploading={uploadingImage === 'hero.mobileImage.src'} onUpload={(e: any) => handleImageUpload(e, 'hero.mobileImage.src')} />
            </div>

            <ButtonConfig label="CTA Button" textVal={config.hero?.cta?.label} hrefVal={config.hero?.cta?.href} bgCol={config.hero?.cta?.bg} textCol={config.hero?.cta?.text} onText={(v: string) => updateField('hero.cta.label', v)} onHref={(v: string) => updateField('hero.cta.href', v)} onBg={(v: string) => updateField('hero.cta.bg', v)} onCol={(v: string) => updateField('hero.cta.text', v)} />

            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 mt-4 space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Social Proof</label>
              <ColorText label="Star Count (1-5)" textValue={config.hero?.socialProof?.stars} colorValue={config.hero?.socialProof?.starColor} onTextChange={(v: string) => updateField('hero.socialProof.stars', v)} onColorChange={(v: string) => updateField('hero.socialProof.starColor', v)} />
              <ColorText label="Social Proof Text" textValue={config.hero?.socialProof?.text} colorValue={config.hero?.socialProof?.textColor} onTextChange={(v: string) => updateField('hero.socialProof.text', v)} onColorChange={(v: string) => updateField('hero.socialProof.textColor', v)} />
            </div>
          </Section>

          {/* STATS BANNER */}
          <Section title="Stats Banner">
            <ColorText label="Background Color" colorValue={config.statsBanner?.section?.bg} onColorChange={(v: string) => updateField('statsBanner.section.bg', v)} />
            <ColorText label="Heading" textValue={config.statsBanner?.heading?.text} colorValue={config.statsBanner?.heading?.color} onTextChange={(v: string) => updateField('statsBanner.heading.text', v)} onColorChange={(v: string) => updateField('statsBanner.heading.color', v)} />

            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 mt-4 space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Ratings</label>
              <ColorText label="Score (e.g. 4.96)" textValue={config.statsBanner?.rating?.score} colorValue={config.statsBanner?.rating?.scoreColor} onTextChange={(v: string) => updateField('statsBanner.rating.score', v)} onColorChange={(v: string) => updateField('statsBanner.rating.scoreColor', v)} />
              <ColorText label="Scale (e.g. /5)" textValue={config.statsBanner?.rating?.max} onTextChange={(v: string) => updateField('statsBanner.rating.max', v)} />
              <ColorText label="Review Label" textValue={config.statsBanner?.rating?.label} colorValue={config.statsBanner?.rating?.labelColor} onTextChange={(v: string) => updateField('statsBanner.rating.label', v)} onColorChange={(v: string) => updateField('statsBanner.rating.labelColor', v)} />
            </div>

            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 mt-4 space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Experience</label>
              <ColorText label="Title" textValue={config.statsBanner?.experience?.title} colorValue={config.statsBanner?.experience?.titleColor} onTextChange={(v: string) => updateField('statsBanner.experience.title', v)} onColorChange={(v: string) => updateField('statsBanner.experience.titleColor', v)} />
              <ColorText label="Subtitle" textValue={config.statsBanner?.experience?.subtitle} colorValue={config.statsBanner?.experience?.subColor} onTextChange={(v: string) => updateField('statsBanner.experience.subtitle', v)} onColorChange={(v: string) => updateField('statsBanner.experience.subColor', v)} />
              <ColorText label="Icon Color" colorValue={config.statsBanner?.experience?.iconColor} onColorChange={(v: string) => updateField('statsBanner.experience.iconColor', v)} />
            </div>
          </Section>
          {/* MEET THE FOUNDER SECTION */}
          {config.founder && (
            <Section title="Meet the Founder">
              <ImageUploader
                label="Signature Image (Overrides text if provided)"
                src={config.founder?.signature?.src}
                isUploading={uploadingImage === 'founder.signature.src'}
                onUpload={(e: any) => handleImageUpload(e, 'founder.signature.src')}
              />
              <ColorText label="Background Color" colorValue={config.founder?.section?.bg} onColorChange={(v: string) => updateField('founder.section.bg', v)} />

              <ColorText
                label="Subheading (e.g. Founder)"
                textValue={config.founder?.subheading?.text}
                colorValue={config.founder?.subheading?.color}
                onTextChange={(v: string) => updateField('founder.subheading.text', v)}
                onColorChange={(v: string) => updateField('founder.subheading.color', v)}
              />

              <ColorText
                label="Heading (e.g. Meet Helen)"
                textValue={config.founder?.heading?.text}
                colorValue={config.founder?.heading?.color}
                onTextChange={(v: string) => updateField('founder.heading.text', v)}
                onColorChange={(v: string) => updateField('founder.heading.color', v)}
              />

              <ColorText
                label="Biography / Description"
                textValue={config.founder?.description?.text}
                colorValue={config.founder?.description?.color}
                onTextChange={(v: string) => updateField('founder.description.text', v)}
                onColorChange={(v: string) => updateField('founder.description.color', v)}
                isTextArea
              />

              <ColorText
                label="Signature / Name"
                textValue={config.founder?.signature?.text}
                colorValue={config.founder?.signature?.color}
                onTextChange={(v: string) => updateField('founder.signature.text', v)}
                onColorChange={(v: string) => updateField('founder.signature.color', v)}
              />

              {/* 4-Image Grid Uploaders */}
              <div className="border border-gray-200 p-4 rounded-lg bg-gray-50 mt-5 space-y-4">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Photo Grid (4 Images)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploader
                    label="Image 1 (Top Left)"
                    src={config.founder?.images?.[0]?.src}
                    isUploading={uploadingImage === 'founder.images.0.src'}
                    onUpload={(e: any) => handleImageUpload(e, 'founder.images.0.src')}
                  />
                  <ImageUploader
                    label="Image 2 (Bottom Left)"
                    src={config.founder?.images?.[1]?.src}
                    isUploading={uploadingImage === 'founder.images.1.src'}
                    onUpload={(e: any) => handleImageUpload(e, 'founder.images.1.src')}
                  />
                  <ImageUploader
                    label="Image 3 (Top Right - Pushed Down)"
                    src={config.founder?.images?.[2]?.src}
                    isUploading={uploadingImage === 'founder.images.2.src'}
                    onUpload={(e: any) => handleImageUpload(e, 'founder.images.2.src')}
                  />
                  <ImageUploader
                    label="Image 4 (Bottom Right)"
                    src={config.founder?.images?.[3]?.src}
                    isUploading={uploadingImage === 'founder.images.3.src'}
                    onUpload={(e: any) => handleImageUpload(e, 'founder.images.3.src')}
                  />
                </div>
              </div>
            </Section>)}
          {/* 🔥 IMAGE SLIDER INSTALLED HERE */}
          {config.imageSlider && (
            <Section title="Infinite Image Slider my-5">
              <ColorText label="Background Color" colorValue={config.imageSlider?.section?.bg} onColorChange={(v: string) => updateField('imageSlider.section.bg', v)} />
              <ColorText label="Heading" textValue={config.imageSlider?.heading?.text} colorValue={config.imageSlider?.heading?.color} onTextChange={(v: string) => updateField('imageSlider.heading.text', v)} onColorChange={(v: string) => updateField('imageSlider.heading.color', v)} />
              <ColorText label="Description" textValue={config.imageSlider?.description?.text} colorValue={config.imageSlider?.description?.color} onTextChange={(v: string) => updateField('imageSlider.description.text', v)} onColorChange={(v: string) => updateField('imageSlider.description.color', v)} isTextArea />

              <div className="mt-4 mb-5 space-y-3">
                <button onClick={() => addArrayItem('imageSlider.items', { image: "", alt: "New Image", className: "" })} className=" size-6 text-lg  text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                    Slider Images
                    <Plus size={14} /> Add Image
                  </label>
                </button>
                {config.imageSlider.items?.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('imageSlider.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ImageUploader label="Slide Image" src={item.image} isUploading={uploadingImage === `imageSlider.items[${i}].image`} onUpload={(e: any) => handleImageUpload(e, `imageSlider.items[${i}].image`)} />
                    <ColorText label="Alt Text" textValue={item.alt} onTextChange={(v: string) => updateField(`imageSlider.items[${i}].alt`, v)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ABOUT US */}
          <Section title="About Us">
            <ColorText label="Background Color" colorValue={config.about?.section?.bg} onColorChange={(v: string) => updateField('about.section.bg', v)} />
            <ColorText label="Heading" textValue={config.about?.heading?.text} colorValue={config.about?.heading?.color} onTextChange={(v: string) => updateField('about.heading.text', v)} onColorChange={(v: string) => updateField('about.heading.color', v)} />
            <ColorText label="Description" textValue={config.about?.description?.text} colorValue={config.about?.description?.color} onTextChange={(v: string) => updateField('about.description.text', v)} onColorChange={(v: string) => updateField('about.description.color', v)} isTextArea />

            <ImageUploader label="About Image" src={config.about?.image?.src} isUploading={uploadingImage === 'about.image.src'} onUpload={(e: any) => handleImageUpload(e, 'about.image.src')} />

            <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 mt-4 space-y-3">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Features List</label>
              <ColorText label="Icon Color" colorValue={config.about?.featuresList?.featureIconColor} onColorChange={(v: string) => updateField('about.featuresList.featureIconColor', v)} />
              <ColorText label="Text Color" colorValue={config.about?.featuresList?.featureColor} onColorChange={(v: string) => updateField('about.featuresList.featureColor', v)} />

              {config.about?.featuresList?.features?.map((feat: string, i: number) => (
                <div key={i} className="flex gap-2 relative group">
                  <input type="text" value={feat} onChange={(e) => updateField(`about.featuresList.features[${i}]`, e.target.value)} className="w-full bg-white border border-gray-200 p-2 rounded text-sm outline-none focus:border-black" />
                  <button onClick={() => removeArrayItem('about.featuresList.features', i)} className="absolute right-2 top-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => addArrayItem('about.featuresList.features', "New Feature")} className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"><Plus size={14} /> Add Feature</button>
            </div>

            <div className="mt-4">
              <ButtonConfig label="CTA Button" textVal={config.about?.cta?.label} hrefVal={config.about?.cta?.href} bgCol={config.about?.cta?.bg} textCol={config.about?.cta?.text} onText={(v: string) => updateField('about.cta.label', v)} onHref={(v: string) => updateField('about.cta.href', v)} onBg={(v: string) => updateField('about.cta.bg', v)} onCol={(v: string) => updateField('about.cta.text', v)} />
            </div>
          </Section>

          {/* GALLERY */}
          {config.gallery?.items && (
            <Section title="Before & After Gallery">
              <ColorText label="Background Color" colorValue={config.gallery?.section?.bg} onColorChange={(v: string) => updateField('gallery.section.bg', v)} />
              <ColorText label="Heading" textValue={config.gallery?.heading?.text} colorValue={config.gallery?.heading?.color} onTextChange={(v: string) => updateField('gallery.heading.text', v)} onColorChange={(v: string) => updateField('gallery.heading.color', v)} />
              <ColorText label="Description" textValue={config.gallery?.description?.text} colorValue={config.gallery?.description?.color} onTextChange={(v: string) => updateField('gallery.description.text', v)} onColorChange={(v: string) => updateField('gallery.description.color', v)} isTextArea />

              <ColorText label="Arrow Icon Color" colorValue={config.gallery?.styling?.arrowColor} onColorChange={(v: string) => updateField('gallery.styling.arrowColor', v)} />
              <ColorText label="Before/After Badge Bg" colorValue={config.gallery?.styling?.badgeBg} onColorChange={(v: string) => updateField('gallery.styling.badgeBg', v)} />
              <ColorText label="Before/After Badge Text" colorValue={config.gallery?.styling?.badgeText} onColorChange={(v: string) => updateField('gallery.styling.badgeText', v)} />

              <div className="my-4 space-y-3">
                <button onClick={() => addArrayItem('gallery.items', { before: "", after: "", alt: "New Image", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                    Gallery Images
                    <Plus size={14} /> Add Image
                  </label>
                </button>
                {config.gallery.items.map((item: any, i: number) => (
                  <div key={item.id || i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('gallery.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ImageUploader label="Before Image" src={item.before} isUploading={uploadingImage === `gallery.items[${i}].before`} onUpload={(e: any) => handleImageUpload(e, `gallery.items[${i}].before`)} />
                    <ImageUploader label="After Image" src={item.after} isUploading={uploadingImage === `gallery.items[${i}].after`} onUpload={(e: any) => handleImageUpload(e, `gallery.items[${i}].after`)} />
                    <ColorText label="Alt Text" textValue={item.alt} onTextChange={(v: string) => updateField(`gallery.items[${i}].alt`, v)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* SERVICES */}
          {config.services?.items && (
            <Section title="Services">
              <ColorText label="Background Color" colorValue={config.services?.section?.bg} onColorChange={(v: string) => updateField('services.section.bg', v)} />
              <ColorText label="Heading" textValue={config.services?.heading?.text} colorValue={config.services?.heading?.color} onTextChange={(v: string) => updateField('services.heading.text', v)} onColorChange={(v: string) => updateField('services.heading.color', v)} />
              <ColorText label="Description" textValue={config.services?.description?.text} colorValue={config.services?.description?.color} onTextChange={(v: string) => updateField('services.description.text', v)} onColorChange={(v: string) => updateField('services.description.color', v)} isTextArea />

              <div className="grid grid-cols-2 gap-2 my-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <ColorText label="Card Bg" colorValue={config.services?.styling?.cardBg} onColorChange={(v: string) => updateField('services.styling.cardBg', v)} />
                <ColorText label="Card Border" colorValue={config.services?.styling?.cardBorder} onColorChange={(v: string) => updateField('services.styling.cardBorder', v)} />
                <ColorText label="Icon Color" colorValue={config.services?.styling?.iconColor} onColorChange={(v: string) => updateField('services.styling.iconColor', v)} />
                <ColorText label="Title Color" colorValue={config.services?.styling?.titleColor} onColorChange={(v: string) => updateField('services.styling.titleColor', v)} />
                <ColorText label="Price Color" colorValue={config.services?.styling?.priceColor} onColorChange={(v: string) => updateField('services.styling.priceColor', v)} />
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Service Items
                  <button onClick={() => addArrayItem('services.items', { title: "New Service", description: "", priceLabel: "", iconKey: "pet", href: "", ctaLabel: "Book Now", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add Service
                  </button>
                </label>
                {config.services.items.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('services.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ColorText label="Service Title" textValue={item.title} onTextChange={(v: string) => updateField(`services.items[${i}].title`, v)} />
                    <ColorText label="Description" textValue={item.description} onTextChange={(v: string) => updateField(`services.items[${i}].description`, v)} isTextArea />
                    <ColorText label="Price Label" textValue={item.priceLabel} onTextChange={(v: string) => updateField(`services.items[${i}].priceLabel`, v)} />

                    {/* Nested Button settings inside the service card */}
                    <div className="pt-2 border-t border-gray-200">
                      <ColorText label="Button Label (Optional)" textValue={item.ctaLabel} onTextChange={(v: string) => updateField(`services.items[${i}].ctaLabel`, v)} />
                      <ColorText label="Button Link" textValue={item.href} onTextChange={(v: string) => updateField(`services.items[${i}].href`, v)} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <ButtonConfig label="Bottom CTA Button" textVal={config.services?.cta?.label} hrefVal={config.services?.cta?.href} bgCol={config.services?.cta?.bg} textCol={config.services?.cta?.text} onText={(v: string) => updateField('services.cta.label', v)} onHref={(v: string) => updateField('services.cta.href', v)} onBg={(v: string) => updateField('services.cta.bg', v)} onCol={(v: string) => updateField('services.cta.text', v)} />
              </div>
            </Section>
          )}

          {/* PROCESS STEPS */}
          {config.process?.steps && (
            <Section title="Process Steps">
              <ColorText label="Background Color" colorValue={config.process?.section?.bg} onColorChange={(v: string) => updateField('process.section.bg', v)} />
              <ColorText label="Vertical Line Color" colorValue={config.process?.styling?.lineColor} onColorChange={(v: string) => updateField('process.styling.lineColor', v)} />
              <ColorText label="Heading" textValue={config.process?.heading?.text} colorValue={config.process?.heading?.color} onTextChange={(v: string) => updateField('process.heading.text', v)} onColorChange={(v: string) => updateField('process.heading.color', v)} />
              <ColorText label="Description" textValue={config.process?.description?.text} colorValue={config.process?.description?.color} onTextChange={(v: string) => updateField('process.description.text', v)} onColorChange={(v: string) => updateField('process.description.color', v)} isTextArea />

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Steps
                  <button onClick={() => addArrayItem('process.steps', { title: "New Step", description: "", image: "", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add Step
                  </button>
                </label>
                {config.process.steps.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('process.steps', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ColorText label="Step Title" textValue={item.title} colorValue={item.titleColor} onTextChange={(v: string) => updateField(`process.steps[${i}].title`, v)} onColorChange={(v: string) => updateField(`process.steps[${i}].titleColor`, v)} />
                    <ColorText label="Description" textValue={item.description} colorValue={item.descColor} onTextChange={(v: string) => updateField(`process.steps[${i}].description`, v)} onColorChange={(v: string) => updateField(`process.steps[${i}].descColor`, v)} isTextArea />
                    <ImageUploader label="Step Image" src={item.image} isUploading={uploadingImage === `process.steps[${i}].image`} onUpload={(e: any) => handleImageUpload(e, `process.steps[${i}].image`)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* COMPARISON BOARD */}
          {config.comparison && (
            <Section title="Comparison Board">
              <ColorText label="Background Color" colorValue={config.comparison?.section?.bg} onColorChange={(v: string) => updateField('comparison.section.bg', v)} />
              <ColorText label="Heading" textValue={config.comparison?.heading?.text} colorValue={config.comparison?.heading?.color} onTextChange={(v: string) => updateField('comparison.heading.text', v)} onColorChange={(v: string) => updateField('comparison.heading.color', v)} />
              <ColorText label="Description" textValue={config.comparison?.description?.text} colorValue={config.comparison?.description?.color} onTextChange={(v: string) => updateField('comparison.description.text', v)} onColorChange={(v: string) => updateField('comparison.description.color', v)} isTextArea />

              <div className="grid grid-cols-2 gap-4 mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <ColorText label="VS Badge Bg" colorValue={config.comparison?.vsBadge?.bg} onColorChange={(v: string) => updateField('comparison.vsBadge.bg', v)} />
                <ColorText label="VS Badge Text" colorValue={config.comparison?.vsBadge?.text} onColorChange={(v: string) => updateField('comparison.vsBadge.text', v)} />
              </div>

              {/* Negative Offers */}
              <div className="space-y-3 mt-4 border border-red-200 p-3 rounded-lg bg-red-50/50">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-red-600 uppercase">Other Offers (Negative)</label>
                  <button onClick={() => addArrayItem('comparison.leftColumn.offers', "New Negative Point")} className="text-red-500 hover:text-red-700 flex items-center gap-1"><Plus size={14} /> Add</button>
                </div>
                <div className="flex gap-2">
                  <ColorText label="Card Bg" colorValue={config.comparison?.leftColumn?.bg} onColorChange={(v: string) => updateField('comparison.leftColumn.bg', v)} />
                  <ColorText label="Text Color" colorValue={config.comparison?.leftColumn?.textColor} onColorChange={(v: string) => updateField('comparison.leftColumn.textColor', v)} />
                  <ColorText label="Icon Color" colorValue={config.comparison?.leftColumn?.iconColor} onColorChange={(v: string) => updateField('comparison.leftColumn.iconColor', v)} />
                </div>
                {config.comparison.leftColumn?.offers?.map((feat: string, i: number) => (
                  <div key={i} className="flex gap-2 relative group">
                    <input type="text" value={feat} onChange={(e) => updateField(`comparison.leftColumn.offers[${i}]`, e.target.value)} className="w-full bg-white border border-red-100 p-2.5 rounded text-sm outline-none focus:border-red-400" />
                    <button onClick={() => removeArrayItem('comparison.leftColumn.offers', i)} className="absolute right-2 top-2.5 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>

              {/* Positive Offers */}
              <div className="space-y-3 mt-4 border border-green-200 p-3 rounded-lg bg-green-50/50">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-green-600 uppercase">Your Offers (Positive)</label>
                  <button onClick={() => addArrayItem('comparison.rightColumn.offers', "New Positive Point")} className="text-green-600 hover:text-green-700 flex items-center gap-1"><Plus size={14} /> Add</button>
                </div>
                <div className="flex gap-2">
                  <ColorText label="Card Bg" colorValue={config.comparison?.rightColumn?.bg} onColorChange={(v: string) => updateField('comparison.rightColumn.bg', v)} />
                  <ColorText label="Text Color" colorValue={config.comparison?.rightColumn?.textColor} onColorChange={(v: string) => updateField('comparison.rightColumn.textColor', v)} />
                  <ColorText label="Icon Color" colorValue={config.comparison?.rightColumn?.iconColor} onColorChange={(v: string) => updateField('comparison.rightColumn.iconColor', v)} />
                </div>
                {config.comparison.rightColumn?.offers?.map((feat: string, i: number) => (
                  <div key={i} className="flex gap-2 relative group">
                    <input type="text" value={feat} onChange={(e) => updateField(`comparison.rightColumn.offers[${i}]`, e.target.value)} className="w-full bg-white border border-green-100 p-2.5 rounded text-sm outline-none focus:border-green-500" />
                    <button onClick={() => removeArrayItem('comparison.rightColumn.offers', i)} className="absolute right-2 top-2.5 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* REVIEWS SECTION */}
          {config.reviews?.columns && (
            <Section title="Reviews">
              <ColorText label="Section Background" colorValue={config.reviews?.section?.bg} onColorChange={(v: string) => updateField('reviews.section.bg', v)} />
              <ColorText label="Heading" textValue={config.reviews?.heading?.text} colorValue={config.reviews?.heading?.color} onTextChange={(v: string) => updateField('reviews.heading.text', v)} onColorChange={(v: string) => updateField('reviews.heading.color', v)} />
              <ColorText label="Description" textValue={config.reviews?.description?.text} colorValue={config.reviews?.description?.color} onTextChange={(v: string) => updateField('reviews.description.text', v)} onColorChange={(v: string) => updateField('reviews.description.color', v)} isTextArea />

              {['col1', 'col2', 'col3'].map((col) => (
                <div key={col} className="mt-6 space-y-3">
                  <label className="text-xs font-bold text-gray-500 uppercase flex justify-between items-center border-b border-gray-100 pb-2">
                    {col.toUpperCase()} Cards
                    <button onClick={() => addArrayItem(`reviews.columns.${col}`, { type: 'review', name: 'New Client', role: 'Pet Parent', text: 'Great grooming experience!', avatar: '', bg: '#faf3ec', textColor: '#625b5b', titleColor: '#1e0c05', starColor: '#8c863a' })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold">
                      <Plus size={14} /> Add Card
                    </button>
                  </label>

                  {config.reviews.columns[col]?.map((item: any, i: number) => (
                    <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                      <button onClick={() => removeArrayItem(`reviews.columns.${col}`, i)} className="p-1.5 text-red-400 hover:text-red-600 absolute right-2 top-2 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Delete Card"><Trash2 size={13} /></button>

                      <div className="flex justify-between items-center bg-white p-2 rounded border border-gray-200">
                        <label className="text-xs font-medium text-gray-500">Card Type</label>
                        <select value={item.type || 'review'} onChange={(e) => updateField(`reviews.columns.${col}[${i}].type`, e.target.value)} className="bg-transparent text-xs font-semibold outline-none cursor-pointer">
                          <option value="review">Review Card</option>
                          <option value="stat-numeric">Numeric Stat</option>
                          <option value="stat-image">Image Stat</option>
                        </select>
                      </div>

                      <ColorText label="Card Background" colorValue={item.bg} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].bg`, v)} />

                      {item.type === 'review' && (
                        <>
                          <ColorText label="Client Name & Color" textValue={item.name} colorValue={item.titleColor} onTextChange={(v: string) => updateField(`reviews.columns.${col}[${i}].name`, v)} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].titleColor`, v)} />
                          <Input label="Role / Subtitle" value={item.role} onChange={(v) => updateField(`reviews.columns.${col}[${i}].role`, v)} />
                          <ColorText label="Review Text & Color" textValue={item.text} colorValue={item.textColor} onTextChange={(v: string) => updateField(`reviews.columns.${col}[${i}].text`, v)} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].textColor`, v)} isTextArea />
                          <ColorText label="Star Rating Color" colorValue={item.starColor} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].starColor`, v)} />
                          <ImageUploader label="Avatar Image" src={item.avatar} isUploading={uploadingImage === `reviews.columns.${col}[${i}].avatar`} onUpload={(e: any) => handleImageUpload(e, `reviews.columns.${col}[${i}].avatar`)} />
                        </>
                      )}

                      {item.type === 'stat-numeric' && (
                        <>
                          <ColorText label="Score Value (e.g. 4.96)" textValue={item.score} colorValue={item.scoreColor} onTextChange={(v: string) => updateField(`reviews.columns.${col}[${i}].score`, v)} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].scoreColor`, v)} />
                          <Input label="Scale (e.g. /5)" value={item.scale} onChange={(v) => updateField(`reviews.columns.${col}[${i}].scale`, v)} />
                          <ColorText label="Subtext & Color" textValue={item.subtext} colorValue={item.textColor} onTextChange={(v: string) => updateField(`reviews.columns.${col}[${i}].subtext`, v)} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].textColor`, v)} />
                          <ColorText label="Star Rating Color" colorValue={item.starColor} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].starColor`, v)} />
                        </>
                      )}

                      {item.type === 'stat-image' && (
                        <>
                          <ColorText label="Heading & Color" textValue={item.heading} colorValue={item.textColor} onTextChange={(v: string) => updateField(`reviews.columns.${col}[${i}].heading`, v)} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].textColor`, v)} />
                          <Input label="Subtext" value={item.subtext} onChange={(v) => updateField(`reviews.columns.${col}[${i}].subtext`, v)} />
                          <ColorText label="Smile Icon Color" colorValue={item.iconColor} onColorChange={(v: string) => updateField(`reviews.columns.${col}[${i}].iconColor`, v)} />
                          <ImageUploader label="Background Image" src={item.image} isUploading={uploadingImage === `reviews.columns.${col}[${i}].image`} onUpload={(e: any) => handleImageUpload(e, `reviews.columns.${col}[${i}].image`)} />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </Section>
          )}

          {/* INSIGHTS */}
          {config.insights?.items && (
            <Section title="Insights / Blog">
              <ColorText label="Background Color" colorValue={config.insights?.section?.bg} onColorChange={(v: string) => updateField('insights.section.bg', v)} />
              <ColorText label="Heading" textValue={config.insights?.heading?.text} colorValue={config.insights?.heading?.color} onTextChange={(v: string) => updateField('insights.heading.text', v)} onColorChange={(v: string) => updateField('insights.heading.color', v)} />
              <ColorText label="Description" textValue={config.insights?.description?.text} colorValue={config.insights?.description?.color} onTextChange={(v: string) => updateField('insights.description.text', v)} onColorChange={(v: string) => updateField('insights.description.color', v)} isTextArea />

              <div className="grid grid-cols-2 gap-2 mt-4">
                <ColorText label="Card Bg" colorValue={config.insights?.styling?.cardBg} onColorChange={(v: string) => updateField('insights.styling.cardBg', v)} />
                <ColorText label="Card Title Text" colorValue={config.insights?.styling?.cardTitle} onColorChange={(v: string) => updateField('insights.styling.cardTitle', v)} />
                <ColorText label="Date Badge Bg" colorValue={config.insights?.styling?.cardDateBg} onColorChange={(v: string) => updateField('insights.styling.cardDateBg', v)} />
                <ColorText label="Date Text" colorValue={config.insights?.styling?.cardDateText} onColorChange={(v: string) => updateField('insights.styling.cardDateText', v)} />
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Articles
                  <button onClick={() => addArrayItem('insights.items', { title: "New Article", date: "Jan 1, 2026", image: "", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add Article
                  </button>
                </label>
                {config.insights.items.map((item: any, i: number) => (
                  <div key={item.id || i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('insights.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ColorText label="Title" textValue={item.title} onTextChange={(v: string) => updateField(`insights.items[${i}].title`, v)} />
                    <ColorText label="Date" textValue={item.date} onTextChange={(v: string) => updateField(`insights.items[${i}].date`, v)} />
                    <ImageUploader label="Article Image" src={item.image} isUploading={uploadingImage === `insights.items[${i}].image`} onUpload={(e: any) => handleImageUpload(e, `insights.items[${i}].image`)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 🔥 FAQ SECTION INSTALLED HERE */}
          {config.faq?.items && (
            <Section title="FAQ Section">
              <ColorText label="Background Color" colorValue={config.faq?.section?.bg} onColorChange={(v: string) => updateField('faq.section.bg', v)} />
              <ColorText label="Heading" textValue={config.faq?.heading?.text} colorValue={config.faq?.heading?.color} onTextChange={(v: string) => updateField('faq.heading.text', v)} onColorChange={(v: string) => updateField('faq.heading.color', v)} />
              <ColorText label="Description" textValue={config.faq?.description?.text} colorValue={config.faq?.description?.color} onTextChange={(v: string) => updateField('faq.description.text', v)} onColorChange={(v: string) => updateField('faq.description.color', v)} isTextArea />

              <div className="grid grid-cols-2 gap-2 my-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <ColorText label="Question Color" colorValue={config.faq?.styling?.questionColor} onColorChange={(v: string) => updateField('faq.styling.questionColor', v)} />
                <ColorText label="Answer Color" colorValue={config.faq?.styling?.answerColor} onColorChange={(v: string) => updateField('faq.styling.answerColor', v)} />
                <ColorText label="Icon Color" colorValue={config.faq?.styling?.iconColor} onColorChange={(v: string) => updateField('faq.styling.iconColor', v)} />
                <ColorText label="Divider Color" colorValue={config.faq?.styling?.dividerColor} onColorChange={(v: string) => updateField('faq.styling.dividerColor', v)} />
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Questions
                  <button onClick={() => addArrayItem('faq.items', { question: "New Question?", answer: "New Answer.", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add FAQ
                  </button>
                </label>
                {config.faq.items.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('faq.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ColorText label="Question" textValue={item.question} onTextChange={(v: string) => updateField(`faq.items[${i}].question`, v)} />
                    <ColorText label="Answer" textValue={item.answer} onTextChange={(v: string) => updateField(`faq.items[${i}].answer`, v)} isTextArea />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* CONTACT SECTION */}
          {config.contactSection && (
            <Section title="Contact Form">
              <ColorText label="Background Color" colorValue={config.contactSection?.section?.bg} onColorChange={(v: string) => updateField('contactSection.section.bg', v)} />
              <ColorText label="Heading" textValue={config.contactSection?.heading?.text} colorValue={config.contactSection?.heading?.color} onTextChange={(v: string) => updateField('contactSection.heading.text', v)} onColorChange={(v: string) => updateField('contactSection.heading.color', v)} />
              <ColorText label="Description" textValue={config.contactSection?.description?.text} colorValue={config.contactSection?.description?.color} onTextChange={(v: string) => updateField('contactSection.description.text', v)} onColorChange={(v: string) => updateField('contactSection.description.color', v)} isTextArea />

              <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Submit Button</label>
                <ColorText label="Button Label" textValue={config.contactSection?.button?.label} onTextChange={(v: string) => updateField('contactSection.button.label', v)} />
                <ColorText label="Button Background" colorValue={config.contactSection?.button?.bg} onColorChange={(v: string) => updateField('contactSection.button.bg', v)} />
                <ColorText label="Button Text Color" colorValue={config.contactSection?.button?.text} onColorChange={(v: string) => updateField('contactSection.button.text', v)} />
              </div>
            </Section>
          )}
          {/* 🔥 IMAGE SLIDER SECTION */}
          {config.imageSlider?.items && (
            <Section title="Image Slider">
              <ColorText label="Background Color" colorValue={config.imageSlider?.section?.bg} onColorChange={(v: string) => updateField('imageSlider.section.bg', v)} />
              <ColorText label="Heading" textValue={config.imageSlider?.heading?.text} colorValue={config.imageSlider?.heading?.color} onTextChange={(v: string) => updateField('imageSlider.heading.text', v)} onColorChange={(v: string) => updateField('imageSlider.heading.color', v)} />
              <ColorText label="Description" textValue={config.imageSlider?.description?.text} colorValue={config.imageSlider?.description?.color} onTextChange={(v: string) => updateField('imageSlider.description.text', v)} onColorChange={(v: string) => updateField('imageSlider.description.color', v)} isTextArea />

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Slider Images
                  <button onClick={() => addArrayItem('imageSlider.items', { image: "", alt: "New Image", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add Image
                  </button>
                </label>
                {config.imageSlider.items.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('imageSlider.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ImageUploader label="Image" src={item.image} isUploading={uploadingImage === `imageSlider.items[${i}].image`} onUpload={(e: any) => handleImageUpload(e, `imageSlider.items[${i}].image`)} />
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* 🔥 FAQ SECTION */}
          {config.faq?.items && (
            <Section title="FAQ Section">
              <ColorText label="Background Color" colorValue={config.faq?.section?.bg} onColorChange={(v: string) => updateField('faq.section.bg', v)} />
              <ColorText label="Heading" textValue={config.faq?.heading?.text} colorValue={config.faq?.heading?.color} onTextChange={(v: string) => updateField('faq.heading.text', v)} onColorChange={(v: string) => updateField('faq.heading.color', v)} />
              <ColorText label="Description" textValue={config.faq?.description?.text} colorValue={config.faq?.description?.color} onTextChange={(v: string) => updateField('faq.description.text', v)} onColorChange={(v: string) => updateField('faq.description.color', v)} isTextArea />

              <div className="grid grid-cols-2 gap-2 mt-4 p-3 bg-gray-50 rounded border border-gray-200">
                <ColorText label="Question Text Color" colorValue={config.faq?.styling?.questionColor} onColorChange={(v: string) => updateField('faq.styling.questionColor', v)} />
                <ColorText label="Answer Text Color" colorValue={config.faq?.styling?.answerColor} onColorChange={(v: string) => updateField('faq.styling.answerColor', v)} />
                <ColorText label="Icon Color" colorValue={config.faq?.styling?.iconColor} onColorChange={(v: string) => updateField('faq.styling.iconColor', v)} />
                <ColorText label="Divider Color" colorValue={config.faq?.styling?.dividerColor} onColorChange={(v: string) => updateField('faq.styling.dividerColor', v)} />
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-xs font-bold text-gray-500 flex justify-between items-center">
                  Questions & Answers
                  <button onClick={() => addArrayItem('faq.items', { question: "New Question?", answer: "Answer goes here.", className: "" })} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <Plus size={14} /> Add FAQ
                  </button>
                </label>
                {config.faq.items.map((item: any, i: number) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg bg-gray-50 space-y-3 relative group">
                    <button onClick={() => removeArrayItem('faq.items', i)} className="p-2 text-red-400 hover:text-red-600 absolute -right-3 -top-3 bg-white border border-gray-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><Trash2 size={12} /></button>
                    <ColorText label="Question" textValue={item.question} onTextChange={(v: string) => updateField(`faq.items[${i}].question`, v)} />
                    <ColorText label="Answer" textValue={item.answer} onTextChange={(v: string) => updateField(`faq.items[${i}].answer`, v)} isTextArea />
                  </div>
                ))}
              </div>
            </Section>
          )}
          {/* BOTTOM CTA */}
          <Section title="Bottom CTA">
            <ColorText label="Background Color" colorValue={config.ctaSection?.section?.bg} onColorChange={(v: string) => updateField('ctaSection.section.bg', v)} />
            <ColorText label="Heading" textValue={config.ctaSection?.heading?.text} colorValue={config.ctaSection?.heading?.color} onTextChange={(v: string) => updateField('ctaSection.heading.text', v)} onColorChange={(v: string) => updateField('ctaSection.heading.color', v)} />
            <ColorText label="Description" textValue={config.ctaSection?.description?.text} colorValue={config.ctaSection?.description?.color} onTextChange={(v: string) => updateField('ctaSection.description.text', v)} onColorChange={(v: string) => updateField('ctaSection.description.color', v)} isTextArea />

            <ImageUploader label="Background Image" src={config.ctaSection?.image?.src} isUploading={uploadingImage === 'ctaSection.image.src'} onUpload={(e: any) => handleImageUpload(e, 'ctaSection.image.src')} />
            <ButtonConfig label="CTA Button" textVal={config.ctaSection?.cta?.label} hrefVal={config.ctaSection?.cta?.href} bgCol={config.ctaSection?.cta?.bg} textCol={config.ctaSection?.cta?.text} onText={(v: string) => updateField('ctaSection.cta.label', v)} onHref={(v: string) => updateField('ctaSection.cta.href', v)} onBg={(v: string) => updateField('ctaSection.cta.bg', v)} onCol={(v: string) => updateField('ctaSection.cta.text', v)} />
          </Section>

          {/* FOOTER */}
          <Section title="Footer">
            <ColorText label="Background Color" colorValue={config.footer?.section?.bg} onColorChange={(v: string) => updateField('footer.section.bg', v)} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <ColorText label="Main Text Color" colorValue={config.footer?.styling?.textColor} onColorChange={(v: string) => updateField('footer.styling.textColor', v)} />
              <ColorText label="Muted Text Color" colorValue={config.footer?.styling?.mutedColor} onColorChange={(v: string) => updateField('footer.styling.mutedColor', v)} />
              <ColorText label="Icon Bg Color" colorValue={config.footer?.styling?.iconBg} onColorChange={(v: string) => updateField('footer.styling.iconBg', v)} />
              <ColorText label="Icon Text Color" colorValue={config.footer?.styling?.iconText} onColorChange={(v: string) => updateField('footer.styling.iconText', v)} />
            </div>

            <ImageUploader label="Footer Logo" src={config.footer?.logo?.src} isUploading={uploadingImage === 'footer.logo.src'} onUpload={(e: any) => handleImageUpload(e, 'footer.logo.src')} />

            <ColorText label="Address" textValue={config.footer?.info?.address} onTextChange={(v: string) => updateField('footer.info.address', v)} isTextArea />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <ColorText label="Phone Label" textValue={config.footer?.info?.phone?.label} onTextChange={(v: string) => updateField('footer.info.phone.label', v)} />
              <ColorText label="Phone Link (tel:)" textValue={config.footer?.info?.phone?.href} onTextChange={(v: string) => updateField('footer.info.phone.href', v)} />
              <ColorText label="Email Label" textValue={config.footer?.info?.email?.label} onTextChange={(v: string) => updateField('footer.info.email.label', v)} />
              <ColorText label="Email Link (mailto:)" textValue={config.footer?.info?.email?.href} onTextChange={(v: string) => updateField('footer.info.email.href', v)} />
            </div>

            {/* Maps & Storefront Details */}
            <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-semibold text-gray-700">Google Maps Embed URL</label>
                  <span className="text-[9px] text-gray-400 uppercase">Leave empty to hide</span>
                </div>
                <input
                  type="text"
                  value={config.footer?.info?.mapEmbedUrl || ""}
                  onChange={(e) => updateField('footer.info.mapEmbedUrl', e.target.value)}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className="w-full p-2 text-sm border border-gray-200 rounded outline-none focus:border-black bg-white"
                />
                <p className="text-[10px] text-gray-400 mt-1">Go to Google Maps → Share → Embed a map → Copy link inside src="..."</p>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-semibold text-gray-700">Storefront Image (Next to Map)</label>
                  <span className="text-[9px] text-gray-400 uppercase">Leave empty to hide</span>
                </div>
                <ImageUploader
                  label="Upload Storefront Image"
                  src={config.footer?.info?.storefrontImage?.src}
                  isUploading={uploadingImage === 'footer.info.storefrontImage.src'}
                  onUpload={(e: any) => handleImageUpload(e, 'footer.info.storefrontImage.src')}
                />
                
                {/* 🔥 The Remove Button: Appears only when an image exists */}
                {config.footer?.info?.storefrontImage?.src && (
                  <button 
                    onClick={() => updateField('footer.info.storefrontImage.src', '')}
                    className="text-[11px] text-red-500 font-semibold hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded w-fit mt-1 flex items-center gap-1.5 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Remove Image
                  </button>
                )}
              </div>
            </div>

            <ColorText label="Copyright Text" textValue={config.footer?.copyright} onTextChange={(v: string) => updateField('footer.copyright', v)} />
            <div className="grid grid-cols-2 gap-2 mt-2">
              <ColorText label="Facebook URL" textValue={config.footer?.socials?.facebook} onTextChange={(v: string) => updateField('footer.socials.facebook', v)} />
              <ColorText label="Instagram URL" textValue={config.footer?.socials?.instagram} onTextChange={(v: string) => updateField('footer.socials.instagram', v)} />
            </div>
          </Section>

        </div>
      </div>

      {/* RIGHT SIDE: Live Preview */}
      <div className="flex-1 h-full bg-[#f3f3f3] overflow-y-auto relative pointer-events-auto">
        <div id="live-preview-box" className="w-full min-h-screen bg-white">
          {/* Scripts were removed from here and are now injected securely via useEffect! */}
          <WebsiteOne data={config} />
        </div>
      </div>

    </div>
  );
}