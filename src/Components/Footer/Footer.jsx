import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.webp';

const Footer = () => (
    <footer className="footer">
        {/* ── White top bar: Logo left, Email right ── */}
        <div className="footer-top-white">
            <div className="footer-logo">
                <img src={logo} alt="The Tech Dr" className="footer-logo-img" />
                <a href="mailto:info@thetechdr.com.au" className="email">Email - info@thetechdr.com.au</a>
            </div>
        </div>

        {/* ── Orange divider ── */}
        <div className="footer-orange-divider" />

        {/* ── Light orange body ── */}
        <div className="footer-top">

            <div className="footer-social">
                <span>Follow us on:</span>
                <div className="social-icons">
                    {['f', 'x', 'ig', 'in'].map((s, i) => (
                        <a key={i} href="#" className="social-icon">
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                {i === 0 && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                                {i === 1 && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />}
                                {i === 2 && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" /></>}
                                {i === 3 && <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>}
                            </svg>
                        </a>
                    ))}
                </div>
            </div>

            {/* Urgent Support as a button */}
            <a href="tel:1300072073" className="footer-phone urgent-btn">
                <div className="phone-icon">
                    <svg width="18" height="18" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                    </svg>
                </div>
                <div>
                    <span className="urgent-label">Urgent Support?</span>
                    <span className="phone-num">1300 072 073</span>
                </div>
            </a>

        </div>

        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} The Tech Dr. All rights reserved.</p>
            <div className="footer-bottom-links">
                <a href="#">Privacy Policy</a>
                <span className="footer-divider">|</span>
                <a href="#">Terms & Conditions</a>
            </div>
        </div>
    </footer>
);

export default Footer;