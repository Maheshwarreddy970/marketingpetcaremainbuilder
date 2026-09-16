import React from 'react'
import { testimonials } from './data';


// Split the flat array into three columns to match the original masonry
// layout (col 0: lg/sm, col 1: sm/lg, col 2: sm/[video banner]).
const columns = [
  [testimonials[0], testimonials[1]],
  [testimonials[2], testimonials[3]],
  [testimonials[4]],
]

function Avatar({ src, alt }: { src: string; alt: string }) {
  if (!src) return null
  return (
    <img
      alt={alt}
      loading="lazy"
      width={50}
      height={50}
      decoding="async"
      className="rounded-lg aspect-square object-cover"
      style={{ color: "transparent" }}
      src={src}
    />
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[number] }) {
  const { text, name, title, avatar, size, tone } = testimonial
  const isLight = tone === "light"
  const heightClass = size === "lg" ? "lg:h-2/3" : "lg:h-1/3"

  return (
    <div
      className={`flex h-full w-full flex-col justify-between gap-4 rounded-[35px] border border-[#DBDCDE] p-10 md:min-h-[600px] xl:min-h-[400px] ${heightClass} ${
        isLight
          ? "bg-white shadow-[0px_14px_30px_0px_#0000000D,0px_54px_54px_0px_#0000000A,0px_122px_73px_0px_#00000008,0px_217px_87px_0px_#00000003,0px_340px_95px_0px_#00000000]"
          : "bg-[#F5F5F5]"
      }`}
    >
      <p className="text-sm md:text-lg text-[#3C3C3C] md:leading-8 font-normal mb-8 max-h-36">
        {text}
      </p>
      <div className="flex items-center gap-4">
        <Avatar src={avatar} alt="avatar" />
        <div className="flex flex-col">
          <p className="text-sm md:text-base text-[#4D4D4D] font-normal">
            {name}
          </p>
          <p className="text-xs md:text-sm text-[#1F2534] font-normal">
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Review() {
  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-3 md:my-24 tracking-tight text-center my-10">
        <div className="w-fit px-3 md:text-base text-sm py-1 rounded-3xl gap-2 border-[1.3px] border-[#D6D6D6] shadow-[0px_1px_2px_0px_#0000001A,0px_4px_4px_0px_#00000017,0px_9px_5px_0px_#0000000D,0px_16px_6px_0px_#00000003,0px_25px_7px_0px_#00000000]">
          testimonials
        </div>
        <h1 className="md:text-4xl font-semibold mb-2 lg:text-5xl text-2xl text-center">
          Recruiters love us
        </h1>
        <p className="text-center w-72 md:w-[670px] md:text-base lg:text-lg text-sm px-1">
          People have chosen us from all over the world to help them with their hiring
          process. Take a look at some of their feedbacks.
        </p>
      </div>
      <div className="w-full flex items-center justify-center mt-10 md:mt-40 mb-10">
        <div className="w-full mx-auto max-w-7xl flex justify-between gap-5">
          <div className="flex gap-6 lg:flex-row flex-col h-full lg:h-[1000px] w-full">
            {columns.map((column, colIndex) => (
              <div className="space-y-6 w-full" key={colIndex}>
                {column.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.name}
                    testimonial={testimonial}
                  />
                ))}

                {/* Video banner is the last item in the last column */}
                {colIndex === columns.length - 1 && (
                  <div
                    className="flex 2xl:h-2/3 h-[600px] gap-4 justify-center items-end w-full rounded-[35px] bg-[url('/assets/video_banner.png')] bg-cover p-10 bg-[#F5F5F5]"
                    style={{ opacity: 1, transform: "none" }}
                  >
                    <button className="rounded-xl border border-white text-white w-fit text-lg font-semibold bg-white/50 px-8 py-3 flex items-center justify-center">
                      Watch Review
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}