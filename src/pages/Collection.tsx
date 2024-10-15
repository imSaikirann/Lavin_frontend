import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { Products } from "../types/types";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/Hooks";
import { fetchData } from "../store/ProductSlice";

const Collection = () => {
  const dataStatus = useAppSelector((state) => state.status); 
  const products: Products[] = useAppSelector((state) => state.items); 
  const dispatch = useAppDispatch();
  const s3Url = import.meta.env.VITE_S3_URL;

  useEffect(() => {
    if (dataStatus === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, dataStatus]);

  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-2xl text-left md:text-center lg:text-4xl font-medium font-poppins text-gray-800">
          New Products
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {dataStatus === 'loading' ? (
          <Spinner />
        ) : (
          products.map((product) => (
            <Link to="/product" key={product.id}>
              <div className="p-2 lg:p-4 h-64 md:h-56 lg:h-72 bg-white transition-shadow duration-300 ease-in-out cursor-pointer rounded-lg">
                <div className="overflow-hidden">
                  {product.images.length > 0 && (
                    <img
                      src={`${s3Url}/${product.images[0]}`} // Display the first image in the array
                      alt={product.productName}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex items-center justify-between pt-3 pb-1 p-1">
                  <p className="text-md font-medium font-raleway text-gray-700">{product.productName}</p>
                  {product.variants.length > 0 ? (
                    <p className="text-md font-medium font-raleway text-main">₹{product.variants[0].price}</p> // Display the first variant's price
                  ) : (
                    <p className="text-md font-medium font-raleway text-main">N/A</p> // Handle case where no variant is available
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Collection;
