"use client";

import React, { useEffect, useState, useRef, use } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, ArrowLeft, CheckCircle2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import WebsiteOne from "@/components/templates/WebsiteOne";

// 🔥 1. ERROR BOUNDARY: Prevents bad JSON from crashing the whole page
class PreviewErrorBoundary extends React.Component<{ data: any, children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidUpdate(prevProps: any) {
    // If user changes JSON, automatically reset the error state to try rendering again
    if (prevProps.data !== this.props.data) {
      this.setState({ hasError: false, error: null });
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-10 bg-[#f3f3f3] text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-200 max-w-lg w-full">
            <h3 className="text-red-600 font-bold text-xl mb-3">Preview Crashed 💥</h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              The template encountered a rendering error. This usually happens when the JSON structure does not perfectly match what <strong>WebsiteOne.tsx</strong> expects (like passing an Object instead of a String).
            </p>
            <div className="bg-gray-900 text-red-400 p-4 rounded-xl font-mono text-[11px] text-left overflow-auto max-h-48 whitespace-pre-wrap">
              {this.state.error?.message}
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Helper component for clean accordions
const SectionAccordion = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <details className="group border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
    <summary className="cursor-pointer bg-gray-100 px-4 py-3 font-bold text-[11px] uppercase tracking-wider text-gray-600 select-none flex justify-between items-center hover:bg-gray-200 transition-colors">
      {title}
      <ChevronDown size={14} className="transition-transform group-open:rotate-180 text-gray-400" />
    </summary>
    <div className="p-4 space-y-3 bg-gray-50 border-t border-gray-200">
      {children}
    </div>
  </details>
);

export default function LandingPageOneJsonEditor({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const router = useRouter();

  const [config, setConfig] = useState<any>(null);
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Auto-save states
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const isFirstLoad = useRef(true);

  // Initial Data Fetch
  useEffect(() => {
    const initializeData = async () => {
      try {
        const docSnap = await getDoc(doc(db, "websites", name));
        if (docSnap.exists()) {
          const data = docSnap.data();
          const templateData = data.websiteOneData || {};

          setConfig(templateData);
          setJsonInput(JSON.stringify(templateData, null, 2));
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, [name]);

  // 🔥 2. TAILWIND FIX: Wait for script to load before setting config
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";

      script.onload = () => {
        if (typeof window !== "undefined" && (window as any).tailwind) {
          (window as any).tailwind.config = {
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
          };
        }
      };

      document.head.appendChild(script);
    }
  }, []);

  // AUTO-SAVE LOGIC
  useEffect(() => {
    if (isFirstLoad.current) {
      if (config) isFirstLoad.current = false;
      return;
    }

    if (!config) return;

    const timeoutId = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await setDoc(doc(db, "websites", name), {
          lastUpdated: new Date().toISOString(),
          websiteOneData: config
        }, { merge: true });

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } catch (err: any) {
        setError(`Auto-save failed: ${err.message}`);
        setSaveStatus("idle");
      }
    }, 800);

    return () => clearTimeout(timeoutId);
  }, [config, name]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setJsonInput(newVal);
    try {
      const parsed = JSON.parse(newVal);
      setConfig(parsed);
      setError("");
    } catch (err) {
      setError("Invalid JSON format. Auto-save paused.");
    }
  };

  const updateClassName = (path: string[], value: string) => {
    const newConfig = JSON.parse(JSON.stringify(config || {}));

    let current = newConfig;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    setConfig(newConfig);
    setJsonInput(JSON.stringify(newConfig, null, 2));
  };

  const renderClassInput = (label: string, path: string[], placeholder: string) => {
    const val = path.reduce((acc, curr) => acc?.[curr], config) || "";
    return (
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-gray-700">{label}</label>
        <input
          type="text"
          value={val}
          onChange={(e) => updateClassName(path, e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 text-sm border border-gray-200 rounded outline-none focus:border-black focus:ring-1 focus:ring-black bg-white"
        />
      </div>
    );
  };

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-black w-8 h-8" /></div>;

  return (
    <div className="flex w-full h-screen bg-white font-sans text-black overflow-hidden">

      {/* LEFT SIDE: Editor Panel */}
      <div className="w-[450px] flex flex-col shrink-0 border-r border-gray-200 bg-gray-50 z-10 shadow-xl">

        <div className="flex flex-col gap-4 p-5 border-b border-gray-200 bg-white">
          <button onClick={() => router.push(`/dashboard/${name}`)} className="text-gray-500 hover:text-black flex items-center gap-1.5 text-sm font-medium w-fit transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </button>

          <div className="flex items-center justify-between">
            <h1 className="font-bold text-sm text-gray-800">Template 1: Advanced Editor</h1>

            <div className="flex items-center gap-2 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              {saveStatus === "saving" && <><Loader2 size={14} className="animate-spin text-blue-500" /> <span className="text-blue-500">Saving...</span></>}
              {saveStatus === "saved" && <><CheckCircle2 size={14} className="text-green-500" /> <span className="text-green-500">Saved</span></>}
              {saveStatus === "idle" && <span className="text-gray-500">Up to date</span>}
            </div>
          </div>
          {error && <div className="text-xs text-red-600 bg-red-50 p-2 rounded font-mono">{error}</div>}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Raw JSON Object</h3>
            <textarea
              value={jsonInput}
              onChange={handleJsonChange}
              className="w-full h-[300px] bg-gray-900 text-green-400 p-4 font-mono text-[12px] rounded-lg shadow-inner outline-none focus:ring-2 focus:ring-blue-500 resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>

          <hr className="border-gray-200" />

          {/* DYNAMIC TAILWIND INJECTORS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 mb-3">Tailwind Class Injectors</h3>

            <SectionAccordion title="Navbar">
              {renderClassInput("Section Classes", ["navbar", "section", "className"], "e.g. shadow-md bg-opacity-90")}
              {renderClassInput("Logo Classes", ["navbar", "logo", "className"], "e.g. scale-110")}
              {renderClassInput("CTA Button Classes", ["navbar", "cta", "className"], "e.g. hidden md:flex rounded-full")}
            </SectionAccordion>

            <SectionAccordion title="Hero Section">
              {renderClassInput("Section Classes", ["hero", "section", "className"], "e.g. pt-20 bg-blue-50")}
              {renderClassInput("Heading Classes", ["hero", "heading", "className"], "e.g. text-7xl md:text-8xl mt-32")}
              {renderClassInput("Description Classes", ["hero", "description", "className"], "e.g. mt-4 opacity-80 max-w-xl")}
              {renderClassInput("Image Classes", ["hero", "image", "className"], "e.g. object-contain scale-110")}
              {renderClassInput("CTA Button Classes", ["hero", "cta", "className"], "e.g. shadow-xl hover:scale-105")}
              {renderClassInput("Social Proof Classes", ["hero", "socialProof", "className"], "e.g. hidden md:flex")}
            </SectionAccordion>

            <SectionAccordion title="Stats Banner">
              {renderClassInput("Section Classes", ["statsBanner", "section", "className"], "e.g. py-32 bg-black")}
              {renderClassInput("Heading Classes", ["statsBanner", "heading", "className"], "e.g. text-center text-white")}
              {renderClassInput("Rating Block Classes", ["statsBanner", "rating", "className"], "e.g. scale-110")}
              {renderClassInput("Experience Block Classes", ["statsBanner", "experience", "className"], "e.g. hidden sm:flex")}
            </SectionAccordion>
            
            <SectionAccordion title="Meet the Founder">
              {renderClassInput("Section Classes", ["founder", "section", "className"], "e.g. py-20")}
              {renderClassInput("Heading Classes", ["founder", "heading", "className"], "e.g. text-5xl font-bold")}
              {renderClassInput("Subheading Classes", ["founder", "subheading", "className"], "e.g. uppercase tracking-widest")}
              {renderClassInput("Description Classes", ["founder", "description", "className"], "e.g. text-lg leading-relaxed")}
              {renderClassInput("Signature Classes", ["founder", "signature", "className"], "e.g. font-['Playfair_Display'] italic")}
            </SectionAccordion>
            <SectionAccordion title="Gallery">
              {renderClassInput("Section Classes", ["gallery", "section", "className"], "e.g. py-24")}
              {renderClassInput("Heading Classes", ["gallery", "heading", "className"], "e.g. text-5xl font-bold")}
              {renderClassInput("Description Classes", ["gallery", "description", "className"], "e.g. opacity-80")}
              {renderClassInput("Styling Wrappers", ["gallery", "styling", "className"], "e.g. gap-12")}
            </SectionAccordion>

            <SectionAccordion title="About Section">
              {renderClassInput("Section Classes", ["about", "section", "className"], "e.g. overflow-visible")}
              {renderClassInput("Heading Classes", ["about", "heading", "className"], "e.g. tracking-tight")}
              {renderClassInput("Description Classes", ["about", "description", "className"], "e.g. text-lg leading-loose")}
              {renderClassInput("Image Classes", ["about", "image", "className"], "e.g. rounded-[40px] shadow-2xl")}
              {renderClassInput("Features List Classes", ["about", "featuresList", "className"], "e.g. mt-10 space-y-6")}
              {renderClassInput("CTA Button Classes", ["about", "cta", "className"], "e.g. rounded-none border-2")}
            </SectionAccordion>

            <SectionAccordion title="Services">
              {renderClassInput("Section Classes", ["services", "section", "className"], "e.g. bg-gray-50")}
              {renderClassInput("Heading Classes", ["services", "heading", "className"], "e.g. mb-10")}
              {renderClassInput("Description Classes", ["services", "description", "className"], "e.g. mx-auto max-w-2xl")}
              {renderClassInput("Card Wrapper Classes", ["services", "styling", "className"], "e.g. hover:-translate-y-2")}
            </SectionAccordion>

            <SectionAccordion title="Process Steps">
              {renderClassInput("Section Classes", ["process", "section", "className"], "e.g. py-32")}
              {renderClassInput("Heading Classes", ["process", "heading", "className"], "e.g. text-center")}
              {renderClassInput("Description Classes", ["process", "description", "className"], "e.g. text-center")}
              {renderClassInput("Line/Wrapper Classes", ["process", "styling", "className"], "e.g. max-w-4xl")}
            </SectionAccordion>

            <SectionAccordion title="Comparison Board">
              {renderClassInput("Section Classes", ["comparison", "section", "className"], "e.g. pt-10")}
              {renderClassInput("Heading Classes", ["comparison", "heading", "className"], "e.g. text-5xl")}
              {renderClassInput("Description Classes", ["comparison", "description", "className"], "e.g. mb-20")}
              {renderClassInput("VS Badge Classes", ["comparison", "vsBadge", "className"], "e.g. scale-125")}
              {renderClassInput("Left Column (Bad) Classes", ["comparison", "leftColumn", "className"], "e.g. opacity-80 grayscale")}
              {renderClassInput("Right Column (Good) Classes", ["comparison", "rightColumn", "className"], "e.g. shadow-2xl scale-105 z-10")}
            </SectionAccordion>

            <SectionAccordion title="Reviews">
              {renderClassInput("Section Classes", ["reviews", "section", "className"], "e.g. bg-white")}
              {renderClassInput("Heading Classes", ["reviews", "heading", "className"], "e.g. tracking-tighter")}
              {renderClassInput("Description Classes", ["reviews", "description", "className"], "e.g. pb-10")}
            </SectionAccordion>

            <SectionAccordion title="Insights / Blog">
              {renderClassInput("Section Classes", ["insights", "section", "className"], "e.g. py-20")}
              {renderClassInput("Heading Classes", ["insights", "heading", "className"], "e.g. text-left")}
              {renderClassInput("Description Classes", ["insights", "description", "className"], "e.g. text-left")}
            </SectionAccordion>

            <SectionAccordion title="Bottom CTA">
              {renderClassInput("Section Classes", ["ctaSection", "section", "className"], "e.g. mt-20")}
              {renderClassInput("Heading Classes", ["ctaSection", "heading", "className"], "e.g. text-white text-6xl")}
              {renderClassInput("Description Classes", ["ctaSection", "description", "className"], "e.g. text-gray-200")}
              {renderClassInput("Background Image Classes", ["ctaSection", "image", "className"], "e.g. grayscale mix-blend-overlay")}
              {renderClassInput("Button Classes", ["ctaSection", "cta", "className"], "e.g. px-10 py-5 text-lg")}
            </SectionAccordion>

            <SectionAccordion title="Footer">
              {renderClassInput("Section Classes", ["footer", "section", "className"], "e.g. border-t border-gray-200")}
              {renderClassInput("Logo Classes", ["footer", "logo", "className"], "e.g. grayscale opacity-80")}
            </SectionAccordion>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Live Preview */}
      <div className="flex-1 h-full bg-[#f3f3f3] overflow-y-auto relative pointer-events-auto">
        <div id="live-preview-box" className="w-full min-h-screen bg-white">
          {/* 🔥 3. ERROR BOUNDARY WRAPPER: If WebsiteOne crashes, it shows the error safely here! */}
          <PreviewErrorBoundary data={config}>
            <WebsiteOne data={config} />
          </PreviewErrorBoundary>
        </div>
      </div>
    </div>
  );
}