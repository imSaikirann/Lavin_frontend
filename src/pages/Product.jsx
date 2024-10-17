import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ShopContext } from "../store/ShopContext";

const Product = () => {
    const { id } = useParams();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [showInternalPages, setShowInternalPages] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    const { products = [], dataStatus = "loading" } = useContext(ShopContext) || {};

    const s3Url = import.meta.env.VITE_S3_URL;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const selectedProduct = products.find((product) => product.id === id) || null;

    const handleCart = (id) => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            if (!cart.includes(id)) {
                cart.push(id);
                localStorage.setItem("cart", JSON.stringify(cart));
                console.log("Product added to cart:", id);
            } else {
                console.log("Product is already in the cart");
            }
        } catch (error) {
            console.error("Error handling cart:", error);
        }
    };

    const handleVariantChange = (index) => {
        setSelectedVariantIndex(index);
        setSelectedImageIndex(0);
        setShowInternalPages(false);
        setCurrentPageIndex(0);
    };

    const handleInternalPageClick = (index) => {
        setSelectedImageIndex(index);
        setShowInternalPages(true);
        setCurrentPageIndex(0);
    };

    const handleNextPage = () => {
        if (currentPageIndex < selectedProduct.internalPages.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {dataStatus === 'loading' ? (
                <Spinner />
            ) : (
                <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                        <div className="flex-row sm:flex-row overflow-x-auto sm:overflow-y-scroll gap-3 justify-between sm:justify-normal sm:w-[18.7%] w-full">
                            {selectedProduct?.images.length > 0 && !showInternalPages && (
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
                                                className="w-[70%] h-auto mx-auto sm:max-h-[400px]" // Reduced size
                                            />
                                        </div>
                                    )}

                                    {/* Navigation buttons */}
                                    <div className="flex justify-between mt-4">
                                        <button
                                            onClick={handlePrevPage}
                                            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPageIndex === 0}
                                        >
                                            Prev
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPageIndex === selectedProduct.internalPages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPageIndex === selectedProduct.internalPages.length - 1}
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

                    <div className="flex-1 font-poppins">
                        {selectedProduct ? (
                            <div>
                                <h1 className="font-semibold text-4xl mt-2 text-gray-800">
                                    {selectedProduct.productName}
                                </h1>

                                {selectedProduct.variants.length > 0 ? (
                                    <p className="mt-3 font-bold text-3xl text-green-600">
                                        ₹{selectedProduct.price}
                                    </p>
                                ) : (
                                    <p className="text-red-500">No variants available</p>
                                )}
                                <p className="mt-5 text-gray-600 md:w-4/5">
                                    {selectedProduct.productDescription}
                                </p>

                                <p className="cursor-pointer text-blue-500 mt-3" onClick={() => handleInternalPageClick(0)}>
                                    Show Book inside
                                </p>

                                {selectedProduct.variants.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {selectedProduct.variants.map((variant, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleVariantChange(index)}
                                                className={`px-4 py-2 border-2 rounded-lg transition-colors duration-200 
                                                    ${selectedVariantIndex === index ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'} 
                                                    hover:bg-gray-200 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50`}
                                                type="button"
                                            >
                                                {variant.color}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Display stock based on selected variant */}
                                {selectedProduct.variants.length > 0 && (
                                    <p className="mt-2 text-gray-700">
                                        Stock available: {selectedProduct.variants[selectedVariantIndex].stock}
                                    </p>
                                )}

                                <button
                                    className="bg-black text-white px-5 py-2 mt-5 cursor-pointer rounded-lg transition duration-200 hover:bg-gray-800"
                                    onClick={() => handleCart(selectedProduct.id)}
                                    type="button"
                                >
                                    Add to Cart
                                </button>
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
