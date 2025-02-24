import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
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
        navigate("/login");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch {
      setError("Something went wrong. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-bl from-teal-400 to-indigo-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 mt-1 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter password"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold transition duration-300 hover:bg-indigo-600"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
