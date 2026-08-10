import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Mount Dedicated Executive Admin Dashboard Portal Mode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App mode="admin" />
  </React.StrictMode>
);
