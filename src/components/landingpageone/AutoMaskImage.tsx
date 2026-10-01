"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
    src: string;
    color?: string;
    contrast?: number;
    className?: string;
    imgClassName?: string;
    alt?: string;
    onReady?: () => void; // <-- ADDED: Tells parent when loading & math is 100% done
};

function getMaskUrl(url: string) {
    if (!url) return "";
    const lastDot = url.lastIndexOf(".");
    if (lastDot === -1) return url + "mask";
    return url.substring(0, lastDot) + "mask" + url.substring(lastDot);
}

function hexToRgb(hex: string): [number, number, number] {
    let h = hex.trim().replace("#", "");
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => v / 255) as [number, number, number];
}

function load(url: string): Promise<HTMLImageElement> {
    return new Promise((res, rej) => {
        const i = new window.Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = url;
    });
}

function paintCanvas(d: any, cv: HTMLCanvasElement, color: string, contrast: number) {
    const { px, m, W, H, crop, lo, hi } = d;
    const { minX, minY, cropW, cropH } = crop;

    const [r, g, b] = hexToRgb(color);
    const tl = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const lift = (1 - tl) * 0.22;
    const base = 1 - contrast - 0.08;
    const span = Math.max(hi - lo, 0.001);

    const ctx = cv.getContext("2d", { willReadFrequently: true })!;
    if (cv.width !== W) cv.width = W;
    if (cv.height !== H) cv.height = H;

    const out = ctx.createImageData(cropW, cropH);

    for (let cy = 0; cy < cropH; cy++) {
        for (let cx = 0; cx < cropW; cx++) {
            const sx = minX + cx;
            const sy = minY + cy;
            const srcIdx = (sy * W + sx) * 4;
            const destIdx = (cy * cropW + cx) * 4;

            const a = m[srcIdx + 3];
            const maskVal = a < 10 ? 0 : m[srcIdx];

            if (maskVal === 0) {
                out.data[destIdx + 3] = 0;
                continue;
            }

            const lumRaw = (0.2126 * px[srcIdx] + 0.7152 * px[srcIdx + 1] + 0.0722 * px[srcIdx + 2]) / 255;
            const s = Math.min(1, Math.max(0, (lumRaw - lo) / span));
            const shade = base + contrast * s;
            const add = lift * s * s;

            out.data[destIdx]     = Math.min(1, r * shade + add) * 255;
            out.data[destIdx + 1] = Math.min(1, g * shade + add) * 255;
            out.data[destIdx + 2] = Math.min(1, b * shade + add) * 255;
            out.data[destIdx + 3] = maskVal;
        }
    }

    ctx.putImageData(out, minX, minY);
}

export default function AutoMaskImage({
    src,
    color = "",
    contrast = 0.46,
    className = "",
    imgClassName = "",
    alt = "Image",
    onReady
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const data = useRef<any>(null);
    const [status, setStatus] = useState<"loading" | "ready" | "no-mask">("loading");

    useEffect(() => {
        let dead = false;
        setStatus("loading");

        (async () => {
            try {
                const maskSrc = getMaskUrl(src);
                const [img, mask] = await Promise.all([
                    load(src),
                    load(maskSrc).catch(() => null) 
                ]);

                if (dead) return;
                if (!mask) {
                    setStatus("no-mask");
                    onReady?.();
                    return;
                }

                const W = img.naturalWidth;
                const H = img.naturalHeight;

                const c = document.createElement("canvas");
                c.width = W; c.height = H;
                const ctx = c.getContext("2d", { willReadFrequently: true })!;

                ctx.drawImage(img, 0, 0, W, H);
                const px = ctx.getImageData(0, 0, W, H).data;

                ctx.clearRect(0, 0, W, H);
                ctx.drawImage(mask, 0, 0, W, H);
                const m = ctx.getImageData(0, 0, W, H).data;

                let minX = W, minY = H, maxX = 0, maxY = 0;
                let foundMask = false;
                const histogram = new Int32Array(256);
                let totalSolid = 0;

                for (let y = 0; y < H; y++) {
                    for (let x = 0; x < W; x++) {
                        const i = (y * W + x) * 4;
                        const a = m[i + 3];
                        const rMask = m[i];

                        if (a > 10 && rMask > 5) {
                            foundMask = true;
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;

                            if (rMask > 230) {
                                const lumRaw = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
                                histogram[Math.floor(lumRaw)]++;
                                totalSolid++;
                            }
                        }
                    }
                }

                if (!foundMask) {
                    if (!dead) {
                        setStatus("no-mask");
                        onReady?.();
                    }
                    return;
                }

                let loCount = Math.floor(totalSolid * 0.04);
                let hiCount = Math.floor(totalSolid * 0.96);
                let lo = 0, hi = 1;
                
                if (totalSolid > 0) {
                    let current = 0;
                    let loFound = false;
                    for (let i = 0; i < 256; i++) {
                        current += histogram[i];
                        if (current >= loCount && !loFound) {
                            lo = i / 255;
                            loFound = true;
                        }
                        if (current >= hiCount) {
                            hi = i / 255;
                            break;
                        }
                    }
                }

                const cropW = maxX - minX + 1;
                const cropH = maxY - minY + 1;

                data.current = {
                    px, m, W, H,
                    crop: { minX, minY, cropW, cropH },
                    lo, hi
                };

                if (canvasRef.current) paintCanvas(data.current, canvasRef.current, color, contrast);

                if (!dead) {
                    setStatus("ready");
                    onReady?.(); // <--- Trigger animation in HeroSection
                }

            } catch (err) {
                if (!dead) {
                    setStatus("no-mask");
                    onReady?.();
                }
            }
        })();
        return () => { dead = true; };
    }, [src, onReady]);

    useEffect(() => {
        if (status === "ready" && data.current && canvasRef.current) {
            paintCanvas(data.current, canvasRef.current, color, contrast);
        }
    }, [color, contrast, status]);

    return (
        <div className={cn("relative overflow-hidden bg-transparent", className)}>
            <img 
                src={src} 
                alt={alt} 
                className={cn(
                    "w-full h-full block transition-opacity duration-[600ms] ease-out", 
                    status === "loading" ? "opacity-0 scale-105" : "opacity-100 scale-100",
                    imgClassName
                )} 
            />
            <canvas
                ref={canvasRef}
                className={cn(
                    "absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-[600ms] ease-out",
                    status === "ready" ? "opacity-100" : "opacity-0",
                    imgClassName 
                )}
            />
        </div>
    );
}