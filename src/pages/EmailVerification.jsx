import React, { useState } from "react";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  const handleSendCode = async () => {
    try {
      setIsCodeSent(true);
      alert("Verification code sent to your email!");
    } catch (error) {
      console.error("Error sending verification code:", error);
    }
  };


  const handleVerifyCode = async () => {
    try {
      const isValid = verificationCode === "123456"; 
      if (isValid) {
        setIsVerified(true);
        alert("Email verified successfully!");
      } else {
        alert("Invalid code, please try again.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
    }
  };

  return (
    <div className="email-verification">
      <h2>Email Verification</h2>

      {!isCodeSent ? (
        // Email input form
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <button onClick={handleSendCode} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send Verification Code
          </button>
        </div>
      ) : !isVerified ? (

        <div>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <button onClick={handleVerifyCode} className="bg-green-500 text-white px-4 py-2 rounded">
            Verify Code
          </button>
        </div>
      ) : (
        <p>Your email has been successfully verified!</p>
      )}
    </div>
  );
};

export default EmailVerification;
