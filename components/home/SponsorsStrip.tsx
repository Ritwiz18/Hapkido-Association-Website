'use client';

import { useEffect, useRef } from 'react';

const sponsors = [
  { name: 'Indian Hapkido Federation', logo: '🥋' },
  { name: 'Uttarakhand Sports Council', logo: '⚽' },
  { name: 'World Hapkido Federation', logo: '🌏' },
  { name: 'Sports Authority of India', logo: '🏆' },
  { name: 'Uttarakhand Olympic Association', logo: '🏅' },
  { name: 'Ministry of Youth Affairs', logo: '🎯' },
];

export default function SponsorsStrip() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-custom mb-6 text-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
          Affiliated &amp; Recognized By
        </p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-scroll-left gap-8 w-max">
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-100 bg-gray-50 hover:shadow-sm transition-shadow shrink-0 min-w-[220px]"
            >
              <span className="text-2xl">{sponsor.logo}</span>
              <span className="text-sm font-medium text-gray-600 whitespace-nowrap">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
