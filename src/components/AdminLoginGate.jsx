import React, { useState } from 'react';
import { adminSignIn } from '../firebase';

export default function AdminLoginGate() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await adminSignIn(email, password);
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-grow min-h-screen flex items-center justify-center bg-gray-100 dark:bg-darkBg p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-xs w-full p-6"
      >
        <h1 className="font-extrabold text-sm uppercase text-brandPink text-center mb-4 font-serif">
          Shri R.K. Fashions
          <span className="block text-gray-500 text-[11px] font-bold normal-case mt-1">Owner Admin Login</span>
        </h1>
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full px-3 py-2 border rounded mt-1 bg-transparent dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded mt-1 bg-transparent dark:text-white border-gray-300 dark:border-gray-700"
            />
          </div>
          {error && <p className="text-red-500 font-bold">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brandPink text-white font-bold py-2.5 rounded uppercase text-xs disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </div>
      </form>
    </main>
  );
}
