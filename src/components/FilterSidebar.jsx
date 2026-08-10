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
    <aside className="w-56 flex-shrink-0 hidden md:block">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-darkBorder">
        <h3 className="text-xs font-extrabold uppercase tracking-wider">
          {TRANSLATIONS[lang]?.filterTitle || TRANSLATIONS.EN.filterTitle}
        </h3>
        <button
          onClick={() => {
            setSelectedCategory('All');
            setSelectedBrands([]);
            setMaxPrice(10000);
            setMinRatingFour(false);
          }}
          className="text-[11px] font-bold text-brandPink hover:underline"
        >
          CLEAR ALL
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase mb-2 text-gray-700 dark:text-gray-300">Categories</h4>
        <div className="space-y-1.5 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === 'All'}
              onChange={() => setSelectedCategory('All')}
              className="accent-brandPink"
            />
            <span>All Kids Wear</span>
          </label>
          {categories.map((c) => (
            <label key={c.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === c.name}
                onChange={() => setSelectedCategory(c.name)}
                className="accent-brandPink"
              />
              <span>{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase mb-2 text-gray-700 dark:text-gray-300">Brands</h4>
        <div className="max-h-40 overflow-y-auto space-y-1.5 text-xs custom-scrollbar">
          {uniqueBrands.map((b) => (
            <label key={b} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={(e) => {
                  if (e.target.checked) setSelectedBrands([...selectedBrands, b]);
                  else setSelectedBrands(selectedBrands.filter((brand) => brand !== b));
                }}
                className="accent-brandPink"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase mb-2 text-gray-700 dark:text-gray-300">
          Max Price ({formatPrice(maxPrice)})
        </h4>
        <input
          type="range"
          min="500"
          max="10000"
          step="250"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-brandPink cursor-pointer"
        />
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase mb-2 text-gray-700 dark:text-gray-300">Rating</h4>
        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input
            type="checkbox"
            checked={minRatingFour}
            onChange={(e) => setMinRatingFour(e.target.checked)}
            className="accent-brandPink"
          />
          <span>4.0★ & Above</span>
        </label>
      </div>
    </aside>
  );
}
