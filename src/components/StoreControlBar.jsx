import React from 'react';

export default function StoreControlBar({ itemCount, sortBy, setSortBy }) {
  return (
    <div className="flex justify-between items-center text-[11px] font-rkSans text-rkInkSoft border-t border-rkLine pt-3">
      <span>
        Showing <strong className="text-rkInk">{itemCount}</strong> pieces
      </span>
      <div className="flex items-center gap-2">
        <label className="uppercase tracking-widest">Sort</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-transparent border-b border-rkLine focus:border-rkInk px-1 py-1 outline-none cursor-pointer text-rkInk"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="discount">Better Discount</option>
        </select>
      </div>
    </div>
  );
}
