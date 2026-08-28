import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RevealImage from './RevealImage';
import Reveal from './Reveal';
import useParallax from '../hooks/useParallax';

export default function DuoShowcase({ categories, setSelectedCategory, setView }) {
  const [pairIdx, setPairIdx] = useState(0);
  const pairCount = Math.max(1, Math.ceil(categories.length / 2));
  const a = categories[(pairIdx * 2) % categories.length];
  const b = categories[(pairIdx * 2 + 1) % categories.length];
  const circles = useParallax(24);

  const handleShopMore = () => {
    setSelectedCategory(a?.name || 'All');
    setView('storefront');
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-rkCreamSoft font-rkSans text-rkInk py-16 lg:py-24 overflow-hidden">
      {/* Decorative hairline circles, drifting very subtly with scroll */}
      <motion.svg
        ref={circles.ref}
        style={{ y: circles.y }}
        className="pointer-events-none absolute -right-24 top-0 w-[480px] h-[480px] text-rkLine"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="220" cy="140" r="120" stroke="currentColor" strokeWidth="1" />
        <circle cx="320" cy="260" r="70" stroke="currentColor" strokeWidth="1" />
      </motion.svg>
      <span className="rk-sparkle absolute right-24 bottom-24 text-rkGold text-xl select-none">&#10022;</span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Overlapping duo images */}
        <div className="lg:col-span-6 relative flex items-center min-h-[380px]">
          <button
            onClick={() => setPairIdx((p) => (p - 1 + pairCount) % pairCount)}
            aria-label="Previous"
            className="absolute -left-3 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-rkLine flex items-center justify-center text-xs shadow-sm hover:bg-rkCream transition-transform duration-300 hover:scale-105"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <RevealImage
            key={`a-${pairIdx}`}
            src={a?.img}
            alt={a?.name}
            className="w-[62%] aspect-[3/4] rounded-lg shadow-md relative z-10"
          />

          <RevealImage
            key={`b-${pairIdx}`}
            src={b?.img}
            alt={b?.name}
            delay={0.15}
            className="w-[46%] aspect-[3/4] rounded-lg shadow-lg absolute left-[42%] bottom-0 z-20 border-4 border-rkCreamSoft"
          />

          <button
            onClick={() => setPairIdx((p) => (p + 1) % pairCount)}
            aria-label="Next"
            className="absolute right-4 sm:-right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-rkLine flex items-center justify-center text-xs shadow-sm hover:bg-rkCream transition-transform duration-300 hover:scale-105"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-10 space-y-4">
          <Reveal as="p" className="text-[11px] font-medium tracking-[0.3em] uppercase text-rkInkSoft">
            {a?.name} &amp; {b?.name}
          </Reveal>
          <Reveal as="h2" delay={0.1} className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
            Fashion That Moves You
          </Reveal>
          <Reveal delay={0.2}>
            <button
              onClick={handleShopMore}
              className="bg-rkInk hover:bg-black text-rkCream text-[11px] font-semibold tracking-[0.2em] uppercase px-7 py-3.5 transition-all duration-300 hover:scale-[1.03]"
            >
              Shop More
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
