import React, { useState } from 'react';
import MediaUploader from './MediaUploader';

export default function AdminCMS({
  setView,
  setIsAdminLoggedIn,
  products,
  setProducts,
  categories,
  setCategories,
  slides,
  setSlides,
  orders,
  setOrders,
  coupons,
  setCoupons,
  auditLogs,
  addAuditLog,
  lowStockProducts,
  adminTab,
  setAdminTab,
  advanceOrderStatus,
  setActiveInvoiceOpen,
  handleAddProduct,
  handleAddCoupon,
  handleAddCategory,
  handleAddHeroSlide,
  formatPrice,
  showToast
}) {
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdTitle, setNewProdTitle] = useState('');
  const [newProdCat, setNewProdCat] = useState(categories[0]?.name || 'Girls Dresses');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdOldPrice, setNewProdOldPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('5');
  const [newProdImg, setNewProdImg] = useState('');

  const [newCatName, setNewCatName] = useState('');
  const [newCatImg, setNewCatImg] = useState('');

  const [editingCatId, setEditingCatId] = useState(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatImg, setEditCatImg] = useState('');

  const startEditCategory = (cat) => {
    setEditingCatId(cat.id);
    setEditCatName(cat.name);
    setEditCatImg(cat.img);
  };

  const cancelEditCategory = () => {
    setEditingCatId(null);
    setEditCatName('');
    setEditCatImg('');
  };

  const saveEditCategory = () => {
    if (!editCatName || !editCatImg) return alert('Category name and image are required!');
    const oldCat = categories.find((c) => c.id === editingCatId);
    setCategories(categories.map((c) => (c.id === editingCatId ? { ...c, name: editCatName, img: editCatImg } : c)));
    if (oldCat && oldCat.name !== editCatName) {
      setProducts(products.map((p) => (p.category === oldCat.name ? { ...p, category: editCatName } : p)));
    }
    addAuditLog('Category Updated', `Updated category '${oldCat?.name}' to '${editCatName}'`);
    showToast('Category Updated!');
    cancelEditCategory();
  };

  const [newSlideType, setNewSlideType] = useState('image');
  const [newSlideUrl, setNewSlideUrl] = useState('');

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState('flat');
  const [newCouponValue, setNewCouponValue] = useState('');
  const [newCouponMin, setNewCouponMin] = useState('499');

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      products, categories, slides, orders, coupons, auditLogs
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `shrirk_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("JSON System Backup Exported!");
  };

  return (
    <main className="flex-grow bg-gray-100 dark:bg-darkBg p-6 lg:p-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-300 dark:border-darkBorder pb-5 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-serif flex items-center gap-2">
            <i className="fa-solid fa-chart-line text-brandPink"></i>
            <span>Shri R.K. Fashions Executive Owner Dashboard</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Dedicated Admin Portal • Direct Phone Media Uploads (Cloudinary) & Realtime Firebase Sync
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Cloudinary & Firebase Connected</span>
          </div>
          <button
            onClick={() => {
              setIsAdminLoggedIn(false);
              window.location.href = '/';
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded shadow transition-all"
          >
            Logout & Exit Admin
          </button>
        </div>
      </div>

      {/* LOW STOCK ALERT BANNER */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-100 dark:bg-red-950/60 border-l-4 border-red-600 p-4 rounded mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-800 dark:text-red-200">
            <i className="fa-solid fa-triangle-exclamation text-base text-red-600"></i>
            <span>
              <strong>Low Stock Warning:</strong> {lowStockProducts.length} item(s) have 2 or fewer units remaining!
            </span>
          </div>
          <div className="flex gap-2">
            {lowStockProducts.map((lp) => (
              <button
                key={lp.id}
                onClick={() =>
                  setProducts(products.map((p) => (p.id === lp.id ? { ...p, stock: p.stock + 5 } : p)))
                }
                className="bg-red-600 text-white font-bold text-[10px] px-2 py-1 rounded shadow"
              >
                Restock '{lp.brand}' (+5)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ADMIN TAB NAVIGATION */}
      <div className="flex gap-2 mb-6 border-b border-gray-300 dark:border-darkBorder pb-2 overflow-x-auto">
        {[
          { id: 'orders', label: 'Orders & Pipeline', icon: 'fa-shopping-cart' },
          { id: 'products', label: 'Manage Products', icon: 'fa-boxes-stacked' },
          { id: 'coupons', label: 'Promo Coupons CMS', icon: 'fa-ticket' },
          { id: 'categories', label: 'Categories CMS', icon: 'fa-tags' },
          { id: 'hero', label: 'Hero Media CMS', icon: 'fa-film' },
          { id: 'logs', label: 'System Audit Trail', icon: 'fa-clock-rotate-left' },
          { id: 'settings', label: 'Cloudinary & Firebase Config', icon: 'fa-gear' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id)}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 transition-all ${
              adminTab === tab.id
                ? 'bg-brandPink text-white shadow-sm'
                : 'bg-white dark:bg-darkCard text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-darkBorder'
            }`}
          >
            <i className={`fa-solid ${tab.icon}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ORDERS */}
      {adminTab === 'orders' && (
        <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
          <h3 className="text-sm font-extrabold uppercase mb-4">Customer Order Pipeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase font-extrabold border-b border-gray-200 dark:border-gray-700">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Stage Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-400">
                      No customer orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-3 font-bold">{o.id}</td>
                      <td className="p-3">{o.customer}</td>
                      <td className="p-3">{o.itemsCount} Items</td>
                      <td className="p-3 font-bold">{formatPrice(o.total)}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => advanceOrderStatus(o.id)}
                          className="bg-brandPink hover:bg-brandPinkHover text-white font-bold text-[10px] px-2.5 py-1 rounded"
                        >
                          Advance Stage
                        </button>
                        <button
                          onClick={() => setActiveInvoiceOpen(o)}
                          className="bg-gray-800 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                        >
                          <i className="fa-solid fa-file-invoice"></i> Receipt
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-3 text-brandPink">
              <i className="fa-solid fa-plus-circle mr-1"></i> Add New Kids Outfit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs mb-4">
              <input
                type="text"
                placeholder="Brand (e.g. Biba Girls)"
                value={newProdBrand}
                onChange={(e) => setNewProdBrand(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <input
                type="text"
                placeholder="Product Title"
                value={newProdTitle}
                onChange={(e) => setNewProdTitle(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <select
                value={newProdCat}
                onChange={(e) => setNewProdCat(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700 font-bold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Selling Price (₹)"
                value={newProdPrice}
                onChange={(e) => setNewProdPrice(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <input
                type="number"
                placeholder="Original Price (₹)"
                value={newProdOldPrice}
                onChange={(e) => setNewProdOldPrice(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <input
                type="number"
                placeholder="Stock Qty"
                value={newProdStock}
                onChange={(e) => setNewProdStock(e.target.value)}
                className="p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
            </div>

            {/* DIRECT MEDIA UPLOADER FROM PHONE OR COMPUTER */}
            <div className="mb-4">
              <MediaUploader
                allowedTypes="image/*"
                label="Direct Product Photo Upload (Camera / Phone Gallery / Computer)"
                onMediaUploaded={(url) => setNewProdImg(url)}
              />
            </div>

            <button
              onClick={() => {
                if (!newProdImg) return alert("Please select or upload a product photo!");
                handleAddProduct(
                  newProdBrand,
                  newProdTitle,
                  newProdCat,
                  newProdPrice,
                  newProdOldPrice,
                  newProdStock,
                  newProdImg
                );
                setNewProdBrand('');
                setNewProdTitle('');
                setNewProdPrice('');
                setNewProdOldPrice('');
                setNewProdImg('');
              }}
              className="bg-brandPink hover:bg-brandPinkHover text-white font-bold text-xs px-8 py-3 rounded shadow uppercase tracking-wider"
            >
              PUBLISH PRODUCT TO STOREFRONT
            </button>
          </div>

          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-4">Inventory Catalog</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase font-extrabold border-b border-gray-200 dark:border-gray-700">
                    <th className="p-3">Image</th>
                    <th className="p-3">Brand & Title</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Stock Level</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="p-3">
                        <img src={p.img} alt={p.brand} className="w-8 h-10 object-cover rounded" />
                      </td>
                      <td className="p-3">
                        <strong>{p.brand}</strong> - {p.title}
                      </td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setProducts(
                                products.map((item) =>
                                  item.id === p.id ? { ...item, stock: Math.max(0, item.stock - 1) } : item
                                )
                              )
                            }
                            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded font-bold text-center"
                          >
                            -
                          </button>
                          <span className={`font-bold ${p.stock <= 2 ? 'text-red-500 font-extrabold' : ''}`}>
                            {p.stock}
                          </span>
                          <button
                            onClick={() =>
                              setProducts(
                                products.map((item) =>
                                  item.id === p.id ? { ...item, stock: item.stock + 1 } : item
                                )
                              )
                            }
                            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded font-bold text-center"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 font-bold">{formatPrice(p.price)}</td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            setProducts(products.filter((item) => item.id !== p.id));
                            addAuditLog('Product Deleted', `Removed '${p.brand} - ${p.title}'`);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROMO COUPONS CMS */}
      {adminTab === 'coupons' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-3 text-brandPink">
              <i className="fa-solid fa-plus-circle mr-1"></i> Create Promo Coupon
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Coupon Code (e.g. KID20)"
                value={newCouponCode}
                onChange={(e) => setNewCouponCode(e.target.value)}
                className="p-2 border rounded uppercase bg-transparent border-gray-300 dark:border-gray-700"
              />
              <select
                value={newCouponType}
                onChange={(e) => setNewCouponType(e.target.value)}
                className="p-2 border rounded bg-transparent border-gray-300 dark:border-gray-700 font-bold"
              >
                <option value="flat">Flat ₹ Discount</option>
                <option value="percent">Percentage (%) Discount</option>
              </select>
              <input
                type="number"
                placeholder="Value (200 or 10%)"
                value={newCouponValue}
                onChange={(e) => setNewCouponValue(e.target.value)}
                className="p-2 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <input
                type="number"
                placeholder="Min Spend (₹)"
                value={newCouponMin}
                onChange={(e) => setNewCouponMin(e.target.value)}
                className="p-2 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
            </div>
            <button
              onClick={() => {
                handleAddCoupon(newCouponCode, newCouponType, newCouponValue, newCouponMin);
                setNewCouponCode('');
                setNewCouponValue('');
              }}
              className="mt-4 bg-brandPink text-white font-bold text-xs px-6 py-2 rounded shadow"
            >
              SAVE PROMO CODE
            </button>
          </div>

          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-4">Active Coupons ({coupons.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="border border-dashed border-brandPink p-3.5 rounded bg-pink-50 dark:bg-pink-950/30 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-black text-sm text-brandPink">{c.code}</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 font-bold">
                      {c.discountType === 'flat' ? `Flat ₹${c.value} OFF` : `${c.value}% OFF`}
                    </p>
                    <span className="text-[10px] text-gray-400">Min spend: ₹{c.minSpend}</span>
                  </div>
                  <button
                    onClick={() => setCoupons(coupons.filter((item) => item.id !== c.id))}
                    className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES CMS */}
      {adminTab === 'categories' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-3 text-brandPink">
              <i className="fa-solid fa-plus-circle mr-1"></i> Add New Category
            </h3>
            <div className="space-y-4 text-xs mb-4">
              <input
                type="text"
                placeholder="Category Name (e.g. Girls Shoes)"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
              />
              <MediaUploader
                allowedTypes="image/*"
                label="Upload Category Image (Direct Device File)"
                onMediaUploaded={(url) => setNewCatImg(url)}
              />
            </div>
            <button
              onClick={() => {
                if (!newCatName || !newCatImg) return alert("Enter Category name and upload image!");
                handleAddCategory(newCatName, newCatImg);
                setNewCatName('');
                setNewCatImg('');
              }}
              className="bg-brandPink text-white font-bold text-xs px-6 py-2.5 rounded shadow uppercase"
            >
              SAVE CATEGORY
            </button>
          </div>

          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-4">
              Active Categories Catalog ({categories.length})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((c) =>
                editingCatId === c.id ? (
                  <div key={c.id} className="col-span-2 border-2 border-brandPink p-4 rounded text-left space-y-3 bg-pink-50/40 dark:bg-pink-950/20">
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={editCatName}
                      onChange={(e) => setEditCatName(e.target.value)}
                      className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700 text-xs"
                    />
                    <MediaUploader
                      allowedTypes="image/*"
                      label="Replace Category Image (optional)"
                      onMediaUploaded={(url) => setEditCatImg(url)}
                    />
                    {editCatImg && (
                      <img src={editCatImg} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={saveEditCategory}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-4 py-2 rounded shadow uppercase"
                      >
                        <i className="fa-solid fa-check mr-1"></i> Save Changes
                      </button>
                      <button
                        onClick={cancelEditCategory}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-[11px] px-4 py-2 rounded uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={c.id} className="border border-gray-200 dark:border-darkBorder p-3 rounded text-center relative group">
                    <img src={c.img} alt={c.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2" />
                    <p className="font-bold text-xs">{c.name}</p>
                    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEditCategory(c)}
                        title="Edit Category"
                        className="text-blue-500 hover:text-blue-600 text-xs"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button
                        onClick={() => setCategories(categories.filter((cat) => cat.id !== c.id))}
                        title="Delete Category"
                        className="text-red-500 hover:text-red-600 text-xs"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: HERO MEDIA CMS */}
      {adminTab === 'hero' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-3 text-brandPink">
              <i className="fa-solid fa-plus-circle mr-1"></i> Add Full Screen Hero Banner Slide
            </h3>
            <div className="space-y-4 text-xs mb-4">
              <select
                value={newSlideType}
                onChange={(e) => setNewSlideType(e.target.value)}
                className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700 font-bold"
              >
                <option value="image">Image Banner</option>
                <option value="video">Video Banner</option>
              </select>

              <MediaUploader
                allowedTypes={newSlideType === 'video' ? 'video/*' : 'image/*'}
                label={`Upload ${newSlideType === 'video' ? 'Video' : 'Image'} for Hero Carousel`}
                onMediaUploaded={(url, type) => {
                  setNewSlideUrl(url);
                  setNewSlideType(type);
                }}
              />
            </div>
            <button
              onClick={() => {
                if (!newSlideUrl) return alert("Please upload media for the Hero banner!");
                handleAddHeroSlide(newSlideType, newSlideUrl);
                setNewSlideUrl('');
              }}
              className="bg-brandPink text-white font-bold text-xs px-6 py-2.5 rounded shadow uppercase"
            >
              SAVE HERO BANNER
            </button>
          </div>

          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-4">Active Hero Slides ({slides.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {slides.map((sl) => (
                <div key={sl.id} className="border border-gray-200 dark:border-darkBorder rounded overflow-hidden relative group">
                  {sl.type === 'video' ? (
                    <video src={sl.url} className="w-full h-32 object-cover" />
                  ) : (
                    <img src={sl.url} alt="Slide" className="w-full h-32 object-cover" />
                  )}
                  <button
                    onClick={() => setSlides(slides.filter((item) => item.id !== sl.id))}
                    className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AUDIT TRAIL */}
      {adminTab === 'logs' && (
        <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
          <h3 className="text-sm font-extrabold uppercase mb-4">System Audit Trail</h3>
          <div className="space-y-3 text-xs">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 border-l-4 border-brandPink bg-gray-50 dark:bg-gray-800/50 rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{log.action}</h4>
                  <p className="text-gray-500">{log.detail}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CLOUDINARY & FIREBASE CONFIG + BACKUP */}
      {adminTab === 'settings' && (
        <div className="space-y-6 max-w-2xl">

          {/* CLOUDINARY CONFIG */}
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-1 flex items-center gap-2">
              <i className="fa-solid fa-cloud text-blue-500"></i>
              Cloudinary Direct Upload Configuration
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Account: <strong>Sanaullaa19@gmail.com</strong> — Enter your Cloud Name and Unsigned Upload Preset from your Cloudinary Dashboard (<a href="https://cloudinary.com/console" target="_blank" rel="noreferrer" className="text-brandPink underline">cloudinary.com/console</a>).
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">Cloud Name</label>
                <input
                  type="text"
                  defaultValue={localStorage.getItem('shrirk_cloudinary_cloud_name') || ''}
                  placeholder="e.g. dxxxxxx (found in Cloudinary Dashboard top-left)"
                  onBlur={(e) => {
                    localStorage.setItem('shrirk_cloudinary_cloud_name', e.target.value);
                    showToast('Cloudinary Cloud Name saved!');
                  }}
                  className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">Upload Preset (Unsigned)</label>
                <input
                  type="text"
                  defaultValue={localStorage.getItem('shrirk_cloudinary_preset') || ''}
                  placeholder="e.g. shrirk_unsigned (create in Settings → Upload Presets)"
                  onBlur={(e) => {
                    localStorage.setItem('shrirk_cloudinary_preset', e.target.value);
                    showToast('Cloudinary Upload Preset saved!');
                  }}
                  className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
            <div className="mt-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded p-3 text-[11px] text-blue-800 dark:text-blue-300">
              <strong>How to get these values:</strong>
              <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                <li>Log in to <strong>cloudinary.com</strong> with Sanaullaa19@gmail.com</li>
                <li>Your <strong>Cloud Name</strong> is shown on the Dashboard homepage</li>
                <li>Go to <strong>Settings → Upload → Upload Presets</strong> and create a new <strong>Unsigned</strong> preset</li>
                <li>Copy the preset name and paste it above, then click outside the field to save</li>
              </ol>
            </div>
          </div>

          {/* FIREBASE CONFIG */}
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-1 flex items-center gap-2">
              <i className="fa-solid fa-fire text-orange-500"></i>
              Firebase Realtime Sync Configuration
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Account: <strong>Sanaullaa19@gmail.com</strong> — Get your config from the Firebase Console (<a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-brandPink underline">console.firebase.google.com</a>).
            </p>
            <div className="space-y-3 text-xs">
              {[
                { key: 'shrirk_firebase_apikey', label: 'API Key', placeholder: 'AIzaSy...' },
                { key: 'shrirk_firebase_authdomain', label: 'Auth Domain', placeholder: 'your-app.firebaseapp.com' },
                { key: 'shrirk_firebase_projectid', label: 'Project ID', placeholder: 'your-project-id' },
                { key: 'shrirk_firebase_storagebucket', label: 'Storage Bucket', placeholder: 'your-app.appspot.com' },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block font-bold mb-1 text-gray-700 dark:text-gray-300">{label}</label>
                  <input
                    type="text"
                    defaultValue={localStorage.getItem(key) || ''}
                    placeholder={placeholder}
                    onBlur={(e) => {
                      localStorage.setItem(key, e.target.value);
                      showToast(`Firebase ${label} saved!`);
                    }}
                    className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700 font-mono text-[11px]"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded p-3 text-[11px] text-orange-800 dark:text-orange-300">
              <strong>How to get your Firebase config:</strong>
              <ol className="list-decimal ml-4 mt-1 space-y-0.5">
                <li>Log in to <strong>console.firebase.google.com</strong> with Sanaullaa19@gmail.com</li>
                <li>Create or open your project, go to <strong>Project Settings → General</strong></li>
                <li>Scroll to <strong>"Your apps"</strong> → Web app → copy the <strong>firebaseConfig</strong> values</li>
                <li>Paste each value into the fields above and click outside to save</li>
              </ol>
            </div>
          </div>

          {/* JSON BACKUP */}
          <div className="bg-white dark:bg-darkCard p-6 rounded-lg border border-gray-200 dark:border-darkBorder shadow-sm">
            <h3 className="text-sm font-extrabold uppercase mb-2 flex items-center gap-2">
              <i className="fa-solid fa-database text-gray-600 dark:text-gray-400"></i>
              Export & Backup Store Database
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Download a complete JSON backup of all products, categories, slides, orders, coupons, and audit logs.
            </p>
            <button
              onClick={handleExportBackup}
              className="bg-gray-900 text-brandGold border border-brandGold text-xs font-bold px-6 py-2.5 rounded shadow hover:bg-gray-800 flex items-center gap-2"
            >
              <i className="fa-solid fa-download"></i>
              <span>Export JSON System Backup</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

