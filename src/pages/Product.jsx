import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ShopContext } from "../store/ShopContext";

const Product = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [showInternalPages, setShowInternalPages] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1); // New quantity state

  const { products = [], dataStatus = "loading", handleCart } = useContext(ShopContext) || {};
  const s3Url = import.meta.env.VITE_S3_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const selectedProduct = products.find((product) => product.id === id) || null;

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index);
    setSelectedImageIndex(0);
    setShowInternalPages(false);
    setCurrentPageIndex(0);
    setQuantity(1); // Reset quantity when variant changes
    window.scrollTo(0, 0);
  };

  const handleInternalPageClick = () => {
    setSelectedImageIndex(0);
    setShowInternalPages(true);
    setCurrentPageIndex(0);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPageIndex < selectedProduct.internalPages[0].images.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const addToCart = () => {
    handleCart(id, selectedProduct, selectedVariantIndex, quantity); // Pass quantity to handleCart
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {dataStatus === 'loading' ? (
        <Spinner />
      ) : (
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
          {/* Left Column: Images */}
          <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="flex-row sm:flex-row overflow-x-auto sm:overflow-y-scroll gap-3 justify-between sm:justify-normal sm:w-[18.7%] w-full">
              {!showInternalPages && selectedProduct?.images?.length > 0 && (
                <img
                  src={`${s3Url}/${selectedProduct.images[selectedVariantIndex]}`}
                  alt="Cover Image"
                  className="w-[20%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                />
              )}
            </div>

            <div className="w-full sm:w-[80%]">
              {showInternalPages ? (
                <div>
                  {selectedProduct.internalPages?.length > 0 && (
                    <div className="flex-shrink-0 w-full">
                      <img
                        src={`${s3Url}/${selectedProduct.internalPages[0].images[currentPageIndex]}`}
                        alt={`Internal page ${currentPageIndex + 1}`}
                        className="w-[70%] h-auto mx-auto sm:max-h-[400px]"
                      />
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePrevPage}
                      className={`px-4 py-2 bg-orange-500 text-white rounded ${currentPageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageIndex === 0}
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNextPage}
                      className={`px-4 py-2 bg-orange-500 text-white rounded ${currentPageIndex === selectedProduct.internalPages[0].images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={currentPageIndex === selectedProduct.internalPages[0].images.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                selectedProduct?.images.length > 0 && (
                  <img
                    src={`${s3Url}/${selectedProduct.images[selectedVariantIndex]}`}
                    alt="Selected Product"
                    className="w-full h-auto"
                  />
                )
              )}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex-1 font-poppins">
            {selectedProduct ? (
              <div>
                <h1 className="font-semibold text-4xl mt-2 text-gray-800">
                  {selectedProduct.productName}
                </h1>

                {selectedProduct.variants.length > 0 ? (
                  <p className="mt-3 font-bold text-3xl text-green-600">
                    ₹{selectedProduct.variants[selectedVariantIndex]?.price}
                  </p>
                ) : (
                  <p className="text-red-500">No variants available</p>
                )}

                <p className="mt-5 text-gray-600 md:w-4/5">
                  {selectedProduct.productDescription}
                </p>

                <p
                  className="cursor-pointer text-blue-500 mt-3"
                  onClick={handleInternalPageClick}
                >
                  Show Book inside
                </p>

                {selectedProduct.variants.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProduct.variants.map((variant, index) => (
                      <button
                        key={index}
                        onClick={() => handleVariantChange(index)}
                        className={`px-4 py-2 border-2 rounded-lg transition-colors duration-200 
                          ${selectedVariantIndex === index ? 'bg-white text-orange-800 border-orange-500' : 'bg-white text-black border-gray-300'}`}
                      >
                        {variant.color}
                      </button>
                    ))}
                  </div>
                )}

                <p className="mt-2 text-gray-700">
                  Stock available: {selectedProduct.variants[selectedVariantIndex]?.stock}
                </p>

                {/* Quantity Input */}
                <div className="mt-4">
                  <label htmlFor="quantity" className="block text-gray-700">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, e.target.value))} 
                    className="border border-gray-300 rounded py-2 px-4 w-20 focus:outline-none focus:border-orange-400"
                    min="1"
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-white text-black border-2 border-black px-5 py-2 mt-5 cursor-pointer rounded-lg transition duration-200"
                    onClick={addToCart} 
                  >
                    Add to Cart
                  </button>

                  <Link to="/placeorder">
                    <button
                      className="bg-black text-white px-5 py-2 mt-5 cursor-pointer rounded-lg transition duration-200 hover:bg-gray-800"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-red-500">No product found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
