import React, { useState, useEffect, useMemo } from 'react';
import {
  TRANSLATIONS,
  CURRENCIES,
  defaultSlides,
  defaultCategories,
  defaultProducts,
  defaultCoupons,
  defaultAddresses,
  defaultAuditLogs,
  mockSocialProofToasts
} from './data/mockData';

import FlashSaleHeader from './components/FlashSaleHeader';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryScroll from './components/CategoryScroll';
import StoreControlBar from './components/StoreControlBar';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import RecentlyViewedStrip from './components/RecentlyViewedStrip';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import QuickViewModal from './components/QuickViewModal';
import AdminCMS from './components/AdminCMS';
import AIStylistModal from './components/AIStylistModal';
import CompareModal from './components/CompareModal';
import SizeGuideModal from './components/SizeGuideModal';
import ProfileModal from './components/ProfileModal';
import SpinWheelModal from './components/SpinWheelModal';
import ChatBotModal from './components/ChatBotModal';
import InvoiceModal from './components/InvoiceModal';
import LoginModal from './components/LoginModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App({ mode = 'storefront' }) {
  // Master App State with LocalStorage Persistence
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('shrirk_products')) || defaultProducts);
  const [categories, setCategories] = useState(() => JSON.parse(localStorage.getItem('shrirk_categories')) || defaultCategories);
  const [slides, setSlides] = useState(() => JSON.parse(localStorage.getItem('shrirk_slides')) || defaultSlides);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('shrirk_orders')) || [
    { id: 'SRK1023', customer: 'Alex Johnson', itemsCount: 2, total: 3298, giftWrap: true, giftNote: "Happy Birthday Ananya!", status: 'Shipped', date: new Date().toLocaleDateString() }
  ]);
  const [coupons, setCoupons] = useState(() => JSON.parse(localStorage.getItem('shrirk_coupons')) || defaultCoupons);
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('shrirk_addresses')) || defaultAddresses);
  const [auditLogs, setAuditLogs] = useState(() => JSON.parse(localStorage.getItem('shrirk_audit_logs')) || defaultAuditLogs);

  const [walletBalance, setWalletBalance] = useState(() => parseInt(localStorage.getItem('shrirk_wallet')) || 500);
  const [insiderPoints, setInsiderPoints] = useState(() => parseInt(localStorage.getItem('shrirk_insider_pts')) || 850);
  const [recentlyViewed, setRecentlyViewed] = useState(() => JSON.parse(localStorage.getItem('shrirk_recent_views')) || [1, 2, 8, 15]);
  const [compareList, setCompareList] = useState([]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => localStorage.getItem('shrirk_admin_auth') === 'true');
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('shrirk_dark_mode') === 'true');
  const [lang, setLanguage] = useState('EN');
  const [currency, setCurrency] = useState('INR');

  // Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 45 });

  // Slide Index State for Hero Banner
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // View State
  const [view, setView] = useState('storefront');
  const [adminTab, setAdminTab] = useState('orders');

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRatingFour, setMinRatingFour] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceListening, setIsVoiceListening] = useState(false);

  // Modals & Drawers
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set([2, 15]));
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewSize, setQuickViewSize] = useState('4-5Y');
  const [monogramText, setMonogramText] = useState('');
  const [monogramColor, setMonogramColor] = useState('#ff3f6c');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [useWalletInCheckout, setUseWalletInCheckout] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(1);

  // Modals Visibility
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOpen] = useState(null);

  const [toastMessage, setToastMessage] = useState('');
  const [socialProofToast, setSocialProofToast] = useState('');

  // Cart Adjustments
  const [appliedCouponObj, setAppliedCouponObj] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [pincodeCheck, setPincodeCheck] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  // Chatbot Messages State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to Shri RK Junior Support. How can I help you today?' }
  ]);

  // LocalStorage Sync
  useEffect(() => { localStorage.setItem('shrirk_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('shrirk_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('shrirk_slides', JSON.stringify(slides)); }, [slides]);
  useEffect(() => { localStorage.setItem('shrirk_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('shrirk_coupons', JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem('shrirk_addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('shrirk_audit_logs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('shrirk_wallet', walletBalance); }, [walletBalance]);
  useEffect(() => { localStorage.setItem('shrirk_insider_pts', insiderPoints); }, [insiderPoints]);
  useEffect(() => { localStorage.setItem('shrirk_recent_views', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
  useEffect(() => { localStorage.setItem('shrirk_admin_auth', isAdminLoggedIn); }, [isAdminLoggedIn]);
  useEffect(() => {
    localStorage.setItem('shrirk_dark_mode', isDarkMode);
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  // Flash Sale Live Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 14, seconds: 45 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto Banner Slider Interval
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Live Social Proof Toast Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const randMsg = mockSocialProofToasts[Math.floor(Math.random() * mockSocialProofToasts.length)];
      setSocialProofToast(randMsg);
      setTimeout(() => setSocialProofToast(''), 4500);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  // Currency Formatter Helper
  const formatPrice = (amountInINR) => {
    const curr = CURRENCIES[currency] || CURRENCIES.INR;
    const converted = (amountInINR * curr.rate).toFixed(curr.name === 'INR' ? 0 : 2);
    return `${curr.symbol}${converted}`;
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const addAuditLog = (action, detail) => {
    setAuditLogs((prev) => [{ id: Date.now(), action, detail, time: 'Just now' }, ...prev]);
  };

  // Voice Search
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice Recognition not supported in this browser. Try Chrome!');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.onstart = () => setIsVoiceListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsVoiceListening(false);
      showToast(`Voice Search: "${transcript}"`);
    };
    recognition.onerror = () => setIsVoiceListening(false);
    recognition.start();
  };

  // Loyalty Tier Calculation
  const loyaltyTier = useMemo(() => {
    if (insiderPoints >= 3000) return { name: 'Platinum VIP', color: 'text-purple-400', icon: 'fa-gem', next: 5000 };
    if (insiderPoints >= 1500) return { name: 'Gold VIP', color: 'text-brandGold', icon: 'fa-crown', next: 3000 };
    if (insiderPoints >= 500) return { name: 'Silver Member', color: 'text-gray-300', icon: 'fa-shield-halved', next: 1500 };
    return { name: 'Bronze Member', color: 'text-amber-700', icon: 'fa-award', next: 500 };
  }, [insiderPoints]);

  // Low Stock Items for Admin Alert Panel
  const lowStockProducts = useMemo(() => products.filter((p) => p.stock <= 2), [products]);

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchPrice = p.price <= maxPrice;
      const matchRating = !minRatingFour || p.rating >= 4.0;
      const matchSearch =
        !searchQuery ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchBrand && matchPrice && matchRating && matchSearch;
    });

    if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'discount') list.sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice);

    return list;
  }, [products, selectedCategory, selectedBrands, maxPrice, minRatingFour, sortBy, searchQuery]);

  const uniqueBrands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  // Cart Calculations
  const cartMrpTotal = useMemo(() => cart.reduce((s, i) => s + i.originalPrice * i.qty, 0), [cart]);
  const cartPriceTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const ptsDiscount = redeemPoints ? Math.min(insiderPoints, cartPriceTotal) : 0;

  let couponDiscount = 0;
  if (appliedCouponObj) {
    if (appliedCouponObj.discountType === 'flat') couponDiscount = appliedCouponObj.value;
    else couponDiscount = Math.round(cartPriceTotal * (appliedCouponObj.value / 100));
  }

  const giftWrapFee = isGiftWrap ? 49 : 0;
  const walletDeduction = useWalletInCheckout
    ? Math.min(walletBalance, Math.max(0, cartPriceTotal - (ptsDiscount + couponDiscount)))
    : 0;
  const totalDiscounts = ptsDiscount + couponDiscount + walletDeduction;
  const cartFinalTotal = Math.max(0, cartPriceTotal - totalDiscounts + giftWrapFee);

  // Handlers
  const handleAddToCart = (product, size = '4-5Y', customMonogramText = '') => {
    setCart((prev) => {
      const idx = prev.findIndex((ci) => ci.id === product.id && ci.size === size && ci.monogram === customMonogramText);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += 1;
        return updated;
      }
      return [...prev, { ...product, size, monogram: customMonogramText, qty: 1 }];
    });
    showToast(`Added ${product.brand} to Bag!`);
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) {
        alert('You can compare up to 4 items max!');
        return prev;
      }
      return [...prev, product];
    });
  };

  const trackRecentlyViewed = (id) => {
    setRecentlyViewed((prev) => {
      const next = prev.filter((rvId) => rvId !== id);
      next.unshift(id);
      return next.slice(0, 8);
    });
  };

  const openQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewSize('4-5Y');
    setMonogramText('');
    setPincodeResult(null);
    setPincodeCheck('');
    trackRecentlyViewed(product.id);
  };

  const handleApplyCoupon = (codeToApply) => {
    const found = coupons.find((c) => c.code.toUpperCase() === codeToApply.toUpperCase() && c.active);
    if (!found) {
      alert('Invalid or expired coupon code!');
      return;
    }
    if (cartPriceTotal < found.minSpend) {
      alert(`Minimum cart total must be ${formatPrice(found.minSpend)} to use this code!`);
      return;
    }
    setAppliedCouponObj(found);
    showToast(`Coupon ${found.code} Applied!`);
  };

  const handleCheckPincode = () => {
    if (!/^\d{6}$/.test(pincodeCheck)) {
      setPincodeResult({ success: false, msg: 'Enter valid 6-digit Pincode' });
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + 4);
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    setPincodeResult({ success: true, dateStr });
  };

  const handlePlaceOrder = (custName) => {
    if (redeemPoints) setInsiderPoints((prev) => prev - ptsDiscount);
    if (useWalletInCheckout) setWalletBalance((prev) => prev - walletDeduction);

    const earnedPts = Math.floor(cartFinalTotal * 0.1);
    setInsiderPoints((prev) => prev + earnedPts);

    const newOrder = {
      id: 'SRK' + Math.floor(10000 + Math.random() * 90000),
      customer: custName || 'Alex Johnson',
      itemsCount: cart.reduce((s, i) => s + i.qty, 0),
      total: cartFinalTotal,
      giftWrap: isGiftWrap,
      giftNote: giftNote,
      status: 'Placed',
      date: new Date().toLocaleDateString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    addAuditLog('Order Placed', `New Order ${newOrder.id} for ${formatPrice(cartFinalTotal)}`);
    setCart([]);
    setAppliedCouponObj(null);
    setIsCheckoutOpen(false);
    showToast(`Order Placed! Earned +${earnedPts} RK Insider Points 🎉`);
  };

  const handleRequestReturn = (orderId) => {
    const reason = prompt('Please enter return reason (e.g. Size Too Small, Defective Fabric):');
    if (reason) {
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'Return Requested' } : o)));
      addAuditLog('Return Requested', `Customer requested return for Order #${orderId}`);
      showToast(`Return requested for #${orderId}`);
    }
  };

  const advanceOrderStatus = (orderId) => {
    const stages = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const curIdx = stages.indexOf(o.status);
          if (curIdx < stages.length - 1) {
            const newSt = stages[curIdx + 1];
            addAuditLog('Order Stage Advanced', `Order ${orderId} moved to '${newSt}'`);
            showToast(`Order ${orderId} updated to ${newSt}`);
            return { ...o, status: newSt };
          }
        }
        return o;
      })
    );
  };

  // CMS Handlers
  const handleAddProduct = (brand, title, cat, price, oldPrice, stock, img) => {
    if (!brand || !title || !price || !img) return alert('Fill required fields!');
    const item = {
      id: Date.now(),
      brand,
      title,
      category: cat || categories[0]?.name || 'Girls Dresses',
      price: Number(price),
      originalPrice: Number(oldPrice) || Number(price),
      stock: Number(stock) || 5,
      rating: 4.5,
      fabric: 'Organic Cotton',
      img
    };
    setProducts((prev) => [item, ...prev]);
    addAuditLog('Product Added', `Added '${brand} - ${title}'`);
    showToast('Product Published to Catalog!');
  };

  const handleAddCoupon = (code, type, val, min) => {
    if (!code || !val) return alert('Fill coupon fields!');
    const c = {
      id: Date.now(),
      code: code.toUpperCase(),
      discountType: type,
      value: Number(val),
      minSpend: Number(min) || 0,
      active: true
    };
    setCoupons((prev) => [...prev, c]);
    addAuditLog('Promo Coupon Created', `Created coupon '${c.code}'`);
    showToast('New Promo Code Active!');
  };

  const handleAddCategory = (name, img) => {
    if (!name || !img) return alert('Fill category fields!');
    const cat = { id: Date.now(), name, img };
    setCategories((prev) => [...prev, cat]);
    addAuditLog('Category Added', `Added category '${cat.name}'`);
    showToast('Category Saved!');
  };

  const handleAddHeroSlide = (type, url) => {
    if (!url) return alert('Enter Hero Slide URL!');
    const slide = { id: Date.now(), type, url };
    setSlides((prev) => [...prev, slide]);
    addAuditLog('Hero Media Added', `Added ${type} hero slide`);
    showToast('Hero Slide Published!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans antialiased selection:bg-brandPink selection:text-white">
      {/* FLASH SALE LIVE COUNTDOWN HEADER BAR */}
      <FlashSaleHeader timeLeft={timeLeft} lang={lang} setLanguage={setLanguage} />

      {/* ABANDONED CART RECOVERY BANNER */}
      {cart.length > 0 && (
        <div className="bg-pink-100 dark:bg-pink-950/60 border-b border-pink-300 dark:border-pink-800 px-4 py-1.5 text-xs text-center font-bold text-brandPink flex justify-center items-center gap-2">
          <i className="fa-solid fa-clock"></i>
          <span>You left items in your Bag! Complete order now for EXTRA 5% OFF!</span>
          <button onClick={() => setIsCartOpen(true)} className="underline font-black text-gray-900 dark:text-white ml-2">
            Checkout Bag
          </button>
        </div>
      )}

      {/* MAIN HEADER */}
      <Header
        view={view}
        setView={setView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleVoiceSearch={handleVoiceSearch}
        isVoiceListening={isVoiceListening}
        setIsStylistOpen={setIsStylistOpen}
        currency={currency}
        setCurrency={setCurrency}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        loyaltyTier={loyaltyTier}
        insiderPoints={insiderPoints}
        setIsSpinWheelOpen={setIsSpinWheelOpen}
        setIsProfileOpen={setIsProfileOpen}
        isAdminLoggedIn={isAdminLoggedIn}
        setIsLoginOpen={setIsLoginOpen}
        wishlist={wishlist}
        setIsWishlistOpen={setIsWishlistOpen}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        lang={lang}
      />

      {/* MAIN CONTENT VIEW */}
      {mode === 'admin' ? (
        <AdminCMS
          setView={setView}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          products={products}
          setProducts={setProducts}
          categories={categories}
          setCategories={setCategories}
          slides={slides}
          setSlides={setSlides}
          orders={orders}
          setOrders={setOrders}
          coupons={coupons}
          setCoupons={setCoupons}
          auditLogs={auditLogs}
          addAuditLog={addAuditLog}
          lowStockProducts={lowStockProducts}
          adminTab={adminTab}
          setAdminTab={setAdminTab}
          advanceOrderStatus={advanceOrderStatus}
          setActiveInvoiceOpen={setActiveInvoiceOpen}
          handleAddProduct={handleAddProduct}
          handleAddCoupon={handleAddCoupon}
          handleAddCategory={handleAddCategory}
          handleAddHeroSlide={handleAddHeroSlide}
          formatPrice={formatPrice}
          showToast={showToast}
        />
      ) : (
        <main className="flex-grow">
          {/* HERO BANNER SLIDER */}
          <HeroBanner
            slides={slides}
            currentSlideIdx={currentSlideIdx}
            setCurrentSlideIdx={setCurrentSlideIdx}
            setSelectedCategory={setSelectedCategory}
          />

          {/* CATEGORY SCROLL */}
          <CategoryScroll
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            lang={lang}
          />

          {/* STORE CONTROL BAR */}
          <StoreControlBar
            itemCount={filteredProducts.length}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />

          {/* MAIN PRODUCTS GRID & SIDEBAR */}
          <div className="px-4 lg:px-10 py-6 flex gap-8">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              uniqueBrands={uniqueBrands}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRatingFour={minRatingFour}
              setMinRatingFour={setMinRatingFour}
              formatPrice={formatPrice}
              lang={lang}
            />

            <ProductGrid
              filteredProducts={filteredProducts}
              openQuickView={openQuickView}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
              toggleCompare={toggleCompare}
              compareList={compareList}
              handleAddToCart={handleAddToCart}
              formatPrice={formatPrice}
            />
          </div>

          {/* RECENTLY VIEWED STRIP */}
          <RecentlyViewedStrip
            recentlyViewed={recentlyViewed}
            products={products}
            openQuickView={openQuickView}
            formatPrice={formatPrice}
          />
        </main>
      )}

      {/* FOOTER */}
      <Footer setView={setView} setSelectedCategory={setSelectedCategory} />

      {/* MODALS & DRAWERS */}
      <CompareModal
        isCompareOpen={isCompareOpen}
        setIsCompareOpen={setIsCompareOpen}
        compareList={compareList}
        setCompareList={setCompareList}
        handleAddToCart={handleAddToCart}
        formatPrice={formatPrice}
      />

      <SizeGuideModal
        isSizeGuideOpen={isSizeGuideOpen}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
      />

      <ProfileModal
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
        loyaltyTier={loyaltyTier}
        walletBalance={walletBalance}
        insiderPoints={insiderPoints}
        orders={orders}
        handleRequestReturn={handleRequestReturn}
        setActiveInvoiceOpen={setActiveInvoiceOpen}
        formatPrice={formatPrice}
      />

      {/* WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="bg-white dark:bg-darkCard w-full max-w-md h-full flex flex-col shadow-xl">
            <div className="p-4 border-b border-gray-200 dark:border-darkBorder flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase">My Wishlist ({wishlist.size})</h3>
              <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 text-lg">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-3">
              {wishlist.size === 0 ? (
                <p className="text-xs text-gray-400 text-center py-10">Your Wishlist is empty.</p>
              ) : (
                Array.from(wishlist).map((id) => {
                  const item = products.find((p) => p.id === id);
                  if (!item) return null;
                  return (
                    <div key={item.id} className="flex gap-3 border-b border-gray-100 dark:border-gray-800 pb-3 items-center">
                      <img src={item.img} alt={item.brand} className="w-12 h-16 object-cover rounded" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-xs">{item.brand}</h4>
                        <p className="text-[10px] text-gray-400 truncate">{item.title}</p>
                        <span className="font-extrabold text-xs text-brandPink">{formatPrice(item.price)}</span>
                      </div>
                      <button
                        onClick={() => {
                          handleAddToCart(item);
                          toggleWishlist(item.id);
                        }}
                        className="bg-brandPink text-white font-bold text-[10px] px-2.5 py-1 rounded uppercase"
                      >
                        Move To Bag
                      </button>
                      <button onClick={() => toggleWishlist(item.id)} className="text-gray-400 hover:text-red-500 text-xs px-1">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      <AIStylistModal
        isStylistOpen={isStylistOpen}
        setIsStylistOpen={setIsStylistOpen}
        setSelectedCategory={setSelectedCategory}
        showToast={showToast}
      />

      <SpinWheelModal
        isSpinWheelOpen={isSpinWheelOpen}
        setIsSpinWheelOpen={setIsSpinWheelOpen}
        setAppliedCouponObj={setAppliedCouponObj}
        showToast={showToast}
      />

      <ChatBotModal
        isChatBotOpen={isChatBotOpen}
        setIsChatBotOpen={setIsChatBotOpen}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />

      <QuickViewModal
        quickViewProduct={quickViewProduct}
        setQuickViewProduct={setQuickViewProduct}
        monogramText={monogramText}
        setMonogramText={setMonogramText}
        monogramColor={monogramColor}
        setMonogramColor={setMonogramColor}
        pincodeCheck={pincodeCheck}
        setPincodeCheck={setPincodeCheck}
        handleCheckPincode={handleCheckPincode}
        pincodeResult={pincodeResult}
        quickViewSize={quickViewSize}
        setQuickViewSize={setQuickViewSize}
        setIsSizeGuideOpen={setIsSizeGuideOpen}
        handleAddToCart={handleAddToCart}
        formatPrice={formatPrice}
      />

      <CartDrawer
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        setCart={setCart}
        isGiftWrap={isGiftWrap}
        setIsGiftWrap={setIsGiftWrap}
        giftNote={giftNote}
        setGiftNote={setGiftNote}
        handleApplyCoupon={handleApplyCoupon}
        useWalletInCheckout={useWalletInCheckout}
        setUseWalletInCheckout={setUseWalletInCheckout}
        walletBalance={walletBalance}
        redeemPoints={redeemPoints}
        setRedeemPoints={setRedeemPoints}
        insiderPoints={insiderPoints}
        cartMrpTotal={cartMrpTotal}
        cartPriceTotal={cartPriceTotal}
        totalDiscounts={totalDiscounts}
        cartFinalTotal={cartFinalTotal}
        formatPrice={formatPrice}
        setIsCheckoutOpen={setIsCheckoutOpen}
        lang={lang}
      />

      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        addresses={addresses}
        selectedDeliveryAddress={selectedDeliveryAddress}
        setSelectedDeliveryAddress={setSelectedDeliveryAddress}
        handlePlaceOrder={handlePlaceOrder}
        cartFinalTotal={cartFinalTotal}
        formatPrice={formatPrice}
      />

      <InvoiceModal
        activeInvoiceOrder={activeInvoiceOrder}
        setActiveInvoiceOpen={setActiveInvoiceOpen}
        formatPrice={formatPrice}
      />

      <LoginModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        setIsAdminLoggedIn={setIsAdminLoggedIn}
        setView={setView}
        showToast={showToast}
      />

      <Toast socialProofToast={socialProofToast} toastMessage={toastMessage} />
    </div>
  );
}
