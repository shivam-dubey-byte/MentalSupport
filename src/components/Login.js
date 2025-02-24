import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  
  // Using useRef for better performance
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [redirectPath, setRedirectPath] = useState("/");

  // Retrieve last visited page
  useEffect(() => {
    const lastPage = sessionStorage.getItem("lastPage");
    if (lastPage) setRedirectPath(lastPage);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch(
        "https://mujtpcbackend.shivamrajdubey.tech/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token); // Store token for session management
        navigate(redirectPath); // Redirect to last page
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-blue-400 to-purple-500"
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
          Login
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200"
              placeholder="Enter password"
              required
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-purple-600 focus:ring-4 focus:ring-purple-300"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline transition">
            Sign up here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
