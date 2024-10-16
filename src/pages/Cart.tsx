import { useEffect, useState } from "react";
import { useAppSelector } from "../store/Hooks";
import { Products } from "../types/types";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import RemoveCartItem from "../assets/bin_icon.png"; // Import as an image, not a component

const Cart = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const products: Products[] = useAppSelector((state) => state.items);

  const s3Url = import.meta.env.VITE_S3_URL;
  const navigate = useNavigate();
  const cartItems = products.filter((product) => cart.includes(product.id));

  useEffect(() => {
    setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((productId) => productId !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Your Cart</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border-t border-b text-gray-700 py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${s3Url}/${item.images[0]}`} // Display the first image from the array
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
                <Link to={`/product/${item.id}`} className="font-medium">
                  {item.productName}
                </Link>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                <img src={RemoveCartItem} alt="Remove item" className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg">No items in the cart</p>
      )}
    </div>
  );
};

export default Cart;
