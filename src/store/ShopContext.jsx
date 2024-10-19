import axios from "axios";
import { createContext, useState, useEffect } from "react";

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

  // Retrieve cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    console.log("Parsed Cart:", parsedCart); // Debugging line
    setCart(parsedCart);
  }, []);

  // Recalculate cart count whenever cart changes
  useEffect(() => {
    console.log("Current Cart:", cart); 
    const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
    setCartCount(totalCartCount);
    console.log("Total Cart Count:", totalCartCount); 
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (productId, variantId) => {
    setCart((prevCart) => prevCart.filter(item => !(item.productId === productId && item.variant.id === variantId)));
  };

  const handleCart = (id, selectedProduct, selectedVariantIndex, quantity,productPrice) => {
    try {
      const selectedVariant = selectedProduct.variants[selectedVariantIndex];


      const existingProductIndex = cart.findIndex(
        (item) => item.productId === id && item.variant.id === selectedVariant.id 
      );

      let updatedCart;

      if (existingProductIndex >= 0) {
      
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        );
      } else {
     
        updatedCart = [
          ...cart,
          {
            productId: id,
            variant: selectedVariant,
            quantity: quantity, 
            varientIndex:selectedVariantIndex,
            productPrice:productPrice
          },
        ];
      }

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/bookProducts/getProducts`);
        setProducts(response.data.data);
        setDataStatus("success");
      } catch (error) {
        console.error("Error fetching products:", error);
        setDataStatus("error");
      }
    };

    fetchData();
  }, []);

  // Add this function inside ShopContextProvider
const updateCartQuantity = (productId, variantId, newQuantity) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.productId === productId && item.variant.id === variantId
        ? { ...item, quantity: newQuantity }
        : item
    )
  );
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
    handleCart,
    removeFromCart,
    updateCartQuantity
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
