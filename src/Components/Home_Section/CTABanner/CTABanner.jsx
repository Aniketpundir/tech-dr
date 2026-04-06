import React from 'react';
import './CTABanner.css';

const CTABanner = () => (
    <section className="cta-banner">
        <div className="cta-star-left">
            <svg width="40" height="40" viewBox="0 0 40 40">
                <path d="M20 0 L22 18 L40 20 L22 22 L20 40 L18 22 L0 20 L18 18 Z" fill="#cc88ff" />
            </svg>
        </div>
        <div className="cta-star-right">
            <svg width="50" height="50" viewBox="0 0 50 50">
                <path d="M25 0 L26 24 L50 25 L26 26 L25 50 L24 26 L0 25 L24 24 Z" fill="#ffddaa" />
            </svg>
        </div>

        <h2>Feel free to contact us on 1300 072 073<br />for a Cost-Effective Professional Computer Repair Service.</h2>

        <div className="cta-actions">
            <div className="cta-phone">
                <div className="phone-icon">
                    <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                    </svg>
                </div>
                <span>1300 072 073</span>
            </div>
            <span className="cta-or">OR</span>
            <button className="btn-consultation">FREE CONSULTATION</button>
        </div>
    </section>
);

export default CTABanner;