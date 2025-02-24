import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "../utils/decodeToken"; // Import the decodeToken utility

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("intro"); // State for active section
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const navigate = useNavigate();

  // Refs for dropdowns
  const profileDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Decode the token to get user email
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.email) {
        setUserEmail(decodedToken.email);
      }
    }

    // Set up Intersection Observer to track active section
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id); // Update active section
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Cleanup observer
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown if clicked outside
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }

      // Close mobile menu if clicked outside
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMobileMenu = (event) => {
    event.stopPropagation(); // Stop event propagation
    setIsMobileMenuOpen((prev) => !prev); // Toggle mobile menu state
    setIsProfileOpen(false); // Close profile dropdown when mobile menu is toggled
  };

  const toggleProfileDropdown = (event) => {
    event.stopPropagation(); // Stop event propagation
    setIsProfileOpen((prev) => !prev); // Toggle profile dropdown state
    setIsMobileMenuOpen(false); // Close mobile menu when profile dropdown is toggled
  };

  return (
    <>
      {/* Blur overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10" />
      )}

      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Mindscape
            </span>
          </Link>

          {/* Buttons or Profile */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <div className="relative" ref={profileDropdownRef}>
                {/* Profile Button */}
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  onClick={toggleProfileDropdown}
                >
                  {/* Default Profile Image */}
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://www.gravatar.com/avatar/default?s=200&d=mp" // Default Gravatar image
                    alt="User"
                  />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-md dark:bg-gray-700 z-30">
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">User Name</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {userEmail} {/* Truncated email */}
                      </span>
                    </div>
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                          onClick={() => setIsProfileOpen(false)} // Close dropdown on click
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false); // Close dropdown on click
                          }}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/signup")}
              >
                Get started
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={toggleMobileMenu}
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navbar Links */}
          <div
            ref={mobileMenuRef}
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#intro"
                  className={`block py-2 px-3 rounded-sm ${
                    activeSection === "intro"
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
                >
                  Intro
                </a>
              </li>
              <li>
                <a
                  href="#talk"
                  className={`block py-2 px-3 rounded-sm ${
                    activeSection === "talk"
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
                >
                  Talk
                </a>
              </li>
              <li>
                <a
                  href="#places"
                  className={`block py-2 px-3 rounded-sm ${
                    activeSection === "places"
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
                >
                  Places
                </a>
              </li>
              <li>
                <a
                  href="#shopping"
                  className={`block py-2 px-3 rounded-sm ${
                    activeSection === "shopping"
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)} // Close mobile menu on click
                >
                  Shopping
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;