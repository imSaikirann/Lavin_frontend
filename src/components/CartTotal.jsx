import React, { useContext } from 'react';
import { ShopContext } from '../store/ShopContext';
import { Link } from 'react-router-dom';


const CartTotal = () => {
    const { currency, deliveryFee, cart } = useContext(ShopContext);

    // Calculate the subtotal by multiplying price by quantity for each item in the cart
    const subtotal = cart.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0);
    
    // Calculate the total by adding the delivery fee
    const total = subtotal + deliveryFee;

    return (
        <div className="w-full p-4 bg-orange-200 shadow rounded-md">
            <div className="text-2xl font-semibold mb-4">
                <h1>Cart Total</h1>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}</p>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>{currency}{total.toFixed(2)}</p>
                </div>
                <hr />

                <div className='flex flex-col gap-4 mt-4'>
                    
                   <Link to="/orders">
                   <button className='px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg'>Place Order</button></Link>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
