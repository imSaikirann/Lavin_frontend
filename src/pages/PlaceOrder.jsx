import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets'; // Assuming you have some assets here
import CartTotal from '../components/CartTotal';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleOtpChange = (element, index) => {
        const value = element.value;

        // Ensure the value is a number
        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input field
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyEmail = async () => {
        // Check if all fields are filled
        console.log(formValues)

        const { firstName, lastName, email, street, city, state, pinCode, country, phone } = formValues;
        if (!firstName || !lastName || !email || !street || !city || !state || !pinCode || !country || !phone) {
            alert("Please fill in all fields before verifying your email.");
            return;
        }
        setShowOtpModal(true);
        
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/auth/send-otp`, { email });
            console.log(response.data);
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Error sending OTP. Please try again.");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index]) {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        const email = formValues.email; // Use the email from form values

       
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/auth/verifyOTP`, { email, code: enteredOtp });
            if (response.data.verified) {
                alert("OTP verified successfully!");
                setShowOtpModal(false);
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.log(error);
            console.error("Error verifying OTP:", error);
            alert("Error verifying OTP. Please try again.");
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t px-4 font-poppins'>
            {/* Delivery Information */}
            <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
                <div className='text-2xl font-bold mb-3'>
                    Delivery Information
                </div>
                <div className='flex gap-4'>
                    <Input type={"text"} name="firstName" value={formValues.firstName} onChange={handleInputChange} placeholder={'First Name'} />
                    <Input type={"text"} name="lastName" value={formValues.lastName} onChange={handleInputChange} placeholder={'Last Name'} />
                </div>
                <Input type={"email"} name="email" value={formValues.email} onChange={handleInputChange} placeholder={'Email address'} />
                <Input type={"text"} name="street" value={formValues.street} onChange={handleInputChange} placeholder={'Street'} />

                <div className='flex gap-4'>
                    <Input type={"text"} name="city" value={formValues.city} onChange={handleInputChange} placeholder={'City'} />
                    <Input type={"text"} name="state" value={formValues.state} onChange={handleInputChange} placeholder={'State'} />
                </div>
                <div className='flex gap-4'>
                    <Input type={"number"} name="pinCode" value={formValues.pinCode} onChange={handleInputChange} placeholder={'Pin code'} />
                    <Input type={"number"} name="country" value={formValues.country} onChange={handleInputChange} placeholder={'Country'} />
                </div>
                <Input type={"number"} name="phone" value={formValues.phone} onChange={handleInputChange} placeholder={'Phone'} />
            </div>

            {/* Payment Method */}
            <div className='mt-8 w-full sm:max-w-[480px]'>
                <div>
                    <CartTotal />
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <button
                        onClick={handleVerifyEmail}
                        className='px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg'>
                        Verify Email
                    </button>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg relative max-w-[350px] sm:max-w-[400px] w-full">
                        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
                            OTP Sent to {formValues.email}
                        </h2>
                        <p className="text-sm text-gray-500 text-center mb-4">
                            The OTP is valid for 5 minutes.
                        </p>
                        <h2 className="text-md sm:text-lg font-bold mb-4 text-center">Enter the OTP</h2>

                        <div className="flex justify-between mb-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-500 rounded mx-1"
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleVerifyOtp}
                            className="bg-orange-400 text-black w-full py-2 rounded hover:bg-orange-500 transition-all duration-200 ease-in-out"
                        >
                            Verify OTP
                        </button>

                        <button
                            onClick={() => setShowOtpModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaceOrder;
