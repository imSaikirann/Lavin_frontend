import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../store/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

export const Search = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  // useEffect to handle visibility based on route
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-orange-50 text-center py-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center w-80 max-w-2xl bg-white border border-gray-300 px-4 py-3 rounded-full shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700 px-2"
            type="text"
            placeholder="Search for products..."
            aria-label="Search"
          />
          <img
            className="w-5 h-5 cursor-pointer"
            src={assets.search_icon}
            alt="Search icon"
          />
        </div>
        <button
          onClick={() => setShowSearch(false)}
          className="ml-3 text-gray-500 hover:text-gray-700 transition duration-200"
        >
          <img
            className="w-3 h-3"
            src={assets.cross_icon}
            alt="Close search"
          />
        </button>
      </div>
    </div>
  ) : null;
};
