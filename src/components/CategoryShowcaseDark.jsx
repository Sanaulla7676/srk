import React from 'react';
import { motion } from 'framer-motion';

const SHOWCASE = [
  { label: 'Women', category: 'Girls Ethnic Wear', img: 'https://images.unsplash.com/photo-1672985354241-2112df154346?auto=format&fit=crop&w=300&q=80' },
  { label: 'Men', category: 'Boys Shirts', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
  { label: 'Kids', category: 'Girls Dresses', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=300&q=80' },
  { label: 'New Arrivals', category: 'All', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80' }
];

export default function CategoryShowcaseDark({ setSelectedCategory, setView }) {
  const go = (category) => {
    setSelectedCategory(category);
    setView('storefront');
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-rkNight font-rkSans text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-64 shrink-0 text-center lg:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rkTan mb-3">Shop By</p>
          <h2 className="font-rkSans font-extrabold uppercase text-4xl leading-none">Category</h2>
          <button
            onClick={() => go('All')}
            className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white text-white text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-colors mt-6"
          >
            <span>View All Categories</span>
            <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {SHOWCASE.map((s, i) => (
            <motion.button
              key={s.label}
              onClick={() => go(s.category)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 group"
            >
              <span className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] border border-rkTan/50 group-hover:border-rkTan transition-colors">
                <img src={s.img} alt={s.label} className="w-full h-full object-cover rounded-full" />
              </span>
              <span className="text-xs font-bold tracking-wide">{s.label}</span>
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
