import React, { useState, useEffect, useMemo } from 'react';
import {
  TRANSLATIONS,
  CURRENCIES,
  defaultSlides,
  defaultCategories,
  defaultProducts,
  defaultCoupons,
  defaultAddresses,
  defaultAuditLogs
} from './data/mockData';
import { subscribeToCollection, subscribeToCustomerOrders, subscribeToDoc, upsertDoc, deleteDocById, watchAdminAuth, ADMIN_UID } from './firebase';

import FlashSaleHeader from './components/FlashSaleHeader';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import HeroFeatureStrip from './components/HeroFeatureStrip';
import NewCollectionStack from './components/NewCollectionStack';
import CategoryShowcaseDark from './components/CategoryShowcaseDark';
import PromoCountdown from './components/PromoCountdown';
import DuoShowcase from './components/DuoShowcase';
import CategoryScroll from './components/CategoryScroll';
import StoreControlBar from './components/StoreControlBar';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import TrustBadges from './components/TrustBadges';
import Reveal from './components/Reveal';
import RecentlyViewedStrip from './components/RecentlyViewedStrip';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import QuickViewModal from './components/QuickViewModal';
import AdminCMS from './components/AdminCMS';
import AdminLoginGate from './components/AdminLoginGate';
import CompareModal from './components/CompareModal';
import SizeGuideModal from './components/SizeGuideModal';
import ProfileModal from './components/ProfileModal';
import ChatBotModal from './components/ChatBotModal';
import InvoiceModal from './components/InvoiceModal';
import CustomerAuthModal from './components/CustomerAuthModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App({ mode = 'storefront' }) {
  // Store-wide data now lives in Firestore (see subscriptions below) so
  // that admin edits are identical for every visitor and device. These
  // defaults are just the initial paint before the first snapshot
  // arrives, and a safety net if a collection is ever legitimately empty.
  const [products, setProducts] = useState(defaultProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [slides, setSlides] = useState(defaultSlides);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState(defaultCoupons);
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem('shrirk_addresses')) || defaultAddresses);
  const [auditLogs, setAuditLogs] = useState(defaultAuditLogs);

  const [walletBalance, setWalletBalance] = useState(() => parseInt(localStorage.getItem('shrirk_wallet')) || 500);
  const [insiderPoints, setInsiderPoints] = useState(() => parseInt(localStorage.getItem('shrirk_insider_pts')) || 850);
  const [recentlyViewed, setRecentlyViewed] = useState(() => JSON.parse(localStorage.getItem('shrirk_recent_views')) || [1, 2, 8, 15]);
  const [compareList, setCompareList] = useState([]);

  // Backed by real Firebase Auth (see watchAdminAuth effect below), not
  // just a local flag — this is what Firestore's security rules check.
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
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
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [useWalletInCheckout, setUseWalletInCheckout] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(1);

  // Modals Visibility
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOpen] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  // Cart Adjustments
  const [appliedCouponObj, setAppliedCouponObj] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [pincodeCheck, setPincodeCheck] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);

  // Chatbot Messages State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to Shri RK Junior Support. How can I help you today?' }
  ]);

  // Live Firestore Sync — fires immediately with current data, then again
  // on every change from ANY device, which is what makes admin edits show
  // up everywhere instead of just the browser that made them. The
  // `data.length &&` guard is a safety net so a brand-new/unseeded
  // collection never blanks out the storefront.
  useEffect(() => subscribeToCollection('products', (data) => data.length && setProducts(data)), []);
  useEffect(() => subscribeToCollection('categories', (data) => data.length && setCategories(data)), []);
  useEffect(() => subscribeToCollection('slides', (data) => data.length && setSlides(data)), []);
  useEffect(() => subscribeToCollection('coupons', (data) => data.length && setCoupons(data)), []);

  // Storefront theme preset — admin-controlled, live for every visitor.
  const [siteTheme, setSiteTheme] = useState('default');
  useEffect(
    () =>
      subscribeToDoc('settings', 'site', (data) => {
        const theme = data?.theme || 'default';
        setSiteTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
      }),
    []
  );

  // Audit log is admin-only data (Firestore rules require auth to read
  // it), so only subscribe once actually signed in — otherwise every
  // storefront visitor's console fills with a permission-denied error.
  useEffect(() => {
    if (!isAdminLoggedIn) return;
    return subscribeToCollection('auditLogs', (data) =>
      setAuditLogs([...data].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 50))
    );
  }, [isAdminLoggedIn]);

  // Real Firebase Auth session — customers and the store owner share the
  // same underlying auth pool (Firestore rules, keyed off ADMIN_UID, are
  // what actually separate their permissions), so this one listener
  // drives both "am I the owner" and "which customer is signed in".
  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(
    () =>
      watchAdminAuth((user) => {
        setCurrentUser(user);
        setIsAdminLoggedIn(user?.uid === ADMIN_UID);
        setAuthChecked(true);
      }),
    []
  );

  const [isCustomerAuthOpen, setIsCustomerAuthOpen] = useState(false);
  const openProfile = () => (currentUser ? setIsProfileOpen(true) : setIsCustomerAuthOpen(true));
  const openCheckout = () => (currentUser ? setIsCheckoutOpen(true) : setIsCustomerAuthOpen(true));

  // Orders: the admin dashboard sees every order (for the pipeline), a
  // signed-in customer sees only their own (Firestore rules enforce this
  // same split), and a signed-out storefront visitor sees none.
  useEffect(() => {
    const sortDesc = (data) => setOrders([...data].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
    if (mode === 'admin') {
      if (!isAdminLoggedIn) return;
      return subscribeToCollection('orders', sortDesc);
    }
    if (!currentUser) {
      setOrders([]);
      return;
    }
    return subscribeToCustomerOrders(currentUser.uid, sortDesc);
  }, [mode, isAdminLoggedIn, currentUser]);

  // These stay per-browser/per-visitor on purpose (cart, wallet, etc. are
  // not meant to be shared across devices the way store data is).
  useEffect(() => { localStorage.setItem('shrirk_addresses', JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem('shrirk_wallet', walletBalance); }, [walletBalance]);
  useEffect(() => { localStorage.setItem('shrirk_insider_pts', insiderPoints); }, [insiderPoints]);
  useEffect(() => { localStorage.setItem('shrirk_recent_views', JSON.stringify(recentlyViewed)); }, [recentlyViewed]);
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
    const id = Date.now();
    upsertDoc('auditLogs', id, { id, action, detail, time: 'Just now' }).catch((err) =>
      console.error('Failed to write audit log', err)
    );
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

  const handlePlaceOrder = () => {
    if (!currentUser) {
      setIsCheckoutOpen(false);
      setIsCustomerAuthOpen(true);
      return;
    }

    if (redeemPoints) setInsiderPoints((prev) => prev - ptsDiscount);
    if (useWalletInCheckout) setWalletBalance((prev) => prev - walletDeduction);

    const earnedPts = Math.floor(cartFinalTotal * 0.1);
    setInsiderPoints((prev) => prev + earnedPts);

    const newOrder = {
      id: 'SRK' + Math.floor(10000 + Math.random() * 90000),
      createdAt: Date.now(),
      customerId: currentUser.uid,
      customer: currentUser.displayName || currentUser.email,
      itemsCount: cart.reduce((s, i) => s + i.qty, 0),
      total: cartFinalTotal,
      giftWrap: isGiftWrap,
      giftNote: giftNote,
      status: 'Placed',
      date: new Date().toLocaleDateString()
    };

    upsertDoc('orders', newOrder.id, newOrder).catch((err) => console.error('Failed to place order', err));
    addAuditLog('Order Placed', `New Order ${newOrder.id} for ${formatPrice(cartFinalTotal)}`);
    setCart([]);
    setAppliedCouponObj(null);
    setIsCheckoutOpen(false);
    showToast(`Order Placed! Earned +${earnedPts} RK Insider Points 🎉`);
  };

  const handleRequestReturn = (orderId) => {
    const reason = prompt('Please enter return reason (e.g. Size Too Small, Defective Fabric):');
    if (reason) {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;
      upsertDoc('orders', orderId, { ...order, status: 'Return Requested' }).catch((err) =>
        console.error('Failed to update order', err)
      );
      addAuditLog('Return Requested', `Customer requested return for Order #${orderId}`);
      showToast(`Return requested for #${orderId}`);
    }
  };

  const advanceOrderStatus = (orderId) => {
    const stages = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const curIdx = stages.indexOf(order.status);
    if (curIdx < stages.length - 1) {
      const newSt = stages[curIdx + 1];
      upsertDoc('orders', orderId, { ...order, status: newSt }).catch((err) =>
        console.error('Failed to update order', err)
      );
      addAuditLog('Order Stage Advanced', `Order ${orderId} moved to '${newSt}'`);
      showToast(`Order ${orderId} updated to ${newSt}`);
    }
  };

  // CMS Handlers
  const handleAddProduct = (brand, title, cat, price, oldPrice, stock, img, description = '') => {
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
      description,
      img,
      variants: []
    };
    upsertDoc('products', item.id, item).catch((err) => console.error('Failed to save product', err));
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
    upsertDoc('coupons', c.id, c).catch((err) => console.error('Failed to save coupon', err));
    addAuditLog('Promo Coupon Created', `Created coupon '${c.code}'`);
    showToast('New Promo Code Active!');
  };

  const handleAddCategory = (name, img) => {
    if (!name || !img) return alert('Fill category fields!');
    const cat = { id: Date.now(), name, img };
    upsertDoc('categories', cat.id, cat).catch((err) => console.error('Failed to save category', err));
    addAuditLog('Category Added', `Added category '${cat.name}'`);
    showToast('Category Saved!');
  };

  const handleAddHeroSlide = (type, url) => {
    if (!url) return alert('Enter Hero Slide URL!');
    const slide = { id: Date.now(), type, url };
    upsertDoc('slides', slide.id, slide).catch((err) => console.error('Failed to save hero slide', err));
    addAuditLog('Hero Media Added', `Added ${type} hero slide`);
    showToast('Hero Slide Published!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-darkBg text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans antialiased selection:bg-brandPink selection:text-white">
      {mode !== 'admin' && (
        <>
          {/* FLASH SALE LIVE COUNTDOWN HEADER BAR */}
          <FlashSaleHeader timeLeft={timeLeft} lang={lang} setLanguage={setLanguage} />

          {/* ABANDONED CART RECOVERY BANNER */}
          {cart.length > 0 && (
            <div className="bg-rkCreamSoft border-b border-rkGold/40 px-4 py-1.5 text-xs text-center font-rkSans font-medium text-rkInk flex justify-center items-center gap-2">
              <i className="fa-solid fa-clock text-rkGold"></i>
              <span>You left items in your Bag! Complete order now for EXTRA 5% OFF!</span>
              <button onClick={() => setIsCartOpen(true)} className="underline font-semibold ml-2">
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
            setIsProfileOpen={openProfile}
            wishlist={wishlist}
            setIsWishlistOpen={setIsWishlistOpen}
            cart={cart}
            setIsCartOpen={setIsCartOpen}
            setSortBy={setSortBy}
            lang={lang}
          />
        </>
      )}

      {/* MAIN CONTENT VIEW */}
      {mode === 'admin' && !authChecked ? (
        <main className="flex-grow min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg">
          <i className="fa-solid fa-spinner animate-spin text-2xl text-brandPink"></i>
        </main>
      ) : mode === 'admin' && !isAdminLoggedIn ? (
        <AdminLoginGate />
      ) : mode === 'admin' ? (
        <AdminCMS
          setView={setView}
          setIsAdminLoggedIn={setIsAdminLoggedIn}
          products={products}
          categories={categories}
          slides={slides}
          orders={orders}
          coupons={coupons}
          auditLogs={auditLogs}
          addAuditLog={addAuditLog}
          upsertDoc={upsertDoc}
          siteTheme={siteTheme}
          deleteDocById={deleteDocById}
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

          {/* FREE SHIPPING / QUALITY / RETURNS / SUPPORT */}
          <HeroFeatureStrip />

          {/* NEW COLLECTION: scroll-driven stacked card carousel */}
          <NewCollectionStack
            products={products}
            setSelectedCategory={setSelectedCategory}
            setView={setView}
            openQuickView={openQuickView}
          />

          {/* SHOP BY CATEGORY */}
          <CategoryShowcaseDark categories={categories} setSelectedCategory={setSelectedCategory} setView={setView} />

          {/* LIMITED TIME OFFER COUNTDOWN */}
          <PromoCountdown setSelectedCategory={setSelectedCategory} setView={setView} />

          {/* DUO SHOWCASE */}
          <DuoShowcase
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            setView={setView}
          />

          {/* COLLECTIONS: tabs, filters & grid */}
          <div id="rk-collections" className="bg-rkCream px-4 lg:px-10 py-16 lg:py-20">
            <div className="max-w-7xl mx-auto">
              <Reveal as="h2" className="font-serif text-4xl sm:text-5xl font-bold text-rkInk text-center mb-8">
                What You&rsquo;ll Love
              </Reveal>

              <CategoryScroll
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />

              <div className="mt-5 mb-6">
                <StoreControlBar
                  itemCount={filteredProducts.length}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>

              <div className="flex gap-8">
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
            </div>
          </div>

          {/* RECENTLY VIEWED STRIP */}
          <RecentlyViewedStrip
            recentlyViewed={recentlyViewed}
            products={products}
            openQuickView={openQuickView}
            formatPrice={formatPrice}
          />

          {/* TRUST BADGES */}
          <TrustBadges />
        </main>
      )}

      {/* FOOTER */}
      {mode !== 'admin' && <Footer setView={setView} setSelectedCategory={setSelectedCategory} />}

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
        currentUser={currentUser}
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
        setIsCheckoutOpen={openCheckout}
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

      <CustomerAuthModal
        isOpen={isCustomerAuthOpen}
        onClose={() => setIsCustomerAuthOpen(false)}
      />

      <Toast toastMessage={toastMessage} />
    </div>
  );
}
