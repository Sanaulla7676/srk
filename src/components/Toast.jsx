import React from 'react';

export default function Toast({ socialProofToast, toastMessage }) {
  return (
    <>
      {/* LIVE SOCIAL PROOF TOAST */}
      {socialProofToast && (
        <div className="fixed bottom-20 left-4 z-40 bg-gray-900 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-2xl border border-brandGold flex items-center gap-2 animate-bounce">
          <i className="fa-solid fa-bag-shopping text-brandGold"></i>
          <span>{socialProofToast}</span>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-6 py-3 rounded-md shadow-2xl z-50 border border-gray-700">
          {toastMessage}
        </div>
      )}
    </>
  );
}
