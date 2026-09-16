import React from 'react'
import AntiMetalButton from './mainbutton'
import { GlobeCheck } from 'lucide-react'
import { HERO_CONTENT } from './data'



export default function Herosection() {
  return (
    <div className="md:h-[912px] h-[710px] p-4 relative rounded-[35px] border border-[#E6E6E6] mt-5 overflow-hidden">
      <div
        className="absolute -z-20 top-0 left-0 w-full h-full"
        style={{
          backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
      
      {/* Globe Icon */}
      <div className="absolute -z-10 md:top-24 md:left-36 top-4 left-4 rotate-[-15.11deg]">
        <div
          style={{
            background: "linear-gradient(147.09deg, #fbfbfb 9.63%, #e8e8e8 91.74%)",
          }}
          className="size-12 md:size-16 lg:size-24 flex items-center justify-center rounded-xl lg:rounded-3xl border border-[#f3f3f3] shadow-[0px_5px_11px_0px_rgba(0,0,0,0.1),0px_20px_20px_0px_rgba(0,0,0,0.09),0px_44px_27px_0px_rgba(0,0,0,0.05),0px_79px_32px_0px_rgba(0,0,0,0.01),0px_123px_35px_0px_rgba(0,0,0,0)]"
        >
          <GlobeCheck className="text-[#2462EA] md:size-12 size-7" />
        </div>
      </div>

      {/* Logo Image */}
      <div className="absolute -z-10 md:bottom-80 md:right-96 bottom-64 right-11 rotate-[14deg]">
        <div
          style={{
            background: "linear-gradient(147.09deg, #fbfbfb 9.63%, #e8e8e8 91.74%)",
          }}
          className="size-16 lg:size-24 flex items-center justify-center rounded-xl lg:rounded-3xl border border-[#f3f3f3] shadow-[0px_5px_11px_0px_rgba(0,0,0,0.1),0px_20px_20px_0px_rgba(0,0,0,0.09),0px_44px_27px_0px_rgba(0,0,0,0.05),0px_79px_32px_0px_rgba(0,0,0,0.01),0px_123px_35px_0px_rgba(0,0,0,0)]"
        >
          <img
            src={HERO_CONTENT.images.logo.src}
            alt={HERO_CONTENT.images.logo.alt}
            width={100}
            height={100}
            className=" size-11 md:size-16"
          />
        </div>
      </div>

      {/* Daycare SVG */}
      <div className="absolute -z-10 md:bottom-72 bottom-56 md:-left-5 -left-14 rotate-[10deg] hidden md:block">
        <div className="rotate-[5deg] scale-[0.9]">
          <img
            src={HERO_CONTENT.images.daycare.src}
            alt={HERO_CONTENT.images.daycare.alt}
            width={100}
            height={100}
            className="size-60"
          />
        </div>
      </div>

      {/* Pet Groomer SVG */}
      <div className="absolute -z-10 md:-bottom-30 -bottom-26 md:-left-10 -left-24">
        <div className="scale-[0.9]">
          <img
            src={HERO_CONTENT.images.petgroomer.src}
            alt={HERO_CONTENT.images.petgroomer.alt}
            width={100}
            height={100}
            className="size-96"
          />
        </div>
      </div>

      {/* Mobile Grooming SVG */}
      <div className="absolute -z-10 md:-bottom-24 md:-right-10 -bottom-24 -right-48">
        <div className="md:[&>*]:scale-100 [&>*]:scale-75">
          <div className="relative w-[400px] h-[439px]">
            <img
              src={HERO_CONTENT.images.mobileGrooming.src}
              alt={HERO_CONTENT.images.mobileGrooming.alt}
              width={100}
              height={100}
              className="size-96"
            />
          </div>
        </div>
      </div>

      {/* Hero Content Center */}
      <div className="w-full h-5/6 flex flex-col items-center justify-center">
        <a href={HERO_CONTENT.badgeLink}>
          <div className="md:w-[459px] w-72 md:h-10 h-9 rounded-xl bg-[#2462EA]/50 flex items-center justify-center md:gap-3 gap-1">
            <p className="md:text-base text-[10px] font-semibold">
              {HERO_CONTENT.badgeText}
            </p>
          </div>
        </a>

        <h1 className="md:text-6xl text-2xl font-bold text-center md:w-4/6 w-full mt-8">
          {HERO_CONTENT.heading.map((word, index) => (
            <React.Fragment key={index}>
              <span className="inline-block">{word}</span>
              {index < HERO_CONTENT.heading.length - 1 && " "}
            </React.Fragment>
          ))}
        </h1>

        <p className="md:text-lg text-sm font-medium leading-[23px] text-center tracking-tight max-w-2xl mx-auto w-[95%] mt-9 text-neutral-600">
          {HERO_CONTENT.description}
        </p>

        <div className="flex gap-4 mt-8">
          <AntiMetalButton />
        </div>
      </div>
    </div>
  )
}