import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="mx-auto my-10 text-gray-800 font-poppins mb-10  ">
      <div className="flex flex-col md:flex-row items-center gap-8  bg-white bg-opacity-90  ">
        {/* Image section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.logo}
            alt="About Lavin"
            className="w-60 h-auto object-cover"
          />
        </div>

        {/* Text section */}
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-8">About Lavin</h1>

          <p className="mb-4">
            At Lavin, our philosophy is simple—<em>"Adding Value Every Day."</em> Founded by Vallabhaneni Lakshmi Suresh Chandra, AKA Lavin_Creator, Lavin is driven by a passion to create a brand that enriches people's lives in meaningful ways. We aim to provide products that inspire productivity, creativity, and a sense of purpose.
          </p>
          <p className="mb-4">
            Our vision is to develop a diverse range of offerings that resonate with individuals who appreciate both premium quality and accessibility. Lavin is not just about products—it's about building something that people will want to keep with them, as part of their daily lives or personal collections. Like some of the biggest names in the industry, we strive to be a brand that people trust for delivering innovation, value, and inspiration.
          </p>
          <p>
            Whether you're a student, professional, or anyone looking to make the most of each day, Lavin is here to support your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
