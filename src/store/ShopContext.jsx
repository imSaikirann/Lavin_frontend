import axios from "../Auth/axiosConfig";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 10;
  const [products, setProducts] = useState([]);
  const [dataStatus, setDataStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isUser, setIsUser] = useState(!!localStorage.getItem("token")); 
  const navigate = useNavigate();

  // Helper functions for token handling
  const getToken = () => localStorage.getItem("token");
  const setToken = (token) => localStorage.setItem("token", token);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  useEffect(() => {
    const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
    setCartCount(totalCartCount);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = async (productId, variantId) => {
    const token = getToken();

    if (token) {
      try {
        await axios.delete('/api/v1/userCart/cart/removeProduct', {
          headers: { Authorization: `Bearer ${token}` },
          data: { productId, variantId },
          withCredentials: true,
        });

        setCart((prevCart) =>
          prevCart.filter((item) => !(item.productId === productId && item.variant.id === variantId))
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      setCart((prevCart) =>
        prevCart.filter((item) => !(item.productId === productId && item.variant.id === variantId))
      );
    }
  };

  const handleCart = async (id, selectedProduct, selectedVariantIndex, quantity, productPrice) => {
    try {
      const selectedVariant = selectedProduct.variants[selectedVariantIndex];
      const existingProductIndex = cart.findIndex(
        (item) => item.productId === id && item.variant.id === selectedVariant.id
      );

      const variantImage = selectedProduct.images[selectedVariantIndex];
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [
          ...cart,
          {
            productId: id,
            variant: selectedVariant,
            quantity,
            variantIndex: selectedVariantIndex,
            productPrice,
            variantImage,
          },
        ];
      }

      setCart(updatedCart);

      const token = getToken();
      if (token) {
        const apiUrl = import.meta.env.VITE_API_URL;
        await axios.post(
          `${apiUrl}/api/v1/userCart/cart/addProduct`,
          { productId: id, variant: selectedVariant, variantIndex: selectedVariantIndex, quantity, productPrice, variantImage },
          { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, withCredentials: true }
        );
      } else {
        console.log("hi")
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const updateCartQuantity = async (productId, variantIndex, newQuantity) => {
    const token = getToken();
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      if (token) {
        await axios.patch(
          `${apiUrl}/api/v1/userCart/cart/updateQuantity`,
          { productId, variantIndex, newQuantity },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        console.log('Cart item quantity updated successfully on server');
      } else {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === productId && item.variantIndex === variantIndex
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId && item.variantIndex === variantIndex
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
    }
  };

 // Fetch products data
 useEffect(() => { 
  const fetchData = async () => {
    try {
   
      const response = await axios.get('/api/v1/bookProducts/getProducts');
      setProducts(response.data.data);
      setDataStatus("success");
    } catch (error) {
      console.error("Error fetching products:", error);
      setDataStatus("error");
    }  
  };

  fetchData();
}, []);


  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    const token = getToken();

    if (token) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/user/profile`, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate('/login');
    }
  };

  const sendOtp = async (email) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/auth/send-otp`, { email });
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async (email, code, userDetails) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${apiUrl}/api/v1/auth/verify-otp`, {
        email,
        code,
        ...userDetails,
      }, { withCredentials: true });

      setToken(response.data.newAccessToken);  
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  };

  const value = {
    currency,
    products,
    dataStatus,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartCount,
    cart,
    setCart,
    handleCart,
    removeFromCart,
    updateCartQuantity,
    userData,
    setUserData,
    sendOtp,
    verifyOtp,
    isUser
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
