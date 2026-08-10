import React, { useState } from 'react';

export default function CheckoutModal({
  isCheckoutOpen,
  setIsCheckoutOpen,
  addresses,
  selectedDeliveryAddress,
  setSelectedDeliveryAddress,
  handlePlaceOrder,
  cartFinalTotal,
  formatPrice
}) {
  const [customerName, setCustomerName] = useState('Alex Johnson');
  const [paymentOption, setPaymentOption] = useState('COD');

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-md w-full p-6 relative">
        <button onClick={() => setIsCheckoutOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="font-extrabold text-sm uppercase mb-4">Delivery Address & Payment</h3>
        <div className="space-y-3 text-xs">
          <label className="font-bold block">Customer Full Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-transparent font-bold"
          />

          <label className="font-bold block">Select Delivery Address:</label>
          <div className="space-y-2">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedDeliveryAddress(addr.id)}
                className={`p-2.5 border rounded cursor-pointer ${
                  selectedDeliveryAddress === addr.id
                    ? 'border-brandPink bg-pink-50 dark:bg-pink-950/30'
                    : 'border-gray-200'
                }`}
              >
                <div className="font-bold">
                  {addr.name} ({addr.type})
                </div>
                <div className="text-[11px] text-gray-500">{addr.text}</div>
              </div>
            ))}
          </div>

          <label className="font-bold block">Payment Option:</label>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-transparent font-bold"
          >
            <option value="COD">Cash on Delivery (COD)</option>
            <option value="UPI">UPI / GPay / PhonePe</option>
            <option value="CARD">Credit / Debit Card</option>
          </select>
          <button
            onClick={() => handlePlaceOrder(customerName)}
            className="w-full bg-brandPink text-white font-bold py-2.5 rounded uppercase text-xs mt-2"
          >
            Confirm & Place Order ({formatPrice(cartFinalTotal)})
          </button>
        </div>
      </div>
    </div>
  );
}
