import React from 'react';

export default function FlashSaleHeader({ timeLeft, lang, setLanguage }) {
  return (
    <div className="bg-gray-900 text-brandGold text-center py-1.5 px-4 text-xs font-bold flex flex-wrap justify-between items-center border-b border-brandGold gap-2">
      <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-gray-300 font-semibold">
        <i className="fa-solid fa-location-dot text-brandPink"></i>
        <span>Mahalakshmipuram, Bengaluru</span>
      </div>
      <div className="flex items-center gap-2 mx-auto">
        <span className="bg-brandPink text-white px-2 py-0.5 rounded text-[10px] uppercase font-black animate-pulse">
          FLASH SALE ENDS IN:
        </span>
        <span className="font-mono text-white tracking-widest font-black">
          {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
        <span className="hidden sm:inline">
          • Code: <span className="border border-dashed border-brandGold bg-brandGold/20 px-2 py-0.5 rounded text-white">SHRIRK200</span>
        </span>
      </div>
      <select
        value={lang}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-gray-700 outline-none cursor-pointer"
      >
        <option value="EN">English</option>
        <option value="HI">हिन्दी (Hindi)</option>
        <option value="MR">मराठी (Marathi)</option>
        <option value="GU">ગુજરાતી (Gujarati)</option>
      </select>
    </div>
  );
}
