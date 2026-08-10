import React from 'react';

export default function ProductCard({
  product,
  openQuickView,
  toggleWishlist,
  wishlist,
  toggleCompare,
  compareList,
  handleAddToCart,
  formatPrice
}) {
  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isCompared = compareList.some((cp) => cp.id === product.id);

  return (
    <div
      onClick={() => openQuickView(product)}
      className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer relative"
    >
      <div className="relative aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {product.stock <= 2 ? `Only ${product.stock} left!` : 'In Stock'}
        </span>
        {discountPct > 0 && (
          <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase">
            {discountPct}% OFF
          </span>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-xs shadow-sm hover:scale-110 ${
              wishlist.has(product.id) ? 'text-brandPink' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <i className={`fa-${wishlist.has(product.id) ? 'solid' : 'regular'} fa-heart`}></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            title="Compare Product"
            className={`w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center text-xs shadow-sm hover:scale-110 ${
              isCompared ? 'bg-brandPink text-white' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <i className="fa-solid fa-code-compare"></i>
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h4 className="font-bold text-xs text-gray-900 dark:text-white truncate">{product.brand}</h4>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate mb-2">{product.title}</p>

        <div className="mt-auto flex items-center gap-1.5 text-xs">
          <span className="font-extrabold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
        </div>

        <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded mt-1.5 w-fit">
          <span>{product.rating}</span> <i className="fa-solid fa-star text-[8px]"></i>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="mt-3 w-full bg-brandPink hover:bg-brandPinkHover text-white text-xs font-bold py-1.5 rounded transition-colors uppercase"
        >
          Add To Bag
        </button>
      </div>
    </div>
  );
}
