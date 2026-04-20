import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ContactForm.css';
import ContactImghome from "../../../assets/schedule.webp"

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

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz1234567890!@$%^&*()';

const generateCaptchaText = (len = 6) =>
    Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

const drawCaptcha = (canvas, text) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(0, 0, W, H);

    // Noise lines
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * W, Math.random() * H);
        ctx.lineTo(Math.random() * W, Math.random() * H);
        ctx.strokeStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.2})`;
        ctx.lineWidth = 1 + Math.random();
        ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.3})`;
        ctx.fill();
    }

    // Characters
    const charW = W / (text.length + 1);
    text.split('').forEach((ch, i) => {
        ctx.save();
        const x = charW * (i + 0.8) + charW * 0.1;
        const y = H / 2 + 6;
        const angle = (Math.random() - 0.5) * 0.45;
        const size = 22 + Math.floor(Math.random() * 6);
        const fonts = ['Arial', 'Georgia', 'Courier New', 'Verdana', 'Tahoma'];
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.font = `bold ${size}px ${fonts[i % fonts.length]}`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 3;
        ctx.fillText(ch, 0, 0);
        ctx.restore();
    });
};

// ── CAPTCHA Component ──────────────────────────────────────────────────────────
const ImageCaptcha = ({ onVerify, disabled }) => {
    const canvasRef = useRef(null);
    const [captchaText, setCaptchaText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [error, setError] = useState('');
    const [verified, setVerified] = useState(false);

    const refresh = useCallback(() => {
        const text = generateCaptchaText();
        setCaptchaText(text);
        setUserInput('');
        setError('');
        setVerified(false);
        onVerify(false);
        setTimeout(() => drawCaptcha(canvasRef.current, text), 0);
    }, [onVerify]);

    useEffect(() => { refresh(); }, []);

    const handleVerify = () => {
        if (userInput.trim().toLowerCase() === captchaText.toLowerCase()) {
            setVerified(true);
            setError('');
            onVerify(true);
        } else {
            setError('Wrong text. Please try again.');
            refresh();
        }
    };

    return (
        <div className="captcha-wrap">
            <label className="captcha-label">Security Check</label>
            <div className="captcha-row">
                <canvas ref={canvasRef} width={180} height={52} className="captcha-canvas" />
                <button
                    type="button"
                    className="captcha-refresh"
                    onClick={refresh}
                    disabled={disabled || verified}
                    title="Refresh CAPTCHA"
                    aria-label="Refresh CAPTCHA"
                >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <polyline points="23 20 23 14 17 14" />
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
                    </svg>
                </button>
            </div>

            {!verified ? (
                <div className="captcha-input-row">
                    <input
                        type="text"
                        className="captcha-text-input"
                        placeholder="Type the characters above"
                        value={userInput}
                        onChange={(e) => { setUserInput(e.target.value); setError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                        disabled={disabled}
                        maxLength={8}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <button
                        type="button"
                        className="captcha-verify-btn"
                        onClick={handleVerify}
                        disabled={disabled || !userInput.trim()}
                    >
                        Verify
                    </button>
                </div>
            ) : (
                <div className="captcha-success-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified successfully</span>
                </div>
            )}

            {error && <p className="captcha-error">{error}</p>}
        </div>
    );
};


const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const [captchaPassed, setCaptchaPassed] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaPassed) return;
        setStatus('loading');
        setErrorMsg('');
        try {
            const ENDPOINT = 'https://api.thetechdr.com.au/api/contact';
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.error || 'Something went wrong. Please try again.');
            }
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
            setCaptchaPassed(false);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Failed to send. Please try again.');
        }
    };


    const isLoading = status === 'loading';

    return (
        <section className="contact">

            {/* ── LEFT ── */}
            <div className="contact-left">
                <div className="contact-image-wrap">
                    <div className="contact-img-main">
                        <img src={ContactImghome} alt="Contact The Tech Dr" />
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
                    {/* <div className="google-rating">
                        <svg width="28" height="28" viewBox="0 0 48 48">
                            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.4 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l6-6C34.5 6.3 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.5-4z" />
                        </svg>
                        <div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <span className="g-score">4.8</span>
                                <StarRating rating={4.8} />
                            </div>
                            <div className="g-based">Based on 124 reviews</div>
                            <div className="g-based">powered by <strong>Google</strong></div>
                        </div>
                    </div> */}
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

                    <ImageCaptcha onVerify={setCaptchaPassed} disabled={isLoading} />

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