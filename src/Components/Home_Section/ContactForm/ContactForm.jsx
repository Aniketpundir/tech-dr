import React from 'react';
import './ContactForm.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const ContactForm = () => (
    <section className="contact">
        <div className="contact-left">
            <div className="contact-image-wrap">
                <div className="contact-img-main">
                    <svg width="160" height="160" fill="none" stroke="#4488cc" strokeWidth="1.5" viewBox="0 0 160 160" opacity="0.7">
                        <rect x="20" y="30" width="120" height="80" rx="6" />
                        <path d="M40 60 L60 60 M40 80 L100 80 M70 60 L120 60" />
                        <circle cx="130" cy="45" r="14" fill="#e8520a" fillOpacity="0.3" stroke="#e8520a" />
                        <path d="M123 45 L128 50 L138 38" stroke="#e8520a" strokeWidth="2" />
                    </svg>
                </div>
                <div className="contact-deco top-right"></div>
                <div className="contact-deco bottom-left"></div>
                <div className="contact-spark">
                    <svg width="30" height="30" viewBox="0 0 30 30">
                        <path d="M15 0 L16 14 L30 15 L16 16 L15 30 L14 16 L0 15 L14 14 Z" fill="#e8520a" />
                    </svg>
                </div>
            </div>

            <div className="contact-bottom-info">
                <div className="urgent-box">
                    <div className="phone-icon">
                        <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                        </svg>
                    </div>
                    <div>
                        <span className="urgent-label">Urgent Support?</span>
                        <span className="urgent-num">1300 072 073</span>
                    </div>
                </div>
                <div className="google-rating">
                    <svg width="28" height="28" viewBox="0 0 48 48">
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.4 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.5-4z" />
                    </svg>
                    <div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                            <span className="g-score">0</span>
                            <span className="g-stars">☆☆☆☆☆</span>
                        </div>
                        <div className="g-based">Based on 0 reviews</div>
                        <div className="g-based">powered by <strong>Google</strong></div>
                    </div>
                </div>
            </div>
        </div>

        <div className="contact-right">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>GET IN TOUCH</span> <Star />
            </div>
            <h2>We'd Love to Hear From You, Get In Touch With Us!</h2>

            <div className="contact-form-grid">
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="text" placeholder="phone" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Subject" />
                </div>
            </div>
            <div className="form-message">
                <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Message"></textarea>
                </div>
            </div>
            <button className="btn-send">SEND</button>
        </div>
    </section>
);

export default ContactForm;