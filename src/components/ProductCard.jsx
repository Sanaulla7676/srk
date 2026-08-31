import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

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
      transition={{ duration: 0.6, delay: (index % 5) * 0.08, ease: EASE }}
      whileHover={{ y: -3, transition: { duration: 0.35, ease: EASE } }}
      onClick={() => openQuickView(product)}
      className="font-rkSans text-rkInk flex flex-col group cursor-pointer relative"
    >
      <div className="relative aspect-[3/4] bg-rkCreamDeep overflow-hidden rounded-sm shadow-sm group-hover:shadow-xl transition-shadow duration-500 ease-out">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-700"
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        />
        <div className="absolute inset-0 bg-rkInk/0 group-hover:bg-rkInk/5 transition-colors duration-500"></div>

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

        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-xs shadow-sm hover:scale-[1.08] transition-transform duration-300 ${
              wishlist.has(product.id) ? 'text-rkGold' : 'text-rkInk'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <i className={`fa-${wishlist.has(product.id) ? 'solid' : 'regular'} fa-heart`}></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            title="Compare Product"
            className={`w-8 h-8 rounded-full bg-white/95 flex items-center justify-center text-xs shadow-sm hover:scale-[1.08] transition-transform duration-300 ${
              isCompared ? 'bg-rkInk text-rkCream' : 'text-rkInk'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <i className="fa-solid fa-code-compare"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            title="Add to Bag"
            className="w-8 h-8 rounded-full bg-rkInk text-rkCream flex items-center justify-center text-xs shadow-sm hover:scale-[1.08] transition-transform duration-300"
            style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        {/* Quick View: fades and lifts in on hover, premium-catalogue style */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openQuickView(product);
          }}
          className="absolute left-2 right-2 bottom-2 bg-white/95 text-rkInk text-[10px] font-semibold tracking-[0.15em] uppercase py-2 rounded-full text-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400"
          style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
        >
          Quick View
        </button>
      </div>

      <div className="pt-3 flex flex-col flex-grow">
        <p className="text-[10px] uppercase tracking-wide text-rkInkSoft truncate">{product.brand}</p>
        <h4 className="font-serif text-sm font-semibold text-rkInk truncate mb-1.5">{product.title}</h4>

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
