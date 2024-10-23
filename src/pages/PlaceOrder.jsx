import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { Input } from '../components/Input';
import { Link } from 'react-router-dom';

const PlaceOrder = () => {
    const [method, setMethod] = useState("cod");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleOtpChange = (element, index) => {
        const value = element.value;

        // Check if the value is a digit
        if (value && isNaN(value)) return; 

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input if a value is entered
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Check for backspace key
        if (e.key === "Backspace" && !otp[index]) {
            // Focus on the previous input if current input is empty
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleVerifyOtp = () => {
        const enteredOtp = otp.join("");
        if (enteredOtp === "123456") {
            alert("OTP verified successfully!");
            setShowOtpModal(false); 
        } else {
            alert("Invalid OTP. Please try again.");
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
                    <Input type={"text"} placeholder={'First Name'} />
                    <Input type={"text"} placeholder={'Last Name'} />
                </div>
                <Input type={"email"} placeholder={'Email address'} />
                <Input type={"text"} placeholder={'Street'} />

                <div className='flex gap-4'>
                    <Input type={"text"} placeholder={'City'} />
                    <Input type={"text"} placeholder={'State'} />
                </div>
                <div className='flex gap-4'>
                    <Input type={"number"} placeholder={'Pin code'} />
                    <Input type={"number"} placeholder={'Country'} />
                </div>
                <Input type={"number"} placeholder={'Phone'} />
            </div>

            {/* Payment Method */}
            <div className='mt-8 w-full sm:max-w-[480px]'>
                <div>
                    <CartTotal />
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    <button
                        onClick={() => setShowOtpModal(true)} // Open the OTP modal on click
                        className='px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg'>
                        Verify Email
                    </button>
                </div>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg relative max-w-[350px] sm:max-w-[400px] w-full">
                        {/* OTP sent message */}
                        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
                            OTP Sent to saikiran@email.com
                        </h2>

                        {/* OTP validity timer */}
                        <p className="text-sm text-gray-500 text-center mb-4">
                            The OTP is valid for 5 minutes.
                        </p>

                        {/* Enter OTP message */}
                        <h2 className="text-md sm:text-lg font-bold mb-4 text-center">Enter the OTP</h2>

                        {/* OTP input fields */}
                        <div className="flex justify-between mb-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // Add key down handler
                                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border-2 border-gray-500 rounded mx-1"
                                />
                            ))}
                        </div>

                        {/* Verify button */}
                        <button
                            onClick={handleVerifyOtp}
                            className="bg-orange-400 text-black w-full py-2 rounded hover:bg-orange-500 transition-all duration-200 ease-in-out"
                        >
                            Verify OTP
                        </button>

                        {/* Close the modal */}
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
