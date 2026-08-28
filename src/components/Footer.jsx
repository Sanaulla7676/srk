import React from 'react';

export default function Footer({ setView, setSelectedCategory }) {
  return (
    <footer className="bg-rkInk text-rkCream/70 text-xs font-rkSans border-t border-rkGold/20 pt-14 pb-8 px-4 lg:px-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <div>
          <div className="flex flex-col mb-4">
            <span className="font-rkScript text-lg -mb-1.5 text-rkGold">Shri</span>
            <span className="font-serif text-2xl font-black text-rkCream tracking-tight">RK</span>
            <span className="text-[9px] font-medium tracking-[0.35em] uppercase text-rkCream/80">Fashions</span>
          </div>
          <p className="text-rkCream/60 text-[11px] leading-relaxed mb-4">
            Bengaluru's leading destination for luxury kids fashion, partywear, traditional ethnic attire &amp; premium daily essentials.
          </p>
          <div className="flex gap-3 text-sm text-rkCream/70">
            <a href="#" className="hover:text-rkGold transition-colors"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-rkGold transition-colors"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-rkGold transition-colors"><i className="fa-brands fa-pinterest"></i></a>
            <a href="#" className="hover:text-rkGold transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-rkCream font-semibold uppercase mb-4 text-[11px] tracking-[0.2em]">Store Location &amp; Visit</h4>
          <div className="text-[11px] text-rkCream/60 space-y-2 leading-relaxed">
            <p className="font-semibold text-rkCream flex items-start gap-1.5">
              <i className="fa-solid fa-location-dot text-rkGold text-sm mt-0.5"></i>
              <span>Shri R.K. Fashions</span>
            </p>
            <p className="pl-5">
              129, VHBCS layout WOC road,<br />
              Kurubarahalli Main Rd, Mahalakshmipuram,<br />
              Bengaluru, Karnataka 560086
            </p>
            <a
              href="https://maps.google.com/?q=Shri+R.K.+Fashions+129+VHBCS+layout+WOC+road+Kurubarahalli+Main+Rd+Mahalakshmipuram+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-rkGold font-semibold underline hover:text-amber-300 pt-1"
            >
              <i className="fa-solid fa-map-location-dot"></i> Open Google Maps
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-rkCream font-semibold uppercase mb-4 text-[11px] tracking-[0.2em]">Quick Categories</h4>
          <ul className="space-y-2 text-[11px]">
            <li><button onClick={() => { setSelectedCategory('Girls Dresses'); setView('storefront'); }} className="hover:text-rkGold transition-colors">Girls Party Dresses</button></li>
            <li><button onClick={() => { setSelectedCategory('Boys T-Shirts'); setView('storefront'); }} className="hover:text-rkGold transition-colors">Boys Polo T-Shirts</button></li>
            <li><button onClick={() => { setSelectedCategory('Girls Ethnic Wear'); setView('storefront'); }} className="hover:text-rkGold transition-colors">Girls Silk Lehengas</button></li>
            <li><button onClick={() => { setSelectedCategory('Boys Shirts'); setView('storefront'); }} className="hover:text-rkGold transition-colors">Boys Casual Shirts</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-rkCream font-semibold uppercase mb-4 text-[11px] tracking-[0.2em]">Newsletter &amp; Store Offers</h4>
          <p className="text-[11px] text-rkCream/60 mb-3">Subscribe for Bengaluru store events &amp; exclusive coupon codes!</p>
          <div className="flex gap-1">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/5 border border-rkCream/20 text-xs px-3 py-2 outline-none w-full text-rkCream placeholder:text-rkCream/40"
            />
            <button className="bg-rkGold text-rkInk font-semibold text-xs px-4 py-2 uppercase tracking-wide">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-rkCream/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-rkCream/40 gap-3">
        <p>© 2026 Shri R.K. Fashions. 129, VHBCS layout, Mahalakshmipuram, Bengaluru, Karnataka 560086. All rights reserved.</p>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>GST Tax Compliance</span>
        </div>
      </div>
    </footer>
  );
}
