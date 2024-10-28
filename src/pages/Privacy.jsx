import React from 'react';

const Privacy = () => {
  return (
    <div className="p-6 md:p-10 lg:px-32 text-gray-800 font-poppins">
      <h2 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h2>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
        <p>
          Lavin.in (“we,” “our,” or “us”) is committed to protecting the privacy of its customers and website users. 
          This Privacy Policy explains how we collect, use, and protect your personal information when you visit 
          or purchase from Lavin.in.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">2. Information We Collect</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Personal Information:</strong> When you purchase from Lavin.in, we may collect personal details 
            such as your name, email address, contact number, billing and shipping address, and payment information.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect data on how you interact with our website, such as pages visited, 
            time spent on the site, and other interaction details. This information helps us improve our website and 
            services.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">3. How We Use Your Information</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Process orders and facilitate payment and shipping.</li>
          <li>Communicate updates about your order, including confirmations and shipping notifications.</li>
          <li>Improve our website, products, and customer service.</li>
          <li>Send promotional content or offers.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">4. Sharing Your Information</h3>
        <p>
          Lavin.in does not sell, trade, or share your personal information with third parties except:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Service Providers:</strong> We may share data with trusted third-party providers to help process 
            payments, ship orders, and perform other business functions. These providers are bound to protect your 
            information.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose your information if required by law or in response to 
            valid legal requests.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">5. Data Security</h3>
        <p>
          We prioritize your data security. Lavin.in employs secure servers and encryption protocols to protect your 
          personal information. However, while we strive to use commercially acceptable means to protect your 
          information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">6. Cookies and Tracking Technologies</h3>
        <p>
          Our website uses cookies to enhance user experience, track website traffic, and improve services. You can 
          choose to disable cookies via your browser settings, but please note this may affect certain features of our 
          site.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">7. Retention of Data</h3>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
          Privacy Policy or as required by law.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">8. Your Rights</h3>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. 
          Please contact us to exercise these rights.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">9. Changes to Our Privacy Policy</h3>
        <p>
          Lavin.in may update this Privacy Policy from time to time. Any changes will be posted on this page, and 
          continued use of the website implies acceptance of the updated policy.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">10. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy, please reach out to us at:
        </p>
        <ul className="list-none ml-0">
          <li><strong>Email:</strong> officialforlavin@gmail.com</li>
          <li><strong>Phone:</strong> +91 9949120878</li>
        </ul>
      </section>
    </div>
  );
};

export default Privacy;
