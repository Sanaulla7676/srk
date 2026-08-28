import React from 'react';

export default function FlashSaleHeader({ timeLeft, lang, setLanguage }) {
  return (
    <div className="bg-rkNight text-white text-center py-2 px-4 text-[11px] font-rkSans font-medium flex flex-wrap justify-center items-center gap-2 relative">
      <span className="flex items-center gap-1.5">
        <i className="fa-solid fa-truck-fast text-rkTan"></i>
        Free shipping on orders above ₹999
      </span>
      <span className="text-white/30 hidden sm:inline">|</span>
      <span className="flex items-center gap-1.5">
        <i className="fa-solid fa-gift text-rkTan"></i>
        10% off on your first order &ndash; use code&nbsp;
        <span className="font-bold text-rkTan">WELCOME10</span>
      </span>

      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 bg-transparent text-white/50 text-[10px] font-medium px-2 py-0.5 rounded border border-white/15 outline-none cursor-pointer"
      >
        <option value="EN" className="text-rkInk">English</option>
        <option value="HI" className="text-rkInk">हिन्दी (Hindi)</option>
        <option value="MR" className="text-rkInk">मराठी (Marathi)</option>
        <option value="GU" className="text-rkInk">ગુજરાતી (Gujarati)</option>
      </select>
    </div>
  );
}
