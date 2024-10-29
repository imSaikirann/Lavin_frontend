import React, { useState, useEffect, useRef, useContext } from 'react';
import CartTotal from '../components/CartTotal';
import { Input } from '../components/Input';
import { formSchema } from '../validation/validation';
import { ShopContext } from '../store/ShopContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

const PlaceOrder = () => {
    const { setUserData, sendOtp, verifyOtp } = useContext(ShopContext);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(new Array(6).fill(''));
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
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleOtpChange = (element, index) => {
        const value = element.value;
        if (isNaN(value) || value.length > 1) return; 

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

  
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleVerifyEmail = async () => {
        try {
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
            return;
        }

        try {
            await sendOtp(formValues.email);
            alert("OTP sent to your email!");
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Error sending OTP. Please try again.");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join('');
        const userDetails = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            phoneNumber: formValues.phone,
            address: formValues.street,
            city: formValues.city,
            state: formValues.state,
            country: formValues.country,
            pincode: formValues.pinCode
        };
    
        try {
    
            const response = await verifyOtp(formValues.email, enteredOtp, userDetails);
            console.log(response)
            if (response && response.user) {
                setUserData(response.user); 
                setShowOtpModal(false); 
                localStorage.setItem('token',response.accessToken)
                navigate('/profile'); 
               
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            alert("Error verifying OTP. Please try again.");
        }
    };
    

    const renderError = (field) => {
        return formErrors[field] && <span className="text-red-500 text-sm">{formErrors[field]}</span>;
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-8 sm:pt-14 min-h-[80vh] border-t px-4 font-poppins">
            {/* Delivery Information */}
            <div className="flex flex-col gap-6 w-full sm:max-w-[480px]">
                <h2 className="text-2xl font-bold mb-3">Delivery Information</h2>
                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="firstName"
                            value={formValues.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            aria-label="First Name"
                        />
                        {renderError('firstName')}
                    </div>
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="lastName"
                            value={formValues.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            aria-label="Last Name"
                        />
                        {renderError('lastName')}
                    </div>
                </div>
                <Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    aria-label="Email address"
                />
                {renderError('email')}
                <Input
                    type="text"
                    name="street"
                    value={formValues.street}
                    onChange={handleInputChange}
                    placeholder="Street"
                    aria-label="Street address"
                />
                {renderError('street')}
                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="city"
                            value={formValues.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            aria-label="City"
                        />
                        {renderError('city')}
                    </div>
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="state"
                            value={formValues.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            aria-label="State"
                        />
                        {renderError('state')}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="pinCode"
                            value={formValues.pinCode}
                            onChange={handleInputChange}
                            placeholder="Pin code"
                            aria-label="Pin code"
                            maxLength={6}
                        />
                        {renderError('pinCode')}
                    </div>
                    <div className="flex flex-col w-full">
                        <Input
                            type="text"
                            name="country"
                            value={formValues.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            aria-label="Country"
                        />
                        {renderError('country')}
                    </div>
                </div>
                <Input
                    type="text"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    aria-label="Phone number"
                    maxLength={10}
                />
                {renderError('phone')}
            </div>

            {/* Payment Method */}
            <div className="mt-8 w-full sm:max-w-[480px]">
                <CartTotal />
                <button
                    onClick={handleVerifyEmail}
                    className="px-4 py-3 rounded-sm w-full bg-black text-white hover:shadow-lg mt-4">
                    Verify Email
                </button>
            </div>

            {/* OTP Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg relative max-w-[350px] sm:max-w-[400px] w-full">
                        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4 text-center">
                            OTP Sent to {formValues.email}
                        </h2>
                        <div className="flex justify-center">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={value}
                                    onChange={(e) => handleOtpChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={el => inputRefs.current[index] = el}
                                    className="w-12 h-12 text-center border border-gray-300 rounded m-1"
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleVerifyOtp}
                            className="mt-4 w-full bg-black text-white py-2 rounded">
                            Verify OTP
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlaceOrder;
