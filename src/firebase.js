/**
 * Real Firebase integration (Firestore + Auth) for Shri R.K. Fashions.
 * Firestore holds the store-wide data that must be identical for every
 * visitor and device (products, categories, hero slides, coupons,
 * orders, audit log, customer profiles). Per-visitor state (cart,
 * wishlist, wallet, recently viewed) intentionally stays in
 * localStorage — it's not meant to be shared.
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Mirrors the UID locked into firestore.rules — the only account whose
// writes to store-wide data (products, categories, etc.) are accepted.
// This client-side check is just for UI gating; the real enforcement
// lives in the security rules.
export const ADMIN_UID = 'bwwzJ2JCJESqGiqyUwewVjgwXz22';

const app = initializeApp(FIREBASE_CONFIG);
export const db = getFirestore(app);
export const auth = getAuth(app);

/**
 * Live-subscribes to every document in a collection. Callback fires
 * immediately with current data and again on every change from any
 * device — this is what makes admin edits show up everywhere.
 */
export function subscribeToCollection(collectionName, callback) {
  return onSnapshot(
    collection(db, collectionName),
    (snapshot) => callback(snapshot.docs.map((d) => d.data())),
    (err) => console.error(`Firestore subscription failed for '${collectionName}':`, err)
  );
}

/** Same as subscribeToCollection but scoped to one customer's own orders. */
export function subscribeToCustomerOrders(uid, callback) {
  return onSnapshot(
    query(collection(db, 'orders'), where('customerId', '==', uid)),
    (snapshot) => callback(snapshot.docs.map((d) => d.data())),
    (err) => console.error('Firestore subscription failed for customer orders:', err)
  );
}

/** Creates or fully overwrites one document (id must be present on `data`). */
export function upsertDoc(collectionName, id, data) {
  return setDoc(doc(db, collectionName, String(id)), data);
}

export function deleteDocById(collectionName, id) {
  return deleteDoc(doc(db, collectionName, String(id)));
}

export function adminSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function adminSignOut() {
  return signOut(auth);
}

/** Fires immediately with the current user (or null), then on every change. */
export function watchAdminAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// --- Customer-facing auth (same underlying Firebase project/Auth pool as
// the admin account above — Firestore rules, not a separate auth system,
// are what keep customers from touching store-wide data). ---

export function customerSignUp(email, password, name) {
  return createUserWithEmailAndPassword(auth, email, password).then(async (cred) => {
    if (name) await updateProfile(cred.user, { displayName: name });
    await setDoc(doc(db, 'customers', cred.user.uid), {
      uid: cred.user.uid,
      name: name || '',
      email,
      createdAt: Date.now()
    });
    return cred;
  });
}

export function customerSignIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function customerSignOut() {
  return signOut(auth);
}
