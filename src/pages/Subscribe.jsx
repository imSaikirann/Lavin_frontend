

const Subscribe = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4 font-poppins">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-6">Get the latest updates on new products and upcoming sales.</p>
        <form className="flex items-center justify-center ">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-100  shadow-sm focus:outline-none "
          />
          <button
            type="submit"
            className="px-6 py-2 bg-main text-white font-semibold  hover:bg-orange-500 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
