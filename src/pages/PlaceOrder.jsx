import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <div className='flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t px-4 font-poppins'>
            {/* Delivery Information */}
            <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
                <div className='text-2xl font-bold mb-3'>
                    Delivery Information
                </div>
                <div className='flex gap-4'>
                    <input
                        type="text"
                        placeholder='First Name'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                    <input
                        type="text"
                        placeholder='Last Name'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                </div>
                <input
                    type="email"
                    placeholder='Email address'
                    className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                <input
                    type="text"
                    placeholder='Street'
                    className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                <div className='flex gap-4'>
                    <input
                        type="text"
                        placeholder='City'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                    <input
                        type="text"
                        placeholder='State'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                </div>
                <div className='flex gap-4'>
                    <input
                        type="number"
                        placeholder='Zip code'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                    <input
                        type="text"
                        placeholder='Country'
                        className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
                </div>
                <input
                    type="number"
                    placeholder='Phone'
                    className='border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400'></input>
            </div>

            {/* Payment Method */}
            <div className='mt-8 w-full sm:max-w-[480px]'>
               <div>
                <CartTotal/>
               </div>

                <div className='flex flex-col gap-4 mt-4'>
                    
                    <button className='px-4 py-3 rounded-sm bg-black text-white hover:shadow-lg'>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
