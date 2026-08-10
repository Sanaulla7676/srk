import React from 'react';
import { TRANSLATIONS, CURRENCIES } from '../data/mockData';

export default function Header({
  view,
  setView,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  handleVoiceSearch,
  isVoiceListening,
  setIsStylistOpen,
  currency,
  setCurrency,
  isDarkMode,
  setIsDarkMode,
  loyaltyTier,
  insiderPoints,
  setIsSpinWheelOpen,
  setIsProfileOpen,
  isAdminLoggedIn,
  setIsLoginOpen,
  wishlist,
  setIsWishlistOpen,
  cart,
  setIsCartOpen,
  lang
}) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-darkCard border-b border-gray-200 dark:border-darkBorder shadow-sm px-4 lg:px-10 h-20 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div
          className="font-serif text-xl font-extrabold cursor-pointer flex items-center gap-2"
          onClick={() => setView('storefront')}
        >
          <span className="bg-gradient-to-r from-brandGold to-brandPink text-white px-2.5 py-1 rounded text-sm font-sans font-black shadow-sm">
            SRK
          </span>
          <span>
            Shri R.K. <span className="text-brandPink">Fashions</span>
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-1 h-full">
          {['All', 'Girls Dresses', 'Boys T-Shirts', 'Girls Ethnic Wear', 'Boys Shirts'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setView('storefront');
              }}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                selectedCategory === cat && view === 'storefront'
                  ? 'border-brandPink text-brandPink'
                  : 'border-transparent hover:text-brandPink'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Search Bar with Voice */}
      <div className="relative flex-1 max-w-md mx-4">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 border border-transparent focus-within:border-brandPink transition-all">
          <i className="fa-solid fa-magnifying-glass text-gray-400 mr-2"></i>
          <input
            type="text"
            placeholder={TRANSLATIONS[lang]?.searchPlaceholder || TRANSLATIONS.EN.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs w-full outline-none dark:text-white"
          />
          <button
            onClick={handleVoiceSearch}
            title="Voice Search"
            className={`ml-2 text-xs transition-colors ${
              isVoiceListening
                ? 'text-brandPink animate-pulse'
                : 'text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsStylistOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow hover:scale-105 transition-transform"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span className="hidden sm:inline">AI Stylist</span>
        </button>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-bold px-2 py-1.5 rounded cursor-pointer outline-none"
        >
          {Object.keys(CURRENCIES).map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-xs hover:scale-105 transition-all"
        >
          <i className={`fa-solid ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon text-gray-700'}`}></i>
        </button>

        <div
          onClick={() => setIsProfileOpen(true)}
          className="bg-gray-900 border border-brandGold text-brandGold px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer shadow-sm"
        >
          <i className={`fa-solid ${loyaltyTier.icon} ${loyaltyTier.color}`}></i>
          <span>{insiderPoints} Pts</span>
        </div>

        <button
          onClick={() => setIsSpinWheelOpen(true)}
          className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 border border-amber-300 flex items-center justify-center text-xs animate-spin-slow"
          title="Spin & Win Coupons"
        >
          <i className="fa-solid fa-dharmachakra"></i>
        </button>

        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center text-[10px] font-bold text-gray-700 dark:text-gray-300"
        >
          <i className="fa-regular fa-user text-sm mb-0.5"></i>
          <span>Profile</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center text-[10px] font-bold text-gray-700 dark:text-gray-300"
        >
          <i className="fa-regular fa-heart text-sm mb-0.5"></i>
          <span>Wishlist</span>
          {wishlist.size > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brandPink text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlist.size}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center text-[10px] font-bold text-gray-700 dark:text-gray-300"
        >
          <i className="fa-solid fa-bag-shopping text-sm mb-0.5"></i>
          <span>Bag</span>
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brandPink text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
