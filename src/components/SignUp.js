import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the redirect path from URL query
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://mujtpcbackend.shivamrajdubey.tech/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate(redirectPath); // Redirect back to previous page
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("Something went wrong. Try again later.");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-teal-400 to-indigo-500"
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full"
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to={`/login?redirect=${redirectPath}`} className="text-indigo-600 hover:underline transition">
            Login here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
