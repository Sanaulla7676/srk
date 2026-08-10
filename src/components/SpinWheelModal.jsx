import React from 'react';

export default function SpinWheelModal({
  isSpinWheelOpen,
  setIsSpinWheelOpen,
  setAppliedCouponObj,
  showToast
}) {
  if (!isSpinWheelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-sm w-full p-6 relative text-center">
        <button onClick={() => setIsSpinWheelOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="w-20 h-20 bg-gradient-to-tr from-brandPink to-brandGold text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg animate-spin-slow">
          <i className="fa-solid fa-dharmachakra"></i>
        </div>
        <h3 className="font-extrabold text-base mb-1">Spin & Win Junior Coupon!</h3>
        <p className="text-xs text-gray-500 mb-4">Spin the wheel to unlock guaranteed discounts on your order.</p>
        <button
          onClick={() => {
            setIsSpinWheelOpen(false);
            setAppliedCouponObj({ code: 'SPIN20', discountType: 'percent', value: 20, minSpend: 0 });
            showToast('🎉 You Won 20% OFF! Code SPIN20 Applied!');
          }}
          className="w-full bg-brandPink text-white font-extrabold py-2.5 rounded uppercase text-xs shadow-lg"
        >
          Spin Wheel Now!
        </button>
      </div>
    </div>
  );
}
