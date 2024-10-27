import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../components/Spinner";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
    

      try {
      const apiUrl = import.meta.env.VITE_API_URL;

        const response = await axios.get(`${apiUrl}/api/v1/user/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(response)
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
     
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userData) {
    return <Spinner/>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
        <div className="space-y-4">
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Email:</p>
            <p className="text-gray-600">{userData.email}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">First Name:</p>
            <p className="text-gray-600">{userData.firstName}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Last Name:</p>
            <p className="text-gray-600">{userData.lastName}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Phone Number:</p>
            <p className="text-gray-600">{userData.phoneNumber}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Address:</p>
            <p className="text-gray-600">{userData.address}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">City:</p>
            <p className="text-gray-600">{userData.city}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">State:</p>
            <p className="text-gray-600">{userData.state}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Country:</p>
            <p className="text-gray-600">{userData.country}</p>
          </div>
          <div className="border-b pb-2">
            <p className="font-medium text-gray-700">Pincode:</p>
            <p className="text-gray-600">{userData.pincode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
