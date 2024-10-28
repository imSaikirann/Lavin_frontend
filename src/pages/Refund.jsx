import React from 'react';

const RefundAndCancellationPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 font-poppins">
      <h1 className="text-2xl font-semibold mb-4">Refund and Cancellation Policy</h1>

      {/* Section 1: Introduction */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>At Lavin.in, we aim to provide our customers with quality products and a seamless shopping experience. This Refund and Cancellation Policy outlines the terms for refunds, returns, and cancellations of orders.</p>
      </div>

      {/* Section 2: Refund Eligibility */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Refund Eligibility</h2>
        <ul className="list-disc list-inside">
          <li>Refunds are available for products that arrive damaged or have manufacturing defects.</li>
          <li>To qualify for a refund, please contact us within 3 days of receiving the product with a description of the issue and photos as proof of damage or defect.</li>
        </ul>
      </div>

      {/* Section 3: Non-Refundable Items */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Non-Refundable Items</h2>
        <ul className="list-disc list-inside">
          <li>Products that have been used or altered are not eligible for refunds.</li>
          <li>We do not accept returns or offer refunds for reasons of personal preference or change of mind once the product has been opened or used.</li>
        </ul>
      </div>

      {/* Section 4: Refund Process */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Refund Process</h2>
        <ul className="list-disc list-inside">
          <li>Approved refunds will be processed within 5-7 business days from the date of approval.</li>
          <li>Refunds will be credited back to the original payment method used at checkout.</li>
          <li>Depending on your bank, it may take additional time for the refunded amount to appear in your account.</li>
        </ul>
      </div>

      {/* Section 5: Order Cancellations */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Order Cancellations</h2>
        <ul className="list-disc list-inside">
          <li>Cancellations are allowed only if the order has not been shipped. Once an order has been dispatched, it cannot be canceled.</li>
          <li>To request a cancellation, please contact us immediately after placing your order.</li>
          <li>Approved cancellations will be refunded in full within 5-7 business days.</li>
        </ul>
      </div>

      {/* Section 6: How to Request a Refund or Cancellation */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. How to Request a Refund or Cancellation</h2>
        <p>For refund or cancellation requests, please contact our support team at:</p>
        <ul className="list-disc list-inside">
          <li>Email: <a href="mailto:officialforlavin@gmail.com" className="text-blue-500 hover:underline">officialforlavin@gmail.com</a></li>
          <li>Phone: +91 9949120878</li>
        </ul>
        <p>Include your order number and relevant details to expedite the process.</p>
      </div>

      {/* Section 7: Changes to the Policy */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Changes to the Policy</h2>
        <p>Lavin.in reserves the right to modify this Refund and Cancellation Policy at any time. Any updates will be posted on this page.</p>
      </div>
    </div>
  );
};

export default RefundAndCancellationPolicy;
