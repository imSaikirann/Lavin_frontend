import { Link, NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import React from 'react';
import { ShopContext } from '../store/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);

   const {setShowSearch,cartCount} = useContext(ShopContext)
    const location = useLocation();

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "About", href: "/about" },
    ];



    return (
        <div className='flex items-center justify-between h-[75px] md:h-[90px] lg:h-[100px] font-medium font-raleway'>
            <Link to="/"><img src={assets.logo} alt="Logo" className='w-24 md:w-28 lg:w-32' /></Link>

         
            <ul className='hidden sm:flex gap-8 text-gray-900'>
                {navItems.map(item => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={() =>
                            classNames("text-gray-700", {
                                'text-main': location.pathname === item.href
                            })
                        }
                    >
                        <p>{item.name}</p>
                    </NavLink>
                ))}
            </ul>

            {/* Action icons */}
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} alt="Search" className='w-5'  onClick={()=>setShowSearch(true)}/>

                <div className='group relative'>
                   <Link to="/Signup"> <img src={assets.profile_icon} alt="Profile" className='w-5' /></Link>
                </div>

                <Link to="/cart" className='relative'>
                    <img src={assets.cart_icon} alt="Cart" className='w-5' />
                    {/* Only show the cart count badge if the cart count is greater than 0 */}
                    {cartCount > 0 && (
                        <p className={`absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full aspect-square text-[8px] leading-4`}>
                            {cartCount}
                        </p>
                    )}
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="Menu" className='flex sm:hidden w-5 cursor-pointer' />
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`sm:hidden fixed top-0 right-0 bottom-0 bg-white z-40 transition-transform duration-300 ${visible ? "translate-x-0 w-[100%]" : "translate-x-full w-0"}`}>
                <div onClick={() => setVisible(!visible)} className='flex p-6 gap-4 items-center cursor-pointer'>
                    <img src={assets.dropdown_icon} alt="Back" className='h-4 rotate-180' />
                    Back
                </div>
                <div className='flex flex-col text-lg'>
                    {navItems.map(item => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            onClick={() => setVisible(false)}
                            className={() =>
                                classNames("py-2 pl-6 border-b", {
                                    'text-main': location.pathname === item.href
                                })
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Overlay to close the sidebar */}
            {visible && (
                <div
                    onClick={() => setVisible(false)}
                    className="fixed inset-0 bg-black opacity-50 z-30"
                ></div>
            )}
        </div>
    );
};

export default Navbar;
