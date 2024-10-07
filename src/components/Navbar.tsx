import { Link, NavLink } from 'react-router-dom'
import Logo from '../assets/logo.png'
import SeacrhLogo from '../assets/search_icon.png'
import Profile from '../assets/profile_icon.png'
import Cart from '../assets/cart_icon.png'
import Menu from '../assets/menu_icon.png'

const Navbar = () => {
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
                <img src={Menu} className='flex sm:hidden w-5 cursor-pointer'></img>
            </div>
        </div>
    )
}

export default Navbar