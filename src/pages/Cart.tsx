import { useEffect, useState } from "react";
import { useAppSelector } from "../store/Hooks";
import { Products } from "../types/types";
import { Link } from "react-router-dom"; // To navigate to product pages
import Spinner from "../components/Spinner"; // Spinner component

const Cart = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const products: Products[] = useAppSelector((state) => state.items); // Get products from Redux store
  const s3Url = import.meta.env.VITE_S3_URL;

  useEffect(() => {
    // Simulate a delay to demonstrate the loading spinner
    setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false); // Set loading to false after data is fetched
    }, 1000); // Adjust the delay as per your requirement
  }, []);

  // Filter products based on cart items
  const cartItems = products.filter((product) => cart.includes(product.id));

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((productId) => productId !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Checkout and clear the cart
  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    // Clear cart (you could also redirect to a checkout page)
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Your Cart</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner /> {/* Show Spinner while loading */}
        </div>
      ) : cartItems.length > 0 ? (
        <div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cartItems.map((product) => (
              <li key={product.id} className="p-4 bg-white rounded-lg shadow">
                <Link to={`/product/${product.id}`}>
                  <div className="overflow-hidden rounded-lg">
                    {product.images.length > 0 && (
                      <img
                        src={`${s3Url}/${product.images[0]}`}
                        alt={product.productName}
                        className="w-full h-60 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </div>
                  <h2 className="mt-4 font-semibold text-lg">{product.productName}</h2>
                  {product.variants.length > 0 && (
                    <p className="text-main text-md font-semibold mt-2">
                      ₹{product.variants[0].price}
                    </p>
                  )}
                </Link>
                {/* Remove from Cart Button */}
                <div className="flex flex-row justify-between mt-3">
                <button
                  className=" bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600  transition duration-300"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove from Cart
                </button>

                <button
            className=" text-black  border-2 border-black px-6 py-2 rounded-sm hover:bg-black hover:text-white transition duration-300"
            onClick={handleCheckout}
          >
            Checkout
          </button>
                </div>
            
                
        
              </li>
            ))}
          </ul>

         
        </div>
      ) : (
        <p className="text-lg">No items in the cart</p>
      )}
    </div>
  );
};

export default Cart;
