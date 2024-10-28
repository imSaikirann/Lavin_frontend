import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 font-poppins">
      <h1 className="text-2xl font-semibold mb-4">Shipping Policy</h1>

      {/* Section 1: Delivery Locations */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Delivery Locations</h2>
        <ul className="list-disc list-inside">
          <li>Lavin.in currently ships products within India.</li>
          <li>Delivery services to specific areas may vary based on courier availability.</li>
        </ul>
      </div>

      {/* Section 2: Shipping Charges */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Shipping Charges</h2>
        <ul className="list-disc list-inside">
          <li>Shipping charges, if applicable, will be calculated and displayed at checkout based on the delivery location and order weight.</li>
          <li>Any additional charges, such as handling fees, will be transparently shown before completing your purchase.</li>
        </ul>
      </div>

      {/* Section 3: Estimated Delivery Time */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Estimated Delivery Time</h2>
        <ul className="list-disc list-inside">
          <li>We aim to dispatch all orders within 1-2 business days after the order is confirmed.</li>
          <li>Standard delivery times are between 5-7 business days, depending on your location.</li>
          <li>Delivery times are estimates and may be subject to delays due to factors such as holidays, weather, or courier issues.</li>
        </ul>
      </div>

      {/* Section 4: Tracking Your Order */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Tracking Your Order</h2>
        <ul className="list-disc list-inside">
          <li>Once your order has been shipped, you will receive a tracking number via email or SMS, which can be used to monitor your package.</li>
          <li>For assistance with tracking, please contact us at <a href="mailto:officialforlavin@gmail.com" className="text-blue-500 hover:underline">officialforlavin@gmail.com</a>.</li>
        </ul>
      </div>

      {/* Section 5: Unsuccessful Delivery Attempts */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Unsuccessful Delivery Attempts</h2>
        <ul className="list-disc list-inside">
          <li>Our courier partners will make up to 1 delivery attempt to ensure successful delivery.</li>
          <li>If delivery fails due to incorrect information or an unavailable recipient, the order may be returned to us, and reshipping charges may apply.</li>
        </ul>
      </div>

      {/* Section 6: International Shipping */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. International Shipping</h2>
        <ul className="list-disc list-inside">
          <li>Currently, Lavin.in does not offer international shipping. We are working to expand our services and will update this policy when international shipping becomes available.</li>
        </ul>
      </div>

      {/* Section 7: Damaged or Lost Packages */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Damaged or Lost Packages</h2>
        <ul className="list-disc list-inside">
          <li>Lavin.in ensures that all products are securely packaged. If you receive a damaged package, please contact us within 72 hours of receiving your order and include photos of the damage.</li>
          <li>In the event of a lost package, please contact our support team, and we will work with the courier to resolve the issue.</li>
        </ul>
      </div>

      {/* Section 8: Contact Us */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
        <p>For questions about shipping or delivery, please contact us at:</p>
        <ul className="list-disc list-inside">
          <li>Email: <a href="mailto:officialforlavin@gmail.com" className="text-blue-500 hover:underline">officialforlavin@gmail.com</a></li>
          <li>Phone: +91 9949120878</li>
        </ul>
      </div>
    </div>
  );
};

export default ShippingPolicy;
