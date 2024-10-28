import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-800 font-poppins">
      <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>
      
      {/* Section 1: Introduction */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to Lavin.in. By accessing or purchasing from our website, you agree to be bound by these Terms and Conditions.
          Please do not use our site if you disagree with any part of these terms.
        </p>
      </div>

      {/* Section 2: Definitions */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Definitions</h2>
        <ul className="list-disc list-inside">
          <li><strong>“Lavin”</strong> refers to the brand and website Lavin.in.</li>
          <li><strong>“User”</strong> refers to any individual accessing or purchasing from the website.</li>
          <li><strong>“Products”</strong> refers to the branded items available for sale on Lavin.in.</li>
        </ul>
      </div>

      {/* Section 3: Eligibility */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Eligibility</h2>
        <p>
          By using this website, you confirm that you are at least 18 years of age and capable of entering a legally binding agreement.
        </p>
      </div>

      {/* Section 4: Product Information and Availability */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Product Information and Availability</h2>
        <p>
          We aim to provide accurate information regarding our products, but Lavin reserves the right to update or discontinue
          products without prior notice. Availability may vary, and some items could be limited.
        </p>
      </div>

      {/* Section 5: Pricing and Payment */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Pricing and Payment</h2>
        <ul className="list-disc list-inside">
          <li>All prices are listed in INR and include applicable taxes unless otherwise specified.</li>
          <li>Payment is required at the time of order, and we accept major payment methods such as UPI, Credit Cards, Debit Cards, and Net Banking.</li>
        </ul>
      </div>

      {/* Section 6: Shipping and Delivery */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Shipping and Delivery</h2>
        <ul className="list-disc list-inside">
          <li>We offer shipping within India, and estimated delivery timelines will be provided at checkout.</li>
          <li>Delivery times may vary due to factors beyond our control, such as weather or logistical delays.</li>
        </ul>
      </div>

      {/* Section 7: Refund and Cancellation Policy */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Refund and Cancellation Policy</h2>
        <ul className="list-disc list-inside">
          <li>Refunds are only provided if a product is found defective or damaged upon delivery.</li>
          <li>Refund requests must be submitted within 3 days of receiving the product.</li>
          <li>Refunds will be processed within 5-7 business days upon approval and credited back to the original payment method.</li>
          <li>Cancellations can only be made before the order has shipped; please check our Refund and Cancellation Policy for details.</li>
        </ul>
      </div>

      {/* Section 8: Intellectual Property */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">8. Intellectual Property</h2>
        <p>
          All content, including logos, designs, images, and text, belongs to Lavin and may not be used without prior consent.
        </p>
      </div>

      {/* Section 9: Limitation of Liability */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
        <p>
          Lavin is not responsible for any direct or indirect damages arising from using our website or purchasing our products,
          including issues related to delivery delays or product dissatisfaction.
        </p>
      </div>

      {/* Section 10: Governing Law */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">10. Governing Law</h2>
        <p>
          These terms are governed by the laws of Telangana, India. Any disputes will be subject to the jurisdiction of courts in Telangana.
        </p>
      </div>

      {/* Section 11: Changes to Terms */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
        <p>
          Lavin reserves the right to update these Terms and Conditions at any time, with changes effective upon posting.
        </p>
      </div>

      {/* Section 12: Contact Us */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
        <p>
          For questions or support, please contact us at:
        </p>
        <ul className="list-disc list-inside">
          <li>Email: <a href="mailto:officialforlavin@gmail.com" className="text-blue-500 hover:underline">officialforlavin@gmail.com</a></li>
          <li>Phone: +91 9949120878</li>
        </ul>
      </div>
    </div>
  );
}

export default Terms;
