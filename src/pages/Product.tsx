import axios from "axios";
import { useEffect, useState } from "react";
import { Products } from "../types/types";

const Product: React.FC = () => {
    const [products, setProducts] = useState<Products[]>([]);
    const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    
    const apiUrl = import.meta.env.VITE_API_URL;
    const s3Url = import.meta.env.VITE_S3_URL; 

    const fetchData = async () => {
        try {
            const response = await axios.get<{ data: Products[]}>(`${apiUrl}/api/v1/products/getProducts`);
            setProducts(response.data.data);
            console.log(response.data.data); // Log fetched products
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const selectedProduct = products[selectedProductIndex] || null;

    const handleCart = (id: string) => {
      try {
          // Get the cart from localStorage or initialize an empty array if it doesn't exist
          const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
          // Check if the product ID is already in the cart to prevent duplication
          if (!cart.includes(id)) {
              // Add the new product ID to the cart array
              cart.push(id);
  
              // Save the updated cart back to localStorage
              localStorage.setItem("cart", JSON.stringify(cart));
              console.log("Product added to cart:", id);
          } else {
              console.log("Product is already in the cart");
          }
      } catch (error) {
          console.error("Error handling cart:", error);
      }
  };
  
    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                <div className="flex-1 flex flex-row gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {products.map((product, productIndex) => (
                            <div key={product.id}>
                                {product.images.map((image, imageIndex) => (
                                    <img
                                        onClick={() => {
                                            setSelectedProductIndex(productIndex); 
                                            setSelectedImageIndex(imageIndex); 
                                        }} 
                                        key={imageIndex}
                                        src={`${s3Url}/${image}`} 
                                        alt={`Product image ${imageIndex + 1}`}
                                        className="w-[20%] sm:w-full  sm:mb-3 flex-shrink-0 cursor-pointer"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    
                    {/* Display selected product image */}
                    <div className="w-full sm:w-[80%]">
                        {selectedProduct && selectedProduct.images.length > 0 && (
                            <img
                                src={`${s3Url}/${selectedProduct.images[selectedImageIndex]}`} 
                                alt="Selected Product"
                                className="w-full h-auto"
                            />
                        )}
                    </div>
                </div>

                {/* Display selected product name and price */}
                <div className="flex-1 font-poppins">
                    {selectedProduct ? (
                        <div>
                          <h1 className="font-medium text-2xl mt-2">{selectedProduct.productName}</h1>
                        
                          {selectedProduct.variants.length > 0 ? (
                              <p className="mt-3 font-semibold text-2xl"> ₹{selectedProduct.variants[selectedImageIndex].price} </p>
                             
                          ) : (
                              <p>No variants available</p>
                          )}
                           <p className="mt-5 text-gray-600 md:w-4/5"> {selectedProduct.productDescription} </p>
                           {selectedProduct.variants.length > 0 ? (
                              <p className="mt-3 font-semibold text-2xl"> {selectedProduct.variants[selectedImageIndex].color} </p>
                             
                          ) : (
                              <p>No variants available</p>
                          )}

                          <button className="bg-black text-white px-5 py-2 mt-5 cursor-pointer"
                          onClick={()=>handleCart(selectedProduct.id)}
                          >Add to Cart</button>
                        </div>
                    ) : (
                        <p>No product selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
