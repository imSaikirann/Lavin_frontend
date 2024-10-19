import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../store/ShopContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';

const Order = () => {
  const { dataStatus, cart, products, removeFromCart } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const s3Url = import.meta.env.VITE_S3_URL;

  const handleRemove = (productId, variantId) => {
    removeFromCart(productId, variantId);
  };

  const handleConfirmOrder = () => {
    // Implement your order confirmation logic here
    // e.g., API call to submit the order
    console.log("Order confirmed!");
    navigate("/thank-you"); // Redirect to a thank you page or order summary
  };

  const getProductImage = (productId, variantIndex) => {
    const product = products.find((product) => product.id === productId);
    if (product && product.images && product.images[variantIndex]) {
      return `${s3Url}/${product.images[variantIndex]}`;
    }
  };

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Order Summary</h1>

      {loading || dataStatus === "loading" ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.variant.id}`}
              className="border-t border-b text-gray-700 py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={getProductImage(item.productId, item.varientIndex)}
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
                <div className="font-medium">
                  {item.productName} - {item.variant.color}
                </div>
              </div>

              <div>
                <p>Quantity: {item.quantity}</p>
              </div>

              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemove(item.productId, item.variant.id)}
              >
                <img src={assets.bin_icon} alt="Remove from cart" className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="mt-8">
            <CartTotal />
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-medium">Shipping Information</h2>
            <p className="mt-2">Please confirm your shipping details before placing the order.</p>
            <form className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="address">Shipping Address:</label>
                <textarea
                  id="address"
                  className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400"
                  rows="3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="pincode">Pin Code:</label>
                <input
                  type="text"
                  id="pincode"
                  className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:border-orange-400"
                  required
                />
              </div>
              <button
                type="button"
                className="bg-black text-white px-5 py-3 cursor-pointer rounded-lg transition duration-200 hover:bg-gray-800"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </form>
          </div>
        </>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Order;
