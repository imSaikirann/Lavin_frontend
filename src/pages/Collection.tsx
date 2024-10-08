import Book from '../assets/lavin3.jpg';

const Collection = () => {
  return (
    <div className="my-10 px-4 md:px-8">
      {/* Title Section */}
      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-medium font-poppins text-gray-800">
          Latest Products
        </h1>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-8">
        <div className="overflow-hidden p-2 lg:p-4 shadow-md rounded-lg bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
          {/* Product Image */}
          <div className="overflow-hidden rounded-lg">
            <img
              src={Book}
              alt="Lavin Notebook"
              className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
          {/* Product Info */}
          <div className="flex items-center justify-between pt-3 pb-1 p-1">
            <p className="text-md font-medium font-raleway text-gray-700">Lavin Notebook</p>
            <p className="text-md font-medium font-raleway text-main">$8</p>
          </div>
          {/* View or Buy Button */}
         
        </div>

        {/* Repeat for more products */}
      </div>
    </div>
  );
};

export default Collection;
