"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface DoubleChevronProps {
  index: number;
  dotColor: string;
}

// Keep button/anchor props separate so the event handler types don't conflict.
export type AntiMetalButtonProps =
  | ({
      label?: string;
      accentFrom?: string;
      accentTo?: string;
      dotColor?: string;
      href?: undefined;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      label?: string;
      accentFrom?: string;
      accentTo?: string;
      dotColor?: string;
      href: string;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

// ============================================================================
// Sub-components
// ============================================================================

const DoubleChevron: React.FC<DoubleChevronProps> = ({ index, dotColor }) => {
  const base = index * 0.12;
  const dots = [
    { cx: 2, cy: 2, d: 0 },
    { cx: 5, cy: 5, d: 0.05 },
    { cx: 8, cy: 8, d: 0.1 },
    { cx: 5, cy: 11, d: 0.15 },
    { cx: 2, cy: 14, d: 0.2 },
    { cx: 6, cy: 2, d: 0.05 },
    { cx: 9, cy: 5, d: 0.1 },
    { cx: 12, cy: 8, d: 0.15 },
    { cx: 9, cy: 11, d: 0.2 },
    { cx: 6, cy: 14, d: 0.25 },
  ];

  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      aria-hidden="true"
      focusable="false"
      className="shrink-0 overflow-visible"
    >
      <g fill={dotColor}>
        {dots.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="1"
            className="bd-dot"
            style={{ animationDelay: `${base + p.d}s` }}
          />
        ))}
      </g>
    </svg>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const AntiMetalButton = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  AntiMetalButtonProps
>(
  (
    {
      className,
      children,
      label,
      accentFrom = "#ffffff",
      accentTo = "#ffffff",
      dotColor = "#0553fc",
      href,
      ...props
    },
    ref
  ) => {
    const content = label ?? children ?? "Book a demo";
    
    // Conditionally render an <a> or <button> based on whether an href is provided
    // The props union contains mutually exclusive event-handler types. Cast at
    // this polymorphic render boundary so TypeScript does not merge anchor and
    // button attributes into one incompatible JSX type.
    const Component: React.ElementType = href ? "a" : "button";

    return (
      <Component
        ref={ref as React.Ref<any>}
        href={href}
        className={cn(
          // Changed to `w-fit`, added `items-center` for vertical alignment, 
          // and used padding (`pl-12 pr-4`) to space the text out dynamically.
          "group/btn relative inline-flex h-11 w-fit items-center overflow-hidden rounded-xl pl-12 pr-4 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "bg-[#2462EA]",
          className
        )}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {/* Scoped Keyframes for the dot animation */}
        <style>{`
          @keyframes bd-dot-wave {
            0%, 70%, 100% { opacity: 0.25; transform: scale(0.85); }
            35% { opacity: 1; transform: scale(1); }
          }
          .bd-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: bd-dot-wave 1.4s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .bd-dot { animation: none; opacity: 1; }
          }
        `}</style>

        {/* Text Content - Removed absolute positioning so it defines the button's width */}
        <span className="text-[14px] font-medium tracking-tight text-white dark:text-[#0a0a0a]">
          {content}
        </span>

        {/* Expanding Accent Element */}
        <span
          aria-hidden="true"
          className="absolute bottom-1 left-1 top-1 z-10 flex w-9 items-center justify-start gap-2.5 overflow-hidden rounded-md pl-3 pr-2.5 transition-[width,gap] duration-200 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/btn:w-[calc(100%-0.5rem)]"
          style={{
            background: `linear-gradient(180deg, ${accentFrom} 0%, ${accentTo} 100%)`,
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          <DoubleChevron index={0} dotColor={dotColor} />
          <DoubleChevron index={1} dotColor={dotColor} />
          <DoubleChevron index={2} dotColor={dotColor} />
          <DoubleChevron index={3} dotColor={dotColor} />
          <DoubleChevron index={4} dotColor={dotColor} />
        </span>
      </Component>
    );
  }
);

AntiMetalButton.displayName = "AntiMetalButton";

export default AntiMetalButton;