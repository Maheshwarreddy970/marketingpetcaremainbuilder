import React from "react";
import { cn } from "@/lib/utils";

// 🔥 The "Brain": It will prioritize highlighting these words if they exist in the heading.
const POWER_WORDS = [
  "cleaning", "comfort", "care", "smiles", "experience", "family", 
  "trust", "craft", "simple", "grooming", "difference", "pamper", 
  "believe", "insights", "touch", "appointment", "choose", "provide", 
  "explore", "natural", "boutique", "safe", "love", "smile", "expert"
];

interface SmartHeadingProps {
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  className?: string;
  style?: React.CSSProperties;
  highlightColor?: string;
}

export default function SmartHeading({ 
  text, 
  as: Tag = "h2", 
  className, 
  style, 
  highlightColor 
}: SmartHeadingProps) {
  if (!text) return null;

  // 1. MANUAL HTML OVERRIDE: If the user typed raw HTML, respect it.
  if (text.includes("<") && text.includes(">")) {
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: text }} />;
  }

  // 2. NEW MULTI-WORD OVERRIDE (Markdown Style)
  // If the user uses backticks like: `Natural`, Effective Teeth `Cleaning` for Pets
  if (text.includes("`")) {
    // Splitting by a capturing group perfectly isolates the backticked words into odd indices!
    const parts = text.split(/`([^`]+)`/g);
    
    return (
      <Tag className={className} style={style}>
        {parts.map((part, index) => {
          // Odd indices are the exact words that were wrapped in backticks
          const isHighlighted = index % 2 === 1;

          if (isHighlighted) {
            return (
              <span 
                key={index}
                className="font-serif italic font-medium tracking-normal" 
                style={{ 
                  color: highlightColor || "var(--primary)", // Automatically uses the brand color
                  fontFamily: "var(--font-accent), serif"    // Forces the Playfair Display font
                }}
              >
                {part}
              </span>
            );
          }
          // Even indices are the normal, unhighlighted text (and punctuation outside the backticks)
          return <React.Fragment key={index}>{part}</React.Fragment>;
        })}
      </Tag>
    );
  }

  // 3. AUTOMATIC ALGORITHM: Find the best word to highlight automatically
  const words = text.split(" ");
  let targetIndex = -1;

  // Search for a Power Word first
  targetIndex = words.findIndex((w) => 
    POWER_WORDS.includes(w.toLowerCase().replace(/[^a-z]/g, ""))
  );

  // Fallback: If no power word, find the longest word
  if (targetIndex === -1 && words.length > 1) {
    let maxLength = 0;
    words.forEach((w, i) => {
      const cleanWord = w.replace(/[^a-zA-Z]/g, "");
      if (cleanWord.length >= maxLength) {
        maxLength = cleanWord.length;
        targetIndex = i; // Will naturally pick the later word if lengths are equal
      }
    });
  }

  // 4. RENDER AUTOMATIC HIGHLIGHT
  return (
    <Tag className={className} style={style}>
      {words.map((word, index) => {
        const isTarget = index === targetIndex;

        // Separate punctuation from the word so commas/periods don't become italicized
        const match = word.match(/^([^a-zA-Z]*)(.*?[a-zA-Z])([^a-zA-Z]*)$/);

        if (isTarget && match) {
          const [, prefix, coreWord, suffix] = match;
          return (
            <React.Fragment key={index}>
              {prefix}
              <span 
                className="font-serif italic font-medium tracking-normal" 
                style={{ 
                  color: highlightColor || "var(--primary)", 
                  fontFamily: "var(--font-accent), serif" 
                }}
              >
                {coreWord}
              </span>
              {suffix}
              {index < words.length - 1 ? " " : ""}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}