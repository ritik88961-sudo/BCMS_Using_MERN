import "./styles/pricing.css";
const Pricing = () => {
  return (
    <main className="pricing-container">
      <h2 className="pricing-title">Business Management System Plans</h2>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Basic</h3>
          <p className="price">₹999/mo</p>
          <ul>
            <li>✔ CRM & Task Management</li>
            <li>✔ 5 Users</li>
            <li>✔ Basic Reports</li>
            <li>✔ Email Support</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>

        <div className="pricing-card featured">
          <h3>Professional</h3>
          <p className="price">₹1999/mo</p>
          <ul>
            <li>✔ CRM, HR & Inventory</li>
            <li>✔ 20 Users</li>
            <li>✔ Advanced Reports</li>
            <li>✔ Priority Support</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>

        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="price">₹4999/mo</p>
          <ul>
            <li>✔ Full Business Suite</li>
            <li>✔ Unlimited Users</li>
            <li>✔ AI-Powered Analytics</li>
            <li>✔ 24/7 Dedicated Support</li>
          </ul>
          <button className="btn">Get Started</button>
        </div>
      </div>

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>
          Our Business Management System helps you streamline operations,
          improve efficiency, and boost growth with advanced tools.
        </p>
        <ul>
          <li>✔ User-Friendly Interface</li>
          <li>✔ Secure & Scalable</li>
          <li>✔ Customizable Modules</li>
          <li>✔ Affordable Pricing</li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is a Business Collaboration Management System (BCMS)?</h3>
          <p>
            BCMS is a platform that helps businesses streamline communication,
            project management, and document sharing to improve team
            collaboration.
          </p>
        </div>
        <div className="faq-item">
          <h3>How can BCMS benefit my business?</h3>
          <p>
            It enhances productivity, centralizes communication, improves
            workflow automation, and ensures secure document management.
          </p>
        </div>
        <div className="faq-item">
          <h3>Is BCMS suitable for small businesses?</h3>
          <p>
            Yes, BCMS is designed to support businesses of all sizes, offering
            scalable solutions to meet different needs.
          </p>
        </div>
        <div className="faq-item">
          <h3>What features are included in BCMS?</h3>
          <p>
            It includes task management, file sharing, team communication,
            real-time collaboration, access control, and integration with
            third-party tools.
          </p>
        </div>
        <div className="faq-item">
          <h3>Is my data secure with BCMS?</h3>
          <p>
            Yes, BCMS uses advanced encryption, access control, and regular
            backups to ensure data security and compliance.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I integrate BCMS with other business tools?</h3>
          <p>
            Yes, BCMS supports integrations with tools like CRM, ERP, cloud
            storage, and email services.
          </p>
        </div>
        <div className="faq-item">
          <h3>Does BCMS offer mobile support?</h3>
          <p>
            Yes, BCMS is fully responsive and accessible via mobile devices,
            ensuring seamless collaboration on the go.
          </p>
        </div>
        <div className="faq-item">
          <h3>How is BCMS priced?</h3>
          <p>
            Pricing varies based on the selected plan, which depends on the
            number of users, storage, and features required.
          </p>
        </div>
        <div className="faq-item">
          <h3>Do you offer a free trial?</h3>
          <p>
            Yes, we offer a trial period so you can explore BCMS before making a
            purchase decision.
          </p>
        </div>
        <div className="faq-item">
          <h3>How can I get support for BCMS?</h3>
          <p>
            Our support team is available via email, chat, and phone to assist
            with any queries or technical issues.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
