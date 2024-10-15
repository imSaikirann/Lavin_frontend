const Footer = () => {
    return (
      <footer className="bg-white text-gray-800 py-8">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h4 className="text-lg font-semibold mb-4">About Lavin</h4>
              <p className="text-gray-400">
                Lavin is your one-stop shop for premium clothing. We provide high-quality products with excellent customer service.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul>
                <li className="mb-2">
                  <a href="/shop" className="text-gray-400 hover:text-white">Shop</a>
                </li>
                <li className="mb-2">
                  <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                </li>
                <li className="mb-2">
                  <a href="/faqs" className="text-gray-400 hover:text-white">FAQs</a>
                </li>
              </ul>
            </div>
  
            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">
                Email: support@lavin.com <br />
                Phone: +123 456 7890 <br />
                Address: 123 Lavin Street, Fashion City
              </p>
            </div>
  
            {/* Social Media Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Copyright Section */}
          <div className="border-t border-gray-100 mt-8 pt-4 text-center">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Lavin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  