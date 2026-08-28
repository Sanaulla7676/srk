import React from 'react';

export default function CategoryScroll({
  categories,
  selectedCategory,
  setSelectedCategory
}) {
  const tabs = ['All', ...categories.map((c) => c.name)];

  return (
    <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 font-rkSans">
      {tabs.map((name) => (
        <button
          key={name}
          onClick={() => setSelectedCategory(name)}
          className={`shrink-0 px-4 py-2 rounded-full text-[11px] font-medium tracking-[0.12em] uppercase border transition-all duration-300 hover:scale-[1.03] ${
            selectedCategory === name
              ? 'bg-rkInk text-rkCream border-rkInk'
              : 'bg-transparent text-rkInkSoft border-rkLine hover:border-rkInk hover:text-rkInk'
          }`}
        >
          {name === 'All' ? 'All Collections' : name}
        </button>
      ))}
    </div>
  );
}
