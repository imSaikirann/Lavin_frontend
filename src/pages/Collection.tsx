import Book from '../assets/lavin3.jpg';

const Collection = () => {
  return (
    <div className="my-10 px-4 md:px-8 max-w-screen-xl mx-auto">
      {/* Title Section */}
      <div className="mb-8">
  <h1 className="text-2xl text-left md:text-center lg:text-4xl font-medium font-poppins text-gray-800">
    New Products
  </h1>
</div>


      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Product Card */}
        <div className="p-2 lg:p-4 h-64 md:h-56 lg:h-72 bg-white  transition-shadow duration-300 ease-in-out cursor-pointer rounded-lg">
          {/* Product Image */}
          <div className="overflow-hidden ">
            <img
              src={Book}
              alt="Lavin Notebook"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Product Info */}
          <div className="flex items-center justify-between pt-3 pb-1 p-1">
            <p className="text-md font-medium font-raleway text-gray-700">Lavin Notebook</p>
            <p className="text-md font-medium font-raleway text-main">$8</p>
          </div>
        </div>

        {/* Repeat for more products */}
        <div className="p-2 lg:p-4 h-64  md:h-56 lg:h-72 bg-white  transition-shadow duration-300 ease-in-out cursor-pointer rounded-lg">
          {/* Product Image */}
          <div className="overflow-hidden ">
            <img
              src={Book}
              alt="Lavin Notebook"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>

          {/* Product Info */}
          <div className="flex items-center justify-between pt-3 pb-1 p-1">
            <p className="text-md font-medium font-raleway text-gray-700">Lavin Notebook</p>
            <p className="text-md font-medium font-raleway text-main">$8</p>
          </div>
        </div>

        {/* Add more product cards as needed */}
      </div>
    </div>
  );
};

export default Collection;
