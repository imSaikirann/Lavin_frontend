import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const currency = "₹"
  const deliveryFee = 10
  const [products, setProducts] = useState([]);
  const [dataStatus, setDataStatus] = useState("loading");
  const [search,setSearch] = useState('')
  const [showSearch,setShowSearch] = useState(false)
  const value = {
    currency,
    products,dataStatus, deliveryFee,
    search,setSearch,showSearch,setShowSearch
  }

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

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
