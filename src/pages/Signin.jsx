import React from 'react';

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 sm:p-8 rounded-lg w-full shadow-lg max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
          Sign In to Your Account
        </h2>
        <form className="space-y-3 sm:space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md shadow-sm focus:ring-orange-300 focus:border-orange-300"
              placeholder="********"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-main text-white font-medium rounded-md shadow hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>

        <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-black font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
