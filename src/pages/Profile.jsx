import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../store/ShopContext';

const Profile = () => {
  const { UserData } = useContext(ShopContext);
  const navigate = useNavigate();

  if (!UserData) {
    navigate('/signup');
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-lg p-6">
        {UserData.photoURL && (
          <div className="border-b pb-3 mb-4 text-center">
            <img
              src={UserData.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
            />
          </div>
        )}
        {/* Sidebar Navigation */}
        <h2 className="text-lg font-semibold mb-4">Navigation</h2>
        <ul>
          <li className="mb-3">
            <a href="/profile" className="text-gray-700 hover:text-red-600 transition duration-200">Profile</a>
          </li>
          <li className="mb-3">
            <a href="/settings" className="text-gray-700 hover:text-red-600 transition duration-200">Settings</a>
          </li>
          <li className="mb-3">
            <a href="/orders" className="text-gray-700 hover:text-red-600 transition duration-200">Orders</a>
          </li>

          
          {/* Add more links as needed */}
        </ul>
        <button
              className="w-full mt-6 px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-500 transition duration-200"
              onClick={() => navigate('/')}
            >
              Logout
            </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
          {/* Display UserData Info */}
          <div className="space-y-4">
            <div className="border-b pb-2">
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-gray-600">{UserData.email}</p>
            </div>

            {UserData.displayName && (
              <div className="border-b pb-2">
                <p className="font-medium text-gray-700">Name:</p>
                <p className="text-gray-600">{UserData.displayName}</p>
              </div>
            )}

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
