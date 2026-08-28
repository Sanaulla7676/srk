import React from 'react';
import { motion } from 'framer-motion';

export default function ProductCard({
  product,
  openQuickView,
  toggleWishlist,
  wishlist,
  toggleCompare,
  compareList,
  handleAddToCart,
  formatPrice,
  index = 0
}) {
  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isCompared = compareList.some((cp) => cp.id === product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06 }}
      onClick={() => openQuickView(product)}
      className="font-rkSans text-rkInk flex flex-col group cursor-pointer relative"
    >
      <div className="relative aspect-[3/4] bg-rkCreamDeep overflow-hidden rounded-sm">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {product.stock <= 2 && (
          <span className="absolute top-2 left-2 bg-rkInk/85 text-rkCream text-[9px] font-medium tracking-wide px-1.5 py-0.5 rounded">
            Only {product.stock} left
          </span>
        )}
        {discountPct > 0 && (
          <span className="absolute bottom-2 left-2 bg-rkCream/90 text-rkInk text-[9px] font-semibold tracking-wide px-1.5 py-0.5 rounded uppercase">
            {discountPct}% Off
          </span>
        )}

        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-transform ${
              wishlist.has(product.id) ? 'text-rkGold' : 'text-rkInk'
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
            className={`w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-transform ${
              isCompared ? 'bg-rkInk text-rkCream' : 'text-rkInk'
            }`}
          >
            <i className="fa-solid fa-code-compare"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            title="Add to Bag"
            className="w-8 h-8 rounded-full bg-rkInk text-rkCream flex items-center justify-center text-xs shadow-sm hover:scale-110 transition-transform"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="pt-3 flex flex-col flex-grow">
        <h4 className="font-serif text-sm font-semibold truncate">{product.brand}</h4>
        <p className="text-[11px] text-rkInkSoft truncate mb-1.5">{product.title}</p>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          <span className="text-[10px] text-rkInkSoft/70 line-through">{formatPrice(product.originalPrice)}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold text-rkInkSoft">
            {product.rating} <i className="fa-solid fa-star text-[8px] text-rkGold"></i>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
