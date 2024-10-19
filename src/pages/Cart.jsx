import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../store/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { dataStatus, cart, products, removeFromCart, updateCartQuantity } = useContext(ShopContext); // <-- Get the updateCartQuantity method

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const s3Url = import.meta.env.VITE_S3_URL;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const getProductImage = (productId, variantIndex) => {
    const product = products.find((product) => product.id === productId);
    if (product && product.images && product.images[variantIndex]) {
      return `${s3Url}/${product.images[variantIndex]}`;
    }
  };

  const handleRemove = (productId, variantId) => {
    removeFromCart(productId, variantId); // Call the context method
  };

  const handleQuantityChange = (productId, variantId, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartQuantity(productId, variantId, newQuantity);
    }
  };

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Your Cart</h1>

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
                <Link to={`/product/${item.productId}`} className="font-medium">
                  {item.productName} - {item.variant.color}
                </Link>
              </div>

              <div>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, item.variant.id, parseInt(e.target.value, 10))}
                  className="border border-gray-300 rounded py-2 px-4 w-20 focus:outline-none focus:border-orange-400"
                  min="1"
                />
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
        </>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
