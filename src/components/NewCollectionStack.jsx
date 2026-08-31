import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const GAP = 220;

function StackCard({ card, index, progress, onSelect }) {
  const x = useTransform(progress, (v) => (index - v) * GAP);
  const scale = useTransform(progress, (v) => {
    const d = Math.abs(index - v);
    return Math.max(0.82, 1 - d * 0.09);
  });
  const rotate = useTransform(progress, (v) => Math.max(-8, Math.min(8, (index - v) * 5)));
  const opacity = useTransform(progress, (v) => Math.max(0.35, 1 - Math.abs(index - v) * 0.22));
  const zIndex = useTransform(progress, (v) => Math.round(100 - Math.abs(index - v) * 10));

  return (
    <motion.button
      onClick={() => onSelect(card)}
      style={{ x, scale, rotate, opacity, zIndex }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[56dvh] sm:h-[68dvh] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white text-left"
    >
      <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <p className="text-[10px] uppercase tracking-widest text-rkTan font-semibold">{card.tag}</p>
        <p className="font-serif text-xl sm:text-2xl font-semibold leading-tight">{card.name}</p>
      </div>
    </motion.button>
  );
}

export default function NewCollectionStack({ products, setSelectedCategory, setView, openQuickView }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Newest admin-added products first (products get id: Date.now() when
  // added, so a plain numeric sort surfaces the most recent additions).
  const cards = useMemo(() => {
    return [...products]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5)
      .map((p) => ({ id: p.id, name: p.title, tag: p.brand, img: p.img, product: p }));
  }, [products]);

  const virtualIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, cards.length - 1)]);

  const handleSelect = (card) => {
    if (card.product) openQuickView(card.product);
  };

  const nudge = (dir) => {
    window.scrollBy({ top: dir * window.innerHeight * 0.55, behavior: 'smooth' });
  };

  if (cards.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative bg-rkCreamSoft" style={{ height: `${cards.length * 100}dvh` }}>
      <div className="sticky top-0 h-dvh w-full overflow-hidden font-rkSans text-rkInk">
        {/* Heading overlay, compact so the stage stays full-screen */}
        <div className="absolute top-8 sm:top-12 left-6 sm:left-14 z-[200] max-w-xs">
          <Reveal as="p" className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rkGold mb-2">Handpicked For You</Reveal>
          <Reveal as="h2" delay={0.08} className="font-rkSans font-extrabold uppercase text-3xl sm:text-4xl leading-[0.95] text-rkInk">
            New Collection
          </Reveal>
          <Reveal as="p" delay={0.16} className="font-rkScript text-2xl sm:text-3xl text-rkGold mt-2">Elegance in every thread.</Reveal>
          <Reveal delay={0.24}>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setView('storefront');
                document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 bg-rkTan hover:bg-rkTanHover text-rkNight text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-[1.03] mt-5"
            >
              <span>Shop Now</span>
              <span className="w-7 h-7 rounded-full bg-rkNight text-rkTan flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </span>
            </button>
          </Reveal>
        </div>

        {/* Full-screen card stage */}
        <div className="relative w-full h-full flex items-center justify-center">
          <button
            onClick={() => nudge(-1)}
            aria-label="Previous"
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 z-[200] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-rkLine flex items-center justify-center shadow-md hover:bg-rkCream"
          >
            <i className="fa-solid fa-chevron-left text-sm"></i>
          </button>

          {cards.map((card, i) => (
            <StackCard key={card.id} card={card} index={i} progress={virtualIndex} onSelect={handleSelect} />
          ))}

          <button
            onClick={() => nudge(1)}
            aria-label="Next"
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-[200] w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-rkLine flex items-center justify-center shadow-md hover:bg-rkCream"
          >
            <i className="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>

        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-rkInkSoft/60 flex items-center gap-2 z-[200]">
          <i className="fa-solid fa-arrow-down animate-bounce"></i> Scroll to browse
        </span>
      </div>
    </section>
  );
}
