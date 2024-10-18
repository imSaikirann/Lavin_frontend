import React, { useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");

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
                <div className='text-2xl font-bold mt-6 mb-6'>
                    Payment Method
                </div>
                <div className='flex flex-col gap-4'>
                    <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-4 cursor-pointer rounded-md hover:shadow-lg'>
                        <p className={`w-5 h-5 border rounded-full flex items-center justify-center ${method === 'razorpay' ? "bg-green-400" : ''}`}>
                            {method === 'razorpay' && <span className="w-3 h-3 bg-white rounded-full"></span>}
                        </p>
                        <img className='h-6' src={assets.razorpay_logo} alt='Razorpay Logo' />
                    </div>
                    <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-4 cursor-pointer rounded-md hover:shadow-lg'>
                        <p className={`w-5 h-5 border rounded-full flex items-center justify-center ${method === 'cod' ? "bg-green-400" : ''}`}>
                            {method === 'cod' && <span className="w-3 h-3 bg-white rounded-full"></span>}
                        </p>
                        <p className='text-gray-600 text-sm font-medium'>
                            Cash On Delivery
                        </p>
                    </div>
                    <button className='px-4 py-3 rounded-sm bg-black text-white'>Place Order</button>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
