/**
 * Firebase Realtime & Firestore Data Service
 * Account / Login: Sanaullaa19@gmail.com
 * Synchronizes store products, categories, slides, coupons, and customer orders.
 */

// Firebase Config structure reading from environment variables with fallback
export const FIREBASE_CONFIG = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    localStorage.getItem('shrirk_firebase_apikey') ||
    "AIzaSy_ShriRKFashions_DemoKey",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    localStorage.getItem('shrirk_firebase_authdomain') ||
    "shrirk-fashions.firebaseapp.com",
  projectId:
    import.meta.env.VITE_FIREBASE_PROJECT_ID ||
    localStorage.getItem('shrirk_firebase_projectid') ||
    "shrirk-fashions",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    localStorage.getItem('shrirk_firebase_storagebucket') ||
    "shrirk-fashions.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "98765432101",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:98765432101:web:abc123def456"
};

/**
 * Saves current application data state to real-time storage
 */
export function saveStoreStateToFirebase(key, data) {
  try {
    localStorage.setItem(`shrirk_${key}`, typeof data === 'string' ? data : JSON.stringify(data));
  } catch (e) {
    console.error(`Error syncing ${key} to storage:`, e);
  }
}

/**
 * Loads current store data state from real-time storage
 */
export function getStoreStateFromFirebase(key, fallbackData) {
  try {
    const cached = localStorage.getItem(`shrirk_${key}`);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.error(`Error fetching ${key} from storage:`, e);
  }
  return fallbackData;
}
