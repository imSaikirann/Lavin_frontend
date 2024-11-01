import { createRoot } from 'react-dom/client';
import App from './App'; // Import App from App.js
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './store/ShopContext'; 
import React from 'react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Ensure your HTM file has an element with id "root".');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <ShopContextProvider> 
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
