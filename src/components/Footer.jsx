import React from 'react';

export default function Footer({ setView, setSelectedCategory }) {
  return (
    <footer className="bg-gray-950 text-gray-400 text-xs border-t border-gray-800 pt-12 pb-8 px-4 lg:px-10 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="font-serif text-lg font-extrabold text-white flex items-center gap-2 mb-3">
            <span className="bg-gradient-to-r from-brandGold to-brandPink text-white px-2 py-0.5 rounded text-xs font-sans font-black">
              SRK
            </span>
            <span>Shri R.K. Fashions</span>
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
            Bengaluru's leading destination for luxury kids fashion, partywear, traditional ethnic attire & premium daily essentials.
          </p>
          <div className="flex gap-3 text-sm text-gray-300">
            <a href="#" className="hover:text-brandPink"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-brandPink"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-brandPink"><i className="fa-brands fa-pinterest"></i></a>
            <a href="#" className="hover:text-brandPink"><i className="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-extrabold uppercase mb-3 text-xs tracking-wider">Store Location & Visit</h4>
          <div className="text-[11px] text-gray-400 space-y-2 leading-relaxed">
            <p className="font-bold text-white flex items-start gap-1.5">
              <i className="fa-solid fa-location-dot text-brandPink text-sm mt-0.5"></i>
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
              className="inline-flex items-center gap-1.5 text-brandGold font-bold underline hover:text-yellow-400 pt-1"
            >
              <i className="fa-solid fa-map-location-dot"></i> Open Google Maps
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-extrabold uppercase mb-3 text-xs tracking-wider">Quick Categories</h4>
          <ul className="space-y-2 text-[11px]">
            <li><button onClick={() => { setSelectedCategory('Girls Dresses'); setView('storefront'); }} className="hover:text-brandPink">Girls Party Dresses</button></li>
            <li><button onClick={() => { setSelectedCategory('Boys T-Shirts'); setView('storefront'); }} className="hover:text-brandPink">Boys Polo T-Shirts</button></li>
            <li><button onClick={() => { setSelectedCategory('Girls Ethnic Wear'); setView('storefront'); }} className="hover:text-brandPink">Girls Silk Lehengas</button></li>
            <li><button onClick={() => { setSelectedCategory('Boys Shirts'); setView('storefront'); }} className="hover:text-brandPink">Boys Casual Shirts</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-extrabold uppercase mb-3 text-xs tracking-wider">Newsletter & Store Offers</h4>
          <p className="text-[11px] text-gray-400 mb-2">Subscribe for Bengaluru store events & exclusive coupon codes!</p>
          <div className="flex gap-1">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-gray-900 border border-gray-800 text-xs px-3 py-1.5 rounded outline-none w-full text-white"
            />
            <button className="bg-brandPink text-white font-bold text-xs px-3 py-1.5 rounded uppercase">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-3">
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
