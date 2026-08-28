import React, { useEffect, useState } from 'react';
import Reveal from './Reveal';

const START = { days: 2, hours: 14, minutes: 37, seconds: 59 };

export default function PromoCountdown({ setSelectedCategory, setView }) {
  const [t, setT] = useState(START);

  useEffect(() => {
    const timer = setInterval(() => {
      setT((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return START;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: 'Days', value: t.days },
    { label: 'Hours', value: t.hours },
    { label: 'Mins', value: t.minutes },
    { label: 'Secs', value: t.seconds }
  ];

  const goShop = () => {
    setSelectedCategory('All');
    setView('storefront');
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-r from-rkMaroon to-rkMaroonSoft font-rkSans text-white py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-8">
        <Reveal className="text-center lg:text-left">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rkTan mb-1">Limited Time Offer</p>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold">Get 10% Off</h3>
          <p className="text-xs text-white/60 mt-1">On your first order</p>
          <span className="inline-block mt-3 border border-dashed border-rkTan/60 text-rkTan text-[11px] font-semibold px-3 py-1 rounded-full">
            Use Code: WELCOME10
          </span>
        </Reveal>

        <Reveal delay={0.1} className="flex items-center gap-4 sm:gap-6">
          {units.map((u, i) => (
            <React.Fragment key={u.label}>
              {i > 0 && <span className="w-px h-10 bg-white/15"></span>}
              <div className="text-center">
                <p className="font-serif text-3xl sm:text-4xl font-bold tabular-nums">{String(u.value).padStart(2, '0')}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{u.label}</p>
              </div>
            </React.Fragment>
          ))}
        </Reveal>

        <Reveal delay={0.2}>
          <button
            onClick={goShop}
            className="inline-flex items-center gap-2.5 bg-rkCream hover:bg-white text-rkNight text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-[1.03] shrink-0"
          >
            <span>Shop Now</span>
            <span className="w-7 h-7 rounded-full bg-rkNight text-rkCream flex items-center justify-center">
              <i className="fa-solid fa-arrow-right text-[10px]"></i>
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
