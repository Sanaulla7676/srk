import React from 'react';

export default function HeroBanner({
  slides,
  currentSlideIdx,
  setCurrentSlideIdx,
  setSelectedCategory
}) {
  const currentSlide = slides[currentSlideIdx] || slides[0];

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-110px)] min-h-[550px] max-h-[900px] bg-black overflow-hidden group">
      {/* Background Media */}
      {currentSlide?.type === 'video' ? (
        <video src={currentSlide?.url} autoPlay loop muted className="w-full h-full object-cover scale-105 animate-fade-in" />
      ) : (
        <img
          src={currentSlide?.url}
          alt="Hero slide background"
          className="w-full h-full object-cover opacity-85 transition-all duration-1000 scale-105 group-hover:scale-100"
        />
      )}

      {/* Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/50 flex flex-col justify-between p-6 md:p-12 lg:p-16">
        
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 z-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Flagship Store • Bengaluru</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-gray-200">
            <span className="bg-brandGold/20 border border-brandGold/40 text-brandGold px-3 py-1 rounded-full font-bold">
              <i className="fa-solid fa-store mr-1.5"></i> Kurubarahalli Main Rd
            </span>
          </div>
        </div>

        {/* Hero Content Center / Main Text */}
        <div className="max-w-2xl text-white my-auto z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brandPink text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
            <i className="fa-solid fa-crown text-amber-300"></i>
            <span>Shri R.K. Fashions Exclusive</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white drop-shadow-md">
            Luxury Fashion For Your Little Ones
          </h1>

          <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xl font-light">
            Discover Bengaluru's premier collection of Girls Party Dresses, Silk Lehengas, and Boys Designer Apparel. Crafted with organic comfort & elegance.
          </p>

          {/* Store Physical Address Callout */}
          <div className="bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-lg text-xs text-gray-300 flex items-start gap-2.5 max-w-md">
            <i className="fa-solid fa-map-pin text-brandPink text-base mt-0.5"></i>
            <div>
              <strong className="text-white font-bold block">Shri R.K. Fashions Flagship Store</strong>
              <span>129, VHBCS layout WOC road, Kurubarahalli Main Rd, Mahalakshmipuram, Bengaluru - 560086</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setSelectedCategory('Girls Dresses')}
              className="bg-gradient-to-r from-brandGold to-yellow-500 hover:from-yellow-400 hover:to-brandGold text-gray-950 font-black text-xs px-7 py-3.5 rounded-full transition-all duration-300 shadow-xl uppercase tracking-widest flex items-center gap-2 hover:scale-105"
            >
              <span>Explore Collection</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>

            <a
              href="https://maps.google.com/?q=Shri+R.K.+Fashions+129+VHBCS+layout+WOC+road+Kurubarahalli+Main+Rd+Mahalakshmipuram+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-5 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md border border-white/30 flex items-center gap-2"
            >
              <i className="fa-solid fa-location-dot text-brandPink"></i>
              <span>Get Store Directions</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Slider Controls & Scroll Down Indicator */}
        <div className="flex justify-between items-end z-10 pt-4">
          {/* Slide Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  currentSlideIdx === idx ? 'w-8 bg-brandPink shadow-lg' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              ></button>
            ))}
          </div>

          {/* Scroll Down Button */}
          <button
            onClick={handleScrollDown}
            className="hidden md:flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <span className="uppercase tracking-widest text-[10px] font-bold">Scroll Down</span>
            <i className="fa-solid fa-chevron-down animate-bounce text-sm"></i>
          </button>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlideIdx((prev) => (prev - 1 + slides.length) % slides.length)}
              className="w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center text-sm shadow hover:bg-white hover:text-black transition-all"
              aria-label="Previous slide"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentSlideIdx((prev) => (prev + 1) % slides.length)}
              className="w-10 h-10 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center text-sm shadow hover:bg-white hover:text-black transition-all"
              aria-label="Next slide"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
