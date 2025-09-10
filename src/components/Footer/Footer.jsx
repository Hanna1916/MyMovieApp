import "./Footer.css";
import FacebookIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/SubscriptionsOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
const Footer = () => {
  return (
    <>
      <footer className="footer-outer-container">
        <div className="footer-icons">
          <FacebookIcon className="footer-icon" />
          <InstagramIcon className="footer-icon" />
          <YouTubeIcon className="footer-icon" />
          <TwitterIcon className="footer-icon" />
        </div>
        <div className="footer-inner">
          <ul className="footer-links">
            <li>Audio and Subtitles</li>
            <li>Media Center</li>
            <li>Privacy</li>
            <li>Contact Us</li>
          </ul>
          <ul className="footer-links">
            <li>Audio Description</li>
            <li>Investor Relations</li>
            <li>Legal Notices</li>
          </ul>
          <ul className="footer-links">
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
          </ul>
          <ul className="footer-links">
            <li>Gift Cards</li>
            <li>Terms of Use</li>
            <li>Corporate Information</li>
          </ul>
        </div>
        <p className="footer-text">
          {" "}
          &copy; 2025 Netflix Clone | Built by Hana
        </p>
      </footer>
    </>
  );
};

export default Footer;
