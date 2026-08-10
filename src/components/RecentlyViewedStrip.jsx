import React from 'react';

export default function RecentlyViewedStrip({
  recentlyViewed,
  products,
  openQuickView,
  formatPrice
}) {
  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="px-4 lg:px-10 py-6 border-t border-gray-200 dark:border-darkBorder bg-gray-100/50 dark:bg-gray-900/30">
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-500 mb-3">
        <i className="fa-solid fa-clock-rotate-left mr-1"></i> Recently Viewed Items
      </h3>
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
        {recentlyViewed.map((rvId) => {
          const item = products.find((p) => p.id === rvId);
          if (!item) return null;
          return (
            <div
              key={item.id}
              onClick={() => openQuickView(item)}
              className="min-w-[120px] max-w-[120px] bg-white dark:bg-darkCard p-2 border border-gray-200 dark:border-darkBorder rounded cursor-pointer group"
            >
              <img src={item.img} alt={item.brand} className="w-full h-24 object-cover rounded mb-1 group-hover:scale-105 transition-transform" />
              <p className="font-bold text-[10px] truncate">{item.brand}</p>
              <p className="text-[10px] text-brandPink font-black">{formatPrice(item.price)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
