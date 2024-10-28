const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 border-t-2 mt-10 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Lavin</h4>
            <p className="text-gray-400">
              Lavin is driven by a passion to create a brand that enriches people's lives in meaningful ways. We aim 
              to provide products that inspire productivity, creativity, and a sense of purpose.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <a href="/shop" className="text-gray-400 hover:text-gray-600">Shop</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-gray-400 hover:text-gray-600">About Us</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-gray-400 hover:text-gray-600">Contact</a>
              </li>
              <li className="mb-2">
                <a href="/faqs" className="text-gray-400 hover:text-gray-600">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              Email: officialforlavin@gmail.com<br />
              Phone: +91 9949120878<br />
              Address: Ameerpet, Hyderabad, Telangana, India - 500073
            </p>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-gray-600" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-600" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-gray-600" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Policies Section */}
        <div className="border-t border-gray-100 mt-8 pt-4 text-center">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} Lavin. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="/privacy-policy" className="text-gray-400 hover:text-gray-600">Privacy Policy</a>
            <a href="/terms-and-conditions" className="text-gray-400 hover:text-gray-600">Terms and Conditions</a>
            <a href="/pricing-policy" className="text-gray-400 hover:text-gray-600">Pricing Policy</a>
            <a href="/shipping-policy" className="text-gray-400 hover:text-gray-600">Shipping Policy</a>
            <a href="/refund-and-cancellation-policy" className="text-gray-400 hover:text-gray-600"> Refund And Cancellation Policy</a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
