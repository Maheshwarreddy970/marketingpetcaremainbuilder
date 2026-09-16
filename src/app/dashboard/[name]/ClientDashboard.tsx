"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  LayoutTemplate, ExternalLink, Loader2, Globe, Server, 
  Lock, RefreshCw, Download, Settings 
} from "lucide-react";
import merge from "lodash/merge";
import WebsiteOne from "@/components/templates/WebsiteOne";
import { deployWebsiteAction, publishWebsiteUpdatesAction } from "@/actions/tenant";

interface DashboardProps {
  name: string;
  dbData: any;
}

const DEPLOY_STEPS = [
  "Initializing edge cache...",
  "Optimizing database structure...",
  "Generating static assets...",
  "Mapping subdomain routing...",
  "Deploying to Global Network..."
];

export default function ClientDashboard({ name, dbData }: DashboardProps) {
  const paid = dbData?.paid;
  const [downloading, setDownloading] = useState(false);
  const [isDeployed, setIsDeployed] = useState(dbData?.isDeployed || false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStep, setDeployStep] = useState(0);
  const [isPublishing, setIsPublishing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-scroll effect for the preview window
  useEffect(() => {
    let animationFrameId: number;
    const scrollContainer = scrollRef.current;

    const autoScroll = () => {
      if (scrollContainer && !isHovering) {
        scrollContainer.scrollTop += 0.5;
        if (scrollContainer.scrollTop >= scrollContainer.scrollHeight - scrollContainer.clientHeight) {
          scrollContainer.scrollTop = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  // If you manually add a domain to Firebase later, it will show up here
  const activeDisplayUrl = dbData?.customDomain ? dbData.customDomain : `${name}.nexpetcare.online`;
  const liveHref = dbData?.customDomain ? `https://${dbData.customDomain}` : `https://${name}.nexpetcare.online`;
  const activeData = merge({}, dbData?.websiteOneData || {});
  
  const handlePublish = async () => {
    setIsPublishing(true);
    const res = await publishWebsiteUpdatesAction(name);
    if (res.success) {
      alert("✅ Success! Your live website has been updated worldwide.");
    } else {
      alert("❌ Failed to publish: " + res.error);
    }
    setIsPublishing(false);
  };
  
  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeployStep(0);
    for (let i = 0; i < DEPLOY_STEPS.length; i++) {
      setDeployStep(i);
      await new Promise(res => setTimeout(res, 800));
    }
    const res = await deployWebsiteAction(name);
    if (res.success) {
      setIsDeployed(true);
    } else {
      alert("Deployment failed.");
    }
    setIsDeploying(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const settings = dbData?.settings || {};
      const contentNode = document.getElementById("export-container");
      const contentHtml = contentNode ? contentNode.innerHTML : "";

      const fullHtml = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${settings.seoTitle || dbData?.clientName || name}</title>\n  <meta name="description" content="${settings.seoDescription || ""}">\n  <meta name="keywords" content="${settings.keywords || ""}">\n  ${settings.favicon ? `<link rel="icon" href="${settings.favicon}">` : ""}\n  <meta property="og:title" content="${settings.seoTitle || name}">\n  <meta property="og:description" content="${settings.seoDescription || ""}">\n  ${settings.ogImage ? `<meta property="og:image" content="${settings.ogImage}">` : ""}\n  <script src="https://cdn.tailwindcss.com"></script>\n  ${settings.googleAnalyticsId ? `\n  <script async src="https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n    gtag('config', '${settings.googleAnalyticsId}');\n  </script>\n  ` : ""}\n  ${settings.googleReviewsId ? `<script src="https://apps.elfsight.com/p/platform.js" defer></script>` : ""}\n</head>\n<body>\n  ${contentHtml}\n  ${settings.googleReviewsId ? `<div class="elfsight-app-${settings.googleReviewsId}"></div>` : ""}\n</body>\n</html>`;

      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullHtml })
      });

      if (!res.ok) throw new Error("Failed to generate ZIP");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}-website.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert("Failed to export ZIP.");
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-black p-6 md:p-10 font-sans flex flex-col items-center" suppressHydrationWarning>

      {/* Dashboard Header */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight capitalize text-gray-900">
            {dbData?.clientName || name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`w-2 h-2 rounded-full ${isDeployed ? "bg-green-500 animate-pulse" : "bg-gray-300"}`}></span>
            <p className="text-sm text-gray-500 font-medium">
              {isDeployed ? "Live on Global Network" : "Draft Mode - Not Deployed"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm"
            href={`/dashboard/${name}/${dbData?.template === 'websiteOne' ? 'websiteOne' : 'websiteOne'}/edit`}
          >
            <LayoutTemplate size={16} /> Visual Editor
          </Link>
          
          {isDeployed && (
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md disabled:opacity-70"
            >
              {isPublishing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
              {isPublishing ? "Publishing..." : "Publish Updates"}
            </button>
          )}
          
          {paid ? (
            <button onClick={handleDownload} disabled={downloading} className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-black text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md disabled:opacity-70">
              {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
              {downloading ? "Packaging..." : "Export ZIP"}
            </button>
          ) : (
            <button disabled className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-gray-200 text-gray-500 rounded-lg cursor-not-allowed border border-gray-300">
              <Lock size={16} /> Export ZIP (Pro)
            </button>
          )}

          {isDeployed && (
            <a href={liveHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors shadow-sm">
              <ExternalLink size={16} /> Visit Live Site
            </a>
          )}
        </div>
      </div>

      {/* Deploy Banner */}
      {!isDeployed && (
        <div className="w-full max-w-7xl mx-auto mt-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
              <Server className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Deploy app for free</h2>
              <p className="text-gray-500 text-sm mt-1">
                Make your template live on <span className="font-mono bg-gray-100 px-1 rounded text-gray-700">{name}.nexpetcare.online</span>.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <button
              onClick={handleDeploy}
              disabled={isDeploying}
              className="flex items-center gap-2 px-8 py-3 text-sm font-semibold bg-black text-white rounded-xl hover:bg-gray-800 transition-all shadow-md disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isDeploying ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
              {isDeploying ? "Deploying..." : "Deploy App for Free"}
            </button>
            {isDeploying && (
              <p className="text-xs font-medium text-blue-600 animate-pulse mt-2">
                {DEPLOY_STEPS[deployStep]}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Auto-scrolling Template Preview - ALWAYS VISIBLE */}
      <div className="w-full max-w-7xl mx-auto mt-10 flex flex-col bg-white rounded-2xl border border-gray-300 overflow-hidden ring-1 ring-black/5">
        <div className="h-14 bg-gray-100/80 border-b border-gray-200 flex items-center px-4 justify-between select-none shrink-0 z-10 relative">
          <div className="flex gap-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>

          <div className="flex-1 flex justify-center">
            <div className="bg-white px-8 py-1.5 text-xs text-gray-500 font-medium rounded-md border border-gray-200 shadow-sm flex items-center gap-2 min-w-[250px] justify-center">
              <Lock size={12} className={dbData?.customDomain ? "text-green-500" : "text-gray-400"} />
              <span className="ml-2">{activeDisplayUrl}</span>
            </div>
          </div>
          <div className="w-20" />
        </div>

        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative w-full h-[750px] bg-gray-50 overflow-hidden"
        >
          <div
            ref={scrollRef}
            className="absolute inset-0 overflow-hidden"
            style={{ contain: 'paint' }}
          >
            <div id="export-container" className="w-full min-h-full bg-white flex flex-col relative pointer-events-none" suppressHydrationWarning>
              <WebsiteOne data={activeData} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}