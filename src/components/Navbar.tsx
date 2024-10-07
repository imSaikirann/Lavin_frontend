import { Link, NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';
import SearchLogo from '../assets/search_icon.png';
import Profile from '../assets/profile_icon.png';
import Cart from '../assets/cart_icon.png';
import Menu from '../assets/menu_icon.png';
import Back from '../assets/dropdown_icon.png';
import { useState } from 'react';
import classNames from 'classnames';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation(); 

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Collections", href: "/collections" },
        { name: "About", href: "/about" },
    ];

    return (
        <div className='flex items-center justify-between h-[75px] md:h-[90px] lg:h-[100px] font-medium font-raleway'>
            <img src={Logo} alt="Logo" className='w-24 md:w-28 lg:w-32' />

            <ul className='hidden sm:flex gap-8 text-gray-900'>
                {navItems.map(item => (
                    <NavLink 
                        key={item.name} 
                        to={item.href} 
                        className={({  }) => 
                            classNames("text-gray-700", {
                                'text-main': location.pathname === item.href 
                            })
                        }
                    >
                        <p>{item.name}</p>
                    </NavLink>
                ))}
            </ul>

            <div className='flex items-center gap-6'>
                <img src={SearchLogo} alt="Search" className='w-5' />
                
                <div className='group relative'>
                    <img src={Profile} alt="Profile" className='w-5' />
                </div>

                <Link to="/cart" className='relative'>
                    <img src={Cart} alt="Cart" className='w-5' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full aspect-square text-[8px] leading-4'>2</p>
                </Link>

                <img onClick={() => setVisible(true)} src={Menu} alt="Menu" className='flex sm:hidden w-5 cursor-pointer' />
            </div>

            <div className={`sm:hidden absolute top-0 right-0 bottom-0 bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
                <div onClick={() => setVisible(!visible)} className='flex p-6 flex-row gap-4 items-center cursor-pointer'>
                    <img src={Back} alt="Back" className='h-4 rotate-180' />
                    Back
                </div>
                <div className='flex flex-col'>
                    <NavLink to="/"   onClick={() => setVisible(!visible)} className={({  }) => 
                        classNames("py-2 pl-6 border-b", {
                            'text-main': location.pathname === "/"
                        })
                    }>Home</NavLink>
                    <NavLink to="/collections"  onClick={() => setVisible(!visible)} className={({  }) => 
                        classNames("py-2 pl-6 border-b", {
                            'text-main': location.pathname === "/collections"
                        })
                    }>Collections</NavLink>
                    <NavLink to="/about"  onClick={() => setVisible(!visible)} className={({  }) => 
                        classNames("py-2 pl-6 border-b", {
                            'text-main': location.pathname === "/about"
                        })
                    }>About</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
