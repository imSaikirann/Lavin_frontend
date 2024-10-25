import React, { useState, useEffect, useRef, useContext } from 'react';
import CartTotal from '../components/CartTotal';
import { Input } from '../components/Input';
import { formSchema } from '../validation/validation'; 
import axios from 'axios';
import { z } from 'zod';
import { ShopContext } from '../store/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const { setUserData } = useContext(ShopContext);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const navigate = useNavigate();
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
    const [formErrors, setFormErrors] = useState({});

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
        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyEmail = async () => {
        try {
            // Validate form values using formSchema
            formSchema.parse(formValues);
            setShowOtpModal(true);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {});
                setFormErrors(errors);
            }
            return; // Exit if validation fails
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            if (!apiUrl) throw new Error("API URL is not defined");

            // Send request to send OTP
            const response = await axios.post(`${apiUrl}/api/v1/auth/send-otp`, { email: formValues.email });
            console.log(response.data);
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Error sending OTP. Please try again.");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join("");
        const {
            email,
            firstName,
            lastName,
            phone,
            street,
            city,
            state,
            country,
            pinCode
        } = formValues;

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(`${apiUrl}/api/v1/auth/verify-otp`, {
                email,
                code: enteredOtp,
                firstName,
                lastName,
                phoneNumber: phone, 
                address: street, 
                city,
                state,
                country,
                pincode: pinCode, 
            });

            if (response.data && response.data.data) {
                setUserData(response.data.data);
                setShowOtpModal(false);
                
                alert("OTP verified successfully! User created.");
                navigate('/profile');
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert("Error verifying OTP. Please try again.");
        }
    };

    // Helper function for error messages
    const renderError = (field) => {
        return formErrors[field] && <span className='text-red-500 text-sm'>{formErrors[field]}</span>;
    };

    return (
        <div className='flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t px-4 font-poppins'>
            {/* Delivery Information */}
            <div className='flex flex-col gap-6 w-full sm:max-w-[480px]'>
                <div className='text-2xl font-bold mb-3'>Delivery Information</div>
                <div className='flex gap-4'>
                    <div className='flex flex-col w-full'>
                        <Input type="text" name="firstName" value={formValues.firstName} onChange={handleInputChange} placeholder='First Name' />
                        {renderError('firstName')}
                    </div>
                    <div className='flex flex-col w-full'>
                        <Input type="text" name="lastName" value={formValues.lastName} onChange={handleInputChange} placeholder='Last Name' />
                        {renderError('lastName')}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Input type="email" name="email" value={formValues.email} onChange={handleInputChange} placeholder='Email address' />
                    {renderError('email')}
                </div>
                <div className='flex flex-col'>
                    <Input type="text" name="street" value={formValues.street} onChange={handleInputChange} placeholder='Street' />
                    {renderError('street')}
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col w-full'>
                        <Input type="text" name="city" value={formValues.city} onChange={handleInputChange} placeholder='City' />
                        {renderError('city')}
                    </div>
                    <div className='flex flex-col w-full'>
                        <Input type="text" name="state" value={formValues.state} onChange={handleInputChange} placeholder='State' />
                        {renderError('state')}
                    </div>
                </div>
                <div className='flex gap-4'>
                    <div className='flex flex-col w-full'>
                        <Input
                            type="text"
                            name="pinCode"
                            value={formValues.pinCode}
                            onChange={handleInputChange}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ""); }}
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="Pin code"
                            maxLength={6}
                        />
                        {renderError('pinCode')}
                    </div>
                    <div className='flex flex-col w-full'>
                        <Input type="text" name="country" value={formValues.country} onChange={handleInputChange} placeholder='Country' />
                        {renderError('country')}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <Input
                        type="text"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                        onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ""); }}
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="Phone"
                        maxLength={10}
                    />
                    {renderError('phone')}
                </div>
            </div>

            {/* Payment Method */}
            <div className='mt-8 w-full sm:max-w-[480px]'>
                <CartTotal />
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
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    value={digit}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className="w-1/6 h-12 border rounded text-center"
                                    maxLength={1}
                                />
                            ))}
                        </div>

                        <div className="flex flex-col gap-4">
                            <button onClick={handleVerifyOtp} className="bg-black text-white py-2 rounded-md hover:shadow-lg">
                                Verify OTP
                            </button>
                            <button onClick={() => setShowOtpModal(false)} className="text-red-500 text-sm text-center underline">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaceOrder;
