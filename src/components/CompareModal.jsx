import React from 'react';

export default function CompareModal({
  isCompareOpen,
  setIsCompareOpen,
  compareList,
  setCompareList,
  handleAddToCart,
  formatPrice
}) {
  if (!isCompareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={() => setIsCompareOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-serif text-lg font-bold text-brandPink flex items-center gap-2">
            <i className="fa-solid fa-code-compare"></i>
            <span>Kids Outfit Comparison Matrix</span>
          </h3>
          <button onClick={() => setCompareList([])} className="bg-gray-800 text-gray-300 font-bold text-xs px-3 py-1.5 rounded">
            Clear Matrix
          </button>
        </div>

        {compareList.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-10">No products added for comparison.</p>
        ) : (
          <div className="grid grid-cols-5 gap-3 text-xs border-t pt-4 border-gray-200 dark:border-gray-700">
            <div className="font-extrabold text-gray-400 uppercase space-y-8 pt-10">
              <div>Outfit</div>
              <div>Brand</div>
              <div>Price</div>
              <div>Fabric</div>
              <div>Rating</div>
              <div>Action</div>
            </div>
            {compareList.map((p) => (
              <div key={p.id} className="space-y-4 text-center border-l border-gray-200 dark:border-gray-800 pl-2">
                <img src={p.img} alt={p.brand} className="w-16 h-20 object-cover rounded mx-auto" />
                <div className="font-bold truncate">{p.brand}</div>
                <div className="font-extrabold text-brandPink">{formatPrice(p.price)}</div>
                <div className="text-[11px] text-gray-500">{p.fabric || 'Cotton'}</div>
                <div className="font-bold text-emerald-600">{p.rating}★</div>
                <button
                  onClick={() => {
                    handleAddToCart(p);
                    setIsCompareOpen(false);
                  }}
                  className="bg-brandPink text-white font-bold text-[10px] px-2 py-1 rounded w-full uppercase"
                >
                  Add To Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
