import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
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
                    <Input type={"text"} placeholder={'First Name'}/>
                    <Input type={"text"} placeholder={'Last Name'}/>

                </div>
                <Input type={"email"} placeholder={'Email address'}/>
                <Input type={"text"} placeholder={'Street'}/>

                <div className='flex gap-4'>
                <Input type={"text"} placeholder={'City'}/>
                <Input type={"text"} placeholder={'State'}/>

                </div>
                <div className='flex gap-4'>
                <Input type={"number"} placeholder={'Pin code'}/>
                <Input type={"number"} placeholder={'Country'}/>

                </div>
                <Input type={"number"} placeholder={'Phone'}/>

              
            </div>

            {/* Payment Method */}
            <div className='mt-8 w-full sm:max-w-[480px]'>
               <div>
                <CartTotal/>
               </div>

               <div className='flex flex-col gap-4 mt-4'>
                    
                    <Link to="/orders">
                    <button className='px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg'>Place Order</button></Link>
                 </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
