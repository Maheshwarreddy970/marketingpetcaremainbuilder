import React from 'react';
import { INTEGRATE_CONTENT } from './data';


export default function Integrate() {
  return (
    <div className="relative py-8">
      <div className="mx-auto p-4">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-6">
          
          {/* Text Section */}
          <div className="space-y-4 max-lg:text-center">
            <p className="text-foreground w-fit max-w-sm text-balance text-xl max-lg:mx-auto">
              {INTEGRATE_CONTENT.heading}
            </p>
          </div>

          {/* Logos Section */}
          <div className="grid grid-cols-2 items-center gap-y-3 sm:grid-cols-4">
            {INTEGRATE_CONTENT.logos.map((logo, index) => (
              <div 
                key={index} 
                className="flex h-10 w-full items-center justify-center px-4"
              >
                <img
                  src={logo.src}
                  alt={`${logo.alt} logo`}
                  className="max-h-5 sm:max-h-7 w-auto object-contain transition-all"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}