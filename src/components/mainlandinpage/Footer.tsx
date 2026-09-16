import React from 'react'
import { FOOTER_CONTENT } from './data'

export default function Footer() {
  return (
    <footer className="relative mb-11 flex min-h-[500px] w-full flex-col justify-between overflow-hidden rounded-[28px] border border-[#E6E6E6] p-4 pb-0 sm:rounded-[35px] md:p-8 md:pb-0 lg:p-12 lg:pb-0">
      {/* Background Dot Grid */}
      <div
        className="absolute left-0 top-0 -z-20 h-full w-full"
        style={{
          backgroundImage: 'radial-gradient(circle, #e6e6e6 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />

      {/* Decorative Left Graphic */}
      <div className="pointer-events-none absolute -bottom-36 -left-32 -z-10 rotate-[20deg] scale-50 opacity-60 sm:scale-75 md:-bottom-40 md:-left-20 md:z-0 md:opacity-100 [&>*]:scale-100">
        <div className="relative h-[439px] w-[405px]">
          <img
            src={FOOTER_CONTENT.graphics.left.src}
            alt={FOOTER_CONTENT.graphics.left.alt}
            width={100}
            height={100}
            className="size-96"
          />
        </div>
      </div>

      {/* Decorative Right Graphic */}
      <div className="pointer-events-none absolute -bottom-40 -right-32 -z-10 rotate-[-10deg] scale-50 opacity-60 sm:scale-75 md:-bottom-36 md:-right-10 md:z-0 md:opacity-100 [&>*]:scale-100">
        <div className="relative h-[439px] w-[400px]">
          <img
            src={FOOTER_CONTENT.graphics.right.src}
            alt={FOOTER_CONTENT.graphics.right.alt}
            width={100}
            height={100}
            className="size-60"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex w-full flex-col justify-between gap-10 xl:flex-row xl:gap-12">
        {/* Brand Header */}
        <div className="w-full xl:max-w-[650px]">
          <div className="flex items-center gap-3">
            <img
              src={FOOTER_CONTENT.brand.logo.src}
              alt={FOOTER_CONTENT.brand.logo.alt}
              width={100}
              height={100}
              className="size-8"
            />
            <span className="text-2xl font-semibold sm:text-3xl">
              {FOOTER_CONTENT.brand.name}
            </span>
          </div>
          <p className="mt-4 text-2xl font-bold tracking-tight text-black sm:text-3xl md:mt-8 md:text-4xl lg:text-5xl xl:leading-[54px]">
            {FOOTER_CONTENT.brand.tagline}
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="flex w-full items-start xl:justify-end">
          <div className="grid w-full grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 md:max-w-lg xl:max-w-none">
            {FOOTER_CONTENT.navigation.map((section) => (
              <div key={section.title} className="flex flex-col gap-3 sm:gap-4">
                <h2 className="text-base font-extrabold text-black">{section.title}</h2>
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    className="text-sm font-normal text-[#535353] transition-colors hover:text-[#2462EA] sm:text-base"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="relative z-10 mt-12 w-full sm:mt-16 md:mt-20">
        <div className="h-px w-full border-t border-dashed border-[#CCCCCC]" />
        <div className="flex flex-col-reverse items-center justify-between gap-4 py-6 sm:flex-row sm:gap-0 sm:py-8">
          <p className="text-center text-xs font-normal text-[#737373] sm:text-left sm:text-sm md:text-base">
            {FOOTER_CONTENT.bottom.copyright}
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_CONTENT.bottom.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="opacity-70 transition-opacity hover:opacity-100"
                aria-label={social.name}
              >
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d={social.svgPath} fill="#808080" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}