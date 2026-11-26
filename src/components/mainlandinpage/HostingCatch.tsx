import { CATCH_CONTENT } from './data'

const FONT = "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif"

export default function HostingCatch() {
  const { id, title, intro, points, catchPoint, footer } = CATCH_CONTENT

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      style={{ fontFamily: FONT }}
      className="mt-5 scroll-mt-5 rounded-[35px] bg-[#F4F6F8] px-6 py-14 text-[#0B2545] md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* Left: the question */}
          <div>
            <h2
              id={`${id}-title`}
              tabIndex={-1}
              className="text-balance text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] outline-none md:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-[#5C6B7A]">{intro}</p>
          </div>

          {/* Right: the answer, then the honest part */}
          <div>
            <ul className="divide-y divide-[#DCE3EA] border-y border-[#DCE3EA]">
              {points.map((point) => (
                <li key={point.title} className="flex gap-4 py-6">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#D8EA3F]"
                  >
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="#0B2545" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold">{point.title}</h3>
                    <p className="mt-1 max-w-[52ch] text-base leading-relaxed text-[#5C6B7A]">
                      {point.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Set apart so the catch is impossible to miss, and obviously not hidden */}
            <div className="mt-6 rounded-2xl border border-[#0B2545]/15 bg-[#D8EA3F]/30 p-6">
              <h3 className="text-lg font-bold">{catchPoint.title}</h3>
              <p className="mt-1 max-w-[56ch] text-base leading-relaxed">{catchPoint.body}</p>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-[#DCE3EA] pt-6 text-base leading-relaxed text-[#5C6B7A] md:mt-14">
          {footer}
        </p>
      </div>
    </section>
  )
}