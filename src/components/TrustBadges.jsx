import React from 'react';

const TRUST = [
  { icon: 'fa-shield-halved', title: 'Secure Payments', sub: '100% secure checkout' },
  { icon: 'fa-truck', title: 'COD Available', sub: 'Pay on delivery' },
  { icon: 'fa-users', title: 'Trusted by 10K+', sub: 'Happy customers' }
];

const PAYMENT_ICONS = ['fa-cc-visa', 'fa-cc-mastercard', 'fa-google-pay', 'fa-cc-amazon-pay'];

export default function TrustBadges() {
  return (
    <div className="bg-rkCreamSoft border-t border-rkLine font-rkSans text-rkInk py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 flex flex-col items-center gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center justify-center sm:justify-start gap-3">
              <span className="w-10 h-10 rounded-full bg-rkCreamDeep flex items-center justify-center text-rkGold shrink-0">
                <i className={`fa-solid ${t.icon} text-sm`}></i>
              </span>
              <div>
                <p className="text-xs font-bold">{t.title}</p>
                <p className="text-[11px] text-rkInkSoft">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 pt-4 border-t border-rkLine w-full">
          <p className="text-[10px] uppercase tracking-widest text-rkInkSoft">We Accept</p>
          <div className="flex items-center gap-4 text-2xl text-rkInkSoft/70">
            {PAYMENT_ICONS.map((icon) => (
              <i key={icon} className={`fa-brands ${icon}`}></i>
            ))}
            <span className="text-[10px] font-bold tracking-wide border border-rkLine rounded px-1.5 py-0.5">UPI</span>
            <span className="text-[10px] font-bold tracking-wide border border-rkLine rounded px-1.5 py-0.5">Paytm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
