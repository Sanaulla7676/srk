import React from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

const EASE = [0.22, 1, 0.36, 1];

export default function CategoryShowcaseDark({ categories, setSelectedCategory, setView }) {
  const go = (categoryName) => {
    setSelectedCategory(categoryName);
    setView('storefront');
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!categories || categories.length === 0) return null;

  return (
    <section className="bg-rkNight font-rkSans text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-64 shrink-0 text-center lg:text-left">
          <Reveal as="p" className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rkTan mb-3">Shop By</Reveal>
          <Reveal as="h2" delay={0.08} className="font-rkSans font-extrabold uppercase text-4xl leading-none">Category</Reveal>
          <Reveal delay={0.16}>
            <button
              onClick={() => go('All')}
              className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white text-white text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-[1.03] mt-6"
            >
              <span>View All Categories</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </span>
            </button>
          </Reveal>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {categories.slice(0, 8).map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => go(c.name)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="flex flex-col items-center gap-3 group"
            >
              <span className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] border border-rkTan/50 group-hover:border-rkTan transition-all duration-500 group-hover:scale-[1.04]">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover rounded-full" />
              </span>
              <span className="text-xs font-bold tracking-wide text-center">{c.name}</span>
              <span className="text-[10px] text-rkTan flex items-center gap-1">
                Explore Now <i className="fa-solid fa-arrow-right text-[9px]"></i>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
