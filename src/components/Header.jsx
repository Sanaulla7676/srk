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
  setSortBy,
  lang
}) {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Shop', category: 'All' },
    { label: 'Women', category: 'Girls Ethnic Wear' },
    { label: 'Kids', category: 'Girls Dresses' },
    { label: 'New Arrivals', category: 'All', sort: 'recommended' },
    { label: 'Sale', category: 'All', sort: 'discount', badge: true }
  ];

  const goTo = (item) => {
    setSelectedCategory(item.category);
    if (item.sort) setSortBy(item.sort);
    setView('storefront');
    setMenuOpen(false);
    document.getElementById('rk-collections')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-rkCream/95 backdrop-blur-sm border-b border-rkLine font-rkSans text-rkInk">
      {/* Utility row: everything the storefront already offered, restyled minimal */}
      <div className="hidden lg:flex items-center justify-end gap-4 px-6 lg:px-10 h-7 text-[10px] uppercase tracking-widest border-b border-rkLine/70 text-rkInkSoft">
        <button
          onClick={() => setIsStylistOpen(true)}
          className="flex items-center gap-1.5 hover:text-rkInk transition-colors"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span>AI Stylist</span>
        </button>
        <button
          onClick={() => setIsSpinWheelOpen(true)}
          className="flex items-center gap-1.5 hover:text-rkInk transition-colors"
        >
          <i className="fa-solid fa-dharmachakra"></i>
          <span>Spin &amp; Win</span>
        </button>
        <div
          onClick={() => setIsProfileOpen(true)}
          className="flex items-center gap-1.5 cursor-pointer hover:text-rkInk transition-colors"
        >
          <i className={`fa-solid ${loyaltyTier.icon}`}></i>
          <span>{insiderPoints} Pts &middot; {loyaltyTier.name}</span>
        </div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-transparent outline-none cursor-pointer tracking-widest"
        >
          {Object.keys(CURRENCIES).map((curr) => (
            <option key={curr} value={curr}>{curr}</option>
          ))}
        </select>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:text-rkInk transition-colors">
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        {!isAdminLoggedIn && (
          <button onClick={() => setIsLoginOpen(true)} className="hover:text-rkInk transition-colors">
            Admin Login
          </button>
        )}
      </div>

      {/* Main nav row */}
      <div className="px-5 lg:px-10 h-14 flex items-center justify-between gap-4">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="w-8 h-8 rounded-full border border-rkLine flex items-center justify-center hover:border-rkInk transition-colors lg:mr-1"
          aria-label="Menu"
        >
          <i className="fa-solid fa-bars text-xs"></i>
        </button>

        {/* Logo lockup: script "Shri" + serif "RK" + tracked "FASHIONS" */}
        <div
          className="flex items-center gap-1.5 cursor-pointer shrink-0 mr-auto lg:mr-0"
          onClick={() => setView('storefront')}
        >
          <span className="font-serif text-xl font-black tracking-tight leading-none">RK</span>
          <span className="flex flex-col leading-none">
            <span className="font-rkScript text-sm text-rkGold leading-none">Shri</span>
            <span className="text-[7px] font-rkSans font-medium tracking-[0.3em] uppercase leading-none mt-0.5">Fashions</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium tracking-[0.18em] uppercase">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item)}
              className={`pb-1 border-b transition-all flex items-center gap-1.5 ${
                selectedCategory === item.category && view === 'storefront'
                  ? 'border-rkGold text-rkInk'
                  : 'border-transparent text-rkInkSoft hover:text-rkInk hover:border-rkInk/40'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="bg-rkGold/20 text-rkGold text-[9px] font-bold px-1.5 py-0.5 rounded-full normal-case tracking-normal">
                  Sale
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4 sm:gap-5">
          {/* Search: icon toggles an inline field, keeps voice search */}
          <div className="relative flex items-center">
            {searchOpen && (
              <div className="absolute right-9 top-1/2 -translate-y-1/2 flex items-center bg-rkCreamSoft border border-rkLine rounded-full pl-3 pr-1 py-1 shadow-sm w-52 sm:w-64">
                <input
                  autoFocus
                  type="text"
                  placeholder={TRANSLATIONS[lang]?.searchPlaceholder || TRANSLATIONS.EN.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs w-full outline-none"
                />
                <button
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                  className={`ml-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 ${
                    isVoiceListening ? 'text-rkGold animate-pulse' : 'text-rkInkSoft hover:text-rkInk'
                  }`}
                >
                  <i className="fa-solid fa-microphone"></i>
                </button>
              </div>
            )}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-8 h-8 rounded-full border border-rkLine flex items-center justify-center hover:border-rkInk transition-colors"
              aria-label="Search"
            >
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </button>
          </div>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-8 h-8 rounded-full border border-rkLine flex items-center justify-center hover:border-rkInk transition-colors"
            aria-label="Profile"
          >
            <i className="fa-regular fa-user text-sm"></i>
          </button>

          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative w-8 h-8 rounded-full border border-rkLine flex items-center justify-center hover:border-rkInk transition-colors"
            aria-label="Wishlist"
          >
            <i className="fa-regular fa-heart text-sm"></i>
            {wishlist.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-rkInk text-rkCream text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.size}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-8 h-8 rounded-full border border-rkLine flex items-center justify-center hover:border-rkInk transition-colors"
            aria-label="Bag"
          >
            <i className="fa-solid fa-bag-shopping text-sm"></i>
            <span className="absolute -top-1 -right-1 bg-rkInk text-rkCream text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-rkLine bg-rkCream px-5 py-4 flex flex-col gap-1 text-xs font-medium tracking-wide uppercase">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goTo(item)}
              className="flex items-center justify-between py-2.5 border-b border-rkLine/60 text-left"
            >
              <span>{item.label}</span>
              {item.badge && <span className="text-rkGold">Sale</span>}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
