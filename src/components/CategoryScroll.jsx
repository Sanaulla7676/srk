import React from 'react';
import { TRANSLATIONS } from '../data/mockData';

export default function CategoryScroll({
  categories,
  selectedCategory,
  setSelectedCategory,
  lang
}) {
  return (
    <div className="px-4 lg:px-10 py-6">
      <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-4">
        {TRANSLATIONS[lang]?.categoryHeader || TRANSLATIONS.EN.categoryHeader}
      </h2>
      <div className="flex gap-5 overflow-x-auto custom-scrollbar pb-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className="min-w-[100px] text-center cursor-pointer group"
          >
            <div
              className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-all shadow-sm mx-auto mb-2 ${
                selectedCategory === cat.name ? 'border-brandPink scale-105' : 'border-transparent group-hover:border-brandPink'
              }`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
