import React from 'react';

export default function ProfileModal({
  isProfileOpen,
  setIsProfileOpen,
  loyaltyTier,
  walletBalance,
  insiderPoints,
  orders,
  handleRequestReturn,
  setActiveInvoiceOpen,
  formatPrice
}) {
  if (!isProfileOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={() => setIsProfileOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="flex items-center gap-3 border-b pb-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brandPink to-brandGold text-white flex items-center justify-center font-bold text-lg">
            AJ
          </div>
          <div>
            <h3 className="font-extrabold text-sm">Alex Johnson</h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`font-bold ${loyaltyTier.color}`}>
                <i className={`fa-solid ${loyaltyTier.icon}`}></i> {loyaltyTier.name}
              </span>
              <span>• Wallet: {formatPrice(walletBalance)}</span>
            </div>
          </div>
        </div>

        {/* VIP PROGRESS */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded mb-4 text-xs">
          <div className="flex justify-between font-bold mb-1">
            <span>RK Insider Points Progress</span>
            <span>
              {insiderPoints} / {loyaltyTier.next} Pts
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brandPink h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (insiderPoints / loyaltyTier.next) * 100)}%` }}
            ></div>
          </div>
        </div>

        <h4 className="font-extrabold text-xs uppercase mb-3 text-gray-700 dark:text-gray-300">
          Order History & 5-Stage Tracking
        </h4>
        <div className="space-y-4 text-xs">
          {orders.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No order history found.</p>
          ) : (
            orders.map((ord) => {
              const stages = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
              const curIdx = stages.indexOf(ord.status);
              return (
                <div key={ord.id} className="border border-gray-200 dark:border-gray-800 p-3 rounded space-y-2">
                  <div className="flex justify-between font-bold">
                    <span>Order #{ord.id}</span>
                    <span className="text-brandPink">{formatPrice(ord.total)}</span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    Date: {ord.date} | {ord.itemsCount} Items
                  </div>

                  {/* 5-STAGE TIMELINE TRACKER */}
                  <div className="py-2">
                    <div className="flex justify-between text-[9px] font-extrabold text-gray-400 mb-1">
                      {stages.map((st, sIdx) => (
                        <span key={st} className={sIdx <= curIdx ? 'text-brandPink' : ''}>
                          {st}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {stages.map((_, sIdx) => (
                        <div
                          key={sIdx}
                          className={`h-1.5 flex-1 rounded-full ${
                            sIdx <= curIdx ? 'bg-brandPink' : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleRequestReturn(ord.id)}
                      className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 font-bold text-[10px] px-2.5 py-1 rounded dark:text-white"
                    >
                      Return / Exchange
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveInvoiceOpen(ord);
                      }}
                      className="bg-gray-900 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                    >
                      Tax Invoice
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
