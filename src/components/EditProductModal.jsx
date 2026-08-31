import React, { useState } from 'react';
import MediaUploader from './MediaUploader';

function VariantRow({ variant, onChange, onRemove }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. Red - 6-7Y"
          value={variant.label}
          onChange={(e) => onChange('label', e.target.value)}
          className="flex-grow p-2 text-xs border rounded bg-transparent border-gray-300 dark:border-gray-700"
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={variant.price}
          onChange={(e) => onChange('price', Number(e.target.value))}
          className="w-24 p-2 text-xs border rounded bg-transparent border-gray-300 dark:border-gray-700"
        />
        <input
          type="number"
          placeholder="Stock"
          value={variant.stock}
          onChange={(e) => onChange('stock', Number(e.target.value))}
          className="w-20 p-2 text-xs border rounded bg-transparent border-gray-300 dark:border-gray-700"
        />
        <button onClick={onRemove} className="text-red-500 text-xs px-2">
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <div className="flex items-center gap-3">
        {variant.img && <img src={variant.img} alt={variant.label} className="w-12 h-14 object-cover rounded" />}
        <div className="flex-grow">
          <MediaUploader
            allowedTypes="image/*"
            label={variant.img ? 'Replace Variant Photo' : 'Add Variant Photo (optional)'}
            onMediaUploaded={(url) => onChange('img', url)}
          />
        </div>
      </div>
    </div>
  );
}

export default function EditProductModal({ product, categories, onSave, onClose }) {
  const [brand, setBrand] = useState(product.brand);
  const [title, setTitle] = useState(product.title);
  const [category, setCategory] = useState(product.category);
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price);
  const [originalPrice, setOriginalPrice] = useState(product.originalPrice);
  const [stock, setStock] = useState(product.stock);
  const [fabric, setFabric] = useState(product.fabric || '');
  const [img, setImg] = useState(product.img);
  const [variants, setVariants] = useState(product.variants || []);

  const addVariant = () =>
    setVariants((prev) => [...prev, { id: Date.now(), label: '', price: product.price, stock: 0, img: '' }]);
  const updateVariant = (id, field, value) =>
    setVariants((prev) => prev.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  const removeVariant = (id) => setVariants((prev) => prev.filter((v) => v.id !== id));

  const handleSave = () => {
    if (!brand || !title || !price || !img) return alert('Brand, title, price and photo are required!');
    onSave({
      ...product,
      brand,
      title,
      category,
      description,
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      stock: Number(stock),
      fabric,
      img,
      variants: variants.filter((v) => v.label.trim())
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3 className="text-sm font-extrabold uppercase mb-4 text-brandPink flex items-center gap-2">
          <i className="fa-solid fa-pen-to-square"></i> Edit Product
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-4">
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Brand</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Product Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700 font-bold"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Fabric / Material</label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Selling Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Original Price (₹)</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block font-bold mb-1 text-gray-600 dark:text-gray-300">Stock Qty</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2.5 border rounded bg-transparent border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-1 text-xs text-gray-600 dark:text-gray-300">Full Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Fabric details, fit, care instructions, occasion, etc."
            className="w-full p-2.5 text-xs border rounded bg-transparent border-gray-300 dark:border-gray-700"
          />
        </div>

        <div className="mb-4">
          <MediaUploader
            allowedTypes="image/*"
            label="Replace Product Photo"
            onMediaUploaded={(url) => setImg(url)}
          />
          {img && <img src={img} alt="Current" className="w-20 h-24 object-cover rounded mt-2" />}
        </div>

        {/* VARIANTS */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[11px] font-extrabold uppercase text-gray-600 dark:text-gray-300">
              Variants (e.g. Size, Color) — each can have its own photo &amp; price
            </label>
            <button onClick={addVariant} className="text-[11px] font-bold text-brandPink hover:underline shrink-0 ml-2">
              <i className="fa-solid fa-plus mr-1"></i> Add Variant
            </button>
          </div>
          {variants.length === 0 ? (
            <p className="text-[11px] text-gray-400">No variants yet — this product uses the standard size options.</p>
          ) : (
            <div className="space-y-3">
              {variants.map((v) => (
                <VariantRow
                  key={v.id}
                  variant={v}
                  onChange={(field, value) => updateVariant(v.id, field, value)}
                  onRemove={() => removeVariant(v.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded shadow uppercase"
          >
            <i className="fa-solid fa-check mr-1"></i> Save Changes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xs px-6 py-2.5 rounded uppercase"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
