import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({
  filteredProducts,
  openQuickView,
  toggleWishlist,
  wishlist,
  toggleCompare,
  compareList,
  handleAddToCart,
  formatPrice
}) {
  if (filteredProducts.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-16 text-center text-gray-400">
        <i className="fa-solid fa-box-open text-4xl mb-3"></i>
        <p className="text-sm font-bold">No outfits found matching your filters.</p>
        <p className="text-xs mt-1">Try resetting filters or searching for another keyword.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            openQuickView={openQuickView}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            toggleCompare={toggleCompare}
            compareList={compareList}
            handleAddToCart={handleAddToCart}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </div>
  );
}
