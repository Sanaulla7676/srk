import React from 'react';

export default function StoreControlBar({ itemCount, sortBy, setSortBy }) {
  return (
    <div className="px-4 lg:px-10 py-3 border-y border-gray-200 dark:border-darkBorder flex justify-between items-center text-xs">
      <span className="text-gray-500">
        Showing <strong className="text-gray-900 dark:text-white">{itemCount}</strong> items
      </span>
      <div className="flex items-center gap-2">
        <label className="font-bold text-gray-600 dark:text-gray-400">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-white dark:bg-darkCard border border-gray-300 dark:border-gray-700 font-bold px-3 py-1.5 rounded outline-none cursor-pointer"
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
