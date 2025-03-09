import logo from "../../assets/images/logo.png";
import "../styles//globalStyles/footer.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_logo">
        <a href="index.jsx">
          <img src={logo} />
        </a>
      </div>
      <div className="links_module">
        <div className="quick_links">
          <h2>Quick Links</h2>
          <a href="">Home</a>
          <a href="">About</a>
          <a href="">Features</a>
          <a href="">User Guide</a>
          <a href="">Contact Us</a>
        </div>
        <div className="support_and_help">
          <h2>Support</h2>
          <a href="">Help Center</a>
          <a href="">Customer support</a>
          <a href="">Live Chat</a>
          <a href="">FAQ</a>
        </div>
        <div className="legal">
          <h2>Privacy and Policy</h2>
          <a href="">Privacy Policy</a>
          <a href="">Terms and Conditions</a>
          <a href="">Cookie Policy</a>
          <a href="">Cimpliance</a>
        </div>
        <div className="location">
          <h2>
            <i className="fa fa-map-marker"></i> Location
          </h2>
          <p>Mayur vihar Phase-3</p>
          <p>East Delhi</p>
          <p>Delhi-110096</p>
        </div>
      </div>
      <div className="social_links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="icon" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="icon" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="icon" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="icon" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="icon" />
        </a>
      </div>
    </footer>
  );
}
