import React from "react";
import { Check } from "lucide-react";
import AntiMetalButton from "./mainbutton";
import { pricingContent } from "./data";

// Extract all text content into a single variable/object

export default function Pricing() {
  return (
    <section className="bg-white px-4 py-12 md:py-20">
      {/* Header */}
      <div className="mt-3 my-16 flex flex-col items-center justify-center space-y-3 text-center tracking-tight md:my-24">
        <div className="w-fit gap-2 rounded-3xl border-[1.3px] border-[#D6D6D6] px-4 py-1 text-sm shadow-[0px_1px_2px_0px_#0000001A,0px_4px_4px_0px_#00000017,0px_9px_5px_0px_#0000000D,0px_16px_6px_0px_#00000003,0px_25px_7px_0px_#00000000] md:text-base font-medium">
          {pricingContent.badge}
        </div>
        <h1 className="mb-2 max-w-3xl text-center text-2xl font-semibold text-black md:text-4xl lg:text-5xl">
          {pricingContent.title}
        </h1>
        <p className="w-72 px-1 text-center text-sm text-[#737373] md:w-[670px] md:text-base lg:text-lg">
          {pricingContent.description}
        </p>
      </div>

      {/* Pricing Card */}
      <div className="mt-8 md:mt-16  mx-auto">
        <div className="relative overflow-hidden rounded-[35px] border border-[#E6E6E6] bg-white">
          {/* dotted background, same pattern as hero section */}
          <div
            className="absolute -z-0 top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="relative grid items-center gap-12 divide-y p-8 md:p-14 md:grid-cols-2 md:divide-x md:divide-y-0 divide-[#E6E6E6]">
            {/* Left: price + CTA */}
            <div className="pb-12 text-center md:pb-0 md:pr-12">
              <h3 className="text-2xl font-semibold text-black">{pricingContent.planName}</h3>
              <p className="mt-2 text-lg text-[#737373]">{pricingContent.planSubtitle}</p>

              <span className="mb-6 mt-12 inline-block text-6xl font-bold text-black">
                <span className="text-4xl align-top">{pricingContent.currency}</span>{pricingContent.price}
              </span>

              <div className="flex justify-center mt-8">
                <AntiMetalButton>{pricingContent.buttonText}</AntiMetalButton>
              </div>

              <p className="text-[#737373] mt-12 text-sm">
                {pricingContent.footerNote}
              </p>
            </div>

            {/* Right: what's included */}
            <div className="relative md:pl-12">
              <ul role="list" className="space-y-4">
                {pricingContent.features.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex items-center justify-center size-5 rounded-full bg-[#2462EA]/10 shrink-0">
                      <Check
                        strokeWidth={3}
                        className="text-[#2462EA] size-3"
                      />
                    </span>
                    <span className="text-black">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}