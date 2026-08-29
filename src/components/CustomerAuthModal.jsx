import React from 'react';
import AuthCard from './AuthCard';
import { customerSignIn, customerSignUp } from '../firebase';

export default function CustomerAuthModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white/70 hover:text-white text-2xl"
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <AuthCard
          brandLine="Shri R.K. Fashions"
          allowSignUp
          onSignIn={async (email, password) => {
            await customerSignIn(email, password);
            onClose();
          }}
          onSignUp={async (name, email, password) => {
            await customerSignUp(email, password, name);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
