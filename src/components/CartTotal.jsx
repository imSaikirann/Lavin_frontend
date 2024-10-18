import React, { useContext } from 'react';
import { ShopContext } from '../store/ShopContext';

const CartTotal = () => {
    const { currency, deliveryFee, cart } = useContext(ShopContext);

  

    return (
        <div className="w-full p-4 bg-white shadow rounded-md">
            <div className="text-2xl font-semibold mb-4">
                <h1>Cart Total</h1>
            </div>
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}100</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{deliveryFee}</p>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                    <p>Total</p>
                    <p>{currency}110</p>
                </div>
                <hr />
            </div>
        </div>
    );
}

export default CartTotal;
