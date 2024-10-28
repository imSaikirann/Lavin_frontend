import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../components/Spinner";
import { FaUser, FaEnvelope, FaPhone, FaHome, FaCheck, FaTimes, FaExchangeAlt } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
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
        }, {
          withCredentials: true 
      });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handlePasswordSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(
        `${apiUrl}/api/v1/user/set-password`,
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

 
      setUserData((prevData) => ({
        ...prevData,
        isTemporary: false,
      }));

      setShowPasswordModal(false);
    } catch (error) {
      console.error('Error setting password:', error);
    }
  };

  if (!userData) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8 font-poppins">
      <div className="bg-white p-6 md:p-10 rounded-xl max-w-lg md:max-w-2xl w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 text-center">Profile Information</h2>

        <div className="space-y-4 mb-8 p-4 md:p-6 ">
          <p className="text-gray-700 font-medium text-center flex justify-between items-center">
            <span>Account Status:</span>
            <button 
              className={`px-4 py-2 rounded-lg font-semibold text-sm 
                ${!userData.isTemporary ? 'bg-green-600 text-white' : ' bg-yellow-500 text-gray-900'} 
                flex items-center gap-2`}
            >
              <FaExchangeAlt />
              {!userData.isTemporary ? 'Permanent Account' : ' Temporary Account'}
            </button>
          </p>
          <p className="text-gray-700 font-medium text-center flex justify-between items-center">
            <span>Verification Status:</span>
            <span className={`flex items-center gap-1 font-semibold ${userData.isVerified ? 'text-green-600' : 'text-red-600'}`}>
              {userData.isVerified ? <FaCheck /> : <FaTimes />}
              {userData.isVerified ? 'Verified' : 'Not Verified'}
            </span>
          </p>
          {!userData.password && (
            <div className="flex justify-center mt-4">
              <button 
                onClick={() => setShowPasswordModal(true)} 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm"
              >
                Set Password
              </button>
            </div>
          )}
        </div>

        <Section title="Personal Information">
          <InfoItem icon={<FaEnvelope />} label="Email" value={userData.email} />
          <InfoItem icon={<FaUser />} label="First Name" value={userData.firstName} />
          <InfoItem icon={<FaUser />} label="Last Name" value={userData.lastName} />
          <InfoItem icon={<FaPhone />} label="Phone Number" value={userData.phoneNumber} />
        </Section>

        <Section title="Address">
          <InfoItem icon={<FaHome />} label="Street" value={userData.street || 'N/A'} />
          <InfoItem icon={<FaHome />} label="City" value={userData.city} />
          <InfoItem icon={<FaHome />} label="State" value={userData.state} />
          <InfoItem icon={<FaHome />} label="Country" value={userData.country} />
          <InfoItem icon={<FaHome />} label="Pincode" value={userData.pincode} />
        </Section>

        <Section title="Orders">
          <p className="text-gray-600">
            {userData.orders && userData.orders.length > 0
              ? userData.orders.join(', ')
              : 'No orders yet'}
          </p>
        </Section>

        {showPasswordModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Set Your Password</h3>
              <input 
                type="password" 
                className="w-full px-4 py-2 border rounded-lg mb-4" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button 
                onClick={handlePasswordSubmit} 
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-4 md:mb-6 shadow-md">
    <h3 className="text-lg font-semibold text-gray-800 mb-3 md:mb-4 border-b pb-2">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoItem = ({ label, value, icon }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-2">
    <div className="flex items-center gap-2 mb-1 sm:mb-0">
      <span className="text-gray-700">{icon}</span>
      <p className="font-medium text-gray-700">{label}:</p>
    </div>
    <p className="text-gray-600 text-sm sm:text-base">{value}</p>
  </div>
);

export default Profile;
