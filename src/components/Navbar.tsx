import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'
import SeacrhLogo from '../assets/search_icon.png'
import Profile from '../assets/profile_icon.png'
import Cart from '../assets/cart_icon.png'
import Menu from '../assets/menu_icon.png'
import Back from '../assets/dropdown_icon.png'
import { useState } from 'react'

const Navbar = () => {
    const [visble,setVisble] = useState(false)
    return (
        <div className='flex items-center justify-between h-[75px] md:h-[90px] lg:h-[100px] font-medium font-raleway'>
            <img src={Logo} className='w-24 md:w-28 lg:w-32'></img>

            <ul className=' hidden sm:flex gap-8 text-gray-900'>
                <NavLink to="/"><p >Home</p></NavLink>
                <NavLink to="/collections"><p >Collections</p></NavLink>
                <NavLink to="/about"><p >About</p></NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img src={SeacrhLogo} className='w-5'></img>

                <div className='group relative'>
                    <img src={Profile} className='w-5'></img>
                </div>
                <Link to="/cart" className='relative'>
                    <img src={Cart} className='w-5'></img>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center bg-black text-white rounded-full aspect-square text-[8px] leading-4'>2</p>
                </Link>
                <img onClick={()=>setVisble(true)} src={Menu} className='flex sm:hidden w-5 cursor-pointer'></img>
            </div>

            <div className={`absolute top-0 right-0 bottom-0 bg-white transition-all ${visble ? "w-full":"w-0"}`}>
           <div onClick={()=>setVisble(!visble)} className='flex p-6 flex-row gap-4 items-center cursor-pointer'>
           <img src={Back} className=' h-4 rotate-180'></img>
           Back
           </div>
                <div className='flex flex-col '>
                <NavLink to="/" className=" py-2 pl-6 border-b ">Home</NavLink>
                <NavLink to="/collections" className=" py-2 pl-6 border-b ">Collections</NavLink>
                <NavLink to="/collections" className=" py-2 pl-6 border-b ">About us</NavLink>

                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Navbar