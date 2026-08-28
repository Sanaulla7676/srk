import React from 'react';
import { TRANSLATIONS } from '../data/mockData';

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  uniqueBrands,
  selectedBrands,
  setSelectedBrands,
  maxPrice,
  setMaxPrice,
  minRatingFour,
  setMinRatingFour,
  formatPrice,
  lang
}) {
  return (
    <aside className="w-56 flex-shrink-0 hidden md:block font-rkSans text-rkInk">
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-rkLine">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-rkInkSoft">
          {TRANSLATIONS[lang]?.filterTitle || TRANSLATIONS.EN.filterTitle}
        </h3>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSelectedBrands([]);
            setMaxPrice(10000);
            setMinRatingFour(false);
          }}
          className="text-[10px] font-medium text-rkGold hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="mb-7">
        <h4 className="text-[11px] font-medium uppercase tracking-widest mb-3 text-rkInkSoft">Categories</h4>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'All'}
              onChange={() => setSelectedCategory('All')}
              className="accent-rkInk"
            />
            <span>All Collections</span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === c.name}
                onChange={() => setSelectedCategory(c.name)}
                className="accent-rkInk"
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <h4 className="text-[11px] font-medium uppercase tracking-widest mb-3 text-rkInkSoft">Brands</h4>
        <div className="max-h-40 overflow-y-auto space-y-2 text-xs custom-scrollbar">
          {uniqueBrands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={(e) => {
                  if (e.target.checked) setSelectedBrands([...selectedBrands, b]);
                  else setSelectedBrands(selectedBrands.filter((brand) => brand !== b));
                }}
                className="accent-rkInk"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-7">
        <h4 className="text-[11px] font-medium uppercase tracking-widest mb-3 text-rkInkSoft">
          Max Price ({formatPrice(maxPrice)})
        </h4>
        <input
          type="range"
          min="500"
          max="10000"
          step="250"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-rkInk cursor-pointer"
        />
      </div>

      <div>
        <h4 className="text-[11px] font-medium uppercase tracking-widest mb-3 text-rkInkSoft">Rating</h4>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={minRatingFour}
            onChange={(e) => setMinRatingFour(e.target.checked)}
            className="accent-rkInk"
          />
          <span>4.0★ &amp; Above</span>
        </label>
      </div>
    </aside>
  );
}
