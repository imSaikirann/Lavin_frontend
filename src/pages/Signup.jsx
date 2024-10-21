import React, { useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { provider, auth } from "../Auth/firebase";
import { ShopContext } from "../store/ShopContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserData } = useContext(ShopContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUserData(user);
      navigate("/profile");
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      setUserData(user);  // Add setUserData here
      navigate("/profile");
    } catch (err) {
      setError("An error occurred during Google signup. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl font-poppins">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-300"
              placeholder="********"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-main text-white font-medium rounded-md shadow hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-black font-bold hover:underline">
            Sign In
          </a>
        </p>

        <p className="mt-4 text-center text-gray-600">or</p>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-red-500 text-white font-medium rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
