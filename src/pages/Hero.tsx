import HeroImg from "../assets/Hero.png";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between min-h-screen bg-gray-50">
      {/* Left: Text and Call-to-Action Section */}
      <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center text-center sm:text-left px-6 md:px-12 py-6 sm:py-0">
        <h1 className="font-main text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold mb-4 sm:mb-6 leading-tight">
          Elevate Your Style
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
          Discover Lavin's exclusive collection. Shop now for elegance and quality at every step.
        </p>
        <button className="font-semibold text-lg md:text-xl bg-black text-white py-3 px-8  shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
          SHOP NOW
        </button>
      </div>

      {/* Right: Hero Image */}
      <div className="w-full sm:w-1/2 h-[600px] sm:h-[800px] lg:h-[800px]">
        <img
          src={HeroImg}
          alt="Lavin Hero"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
