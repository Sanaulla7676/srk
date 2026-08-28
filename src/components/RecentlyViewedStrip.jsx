import React from 'react';

export default function RecentlyViewedStrip({
  recentlyViewed,
  products,
  openQuickView,
  formatPrice
}) {
  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="px-4 lg:px-10 py-8 border-t border-rkLine bg-rkCreamSoft font-rkSans text-rkInk">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-rkInkSoft mb-4 max-w-7xl mx-auto">
        <i className="fa-solid fa-clock-rotate-left mr-1.5"></i> Recently Viewed
      </h3>
      <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2 max-w-7xl mx-auto">
        {recentlyViewed.map((rvId) => {
          const item = products.find((p) => p.id === rvId);
          if (!item) return null;
          return (
            <div
              key={item.id}
              onClick={() => openQuickView(item)}
              className="min-w-[120px] max-w-[120px] cursor-pointer group"
            >
              <img src={item.img} alt={item.brand} className="w-full h-28 object-cover rounded-sm mb-2 group-hover:scale-[1.03] transition-transform" />
              <p className="font-serif text-[11px] font-semibold truncate">{item.brand}</p>
              <p className="text-[10px] text-rkInkSoft font-medium">{formatPrice(item.price)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
