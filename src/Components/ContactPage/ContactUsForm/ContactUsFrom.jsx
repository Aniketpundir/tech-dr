import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ContactUsFrom.css';
import ContactImg from "../../../assets/contact-us.jpeg"
import GoogleRating from '../../GoogleReviews';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 30 30">
        <path d="M15 0 L16 14 L30 15 L16 16 L15 30 L14 16 L0 15 L14 14 Z" fill="#fff" />
    </svg>
);

// ── CAPTCHA helpers ────────────────────────────────────────────────────────────
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

const mapQuery = '13 Bridge St, Epping NSW 2121, Australia';
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;

const ContactUsForm = () => {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', subject: '', message: ''
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
                                    <input id="cf-name" name="name" type="text"
                                        placeholder="Your name" value={formData.name}
                                        onChange={handleChange} required disabled={isLoading} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-phone">Phone</label>
                                    <input id="cf-phone" name="phone" type="tel"
                                        placeholder="Your phone" value={formData.phone}
                                        onChange={handleChange} disabled={isLoading} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-email">Email</label>
                                    <input id="cf-email" name="email" type="email"
                                        placeholder="Your email" value={formData.email}
                                        onChange={handleChange} required disabled={isLoading} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cf-subject">Subject</label>
                                    <input id="cf-subject" name="subject" type="text"
                                        placeholder="Subject" value={formData.subject}
                                        onChange={handleChange} disabled={isLoading} />
                                </div>
                            </div>

                            <div className="form-message">
                                <div className="form-group">
                                    <label htmlFor="cf-message">Message</label>
                                    <textarea id="cf-message" name="message"
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleChange} required disabled={isLoading} />
                                </div>
                            </div>

                            <ImageCaptcha onVerify={setCaptchaPassed} disabled={isLoading} />

                            <button className="btn-send" type="submit" disabled={isLoading || !captchaPassed}>
                                {isLoading
                                    ? <><span className="btn-spinner" /> Sending...</>
                                    : 'SEND MESSAGE'
                                }
                            </button>

                            {!captchaPassed && status !== 'loading' && (
                                <p className="captcha-hint">Please complete the security check to enable send.</p>
                            )}

                            {status === 'success' && (
                                <p className="form-status success">✅ Message sent! We'll get back to you soon.</p>
                            )}
                            {status === 'error' && (
                                <p className="form-status error">❌ {errorMsg}</p>
                            )}
                        </form>
                    </div>
                </div>

                <div className="contact-map-frame">
                    <iframe title="The Tech Dr location on Google Maps"
                        src={mapEmbedSrc} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" />
                </div>
            </section>
            <br />
            <GoogleRating />
            <br /><br />
        </>
    );
};

export default ContactUsForm;