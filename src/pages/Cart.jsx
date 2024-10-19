import { useContext,useEffect,useState } from "react";
import { ShopContext } from "../store/ShopContext";
import { useNavigate,Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { assets } from "../assets/assets";

const Cart = () => {
  const { dataStatus, cart } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const s3Url = import.meta.env.VITE_S3_URL;

  console.log(cart)




  const handleCheckout = () => {
    navigate("/checkout");
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
                {/* Check if images exist before accessing them */}
                <img
                  src={item.variant.images && item.variant.images.length > 0 ? 
                      `${s3Url}/${item.images[0]}` : "default_image_url"} // Fallback image
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
                  value={quantities[`${item.productId}-${item.variant.id}`] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, item.variant.id, Math.max(1, Number(e.target.value)))
                  }
                  className="border border-gray-300 rounded py-2 px-4 w-20 focus:outline-none focus:border-orange-400"
                  min="1"
                />
              </div>

              <button
               
                className="text-red-500 hover:underline"
              >
                <img src={assets.bin_icon} alt="Remove from cart" className="w-6 h-6" />
              </button>
            </div>
          ))}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
