import React from "react";
import "../styles/layouts/__footer.css";
import authLogo from "../assets/auth.jpg";

const Footer = () => {
  const socialLinks = [
    { id: 1, name: "Facebook", icon: "facebook" },
    { id: 2, name: "Instagram", icon: "instagram" },
    { id: 3, name: "Twitter", icon: "twitter" },
    { id: 4, name: "LinkedIn", icon: "linkedin" },
  ];

  const bottomLinks = [
    { id: 1, name: "Introduce", path: "/" },
    { id: 2, name: "Health Guide", path: "/" },
    { id: 3, name: "Gym List", path: "/" },
    { id: 4, name: "PT List", path: "/" },
    { id: 5, name: "Suggestion", path: "/" },
  ];

  return (
    <div className="app_footer">
      <div className="footer_content">
        {/* Brand Description */}
        <div className="footer_brand">
          <div className="footer_logo">
            <img
              src={authLogo}
              alt="VibeVita Logo"
              className="footer_logo_image"
            />
            <span className="footer_logo_text">VibeVita</span>
          </div>
          <p className="footer_description">
            VibeVita là nền tảng hỗ trợ người tập luyện và ăn kiêng xây dựng một
            lối sống lành mạnh, khoa học và bền vững. Chúng tôi giúp bạn theo
            dõi tiến trình tập luyện, dinh dưỡng, cũng như kết nối với HLV cá
            nhân (PT) và cộng đồng cùng mục tiêu.
          </p>
        </div>

        {/* Contact Information */}
        <div className="footer_contact">
          <h3 className="contact_title">CONTACT US</h3>
          <div className="contact_info">
            <div className="contact_item">
              <svg className="contact_icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>0123456789</span>
            </div>
            <div className="contact_item">
              <svg className="contact_icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>vibevitaoffical@gmail.com</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="social_media">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href="#"
                className="social_link"
                aria-label={social.name}
              >
                <svg className="social_icon" viewBox="0 0 24 24" fill="none">
                  {social.icon === "facebook" && (
                    <path
                      d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {social.icon === "instagram" && (
                    <>
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="17.5"
                        y1="6.5"
                        x2="17.51"
                        y2="6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </>
                  )}
                  {social.icon === "twitter" && (
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {social.icon === "linkedin" && (
                    <>
                      <path
                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <rect
                        x="2"
                        y="9"
                        width="4"
                        height="12"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx="4"
                        cy="4"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="footer_subscription">
          <div className="subscription_input_group">
            <input
              type="email"
              placeholder="Enter your email"
              className="subscription_input"
            />
            <button className="subscription_button">SEND</button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="footer_bottom">
        <div className="footer_bottom_links">
          {bottomLinks.map((link) => (
            <a key={link.id} href={link.path} className="bottom_link">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
