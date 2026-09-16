import Link from 'next/link'
import AntiMetalButton from './mainbutton'
import { CTA_CONTENT } from './data'



export function CallToAction() {
  return (
    <div className="py-24 md:py-32">
      <div className="mx-auto px-6 md:px-0 ">
        <div className="relative overflow-hidden rounded-[35px] border border-[#E6E6E6] p-6 md:p-12">
          {/* dotted background, same pattern as hero section */}
          <div
            className="absolute -z-10 top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle, #E6E6E6 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="relative flex flex-col justify-center md:flex-row md:items-center gap-10 md:gap-14">
            <div className="flex-1 text-center sm:text-start ">
              <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-balance text-black md:text-6xl">
                <span className="text-[#2462EA]">{CTA_CONTENT.headingHighlight}</span>
                {CTA_CONTENT.headingRest}
              </h1>
              <p className="mt-4 mb-6 text-lg text-balance text-[#737373]">
                {CTA_CONTENT.description}
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-8">
                <AntiMetalButton>{CTA_CONTENT.buttonText}</AntiMetalButton>
              </div>
            </div>

            <div className="w-full  md:w-72  shrink-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-xl shadow-xl before:absolute before:inset-0 before:rounded-xl before:border before:border-black/5 before:bg-[#2462EA]/5">
                  <img
                    alt={CTA_CONTENT.images.hero.alt}
                    loading="lazy"
                    width={CTA_CONTENT.images.hero.width}
                    height={CTA_CONTENT.images.hero.height}
                    decoding="async"
                    className="size-full object-cover"
                    src={CTA_CONTENT.images.hero.src}
                  />
                </div>

                <div className="relative aspect-square overflow-hidden rounded-xl shadow-xl before:absolute before:inset-0 before:rounded-xl before:border before:border-black/5 before:bg-[#2462EA]/10">
                  <img
                    alt={CTA_CONTENT.images.collab.alt}
                    loading="lazy"
                    width={CTA_CONTENT.images.collab.width}
                    height={CTA_CONTENT.images.collab.height}
                    decoding="async"
                    className="size-full object-cover"
                    src={CTA_CONTENT.images.collab.src}
                  />
                </div>

                <div className="relative aspect-square overflow-hidden rounded-xl shadow-xl before:absolute before:inset-0 before:rounded-xl before:border before:border-black/5 before:bg-[#2462EA]/5">
                  <img
                    alt={CTA_CONTENT.images.interfaceDetail.alt}
                    loading="lazy"
                    width={CTA_CONTENT.images.interfaceDetail.width}
                    height={CTA_CONTENT.images.interfaceDetail.height}
                    decoding="async"
                    className="size-full object-cover"
                    src={CTA_CONTENT.images.interfaceDetail.src}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}