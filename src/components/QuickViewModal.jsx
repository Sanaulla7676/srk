import React from 'react';

export default function QuickViewModal({
  quickViewProduct,
  setQuickViewProduct,
  monogramText,
  setMonogramText,
  monogramColor,
  setMonogramColor,
  pincodeCheck,
  setPincodeCheck,
  handleCheckPincode,
  pincodeResult,
  quickViewSize,
  setQuickViewSize,
  setIsSizeGuideOpen,
  handleAddToCart,
  formatPrice
}) {
  if (!quickViewProduct) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <img src={quickViewProduct.img} alt={quickViewProduct.title} className="w-full h-full object-cover" />
            {monogramText && (
              <div
                className="absolute bottom-6 right-6 font-serif font-black text-base px-2 py-1 bg-white/80 rounded shadow"
                style={{ color: monogramColor }}
              >
                {monogramText}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{quickViewProduct.brand}</h2>
            <p className="text-xs text-gray-500 mb-3">{quickViewProduct.title}</p>
            <div className="text-xl font-extrabold mb-2">
              {formatPrice(quickViewProduct.price)}{' '}
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(quickViewProduct.originalPrice)}
              </span>
            </div>

            {/* MONOGRAM CUSTOMIZER */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded my-3 border border-gray-200 dark:border-gray-700">
              <label className="text-[11px] font-bold uppercase block mb-1">Custom Name Monogram (+₹149)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength="8"
                  placeholder="e.g. Ananya"
                  value={monogramText}
                  onChange={(e) => setMonogramText(e.target.value)}
                  className="text-xs p-1.5 border rounded flex-grow bg-transparent"
                />
                <input
                  type="color"
                  value={monogramColor}
                  onChange={(e) => setMonogramColor(e.target.value)}
                  className="w-8 h-8 cursor-pointer border rounded"
                />
              </div>
            </div>

            {/* PINCODE DELIVERY CHECKER */}
            <div className="mb-4">
              <label className="text-[11px] font-bold uppercase block mb-1">Delivery Availability</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-Digit Pincode"
                  value={pincodeCheck}
                  onChange={(e) => setPincodeCheck(e.target.value)}
                  className="text-xs p-1.5 border rounded flex-grow bg-transparent"
                />
                <button
                  onClick={handleCheckPincode}
                  className="bg-gray-800 text-white font-bold text-xs px-3 py-1.5 rounded"
                >
                  Check
                </button>
              </div>
              {pincodeResult && (
                <div
                  className={`text-[11px] font-bold mt-1 ${
                    pincodeResult.success ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {pincodeResult.success
                    ? `Express Delivery by ${pincodeResult.dateStr} | COD Available`
                    : pincodeResult.msg}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase">Select Size:</span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs font-bold text-brandPink underline"
              >
                KIDS SIZE CHART
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setQuickViewSize(sz)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-bold ${
                    quickViewSize === sz
                      ? 'border-brandPink text-brandPink bg-pink-50 dark:bg-pink-950/40'
                      : 'border-gray-300'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                handleAddToCart(quickViewProduct, quickViewSize, monogramText);
                setQuickViewProduct(null);
              }}
              className="w-full bg-brandPink hover:bg-brandPinkHover text-white font-bold py-2.5 rounded uppercase text-xs"
            >
              Add To Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
