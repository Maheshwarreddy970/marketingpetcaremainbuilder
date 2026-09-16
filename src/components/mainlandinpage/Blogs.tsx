import React from 'react'

export default function Blogs() {
  return (
    <section className="bg-background-50 py-20">
      <div className="mx-auto max-w-7xl px-4 xl:px-0">
        <div
          className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="max-w-2xl">
            <span className="bg-primary-500/5 text-primary-500 mb-3 inline-block rounded-lg px-3.5 py-1 text-base font-medium">
              Featured Work
            </span>
            <h2 className="text-title-50 mb-4 text-left text-3xl font-semibold sm:text-4xl">
              Proven Work That Performs
            </h2>
            <p className="text-text-100 pr-5 text-left text-base sm:pr-44">
              There are many variations of available but the majority have suffered
              alteration in some form.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-lg font-medium transition focus:ring-3 disabled:pointer-events-none [&>svg]:text-current! outline-none [&>svg]:size-6 disabled:bg-button-disabled-background disabled:text-button-disabled-text focus:ring-button-primary-focus-ring bg-button-primary-background hover:bg-button-primary-hover-background text-button-primary-text px-4 py-2.5 h-12"
            >
              <a className="flex" href="/portfolio" data-discover="true">
                Explore All Projects
              </a>
            </button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <article style={{ opacity: 1, transform: "none" }}>
            <div className="overflow-hidden rounded-xl">
              <a href="/portfolio/1" data-discover="true">
                <img
                  className="block h-full w-full rounded-xl transition-transform duration-500 ease-in-out hover:scale-105"
                  alt="Digital Transformation Strategy"
                  src="/images/Image.jpeg"
                />
              </a>
            </div>
            <div className="mt-6 px-2.5">
              <span className="text-primary-500 mb-2 inline-block text-sm font-medium">
                Arimo / Marketing
              </span>
              <h3 className="text-title-50 text-2xl font-medium">
                <a
                  className="transition-colors hover:text-primary-500"
                  href="/portfolio/1"
                  data-discover="true"
                >
                  Digital Transformation Strategy
                </a>
              </h3>
              <p className="text-text-100 mt-2 text-base">
                We partnered with Arimo to overhaul their digital presence,
                delivering a data-driven marketing strategy that boosted lead
                generation by 140%.
              </p>
            </div>
          </article>
          <article style={{ opacity: 1, transform: "none" }}>
            <div className="overflow-hidden rounded-xl">
              <a href="/portfolio/2" data-discover="true">
                <img
                  className="block h-full w-full rounded-xl transition-transform duration-500 ease-in-out hover:scale-105"
                  alt="B2B Platform UX Audit"
                  src="/images/Image-1.jpeg"
                />
              </a>
            </div>
            <div className="mt-6 px-2.5">
              <span className="text-primary-500 mb-2 inline-block text-sm font-medium">
                Kafahf / UX Audit
              </span>
              <h3 className="text-title-50 text-2xl font-medium">
                <a
                  className="transition-colors hover:text-primary-500"
                  href="/portfolio/2"
                  data-discover="true"
                >
                  B2B Platform UX Audit
                </a>
              </h3>
              <p className="text-text-100 mt-2 text-base">
                A comprehensive UX audit of Kafahf's enterprise platform,
                identifying friction points and delivering actionable improvements
                that reduced churn by 30%.
              </p>
            </div>
          </article>
          <article style={{ opacity: 1, transform: "none" }}>
            <div className="overflow-hidden rounded-xl">
              <a href="/portfolio/3" data-discover="true">
                <img
                  className="block h-full w-full rounded-xl transition-transform duration-500 ease-in-out hover:scale-105"
                  alt="Brand Identity Refresh"
                  src="/images/Image-2.jpeg"
                />
              </a>
            </div>
            <div className="mt-6 px-2.5">
              <span className="text-primary-500 mb-2 inline-block text-sm font-medium">
                Aztech / Branding
              </span>
              <h3 className="text-title-50 text-2xl font-medium">
                <a
                  className="transition-colors hover:text-primary-500"
                  href="/portfolio/3"
                  data-discover="true"
                >
                  Brand Identity Refresh
                </a>
              </h3>
              <p className="text-text-100 mt-2 text-base">
                A full rebrand for Aztech — from logo and color system to brand
                guidelines — resulting in a modern identity that resonates with
                their target audience.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

  )
}
