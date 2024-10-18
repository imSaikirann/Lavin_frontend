import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import RemoveCartItem from "../assets/bin_icon.png";
import { ShopContext } from "../store/ShopContext";
import { Input } from "../components/Input";

const Cart = () => {
  const { products = [], dataStatus = "loading" } = useContext(ShopContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const s3Url = import.meta.env.VITE_S3_URL;

  // Fetch cart from localStorage and parse it
  useEffect(() => {
    setTimeout(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
      setLoading(false);
    }, 1000);
  }, []);

  // Remove from cart by productId and variant index
  const removeFromCart = (productId, variantIndex) => {
    const updatedCart = cart.filter(
      (item) => !(item.productId === productId && item.variant.index === variantIndex)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Map through cart and find product + its selected variant index
  const cartItems = cart.map(({ productId, variant }) => {
    const product = products.find((p) => p.id === productId);
    return product ? { ...product, selectedVariant: variant } : null;
  }).filter(Boolean);

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-medium font-poppins mb-6">Your Cart</h1>

      {loading || dataStatus === "loading" ? (
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
                  src={`${s3Url}/${item.images[item.selectedVariant.index]}`}
                  alt={item.productName}
                  className="w-16 h-16 object-cover"
                />
                <Link to={`/product/${item.id}`} className="font-medium">
                  {item.productName} - {item.variants[item.selectedVariant.index].color}
                </Link>
              </div>

            <div>
            <input
            type="number"
            defaultValue={1}
            className='border border-gray-300 rounded py-2 px-4 w-20 focus:outline-none focus:border-orange-400'></input>

            </div>
              <button
                onClick={() => removeFromCart(item.id, item.selectedVariant.index)}
                className="text-red-500 hover:underline"
              >
                <img src={RemoveCartItem} alt="Remove from cart" className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
         <Link to ="/placeorder">
         <button
              onClick={handleCheckout}
              className="bg-black text-white py-2 px-6 rounded "
            >
              Checkout
            </button>
         </Link>
          </div>
        </>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
