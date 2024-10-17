import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { ShopContext } from "../store/ShopContext"; 

const Product = () => {
    const { id } = useParams(); 
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0); // State to track the selected variant

    const shopContext = useContext(ShopContext);
    const { products, dataStatus } = shopContext || { products: [], dataStatus: 'loading' }; 

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
        setSelectedImageIndex(0); // Reset to the first image when changing the variant
    };

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {dataStatus === 'loading' ? (  
                <Spinner />
            ) : (
                <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                    <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll gap-3 justify-between sm:justify-normal sm:w-[18.7%] w-full">
                            {selectedProduct && selectedProduct.images.map((image, imageIndex) => (
                                <img
                                    onClick={() => setSelectedImageIndex(imageIndex)}
                                    key={imageIndex}
                                    src={`${s3Url}/${image}`}
                                    alt={`Product image ${imageIndex + 1}`}
                                    className="w-[20%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                />
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
                                <h1 className="font-medium text-3xl mt-2">
                                    {selectedProduct.productName}
                                </h1>

                                {selectedProduct.variants.length > 0 ? (
                                    <p className="mt-3 font-semibold text-2xl">
                                        ₹{selectedProduct.variants[selectedVariantIndex].price}
                                    </p>
                                ) : (
                                    <p>No variants available</p>
                                )}
                                <p className="mt-5 text-gray-600 md:w-4/5">
                                    {selectedProduct.productDescription}
                                </p>
                                {selectedProduct.variants.length > 0 ? (
                                    <p className="mt-3 font-semibold text-2xl">
                                        {selectedProduct.variants[selectedVariantIndex].color}
                                    </p>
                                ) : (
                                    <p>No variants available</p>
                                )}

                                <button
                                    className="bg-black text-white px-5 py-2 mt-5 cursor-pointer"
                                    onClick={() => handleCart(selectedProduct.id)}
                                >
                                    Add to Cart
                                </button>

                                {/* Display internal pages after the first cover image */}
                                {selectedProduct.internalPages.length > 0 && (
                                    <div className="mt-5">
                                        <h2 className="text-xl font-semibold">Internal Pages:</h2>
                                        <div className="flex overflow-x-auto gap-3 mt-2">
                                            {selectedProduct.internalPages.map((page, index) => (
                                                <div key={index} className="flex-shrink-0">
                                                    <img
                                                        src={`${s3Url}/${page.images[0]}`}
                                                        alt={`Internal page ${index + 1}`}
                                                        className="w-[100px] h-auto cursor-pointer"
                                                    />
                                                    <p className="text-center">{page.pageType} ({page.pageCount} pages)</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p>No product found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Product;
