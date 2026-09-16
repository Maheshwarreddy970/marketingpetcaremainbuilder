import { NextResponse } from 'next/server';
import JSZip from 'jszip';

export async function POST(req: Request) {
  try {
    const { fullHtml } = await req.json();
    const zip = new JSZip();
    const assetsFolder = zip.folder("assets");
    
    let processedHtml = fullHtml as string;

    // 🔥 CRITICAL FIX: The preview window captures hidden animated elements (opacity: 0).
    // This safely strips all hidden states so every section shows up in the static ZIP!
    processedHtml = processedHtml.replace(/opacity:\s*0;?/gi, 'opacity: 1; ');
    processedHtml = processedHtml.replace(/opacity-0/gi, 'opacity-100');
    processedHtml = processedHtml.replace(/transform:\s*translateY\([0-9a-z%]+\);?/gi, '');

    // Matches any url starting with http that points to cloudinary, unsplash, or common image hosts
    // 🔥 Added .ico format support to catch Favicon declarations
    const imageRegex = /https?:\/\/[^"'\s\\)]+\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico)|https?:\/\/(?:res\.cloudinary\.com|images\.unsplash\.com)[^"'\s\\)]+/gi;
    const matches = processedHtml.match(imageRegex) || [];
    
    // De-duplicate URLs
    const uniqueUrls = [...new Set(matches)];

    // Download each image and swap the URL in the HTML
    for (let i = 0; i < uniqueUrls.length; i++) {
      // 🔥 FIX FOR TYPESCRIPT ERROR
      const originalUrl = uniqueUrls[i] as string; 

      try {
        const response = await fetch(originalUrl);
        if (!response.ok) throw new Error("Fetch failed");
        
        const buffer = await response.arrayBuffer();
        
        // Extract extension from URL, fallback to .jpg
        let ext = 'jpg';
        const lowerUrl = originalUrl.toLowerCase();
        if (lowerUrl.includes('.png')) ext = 'png';
        else if (lowerUrl.includes('.avif')) ext = 'avif';
        else if (lowerUrl.includes('.webp')) ext = 'webp';
        else if (lowerUrl.includes('.svg')) ext = 'svg';
        else if (lowerUrl.includes('.gif')) ext = 'gif';
        else if (lowerUrl.includes('.ico')) ext = 'ico';

        const filename = `image_${i}.${ext}`;
        assetsFolder?.file(filename, buffer);
        
        // Replace exact URL and HTML-escaped URL safely
        const escapedUrl = originalUrl.replace(/&/g, '&amp;');
        processedHtml = processedHtml.replaceAll(originalUrl, `./assets/${filename}`);
        processedHtml = processedHtml.replaceAll(escapedUrl, `./assets/${filename}`);
        
      } catch (e) {
        console.error("Failed to download image:", originalUrl);
      }
    }

    zip.file("index.html", processedHtml);
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    const zipBytes = new Uint8Array(zipBuffer);

    return new NextResponse(zipBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="client-website.zip"',
      },
    });

  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to generate zip" }, { status: 500 });
  }
}