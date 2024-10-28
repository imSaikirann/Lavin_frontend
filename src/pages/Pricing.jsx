import React from 'react';

const PricingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 font-poppins">
      <h1 className="text-2xl font-semibold mb-4">Pricing Policy</h1>

      {/* Section 1: Currency and Pricing */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Currency and Pricing</h2>
        <ul className="list-disc list-inside">
          <li>All prices for products on Lavin.in are listed in Indian Rupees (INR).</li>
          <li>Prices include applicable taxes unless otherwise specified. Any additional fees or taxes will be displayed at checkout.</li>
        </ul>
      </div>

      {/* Section 2: Price Changes */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Price Changes</h2>
        <ul className="list-disc list-inside">
          <li>Lavin.in reserves the right to adjust prices for products at any time without prior notice.</li>
          <li>Prices are subject to change due to factors such as material costs, manufacturing, and promotions.</li>
          <li>The price at the time of purchase will apply to your order, even if the price changes after your purchase.</li>
        </ul>
      </div>

      {/* Section 3: Discounts and Promotions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Discounts and Promotions</h2>
        <ul className="list-disc list-inside">
          <li>Promotional discounts, coupons, and other offers may be applied during checkout as per the terms of each promotion.</li>
          <li>Only one promotional code can be used per order unless otherwise specified.</li>
        </ul>
      </div>

      {/* Section 4: Payment Terms */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Payment Terms</h2>
        <ul className="list-disc list-inside">
          <li>Full payment is required at the time of order placement. We accept UPI, Credit Card, Debit Card, and Net Banking.</li>
          <li>If a transaction is declined, please reach out to your bank or payment provider to resolve the issue, as Lavin.in does not hold responsibility for payment declines due to bank policies.</li>
        </ul>
      </div>

      {/* Section 5: Shipping Fees */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Shipping Fees</h2>
        <ul className="list-disc list-inside">
          <li>Shipping fees, if applicable, will be added to the order total during checkout and are clearly displayed before payment.</li>
          <li>Shipping fees are calculated based on factors like delivery location and order weight.</li>
        </ul>
      </div>

      {/* Section 6: Errors and Omissions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Errors and Omissions</h2>
        <ul className="list-disc list-inside">
          <li>We make every effort to ensure accurate pricing; however, Lavin.in is not responsible for typographical errors or other pricing mistakes.</li>
          <li>In the event of a pricing error, we will notify you and offer the option to proceed with the order at the corrected price or cancel the order for a full refund.</li>
        </ul>
      </div>

      {/* Section 7: Contact Us */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
        <p>
          For questions regarding our pricing or payment options, please contact us at:
        </p>
        <ul className="list-disc list-inside">
          <li>Email: <a href="mailto:officialforlavin@gmail.com" className="text-blue-500 hover:underline">officialforlavin@gmail.com</a></li>
          <li>Phone: +91 9949120878</li>
        </ul>
      </div>
    </div>
  );
};

export default PricingPolicy;
