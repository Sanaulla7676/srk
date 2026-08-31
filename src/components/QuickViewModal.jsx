import React, { useEffect, useState } from 'react';

const MONOGRAM_COLOR = '#221D18';

export default function QuickViewModal({
  quickViewProduct,
  setQuickViewProduct,
  monogramText,
  setMonogramText,
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
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    setSelectedVariant(null);
  }, [quickViewProduct?.id]);

  if (!quickViewProduct) return null;

  const displayImg = selectedVariant?.img || quickViewProduct.img;
  const displayPrice = selectedVariant?.price ?? quickViewProduct.price;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[3/4] bg-gray-100 rounded overflow-hidden">
            <img src={displayImg} alt={quickViewProduct.title} className="w-full h-full object-cover" />
            {monogramText && (
              <div
                className="absolute bottom-6 right-6 font-serif font-black text-base px-2 py-1 bg-white/80 rounded shadow"
                style={{ color: MONOGRAM_COLOR }}
              >
                {monogramText}
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{quickViewProduct.brand}</p>
            <h2 className="text-xl font-bold mb-3">{quickViewProduct.title}</h2>
            <div className="text-xl font-extrabold mb-2">
              {formatPrice(displayPrice)}{' '}
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(quickViewProduct.originalPrice)}
              </span>
            </div>

            {quickViewProduct.description && (
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                {quickViewProduct.description}
              </p>
            )}

            {/* VARIANT PICKER */}
            {quickViewProduct.variants?.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold uppercase block mb-1.5">Select Option:</span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      disabled={v.stock <= 0}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border text-[11px] font-bold ${
                        selectedVariant?.id === v.id
                          ? 'border-brandPink text-brandPink bg-pink-50 dark:bg-pink-950/40'
                          : 'border-gray-300'
                      } ${v.stock <= 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      {v.img && <img src={v.img} alt={v.label} className="w-5 h-5 object-cover rounded-full" />}
                      <span>{v.label}</span>
                      {v.stock <= 0 && <span className="text-[9px]">(Out of stock)</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MONOGRAM CUSTOMIZER */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded my-3 border border-gray-200 dark:border-gray-700">
              <label className="text-[11px] font-bold uppercase block mb-1">Custom Name Monogram (+₹149)</label>
              <input
                type="text"
                maxLength="8"
                placeholder="e.g. Ananya"
                value={monogramText}
                onChange={(e) => setMonogramText(e.target.value)}
                className="text-xs p-1.5 border rounded w-full bg-transparent"
              />
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
                const cartProduct = selectedVariant
                  ? {
                      ...quickViewProduct,
                      price: selectedVariant.price,
                      img: selectedVariant.img || quickViewProduct.img,
                      variantLabel: selectedVariant.label
                    }
                  : quickViewProduct;
                handleAddToCart(cartProduct, quickViewSize, monogramText);
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
