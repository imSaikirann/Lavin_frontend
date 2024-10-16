import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [dataStatus, setDataStatus] = useState("loading");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL; 
        const response = await axios.get(`${apiUrl}/api/v1/products/getProducts`); 
        console.log(response)
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
    <ShopContext.Provider value={{ products, dataStatus }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
