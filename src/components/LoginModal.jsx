import React, { useState } from 'react';

export default function LoginModal({
  isLoginOpen,
  setIsLoginOpen,
  setIsAdminLoggedIn,
  setView,
  showToast
}) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-darkBorder rounded-lg max-w-xs w-full p-6 relative">
        <button onClick={() => setIsLoginOpen(false)} className="absolute top-4 right-4 text-gray-400 text-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="font-extrabold text-sm uppercase text-brandPink text-center mb-4">Owner Admin Login</h3>
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1 bg-transparent dark:text-white"
            />
          </div>
          <div>
            <label className="font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded mt-1 bg-transparent dark:text-white"
            />
          </div>
          <button
            onClick={() => {
              if (username === 'admin' && password === 'password123') {
                setIsAdminLoggedIn(true);
                setIsLoginOpen(false);
                setView('admin');
                showToast('Logged in as Admin');
              } else {
                alert('Invalid credentials!');
              }
            }}
            className="w-full bg-brandPink text-white font-bold py-2.5 rounded uppercase text-xs"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
