"use client";

import React, { useState } from "react";
import AntiMetalButton from "./mainbutton";
import { NAVBAR_CONTENT } from "./data";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative flex w-full items-center justify-between py-4">
      {/* Logo & Brand */}
      <a
        className="flex shrink-0 items-center gap-3 cursor-pointer"
        href={NAVBAR_CONTENT.brand.href}
      >
        <img
          src={NAVBAR_CONTENT.logo.src}
          alt={NAVBAR_CONTENT.logo.alt}
          width={100}
          height={100}
          className="size-10"
        />
        <span className="font-mono text-xl font-semibold tracking-tight text-[#2462EA]">
          {NAVBAR_CONTENT.brand.prefix}
          <span className="text-[#76a2ff]">{NAVBAR_CONTENT.brand.suffix}</span>
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden flex-1 items-center justify-between pl-8 md:flex lg:pl-16">
        <nav className="flex items-center gap-6 lg:gap-9">
          {NAVBAR_CONTENT.navLinks.map((link, index) => (
            <a
              key={index}
              className={`text-base font-medium transition-colors hover:text-[#2462EA] ${
                link.active ? "text-[#2462EA]" : "text-gray-700"
              }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-end">
          <AntiMetalButton />
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-md p-2 text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2462EA]"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1={4} x2={20} y1={12} y2={12} />
              <line x1={4} x2={20} y1={6} y2={6} />
              <line x1={4} x2={20} y1={18} y2={18} />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl md:hidden">
          <nav className="flex w-full flex-col items-center gap-4">
            {NAVBAR_CONTENT.navLinks.map((link, index) => (
              <a
                key={index}
                className={`w-full py-2 text-center text-lg font-medium transition-colors hover:text-[#2462EA] ${
                  link.active ? "text-[#2462EA]" : "text-gray-700"
                }`}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex w-full justify-center pt-2">
            <AntiMetalButton />
          </div>
        </div>
      )}
    </header>
  );
}