/**
 * One-time (or re-run-anytime) seed script: pushes the storefront's
 * default catalog data into the real Firestore database. Safe to
 * re-run — it upserts by id, it won't duplicate anything.
 *
 * Usage: node scripts/seed.mjs
 * Requires ADMIN_EMAIL / ADMIN_PASSWORD env vars (the same admin
 * account used to log into /admin.html).
 */
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyClIz7vh-uywKCpF-z-DctIOALsDRB5spU',
  authDomain: 'shree-rk.firebaseapp.com',
  projectId: 'shree-rk',
  storageBucket: 'shree-rk.firebasestorage.app',
  messagingSenderId: '790882645291',
  appId: '1:790882645291:web:b749ea3c7db9e0a50fc16e'
};

const defaultSlides = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1744274230634-a53d9f98eaca?auto=format&fit=crop&w=1200&q=85' },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1672985354241-2112df154346?auto=format&fit=crop&w=1200&q=85' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1746372283841-dbb3838f9935?auto=format&fit=crop&w=1200&q=85' }
];

const defaultCategories = [
  { id: 1, name: 'Girls Dresses', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Boys T-Shirts', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Girls Ethnic Wear', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Boys Shirts', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=300&q=80' },
  { id: 5, name: 'Girls Tops', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=300&q=80' },
  { id: 6, name: 'Boys Jeans', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=300&q=80' },
  { id: 7, name: 'Girls Jackets', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80' },
  { id: 8, name: 'Boys Jackets', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80' }
];

const defaultProducts = [
  { id: 1, brand: 'Biba Girls', title: 'Floral Printed A-Line Party Dress', category: 'Girls Dresses', price: 1299, originalPrice: 2499, stock: 2, rating: 4.8, fabric: 'Organic Cotton Silk', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80' },
  { id: 2, brand: 'Zara Kids', title: 'Embroidered Tulle Tutu Dress', category: 'Girls Dresses', price: 1990, originalPrice: 3290, stock: 5, rating: 4.7, fabric: 'Soft Net & Satin', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80' },
  { id: 3, brand: 'H&M Kids', title: 'Cotton Tiered Summer Sundress', category: 'Girls Dresses', price: 899, originalPrice: 1499, stock: 12, rating: 4.5, fabric: '100% Breathable Cotton', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80' },
  { id: 4, brand: 'Gini & Jony', title: 'Polka Dot Princess Fit Dress', category: 'Girls Dresses', price: 1499, originalPrice: 2299, stock: 6, rating: 4.4, fabric: 'Poly-Cotton Blend', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=500&q=80' },
  { id: 5, brand: 'Mothercare', title: 'Pastel Pink Ruffled Midi Dress', category: 'Girls Dresses', price: 1799, originalPrice: 2999, stock: 1, rating: 4.9, fabric: 'Pure Linen Satin', img: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=500&q=80' },
  { id: 6, brand: 'Zara Kids', title: 'Ribbed Cotton Crop Top & Skirt', category: 'Girls Tops', price: 1190, originalPrice: 1890, stock: 9, rating: 4.3, fabric: 'Ribbed Lycra Cotton', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80' },
  { id: 8, brand: 'U.S. Polo Kids', title: 'Striped Cotton Polo T-Shirt', category: 'Boys T-Shirts', price: 799, originalPrice: 1499, stock: 15, rating: 4.6, fabric: 'Pique Cotton', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80' },
  { id: 9, brand: 'Tommy Hilfiger Kids', title: 'Logo Graphic Crew Neck Tee', category: 'Boys T-Shirts', price: 1299, originalPrice: 2199, stock: 7, rating: 4.8, fabric: 'Combed Cotton', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=500&q=80' },
  { id: 10, brand: 'Gini & Jony', title: 'Superheroes Printed Cotton Tee', category: 'Boys T-Shirts', price: 499, originalPrice: 899, stock: 11, rating: 4.3, fabric: 'Soft Jersey Cotton', img: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=500&q=80' },
  { id: 12, brand: 'Allen Solly Junior', title: 'Full Sleeve Checkered Casual Shirt', category: 'Boys Shirts', price: 1199, originalPrice: 1999, stock: 6, rating: 4.7, fabric: '100% Cotton Weave', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80' },
  { id: 13, brand: 'U.S. Polo Kids', title: 'Mandarin Collar Linen Shirt', category: 'Boys Shirts', price: 1399, originalPrice: 2299, stock: 4, rating: 4.6, fabric: 'Pure Linen', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=500&q=80' },
  { id: 15, brand: 'Biba Girls', title: 'Silk Lehenga Choli with Dupatta', category: 'Girls Ethnic Wear', price: 2999, originalPrice: 5499, stock: 4, rating: 4.9, fabric: 'Art Silk & Zari Embroidery', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80' },
  { id: 16, brand: 'FabIndia Kids', title: 'Handloom Cotton Anarkali Suit', category: 'Girls Ethnic Wear', price: 2199, originalPrice: 3899, stock: 6, rating: 4.7, fabric: 'Handloom Chanderi', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=500&q=80' },
  { id: 19, brand: 'Gini & Jony', title: 'Stretchable Slim Fit Blue Jeans', category: 'Boys Jeans', price: 999, originalPrice: 1799, stock: 10, rating: 4.3, fabric: 'Stretch Denim', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80' },
  { id: 23, brand: 'Mothercare', title: 'Girls Floral Quilted Puffer Jacket', category: 'Girls Jackets', price: 1999, originalPrice: 3499, stock: 2, rating: 4.8, fabric: 'Windproof Polyester', img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80' },
  { id: 25, brand: 'Gini & Jony', title: 'Boys Denim Biker Jacket', category: 'Boys Jackets', price: 1699, originalPrice: 2999, stock: 5, rating: 4.6, fabric: 'Heavy Duty Denim', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=500&q=80' }
];

const defaultCoupons = [
  { id: 1, code: 'SHRIRK200', discountType: 'flat', value: 200, minSpend: 999, active: true },
  { id: 2, code: 'SAVE10', discountType: 'percent', value: 10, minSpend: 499, active: true },
  { id: 3, code: 'SPIN20', discountType: 'percent', value: 20, minSpend: 1499, active: true }
];

const defaultAuditLogs = [
  { id: 1, action: 'Stock Updated', detail: "Added 10 units to 'Striped Cotton Polo T-Shirt'", time: '10 mins ago' },
  { id: 2, action: 'Order Stage Advanced', detail: "Order #SRK1023 set to 'Shipped'", time: '1 hour ago' },
  { id: 3, action: 'Promo Created', detail: "Added coupon 'SPIN20'", time: '2 hours ago' }
];

const sampleOrder = {
  id: 'SRK1023',
  createdAt: Date.now(),
  customer: 'Alex Johnson',
  itemsCount: 2,
  total: 3298,
  giftWrap: true,
  giftNote: 'Happy Birthday Ananya!',
  status: 'Shipped',
  date: new Date().toLocaleDateString()
};

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars first.');
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, email, password);
  console.log('Signed in as', email);

  const writeAll = (collectionName, items) =>
    Promise.all(items.map((item) => setDoc(doc(db, collectionName, String(item.id)), item)));

  await writeAll('products', defaultProducts);
  console.log(`Seeded ${defaultProducts.length} products`);
  await writeAll('categories', defaultCategories);
  console.log(`Seeded ${defaultCategories.length} categories`);
  await writeAll('slides', defaultSlides);
  console.log(`Seeded ${defaultSlides.length} hero slides`);
  await writeAll('coupons', defaultCoupons);
  console.log(`Seeded ${defaultCoupons.length} coupons`);
  await writeAll('auditLogs', defaultAuditLogs);
  console.log(`Seeded ${defaultAuditLogs.length} audit log entries`);
  await setDoc(doc(db, 'orders', sampleOrder.id), sampleOrder);
  console.log('Seeded 1 sample order');

  console.log('Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
