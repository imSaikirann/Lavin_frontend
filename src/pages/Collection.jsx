import { useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { ShopContext } from "../store/ShopContext";
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const { products, dataStatus, search, showSearch } = useContext(ShopContext); 
  const s3Url = import.meta.env.VITE_S3_URL;
  const navigate = useNavigate();

  // Filter products based on search query
  const filteredProducts = search && showSearch 
    ? products.filter(item => item.productName.toLowerCase().includes(search.toLowerCase())) 
    : products;

  const handleSelectedProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-2xl text-left md:text-center lg:text-4xl font-medium font-poppins text-gray-800">
          New Products
        </h1>
      </div>

      {/* Loading Spinner */}
      {dataStatus === 'loading' ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        /* Product Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectedProduct(product.id)}
                className="p-2 lg:p-4 h-64 md:h-56 lg:h-72 bg-white transition-shadow duration-300 ease-in-out cursor-pointer rounded-lg"
              >
                <div className="overflow-hidden">
                  {product.images.length > 0 && (
                    <img
                      src={`${s3Url}/${product.images[0]}`}
                      alt={product.productName}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex items-center justify-between pt-3 pb-1 p-1">
                  <p className="text-md font-medium font-raleway text-gray-700">
                    {product.productName}
                  </p>
                  {product.variants.length > 0 ? (
                    <p className="text-md font-medium font-raleway text-main">
                      ₹{product.price}
                    </p>
                  ) : (
                    <p className="text-md font-medium font-raleway text-main">N/A</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
