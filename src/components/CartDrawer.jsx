import React, { useState } from 'react';
import { TRANSLATIONS } from '../data/mockData';

export default function CartDrawer({
  isCartOpen,
  setIsCartOpen,
  cart,
  setCart,
  isGiftWrap,
  setIsGiftWrap,
  giftNote,
  setGiftNote,
  handleApplyCoupon,
  useWalletInCheckout,
  setUseWalletInCheckout,
  walletBalance,
  redeemPoints,
  setRedeemPoints,
  insiderPoints,
  cartMrpTotal,
  cartPriceTotal,
  totalDiscounts,
  cartFinalTotal,
  formatPrice,
  setIsCheckoutOpen,
  lang
}) {
  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white dark:bg-darkCard w-full max-w-md h-full flex flex-col shadow-xl">
        <div className="p-4 border-b border-gray-200 dark:border-darkBorder flex justify-between items-center">
          <h3 className="font-bold text-sm uppercase">
            {TRANSLATIONS[lang]?.cartTitle || TRANSLATIONS.EN.cartTitle} ({cart.reduce((s, i) => s + i.qty, 0)})
          </h3>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          <div className="bg-pink-50 dark:bg-pink-950/40 border border-dashed border-brandPink p-2.5 rounded text-xs font-bold text-brandPink mb-4">
            <span>
              {cartPriceTotal >= 999
                ? '🎉 You unlocked FREE Shipping!'
                : `Add ${formatPrice(999 - cartPriceTotal)} more for FREE Shipping!`}
            </span>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className="bg-brandPink h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cartPriceTotal / 999) * 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            {cart.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-10">Your Bag is empty.</p>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                  <img src={item.img} alt={item.brand} className="w-12 h-16 object-cover rounded" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-xs">{item.brand}</h4>
                    <p className="text-[10px] text-gray-400">
                      Size: {item.size} {item.monogram && `| Monogram: "${item.monogram}"`}
                    </p>
                    <span className="font-extrabold text-xs">{formatPrice(item.price)}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() =>
                          setCart(
                            cart
                              .map((ci, i) => (i === idx ? { ...ci, qty: ci.qty - 1 } : ci))
                              .filter((ci) => ci.qty > 0)
                          )
                        }
                        className="w-5 h-5 border rounded font-bold text-center"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">{item.qty}</span>
                      <button
                        onClick={() =>
                          setCart(cart.map((ci, i) => (i === idx ? { ...ci, qty: ci.qty + 1 } : ci)))
                        }
                        className="w-5 h-5 border rounded font-bold text-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, i) => i !== idx))} className="text-red-500 text-xs">
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* GIFT WRAP TOGGLE */}
          <div className="mt-4 p-3 border rounded border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs space-y-2">
            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isGiftWrap}
                onChange={(e) => setIsGiftWrap(e.target.checked)}
                className="accent-brandPink"
              />
              <span>Add Luxury Gift Wrap (+₹49)</span>
            </label>
            {isGiftWrap && (
              <input
                type="text"
                placeholder="Custom Birthday Greeting Note..."
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                className="w-full text-[11px] p-1.5 border rounded bg-transparent"
              />
            )}
          </div>

          {/* PROMO CODE APPLY */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Promo Code (SHRIRK200)"
              value={couponCodeInput}
              onChange={(e) => setCouponCodeInput(e.target.value)}
              className="flex-grow text-xs px-3 py-1.5 border rounded uppercase bg-transparent"
            />
            <button
              onClick={() => {
                if (couponCodeInput.trim()) {
                  handleApplyCoupon(couponCodeInput.trim());
                  setCouponCodeInput('');
                }
              }}
              className="bg-brandPink text-white text-xs font-bold px-4 py-1.5 rounded uppercase"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-darkBorder bg-gray-50 dark:bg-darkCard text-xs space-y-2">
          <label className="flex items-center gap-2 font-bold cursor-pointer">
            <input
              type="checkbox"
              checked={useWalletInCheckout}
              onChange={(e) => setUseWalletInCheckout(e.target.checked)}
              className="accent-brandPink"
            />
            <span>Use Store Wallet Balance ({formatPrice(walletBalance)})</span>
          </label>
          <label className="flex items-center gap-2 font-bold cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={redeemPoints}
              onChange={(e) => setRedeemPoints(e.target.checked)}
              className="accent-brandPink"
            />
            <span>Redeem RK Insider Points ({insiderPoints} Pts)</span>
          </label>
          <div className="flex justify-between">
            <span>MRP Total:</span>
            <span>{formatPrice(cartMrpTotal)}</span>
          </div>
          <div className="flex justify-between text-emerald-600 font-bold">
            <span>Discounts:</span>
            <span>-{formatPrice(totalDiscounts)}</span>
          </div>
          {isGiftWrap && (
            <div className="flex justify-between">
              <span>Gift Wrap Fee:</span>
              <span>{formatPrice(49)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm font-extrabold border-t pt-2">
            <span>Total Amount:</span>
            <span>{formatPrice(cartFinalTotal)}</span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
            disabled={cart.length === 0}
            className={`w-full text-white font-bold py-2.5 rounded uppercase text-xs mt-2 ${
              cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-brandPink hover:bg-brandPinkHover'
            }`}
          >
            {TRANSLATIONS[lang]?.checkout || TRANSLATIONS.EN.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}
