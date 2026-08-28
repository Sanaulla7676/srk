import React from 'react';

export default function Toast({ toastMessage }) {
  return (
    <>
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-6 py-3 rounded-md shadow-2xl z-50 border border-gray-700">
          {toastMessage}
        </div>
      )}
    </>
  );
}
