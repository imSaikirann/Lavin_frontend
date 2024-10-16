import React, { useContext } from 'react';
import { ShopContext } from '../store/ShopContext';
import { assets } from '../assets/assets';

export const Search = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return showSearch ? (
    <div className="border-t border-b bg-orange-50 text-center">
      <div className="inline-flex items-center bg-white justify-center border-gray-700 px-5 py-3 my-5 mx-3 rounded-full sm:w-1/2 md:w-full">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          aria-label="Search" 
        />
        <img 
          className="w-4 cursor-pointer" 
          src={assets.search_icon} 
          alt="Search icon"
        />
      </div>
      <img 
        onClick={() => setShowSearch(false)} 
        className="inline w-3 cursor-pointer" 
        src={assets.cross_icon} 
        alt="Close search" 
      />
    </div>
  ) : null;
};
