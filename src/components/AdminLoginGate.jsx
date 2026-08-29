import React from 'react';
import AuthCard from './AuthCard';
import { adminSignIn } from '../firebase';

export default function AdminLoginGate() {
  return (
    <main className="flex-grow min-h-screen flex items-center justify-center bg-rkCreamSoft p-6">
      <AuthCard
        brandLine="Owner Admin Portal"
        allowSignUp={false}
        onSignIn={(email, password) => adminSignIn(email, password)}
        onSignUp={async () => {}}
      />
    </main>
  );
}
