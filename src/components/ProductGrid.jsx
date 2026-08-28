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
      <div className="flex-grow flex flex-col items-center justify-center py-16 text-center text-rkInkSoft font-rkSans">
        <i className="fa-solid fa-box-open text-4xl mb-3"></i>
        <p className="text-sm font-medium">No outfits found matching your filters.</p>
        <p className="text-xs mt-1">Try resetting filters or searching for another keyword.</p>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
        {filteredProducts.map((p, i) => (
          <ProductCard
            key={p.id}
            index={i}
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
