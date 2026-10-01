"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  color?: string;          // "#F8C2E4"
  src?: string;            // default "/test1.jpg"
  maskSrc?: string;        // default "/mask1.jpg"
  contrast?: number;       // 0.2 – 0.8, bigger = deeper folds (default 0.46)
  className?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255) as [number, number, number];
}

function load(url: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new window.Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = url;
  });
}

type InternalData = {
  lum: Float32Array;
  alpha: Uint8ClampedArray;
  lo: number;
  hi: number;
  crop: { x: number; y: number; w: number; h: number };
  imgW: number;
  imgH: number;
};

export default function ShirtRecolor({
  color,
  src = "/lhero1.jpg",
  maskSrc = "/mask1.jpg",
  contrast = 0.46,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<InternalData | null>(null);
  const [ready, setReady] = useState(false);
  const [themeColor, setThemeColor] = useState("#F8C2E4");
  
  // Default to previous aspect ratio so layout doesn't shift before load
  const [aspect, setAspect] = useState<string>("2752/1536"); 

  // 1) Use CSS variable when no `color` prop is passed
  useEffect(() => {
    if (color) return;
    const cs = getComputedStyle(document.documentElement);
    const v = (cs.getPropertyValue("--theme-color") || cs.getPropertyValue("--primary")).trim();
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) setThemeColor(v);
  }, [color]);

  const finalColor = color ?? themeColor;

  // 2) Load photo + mask, Auto-crop the mask internally for max performance
  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const [img, mask] = await Promise.all([load(src), load(maskSrc)]);
        if (dead) return;
        
        const W = img.naturalWidth;
        const H = img.naturalHeight;
        setAspect(`${W}/${H}`); // Update layout to actual image proportions

        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const ctx = c.getContext("2d", { willReadFrequently: true })!;
        
        // Read original image
        ctx.drawImage(img, 0, 0, W, H);
        const px = ctx.getImageData(0, 0, W, H).data;
        
        // Read mask image
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(mask, 0, 0, W, H);
        const m = ctx.getImageData(0, 0, W, H).data;

        // Step A: Find the bounding box of the mask (auto-crop to save memory/processing)
        let minX = W, minY = H, maxX = 0, maxY = 0;
        let hasMask = false;

        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const i = (y * W + x) * 4;
            const r = m[i]; // Read red channel for mask intensity
            const a = m[i + 3]; // Alpha channel (to ignore transparent pixels)
            
            if (a > 10 && r > 5) {
              hasMask = true;
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        // If mask is completely empty, fallback to full screen
        if (!hasMask) {
          minX = 0; minY = 0; maxX = W - 1; maxY = H - 1;
        }

        const cropW = maxX - minX + 1;
        const cropH = maxY - minY + 1;

        // Step B: Extract luminance & alpha ONLY for the cropped area
        const n = cropW * cropH;
        const lum = new Float32Array(n);
        const alpha = new Uint8ClampedArray(n);
        const solid: number[] = [];

        for (let cy = 0; cy < cropH; cy++) {
          for (let cx = 0; cx < cropW; cx++) {
            const sx = minX + cx;
            const sy = minY + cy;
            const srcIdx = (sy * W + sx) * 4;
            const destIdx = cy * cropW + cx;

            lum[destIdx] = (0.2126 * px[srcIdx] + 0.7152 * px[srcIdx + 1] + 0.0722 * px[srcIdx + 2]) / 255;
            
            const r = m[srcIdx];
            const a = m[srcIdx + 3];
            const maskVal = a < 10 ? 0 : r;
            
            alpha[destIdx] = maskVal;
            if (maskVal > 230) solid.push(lum[destIdx]);
          }
        }

        solid.sort((a, b) => a - b);
        data.current = {
          lum, alpha,
          lo: solid[Math.floor(solid.length * 0.04)] || 0,
          hi: solid[Math.floor(solid.length * 0.96)] || 1,
          crop: { x: minX, y: minY, w: cropW, h: cropH },
          imgW: W,
          imgH: H
        };
        
        setReady(true);
      } catch (err) {
        console.error("Failed to load images:", err);
      }
    })();
    return () => { dead = true; };
  }, [src, maskSrc]);

  // 3) Repaint just the cropped area whenever the color changes
  useEffect(() => {
    const d = data.current, cv = canvasRef.current;
    if (!ready || !d || !cv) return;
    
    const { crop } = d;
    const [r, g, b] = hexToRgb(finalColor);
    const tl = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const lift = (1 - tl) * 0.22;               
    const base = 1 - contrast - 0.08;            
    const ctx = cv.getContext("2d")!;
    
    if (cv.width !== crop.w) cv.width = crop.w;
    if (cv.height !== crop.h) cv.height = crop.h;

    const out = ctx.createImageData(crop.w, crop.h);
    const span = Math.max(d.hi - d.lo, 0.001);

    for (let i = 0; i < d.lum.length; i++) {
      const a = d.alpha[i];
      if (!a) continue;
      const s = Math.min(1, Math.max(0, (d.lum[i] - d.lo) / span));
      const shade = base + contrast * s;
      const add = lift * s * s;
      out.data[i * 4]     = Math.min(1, r * shade + add) * 255;
      out.data[i * 4 + 1] = Math.min(1, g * shade + add) * 255;
      out.data[i * 4 + 2] = Math.min(1, b * shade + add) * 255;
      out.data[i * 4 + 3] = a;
    }
    ctx.putImageData(out, 0, 0);
  }, [ready, finalColor, contrast]);

  const pct = (val: number, total: number) => `${(val / total) * 100}%`;

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: aspect }}>
      <Image src={src} alt="Recolored preview" fill priority sizes="100vw" className="object-cover" />
      {ready && data.current && (
        <canvas
          ref={canvasRef}
          width={data.current.crop.w}
          height={data.current.crop.h}
          className="pointer-events-none absolute"
          style={{
            left: pct(data.current.crop.x, data.current.imgW),
            top: pct(data.current.crop.y, data.current.imgH),
            width: pct(data.current.crop.w, data.current.imgW),
            height: pct(data.current.crop.h, data.current.imgH),
          }}
        />
      )}
    </div>
  );
}