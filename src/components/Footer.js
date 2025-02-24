import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-100 to-blue-200 text-gray-900 py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-semibold">MindSupport</h2>
            <p className="mt-2 text-gray-700">
              Your trusted platform for mental wellness. Providing expert support and resources for a healthier mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul className="mt-2 text-gray-700 space-y-2">
              <li><a href="/about" className="hover:text-blue-600 transition">About Us</a></li>
              <li><a href="/talk" className="hover:text-blue-600 transition">Talk to Experts</a></li>
              <li><a href="/places" className="hover:text-blue-600 transition">Find Safe Spaces</a></li>
              <li><a href="/shop" className="hover:text-blue-600 transition">Shop Wellness</a></li>
            </ul>
          </div>

          {/* Contact and Social Media */}
          <div>
            <h2 className="text-xl font-semibold">Stay Connected</h2>
            <p className="mt-2 text-gray-700">Email: support@mindsupport.com</p>
            <p className="text-gray-700">Phone: +1 234 567 890</p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-center text-gray-600">
          &copy; {new Date().getFullYear()} MindSupport. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
