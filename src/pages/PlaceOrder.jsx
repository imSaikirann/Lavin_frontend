import React, { useState, useRef } from "react";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill("")); // Now 6 fields
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  // Mock function to simulate sending OTP to email
  const handleSendOtp = async () => {
    setIsOtpSent(true);
  };

  // Mock function to simulate OTP verification
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      setIsVerified(true);
      alert("Email verified successfully!");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  // OTP input logic (updated for 6 digits)
  const handleKeyDown = (e) => {
    const index = inputRefs.current.indexOf(e.target);

    if (!/^[0-9]{1}$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab" && !e.metaKey) {
      e.preventDefault();
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        "",
        ...prevOtp.slice(index + 1),
      ]);
      
      // Move focus to the previous input field on Backspace/Delete
      if (e.key === "Backspace" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return;
    }
    const digits = text.split("");
    setOtp(digits);
  };

  return (
    <section className="bg-white py-10 dark:bg-dark min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Email Verification</h2>

          {!isOtpSent ? (
            <div>
              {/* Email input */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                Send OTP
              </button>
            </div>
          ) : !isVerified ? (
            <div>
              <p className="mb-2 text-sm text-gray-600">
                Enter the OTP sent to {email}
              </p>

              {/* OTP input */}
              <form id="otp-form" className="flex justify-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    onPaste={handlePaste}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg"
                  />
                ))}
              </form>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-green-500 text-white py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </div>
          ) : (
            <p className="text-green-500 text-lg font-bold">
              Your email has been verified successfully!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
