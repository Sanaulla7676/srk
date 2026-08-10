import React from 'react';

export default function SizeGuideModal({ isSizeGuideOpen, setIsSizeGuideOpen }) {
  if (!isSizeGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-md w-full p-6 relative">
        <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="font-serif text-base font-bold text-brandPink mb-2 flex items-center gap-2">
          <i className="fa-solid fa-ruler-combined"></i>
          <span>Shri RK Junior Size Guide</span>
        </h3>
        <p className="text-xs text-gray-500 mb-4">Standard age-to-chest measurement guide for kids apparel.</p>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-gray-500 font-bold border-b">
              <th className="p-2">Age Group</th>
              <th className="p-2">Height (cm)</th>
              <th className="p-2">Chest (in)</th>
              <th className="p-2">Waist (in)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            <tr>
              <td className="p-2 font-bold">2 - 3Y</td>
              <td className="p-2">92 - 98</td>
              <td className="p-2">21 - 22</td>
              <td className="p-2">20 - 21</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">4 - 5Y</td>
              <td className="p-2">104 - 110</td>
              <td className="p-2">23 - 24</td>
              <td className="p-2">21.5 - 22</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">6 - 7Y</td>
              <td className="p-2">116 - 122</td>
              <td className="p-2">25 - 26</td>
              <td className="p-2">22.5 - 23</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">8 - 9Y</td>
              <td className="p-2">128 - 134</td>
              <td className="p-2">27 - 28</td>
              <td className="p-2">23.5 - 24</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">10 - 11Y</td>
              <td className="p-2">140 - 146</td>
              <td className="p-2">29 - 30</td>
              <td className="p-2">25 - 26</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
