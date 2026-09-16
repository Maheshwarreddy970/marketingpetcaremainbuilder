'use client'

import React, { useState } from 'react'
import { FAQ_CONTENT } from './data'

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ_CONTENT.items[0]?.id || null)

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="w-full flex justify-center">
      <div className="md:w-[80%] w-full flex flex-col items-center justify-center px-4">
        {/* Top Hero Icon */}
        <div className="w-full flex items-center justify-center">
          <div>
            <div
              style={{
                background:
                  'linear-gradient(147.09deg, #fbfbfb 9.63%, #e8e8e8 91.74%)',
              }}
              className="size-12 md:size-16 lg:size-24 flex items-center justify-center rounded-xl lg:rounded-3xl border border-[#f3f3f3] shadow-[0px_5px_11px_0px_rgba(0,0,0,0.1),0px_20px_20px_0px_rgba(0,0,0,0.09),0px_44px_27px_0px_rgba(0,0,0,0.05),0px_79px_32px_0px_rgba(0,0,0,0.01),0px_123px_35px_0px_rgba(0,0,0,0)] rotate-[-15deg]"
            >
              <img 
                src={FAQ_CONTENT.logoSrc} 
                alt={FAQ_CONTENT.logoAlt} 
                width={100} 
                height={100} 
                className="size-16" 
              />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="font-bold text-xl mb-4 md:mb-0 md:text-7xl mt-16 md:leading-[78px] text-center">
          {FAQ_CONTENT.heading}
        </div>

        {/* Accordion List */}
        <div className="md:w-[80%] w-[90%] md:mt-20 mt-8">
          <div className="w-full divide-y divide-gray-200 dark:divide-gray-800">
            {FAQ_CONTENT.items.map((item) => {
              const isOpen = openId === item.id
              return (
                <div key={item.id} className="border-b border-gray-200 dark:border-gray-800">
                  <h3 className="flex">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleAccordion(item.id)}
                      className="flex flex-1 items-center transition-all md:text-2xl text-xl font-semibold py-5 text-left"
                    >
                      <span
                        className={`mr-4 shrink-0 transition-transform duration-200 text-[#3C82F6] ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                      >
                        {FAQ_CONTENT.expandIcon}
                      </span>
                      {item.question}
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 pb-4'
                        : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden ml-9 md:text-lg text-base text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}