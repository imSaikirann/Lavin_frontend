import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../store/ShopContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Auth/axiosConfig"; 
import Spinner from "../components/Spinner";
import { assets } from "../assets/assets";
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { dataStatus, cart, setCart, removeFromCart, updateCartQuantity, variantImage} = useContext(ShopContext); 
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  const handleRemove = (productId, variantId) => {
    removeFromCart(productId, variantId); 
  };


  const fetchCartData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
  
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
      if (token) {
     
        // if (localCart.length > 0) {
        //   await axios.post(
        //     `/api/v1/userCart/cart/sync`,
        //     { localCartItems: localCart },
        //     {
        //       headers: { Authorization: `Bearer ${token}` },
        //       withCredentials: true,
        //     }
        //   );
        //   localStorage.removeItem("cart");
        // }
  
        // Fetch the server cart
        const response = await axios.get(`${apiUrl}/api/v1/userCart/getCartItems`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setCart(response.data.cart.items);
      } else {
        // Use the local cart if the user is not logged in
        setCart(localCart);
      }
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Failed to fetch cart items.");
    } finally {
      setLoading(false);
    }
  };
  
  


const handleQuantityChange = async (productId, variantId, newQuantity) => {
  if (newQuantity >= 1) {
  
    await updateCartQuantity(productId, variantId, newQuantity);


    setCart(prevCart =>
      prevCart.map(item =>
        item.productId === productId && item.variant.id === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }
};


useEffect(() => {
  fetchCartData();
}, []); 

  
  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Your Cart</h1>

      {loading || dataStatus === "loading" ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div
              key={`${item.productId}-${item.variant.id}`}
              className="border-t border-b text-gray-700 py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.variantImage || assets.defaultImage} // Add default image if variantImage is missing
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col">
                  <Link to={`/product/${item.productId}`} className="font-medium">
                    {item.variant.color}
                  </Link>
                  <h2>{item.productPrice}</h2>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.productId, item.variant.id, item.quantity - 1)}
                  className={`border border-gray-300 rounded-l py-2 px-4 focus:outline-none ${item.quantity <= 1 ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-orange-400 hover:text-white'}`}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  id="quantity"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, item.variant.id, parseInt(e.target.value, 10))}
                  className="border-t border-b border-gray-300 py-2 px-4 w-16 text-center focus:outline-none focus:border-orange-400"
                  readOnly
                />
                <button
                  onClick={() => handleQuantityChange(item.productId, item.variant.id, item.quantity + 1)}
                  className="border border-gray-300 rounded-r py-2 px-4 focus:outline-none hover:bg-orange-400 hover:text-white"
                >
                  +
                </button>
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemove(item.productId, item.variant.id)}
              >
                <img src={assets.bin_icon} alt="Remove from cart" className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="mt-8 w-full sm:w-1/2">
            <CartTotal />
            <div className="flex flex-col gap-4 mt-4">
              <Link to="/placeorder">
                <button className="px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg">Order Now</button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="text-xl text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
