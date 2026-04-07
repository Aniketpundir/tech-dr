import React from 'react';
import './Footer.css';
import logo from '../../assets/footer-logo.webp';

const Footer = () => (
    <footer className="footer">
        <div className="footer-top">
            <div className="footer-logo">
                <img src={logo} alt="The Tech Dr" className="footer-logo-img" />
                <a href="mailto:info@thetechdr.com.au" className="email">Email - info@thetechdr.com.au</a>
            </div>

            <div className="footer-location">
                <div className="pin-icon">
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                </div>
                <div>
                    <strong>Location:</strong>
                    <p>3/13 Bridge St, Epping NSW 2121, Australia</p>
                </div>
            </div>

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
        </div>

        <div className="footer-main">
            <div className="footer-col">
                <div className="footer-phone">
                    <div className="phone-icon">
                        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                        </svg>
                    </div>
                    <div>
                        <span className="urgent-label" style={{ color: '#fff' }}>Urgent Support?</span>
                        <span className="phone-num">1300 072 073</span>
                    </div>
                </div>
                <div className="footer-google">
                    <svg width="24" height="24" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.4 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.5-4z" />
                    </svg>
                    <div>
                        <div className="g-stars">
                            {/* Layered star technique for exact 4.8 rating */}
                            <span className="star-rating" title="4.8 out of 5">
                                <span className="star-rating-bg">★★★★★</span>
                                <span className="star-rating-fill" style={{ width: '96%' }}>★★★★★</span>
                            </span>
                            <span style={{ color: '#fff', fontWeight: 'bold', marginLeft: '6px' }}>4.8</span>
                        </div>
                        <div className="g-info">Based on 124 reviews<br />powered by <strong style={{ color: '#fff' }}>Google</strong></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>Location: 3/13 Bridge St, Epping NSW 2121, Australia &nbsp;Phone: 1300 072 073 &nbsp;© 2018 The Tech Doctor. All Rights Reserved</p>
            <div className="footer-bottom-links">
                <a href="#">Terms &amp; Conditions</a>
                <span className="footer-divider">|</span>
                <a href="#">Privacy Policy</a>
            </div>
        </div>
    </footer>
);

export default Footer;