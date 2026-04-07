import React, { useState } from 'react';
import './ContactForm.css';
import ContactImg from "../../../assets/schedule.webp"

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#fff" />
    </svg>
);

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            // ─────────────────────────────────────────────────────────────
            // API CONNECTION
            // Replace the URL below with your actual backend endpoint.
            //
            // Option 1 – Your own backend:
            //   const ENDPOINT = 'https://yourapi.com/api/contact';
            //
            // Option 2 – Formspree (free, no backend needed):
            //   1. Go to https://formspree.io and create a form
            //   2. Replace YOUR_FORM_ID below
            //   const ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
            //
            // Option 3 – EmailJS:
            //   Use their SDK — see https://emailjs.com
            // ─────────────────────────────────────────────────────────────
            const ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // 🔁 Replace this

            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.error || 'Something went wrong. Please try again.');
            }

            setStatus('success');
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });

        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Failed to send. Please try again.');
        }
    };

    const isLoading = status === 'loading';

    return (
        <section className="contact">

            {/* ── LEFT — completely unchanged ── */}
            <div className="contact-left">
                <div className="contact-image-wrap">
                    <div className="contact-img-main">
                        <img src={ContactImg} alt="Contact The Tech Dr" />
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

            {/* ── RIGHT — orange bg + form tag + API ── */}
            <div className="contact-right">
                <div className="contact-right-label">
                    <Star />
                    <span>GET IN TOUCH</span>
                    <Star />
                </div>

                <h2>We'd Love to Hear From You, Get In Touch With Us!</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="contact-form-grid">
                        <div className="form-group">
                            <label htmlFor="cf-name">Name</label>
                            <input
                                id="cf-name" name="name" type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-phone">Phone</label>
                            <input
                                id="cf-phone" name="phone" type="tel"
                                placeholder="Your phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-email">Email</label>
                            <input
                                id="cf-email" name="email" type="email"
                                placeholder="Your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cf-subject">Subject</label>
                            <input
                                id="cf-subject" name="subject" type="text"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="form-message">
                        <div className="form-group">
                            <label htmlFor="cf-message">Message</label>
                            <textarea
                                id="cf-message" name="message"
                                placeholder="Write your message here..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button className="btn-send" type="submit" disabled={isLoading}>
                        {isLoading
                            ? <><span className="btn-spinner" /> Sending...</>
                            : 'SEND MESSAGE'
                        }
                    </button>

                    {status === 'success' && (
                        <p className="form-status success">
                            ✅ Message sent! We'll get back to you soon.
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="form-status error">
                            ❌ {errorMsg}
                        </p>
                    )}
                </form>
            </div>

        </section>
    );
};

export default ContactForm;