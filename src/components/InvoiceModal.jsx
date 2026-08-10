import React from 'react';

export default function InvoiceModal({ activeInvoiceOrder, setActiveInvoiceOpen, formatPrice }) {
  if (!activeInvoiceOrder) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div
        className="bg-white text-gray-900 max-w-lg w-full p-8 rounded shadow-2xl relative"
        id="printable-invoice"
      >
        <button
          onClick={() => setActiveInvoiceOpen(null)}
          className="absolute top-4 right-4 text-gray-400 text-lg print:hidden"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="border-b pb-4 mb-4 flex justify-between items-start">
          <div>
            <h2 className="font-serif text-xl font-black">Shri R.K. Fashions</h2>
            <p className="text-[11px] text-gray-600 font-medium leading-tight">
              129, VHBCS layout WOC road, Kurubarahalli Main Rd,<br />
              Mahalakshmipuram, Bengaluru, Karnataka 560086
            </p>
            <p className="text-[10px] text-gray-400 mt-1">Official Tax Invoice | GSTIN: 29AAAAA0000A1Z5</p>
          </div>
          <span className="text-xs font-bold border p-1 rounded bg-gray-50">Invoice: #{activeInvoiceOrder.id}</span>
        </div>
        <div className="text-xs space-y-1 mb-4">
          <p>
            <strong>Customer:</strong> {activeInvoiceOrder.customer}
          </p>
          <p>
            <strong>Date:</strong> {activeInvoiceOrder.date}
          </p>
          <p>
            <strong>Status:</strong> {activeInvoiceOrder.status}
          </p>
          {activeInvoiceOrder.giftWrap && (
            <p className="text-brandPink font-bold">Luxury Gift Package Included</p>
          )}
        </div>
        <div className="border-t border-b py-2 text-xs font-bold flex justify-between mb-4">
          <span>Total Payable Amount</span>
          <span>{formatPrice(activeInvoiceOrder.total)}</span>
        </div>
        <button
          onClick={() => window.print()}
          className="w-full bg-gray-900 text-white font-bold py-2 rounded text-xs uppercase print:hidden hover:bg-gray-800"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
}
