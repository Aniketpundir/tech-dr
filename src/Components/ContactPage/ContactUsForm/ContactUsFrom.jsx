import React, { useState } from 'react';
import './ContactUsFrom.css';
import ContactImg from "../../../assets/contact-us.jpeg"
import GoogleRating from '../../GoogleReviews';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#fff" />
    </svg>
);

const StarRating = ({ rating = 4.8 }) => {
    const fullStars = Math.floor(rating);
    const partial = rating - fullStars;

    return (
        <svg width="90" height="16" viewBox="0 0 90 16">
            {[0, 1, 2, 3, 4].map((i) => {
                const x = i * 18;
                const id = `partial-${i}`;
                const fill = i < fullStars ? '#e8520a' : i === fullStars && partial > 0 ? `url(#${id})` : '#d1d5db';

                return (
                    <g key={i}>
                        {i === fullStars && partial > 0 && (
                            <defs>
                                <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                                    <stop offset={`${partial * 100}%`} stopColor="#e8520a" />
                                    <stop offset={`${partial * 100}%`} stopColor="#d1d5db" />
                                </linearGradient>
                            </defs>
                        )}
                        <path
                            d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"
                            transform={`translate(${x}, 0)`}
                            fill={fill}
                        />
                    </g>
                );
            })}
        </svg>
    );
};

const mapQuery = '13 Bridge St, Epping NSW 2121, Australia';
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const ENDPOINT = 'https://api.thetechdr.com.au/api/contact';

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
        <>
        <section className="contact">
            <div className='contacts'>
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
                </div>

                {/* ── RIGHT ── */}
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
            </div>
            <div className="contact-map-frame">
                <iframe
                    title="The Tech Dr location on Google Maps"
                    src={mapEmbedSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
        <br/>
        <GoogleRating/>
        <br/>
        <br/>
        </>
    );
};

export default ContactUsForm;