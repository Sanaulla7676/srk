import React, { useState } from 'react';

export default function AIStylistModal({
  isStylistOpen,
  setIsStylistOpen,
  setSelectedCategory,
  showToast
}) {
  const [stylistOccasion, setStylistOccasion] = useState('Birthday Party');
  const [stylistAge, setStylistAge] = useState('4-5Y');

  if (!isStylistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-md w-full p-6 relative">
        <button onClick={() => setIsStylistOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="font-serif text-lg font-black text-brandPink mb-1 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>AI Junior Stylist Engine</span>
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Answer 2 questions to get instant personalized outfit recommendations!
        </p>

        <div className="space-y-3 text-xs mb-4">
          <div>
            <label className="font-bold block mb-1">Occasion</label>
            <select
              value={stylistOccasion}
              onChange={(e) => setStylistOccasion(e.target.value)}
              className="w-full p-2 border rounded bg-transparent font-bold"
            >
              <option value="Birthday Party">Birthday Party</option>
              <option value="Wedding / Festive">Festive & Wedding</option>
              <option value="Playdate / Casual">Playdate & Casual</option>
            </select>
          </div>
          <div>
            <label className="font-bold block mb-1">Kid's Age Group</label>
            <select
              value={stylistAge}
              onChange={(e) => setStylistAge(e.target.value)}
              className="w-full p-2 border rounded bg-transparent font-bold"
            >
              <option value="2-3Y">2 - 3 Years</option>
              <option value="4-5Y">4 - 5 Years</option>
              <option value="6-7Y">6 - 7 Years</option>
              <option value="8-9Y">8 - 9 Years</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setIsStylistOpen(false);
            setSelectedCategory('Girls Dresses');
            showToast("AI Outfit Bundle Recommended!");
          }}
          className="w-full bg-brandPink text-white font-bold py-2.5 rounded uppercase text-xs"
        >
          Generate Outfit Bundle
        </button>
      </div>
    </div>
  );
}
