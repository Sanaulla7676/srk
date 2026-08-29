/**
 * Real Firebase integration (Firestore + Auth) for Shri R.K. Fashions.
 * Firestore holds the store-wide data that must be identical for every
 * visitor and device (products, categories, hero slides, coupons,
 * orders, audit log). Per-visitor state (cart, wishlist, wallet,
 * recently viewed) intentionally stays in localStorage — it's not
 * meant to be shared.
 */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
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
