import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import RevealImage from './RevealImage';

const EASE = [0.22, 1, 0.36, 1];

export default function HeroBanner({
  slides,
  currentSlideIdx,
  setCurrentSlideIdx,
  setSelectedCategory
}) {
  const currentSlide = slides[currentSlideIdx] || slides[0];
  const total = slides.length;
  const prefersReducedMotion = useReducedMotion();

  const handleWatchFilm = () => {
    if (currentSlide?.type !== 'video') {
      setCurrentSlideIdx((prev) => {
        const vidIdx = slides.findIndex((s) => s.type === 'video');
        return vidIdx > -1 ? vidIdx : prev;
      });
    }
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-rkNight font-rkSans text-white overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-stretch">
      {/* Background media, full-bleed, faded into the dark panel on the left */}
      {currentSlide?.type === 'video' ? (
        <motion.div
          key={currentSlideIdx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <video src={currentSlide?.url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover object-[80%_20%]" />
        </motion.div>
      ) : (
        <RevealImage
          key={currentSlideIdx}
          src={currentSlide?.url}
          alt="Fashion hero"
          className="absolute inset-0"
          imgClassName="object-[80%_20%]"
          duration={1}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-rkNight via-rkNight/85 sm:via-rkNight/70 to-rkNight/10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-rkNight via-transparent to-transparent"></div>

      {/* Giant watermark monogram, drifting almost imperceptibly */}
      <motion.span
        className="pointer-events-none select-none absolute -right-6 top-1/2 font-serif font-black text-[26rem] leading-none text-white/5 hidden lg:block"
        initial={{ y: '-50%' }}
        animate={prefersReducedMotion ? { y: '-50%' } : { y: ['-52%', '-48%', '-52%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        RK
      </motion.span>

      <div className="relative z-10 w-full flex flex-col justify-between px-6 lg:px-14 py-10 lg:py-14">
        <div className="max-w-xl mt-6 lg:mt-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-rkTan mb-4"
          >
            New Collection 2026
          </motion.p>

          <h1 className="font-rkSans font-extrabold uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="block text-white"
            >
              Fashion
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="block font-rkScript font-normal normal-case text-6xl sm:text-7xl lg:text-8xl text-rkTan -my-1 sm:-my-2"
            >
              &ndash;Moves
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
              className="block text-white"
            >
              You.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
            className="text-sm sm:text-base text-white/60 leading-relaxed mt-6 max-w-sm"
          >
            Timeless designs. Modern elegance.
            <br />
            Made for every you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7, ease: EASE }}
            className="flex flex-wrap items-center gap-4 mt-8"
          >
            <button
              onClick={() => {
                setSelectedCategory('Girls Ethnic Wear');
                document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 bg-rkTan hover:bg-rkTanHover text-rkNight text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-all duration-300 ease-out hover:scale-[1.03]"
            >
              <span>Explore Collection</span>
              <span className="w-7 h-7 rounded-full bg-rkNight text-rkTan flex items-center justify-center">
                <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </span>
            </button>

            <button
              onClick={handleWatchFilm}
              className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white text-white text-[11px] font-bold tracking-[0.15em] uppercase pl-6 pr-2 py-2 rounded-full transition-all duration-300 ease-out hover:scale-[1.03]"
            >
              <span>Watch Film</span>
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <i className="fa-solid fa-play text-[9px]"></i>
              </span>
            </button>
          </motion.div>
        </div>

        {/* Slide progress + manual nav */}
        <div className="flex items-center gap-4 text-xs text-white/50 mt-10">
          <span className="text-white font-semibold">{String(currentSlideIdx + 1).padStart(2, '0')}</span>
          <div className="flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-[2px] rounded-full transition-all duration-500 ${
                  currentSlideIdx === idx ? 'w-8 bg-rkTan' : 'w-4 bg-white/25 hover:bg-white/50'
                }`}
              ></button>
            ))}
          </div>
          <span>{String(total).padStart(2, '0')}</span>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setCurrentSlideIdx((prev) => (prev - 1 + total) % total)}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-chevron-left text-[10px]"></i>
            </button>
            <button
              onClick={() => setCurrentSlideIdx((prev) => (prev + 1) % total)}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-white/20 hover:border-white/60 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
