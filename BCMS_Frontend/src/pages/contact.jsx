import "./styles/contact.css";

const Contact = () => {
  return (
    <main className="contact-container">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-subtitle">
        We would love to hear from you! Contact us for any inquiries or support.
      </p>

      <div className="contact-content">
        <form className="contact-form">
          <h3>Send Us a Message</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Company Name" required />
          <input type="text" placeholder="Phone Number" required />
          <select required>
            <option value="">Select Inquiry Type</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>
            <strong>Email:</strong> support@bcms.com
          </p>
          <p>
            <strong>Phone:</strong> +91 728 9969 267
          </p>
          <p>
            <strong>Address:</strong> Mayur Vihar Phase-3, Delhi-110096
          </p>
          <p>
            <strong>Working Hours:</strong> Mon - Fri: 9:00 AM - 6:00 PM
          </p>
          <p>
            <strong>Follow Us:</strong>
          </p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>{" "}
            |
            <a href="#" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>{" "}
            |
            <a href="#" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
