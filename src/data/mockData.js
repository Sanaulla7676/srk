export const TRANSLATIONS = {
    EN: { searchPlaceholder: "Search Girls Dresses, Boys T-Shirts...", categoryHeader: "Shop Girls & Boys Categories", cartTitle: "Shopping Bag", checkout: "Place Order", filterTitle: "Filters" },
    HI: { searchPlaceholder: "बच्चों के कपड़े, ब्रांड्स खोजें...", categoryHeader: "लड़कियों और लड़कों की कैटेगरी", cartTitle: "शॉपिंग बैग", checkout: "ऑर्डर दें", filterTitle: "फ़िल्टर" },
    MR: { searchPlaceholder: "मुलांचे कपडे आणि ब्रँड्स शोधा...", categoryHeader: "मुली आणि मुलांच्या कॅटेगरी", cartTitle: "शॉपिंग बॅग", checkout: "ऑर्डर द्या", filterTitle: "फिल्टर्स" },
    GU: { searchPlaceholder: "બાળકોના કપડાં શોધો...", categoryHeader: "છોકરીઓ અને છોકરાઓની કેટેગરી", cartTitle: "શોપિંગ બેગ", checkout: "ઓર્ડર આપો", filterTitle: "ફિલ્ટર્સ" }
};

export const CURRENCIES = {
    INR: { symbol: '₹', rate: 1, name: 'INR' },
    USD: { symbol: '$', rate: 0.012, name: 'USD' },
    EUR: { symbol: '€', rate: 0.011, name: 'EUR' },
    AED: { symbol: 'AED ', rate: 0.044, name: 'AED' }
};

export const defaultSlides = [
    { id: 1, type: "image", url: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1600&q=80" },
    { id: 2, type: "image", url: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=1600&q=80" },
    { id: 3, type: "image", url: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1600&q=80" }
];

export const defaultCategories = [
    { id: 1, name: "Girls Dresses", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Boys T-Shirts", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Girls Ethnic Wear", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Boys Shirts", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Girls Tops", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Boys Jeans", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "Girls Jackets", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Boys Jackets", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80" }
];

export const defaultProducts = [
    { id: 1, brand: "Biba Girls", title: "Floral Printed A-Line Party Dress", category: "Girls Dresses", price: 1299, originalPrice: 2499, stock: 2, rating: 4.8, fabric: "Organic Cotton Silk", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80" },
    { id: 2, brand: "Zara Kids", title: "Embroidered Tulle Tutu Dress", category: "Girls Dresses", price: 1990, originalPrice: 3290, stock: 5, rating: 4.7, fabric: "Soft Net & Satin", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80" },
    { id: 3, brand: "H&M Kids", title: "Cotton Tiered Summer Sundress", category: "Girls Dresses", price: 899, originalPrice: 1499, stock: 12, rating: 4.5, fabric: "100% Breathable Cotton", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" },
    { id: 4, brand: "Gini & Jony", title: "Polka Dot Princess Fit Dress", category: "Girls Dresses", price: 1499, originalPrice: 2299, stock: 6, rating: 4.4, fabric: "Poly-Cotton Blend", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80" },
    { id: 5, brand: "Mothercare", title: "Pastel Pink Ruffled Midi Dress", category: "Girls Dresses", price: 1799, originalPrice: 2999, stock: 1, rating: 4.9, fabric: "Pure Linen Satin", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80" },
    { id: 6, brand: "Zara Kids", title: "Ribbed Cotton Crop Top & Skirt", category: "Girls Tops", price: 1190, originalPrice: 1890, stock: 9, rating: 4.3, fabric: "Ribbed Lycra Cotton", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" },
    { id: 8, brand: "U.S. Polo Kids", title: "Striped Cotton Polo T-Shirt", category: "Boys T-Shirts", price: 799, originalPrice: 1499, stock: 15, rating: 4.6, fabric: "Pique Cotton", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80" },
    { id: 9, brand: "Tommy Hilfiger Kids", title: "Logo Graphic Crew Neck Tee", category: "Boys T-Shirts", price: 1299, originalPrice: 2199, stock: 7, rating: 4.8, fabric: "Combed Cotton", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=500&q=80" },
    { id: 10, brand: "Gini & Jony", title: "Superheroes Printed Cotton Tee", category: "Boys T-Shirts", price: 499, originalPrice: 899, stock: 11, rating: 4.3, fabric: "Soft Jersey Cotton", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80" },
    { id: 12, brand: "Allen Solly Junior", title: "Full Sleeve Checkered Casual Shirt", category: "Boys Shirts", price: 1199, originalPrice: 1999, stock: 6, rating: 4.7, fabric: "100% Cotton Weave", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80" },
    { id: 13, brand: "U.S. Polo Kids", title: "Mandarin Collar Linen Shirt", category: "Boys Shirts", price: 1399, originalPrice: 2299, stock: 4, rating: 4.6, fabric: "Pure Linen", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=500&q=80" },
    { id: 15, brand: "Biba Girls", title: "Silk Lehenga Choli with Dupatta", category: "Girls Ethnic Wear", price: 2999, originalPrice: 5499, stock: 4, rating: 4.9, fabric: "Art Silk & Zari Embroidery", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80" },
    { id: 16, brand: "FabIndia Kids", title: "Handloom Cotton Anarkali Suit", category: "Girls Ethnic Wear", price: 2199, originalPrice: 3899, stock: 6, rating: 4.7, fabric: "Handloom Chanderi", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80" },
    { id: 19, brand: "Gini & Jony", title: "Stretchable Slim Fit Blue Jeans", category: "Boys Jeans", price: 999, originalPrice: 1799, stock: 10, rating: 4.3, fabric: "Stretch Denim", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80" },
    { id: 23, brand: "Mothercare", title: "Girls Floral Quilted Puffer Jacket", category: "Girls Jackets", price: 1999, originalPrice: 3499, stock: 2, rating: 4.8, fabric: "Windproof Polyester", img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80" },
    { id: 25, brand: "Gini & Jony", title: "Boys Denim Biker Jacket", category: "Boys Jackets", price: 1699, originalPrice: 2999, stock: 5, rating: 4.6, fabric: "Heavy Duty Denim", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80" }
];

export const defaultCoupons = [
    { id: 1, code: 'SHRIRK200', discountType: 'flat', value: 200, minSpend: 999, active: true },
    { id: 2, code: 'SAVE10', discountType: 'percent', value: 10, minSpend: 499, active: true },
    { id: 3, code: 'SPIN20', discountType: 'percent', value: 20, minSpend: 1499, active: true }
];

export const defaultAddresses = [
    { id: 1, name: "Alex Johnson", type: "Home", text: "123 Fashion Street, Bandra West, Mumbai, 400050", mobile: "+91 9876543210" },
    { id: 2, name: "Alex Johnson", type: "Grandma's House", text: "45 Royal Heritage Enclave, New Delhi, 110001", mobile: "+91 9811122233" }
];

export const defaultAuditLogs = [
    { id: 1, action: "Stock Updated", detail: "Added 10 units to 'Striped Cotton Polo T-Shirt'", time: "10 mins ago" },
    { id: 2, action: "Order Stage Advanced", detail: "Order #SRK1023 set to 'Shipped'", time: "1 hour ago" },
    { id: 3, action: "Promo Created", detail: "Added coupon 'SPIN20'", time: "2 hours ago" }
];

export const mockSocialProofToasts = [
    "Priya from New Delhi just ordered a Silk Lehenga Choli!",
    "Rahul from Mumbai bought a Pack of 2 Polo Tees!",
    "Ananya from Bengaluru added a Floral Party Dress to Bag!",
    "🔥 Only 1 left in stock for Mothercare Pink Midi Dress!"
];
