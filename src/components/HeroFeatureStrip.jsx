import React from 'react';
import Reveal from './Reveal';

const FEATURES = [
  { icon: 'fa-truck-fast', title: 'Free Shipping', sub: 'On orders above ₹999' },
  { icon: 'fa-gem', title: 'Premium Quality', sub: 'Finest fabrics & craftsmanship' },
  { icon: 'fa-box-open', title: 'Easy Returns', sub: 'Hassle-free returns' },
  { icon: 'fa-headset', title: 'Support 24/7', sub: "We're here to help" }
];

export default function HeroFeatureStrip() {
  return (
    <div className="bg-rkNightSoft border-t border-white/5 font-rkSans text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08} y={16} className="flex items-center gap-3 px-5 py-6">
            <span className="w-11 h-11 shrink-0 rounded-full border border-rkTan/40 flex items-center justify-center text-rkTan">
              <i className={`fa-solid ${f.icon} text-sm`}></i>
            </span>
            <div>
              <p className="text-xs font-bold tracking-wide">{f.title}</p>
              <p className="text-[11px] text-white/45">{f.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
