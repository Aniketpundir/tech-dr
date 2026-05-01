import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import "./BookingForm.css";
import image from "../../assets/Tech-support-professional.jpeg"
import SuburbsSection from "../../Components/SuburbsSection/SuburbsSection";

const API_URL = "https://api.thetechdr.com.au/api/bookings";
const API_KEY = "YOUR-API-KEY-YAHAN-DAALEN";
const API_METHOD = "POST";

function todayStr() {
    return new Date().toISOString().split("T")[0];
}

function buildCalDays() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const today = now.getDate();
    const cells = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return { cells, today };
}

// ── CAPTCHA helpers ────────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz1234567890!@#$%^&*()';

const generateCaptchaText = (len = 6) =>
    Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');

const drawCaptcha = (canvas, text) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff3ec';
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * W, Math.random() * H);
        ctx.lineTo(Math.random() * W, Math.random() * H);
        ctx.strokeStyle = `rgba(232,82,10,${0.12 + Math.random() * 0.18})`;
        ctx.lineWidth = 1 + Math.random();
        ctx.stroke();
    }

    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,82,10,${0.15 + Math.random() * 0.25})`;
        ctx.fill();
    }

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
        ctx.fillStyle = '#e8520a';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.15)';
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
        <div className="booking-captcha-wrap">
            <p className="booking-captcha-label">Security Check</p>
            <div className="booking-captcha-row">
                <canvas
                    ref={canvasRef}
                    width={180}
                    height={52}
                    className="booking-captcha-canvas"
                />
                <button
                    type="button"
                    className="booking-captcha-refresh"
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
                <div className="booking-captcha-input-row">
                    <input
                        type="text"
                        className="field-input booking-captcha-text-input"
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
                        className="booking-captcha-verify-btn"
                        onClick={handleVerify}
                        disabled={disabled || !userInput.trim()}
                    >
                        Verify
                    </button>
                </div>
            ) : (
                <div className="booking-captcha-success-row">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Verified successfully</span>
                </div>
            )}

            {error && <p className="booking-captcha-error">{error}</p>}
        </div>
    );
};
// ──────────────────────────────────────────────────────────────────────────────

export default function BookingForm() {

    // ── Refs for each field (scroll to error) ──
    const fieldRefs = {
        name: useRef(null),
        email: useRef(null),
        phone: useRef(null),
        address: useRef(null),
        description: useRef(null),
        timeSlots: useRef(null),
        captcha: useRef(null),
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        description: "",
        objectives: "",
        serviceType: "onsite",
        siteType: "home",
        preferredDate: todayStr(),
        timeSlots: {
            morning: false,
            midday: false,
            afternoon: false,
            evening: false,
        },
        subscribe: true,
    });

    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});
    const [captchaPassed, setCaptchaPassed] = useState(false);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 6000);
        return () => clearTimeout(t);
    }, [toast]);

    const handleField = (e) => {
        const { name, value, type, checked } = e.target;
        // Clear error for this field on change
        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (Object.prototype.hasOwnProperty.call(form.timeSlots, name)) {
            setErrors((prev) => ({ ...prev, timeSlots: "" }));
            setForm((prev) => ({
                ...prev,
                timeSlots: { ...prev.timeSlots, [name]: checked },
            }));
        } else if (type === "checkbox") {
            setForm((prev) => ({ ...prev, [name]: checked }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = "Name is required";
        if (!form.email.trim()) errs.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
        if (!form.phone.trim()) errs.phone = "Phone is required";
        else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
            errs.phone = "Enter a 10-digit phone number";
        if (!form.address.trim()) errs.address = "Address is required";
        if (!form.description.trim()) errs.description = "Please describe your problem";
        if (!Object.values(form.timeSlots).some(Boolean))
            errs.timeSlots = "Please select at least one time slot";
        if (!captchaPassed) errs.captcha = "Please complete the security check";
        return errs;
    };

    const buildPayload = useCallback(() => ({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        postcode: form.postcode.trim(),
        description: form.description.trim(),
        objectives: form.objectives.trim(),
        service_type: form.serviceType,
        site_type: form.siteType,
        preferred_date: form.preferredDate,
        time_slots: Object.entries(form.timeSlots)
            .filter(([, v]) => v)
            .map(([k]) => k),
        subscribe: form.subscribe,
        submitted_at: new Date().toISOString(),
    }), [form]);

    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            // Scroll to FIRST error field
            const order = ["name", "email", "phone", "address", "description", "timeSlots", "captcha"];
            for (const key of order) {
                if (errs[key] && fieldRefs[key]?.current) {
                    fieldRefs[key].current.scrollIntoView({ behavior: "smooth", block: "center" });
                    break;
                }
            }
            return;
        }

        setSubmitting(true);
        const payload = buildPayload();

        try {
            const headers = { "Content-Type": "application/json" };
            if (API_KEY) headers["Authorization"] = `Bearer ${API_KEY}`;

            const res = await fetch(API_URL, {
                method: API_METHOD,
                headers,
                body: JSON.stringify(payload),
                signal: AbortSignal.timeout(15000),
            });

            if (res.ok) {
                let data = {};
                try { data = await res.json(); } catch (e) { console.log(e); }
                setToast({
                    type: "success",
                    message: data.message || "✅ Booking submitted successfully! We will contact you soon.",
                });
                setForm({
                    name: "", email: "", phone: "", address: "", postcode: "",
                    description: "", objectives: "",
                    serviceType: "onsite", siteType: "home",
                    preferredDate: todayStr(),
                    timeSlots: { morning: false, midday: false, afternoon: false, evening: false },
                    subscribe: true,
                });
                setErrors({});
                setCaptchaPassed(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                let errMsg = `Server error (${res.status})`;
                try {
                    const errData = await res.json();
                    errMsg = errData.message || errData.error || errMsg;
                } catch (e) { console.log(e); }
                setToast({ type: "error", message: `Submission failed: ${errMsg}` });
            }
        } catch (err) {
            setToast({
                type: "error",
                message: err.name === "TimeoutError"
                    ? "Request timed out. Please try again."
                    : `Network error: ${err.message}`,
            });
        } finally {
            setSubmitting(false);
        }
    };

    const { cells: calCells, today: calToday } = buildCalDays();

    return (
        <div>
            <Helmet>
                <title>Book IT Support Sydney | TheTechDr | Same-Day Service</title>
                <meta name="description" content="Book same-day IT support and computer repairs across Sydney with TheTechDr. Fast, professional service for homes and businesses. Call 1300 072 073." />
                <meta name="keywords" content="book IT support Sydney, book computer repair Sydney, same-day IT booking, TheTechDr booking" />
                <link rel="canonical" href="https://www.thetechdr.com.au/book-now" />
                <meta name="robots" content="index, follow" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.thetechdr.com.au/book-now" />
                <meta property="og:title" content="Book IT Support Sydney | TheTechDr" />
                <meta property="og:description" content="Book same-day IT support across Sydney. Fast, professional, no fix no pay." />
                <meta property="og:image" content="https://www.thetechdr.com.au/og-image.jpg" />
                <meta property="og:locale" content="en_AU" />
                <meta property="og:site_name" content="TheTechDr" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Book IT Support Sydney | TheTechDr" />
                <meta name="twitter:description" content="Book same-day IT support across Sydney. Call 1300 072 073." />
                <meta name="twitter:image" content="https://www.thetechdr.com.au/og-image.jpg" />
            </Helmet>

            <div className="booking-page">

                <h1 className="booking-page-title">The <span>Tech Dr</span></h1>
                <p className="booking-page-subtitle">Expert IT Support &amp; Tech Services</p>

                {toast && (
                    <div className={`toast ${toast.type}`}>
                        <span>{toast.message}</span>
                        <button
                            onClick={() => setToast(null)}
                            style={{
                                marginLeft: "auto", background: "none", border: "none",
                                cursor: "pointer", fontSize: "1rem", color: "inherit"
                            }}
                        >✕</button>
                    </div>
                )}

                <p className="intro-title">Ready to wave goodbye to Expert IT Support &amp; Tech Services headaches?</p>
                <p className="intro-body">
                    You're in the right place. Book a <strong>professional, in-home Expert IT Support &amp; Tech Services</strong> in
                    just a few clicks. No call centres. No waiting weeks. No guesswork. Fill out the form below
                    with your details, a short description of the issue, and your preferred time. Our team will{" "}
                    <strong>confirm your booking quickly</strong> and get you sorted.
                </p>

                <p className="why-title">Why Choose Us?</p>

                <div className="why-item">
                    <div className="why-icon">✓</div>
                    <div className="why-item-body">
                        <b>Same-Day &amp; Fast Response</b>
                        <span>Most bookings are confirmed within minutes during business hours.</span>
                    </div>
                </div>
                <div className="why-item">
                    <div className="why-icon">✓</div>
                    <div className="why-item-body">
                        <b>Expert, Background-Checked Technicians</b>
                        <span>Qualified professionals with real-world experience — not script readers.</span>
                    </div>
                </div>
                <div className="why-item">
                    <div className="why-icon">✓</div>
                    <div className="why-item-body">
                        <b>Australian-Based Helpdesk Support</b>
                        <span>Talk to a real local team before <strong>and after</strong> your appointment.</span>
                    </div>
                </div>

                <p className="cta-line">
                    Book now and enjoy <strong>hassle-free tech support</strong> at <strong>your convenience</strong>!
                </p>
                <p className="intro-title" style={{ color: "#e8520a" }}>FILL OUT THE BOOKING FORM</p>

                <form className="form-section">

                    {/* NAME */}
                    <div className="field-row" ref={fieldRefs.name}>
                        <label>Name:</label>
                        <div>
                            <input
                                className={`field-input${errors.name ? " field-input--error" : ""}`}
                                type="text" name="name"
                                value={form.name} onChange={handleField}
                                placeholder='e.g., Carl "Byte Banter" Barron' />
                            {errors.name && <p className="field-error">{errors.name}</p>}
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="field-row" ref={fieldRefs.email}>
                        <label>Email:</label>
                        <div>
                            <input
                                className={`field-input${errors.email ? " field-input--error" : ""}`}
                                type="email" name="email"
                                value={form.email} onChange={handleField}
                                placeholder="e.g., one.ended.stick@gmail.com" />
                            {errors.email && <p className="field-error">{errors.email}</p>}
                        </div>
                    </div>

                    {/* PHONE */}
                    <div className="field-row" ref={fieldRefs.phone}>
                        <label>Phone:</label>
                        <div>
                            <input
                                className={`field-input${errors.phone ? " field-input--error" : ""}`}
                                type="tel" name="phone"
                                value={form.phone} onChange={handleField}
                                placeholder="e.g., 0412345678 / 0212345678 (10 digits, please)" />
                            {errors.phone && <p className="field-error">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="field-row" ref={fieldRefs.address}>
                        <label>Address:</label>
                        <div>
                            <input
                                className={`field-input${errors.address ? " field-input--error" : ""}`}
                                type="text" name="address"
                                value={form.address} onChange={handleField}
                                placeholder="e.g., 13 NoPaddle Street, Chip Creek, QLD 4730" />
                            {errors.address && <p className="field-error">{errors.address}</p>}
                        </div>
                    </div>

                    {/* POSTCODE */}
                    <div className="field-row">
                        <label>Postcode:</label>
                        <input className="field-input postcode" type="text" name="postcode"
                            value={form.postcode} onChange={handleField} placeholder="" />
                    </div>

                    <hr className="form-divider" />

                    {/* DESCRIPTION */}
                    <div className="field-row top-align" ref={fieldRefs.description}>
                        <label>Description of<br />the Problem:</label>
                        <div>
                            <textarea
                                className={`field-textarea${errors.description ? " field-input--error" : ""}`}
                                name="description"
                                value={form.description} onChange={handleField}
                                placeholder="Please list your technology issues in detail, we love to assist people with technology challenges!" />
                            {errors.description && <p className="field-error">{errors.description}</p>}
                        </div>
                    </div>

                    {/* OBJECTIVES */}
                    <div className="field-row top-align">
                        <label>Objectives:<br />What are you<br />trying to<br />achieve?</label>
                        <textarea className="field-textarea" name="objectives"
                            value={form.objectives} onChange={handleField}
                            placeholder="How can we assist you best?" />
                    </div>

                    <hr className="form-divider" />

                    {/* SERVICE TYPE */}
                    <div className="field-row">
                        <label>Service Type:</label>
                        <div className="radio-group">
                            {[
                                { value: "onsite", label: "On-site Visit" },
                                { value: "remote", label: "Remote Support" },
                                { value: "laptop", label: "Laptop Repair" },
                            ].map((opt) => (
                                <label key={opt.value}>
                                    <input type="radio" name="serviceType" value={opt.value}
                                        checked={form.serviceType === opt.value} onChange={handleField} />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* SITE TYPE */}
                    <div className="field-row">
                        <label>Site Type:</label>
                        <div className="radio-group">
                            {[
                                { value: "home", label: "Home" },
                                { value: "home-business", label: "Home Business" },
                                { value: "wfh", label: "Work from Home" },
                                { value: "business", label: "Business" },
                                { value: "retail", label: "Retail" },
                                { value: "other", label: "Other" },
                            ].map((opt) => (
                                <label key={opt.value}>
                                    <input type="radio" name="siteType" value={opt.value}
                                        checked={form.siteType === opt.value} onChange={handleField} />
                                    {opt.label}
                                </label>
                            ))}
                        </div>
                    </div>

                    <hr className="form-divider" />

                    {/* PREFERRED DATE */}
                    <div className="field-row">
                        <label>Preferred Date:</label>
                        <input className="field-input date-input" type="date" name="preferredDate"
                            value={form.preferredDate} onChange={handleField} min={todayStr()} />
                    </div>

                    {/* TIME SLOTS */}
                    <div className="field-row top-align" ref={fieldRefs.timeSlots}>
                        <label>Preferred<br />Time(s) Slots:</label>
                        <div>
                            <div className={`timeslots-grid${errors.timeSlots ? " timeslots-grid--error" : ""}`}>
                                <div className="timeslot-col">
                                    <h4>Morning</h4>
                                    <label className="timeslot-item">
                                        <input type="checkbox" name="morning"
                                            checked={form.timeSlots.morning} onChange={handleField} />
                                        8:00am – 11:30am
                                    </label>
                                </div>
                                <div className="timeslot-col">
                                    <h4>Midday</h4>
                                    <label className="timeslot-item">
                                        <input type="checkbox" name="midday"
                                            checked={form.timeSlots.midday} onChange={handleField} />
                                        12:00pm – 2:30pm
                                    </label>
                                </div>
                                <div className="timeslot-col">
                                    <h4>Afternoon</h4>
                                    <label className="timeslot-item">
                                        <input type="checkbox" name="afternoon"
                                            checked={form.timeSlots.afternoon} onChange={handleField} />
                                        3:00pm – 5:30pm
                                    </label>
                                </div>
                                <div className="timeslot-col">
                                    <h4>Evening</h4>
                                    <label className="timeslot-item">
                                        <input type="checkbox" name="evening"
                                            checked={form.timeSlots.evening} onChange={handleField} />
                                        6:00pm – 9:00pm
                                    </label>
                                </div>
                            </div>
                            {errors.timeSlots && <p className="field-error">{errors.timeSlots}</p>}
                        </div>
                    </div>

                    <hr className="form-divider" />

                    {/* SUBSCRIBE */}
                    <div className="subscribe-section">
                        <label className="field-label">Subscribe:</label>
                        <label className="subscribe-check">
                            <input type="checkbox" name="subscribe"
                                checked={form.subscribe} onChange={handleField} />
                            Sign me up for the weekly newsletter
                        </label>
                        <p className="privacy-note">
                            *We will never share your information with anyone{" "}
                            <a href="#">( Visit our Privacy Policy here )</a>.
                        </p>
                    </div>

                    <hr className="form-divider" />

                    {/* CAPTCHA */}
                    <div className="field-row top-align" ref={fieldRefs.captcha}>
                        <label>Security<br />Check:</label>
                        <div>
                            <ImageCaptcha onVerify={setCaptchaPassed} disabled={submitting} />
                            {errors.captcha && <p className="field-error">{errors.captcha}</p>}
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="submit-button">
                        <button
                            className="submit-btn"
                            type="button"
                            onClick={handleSubmit}
                            disabled={submitting || !captchaPassed}
                        >
                            {submitting
                                ? <><span className="spinner" /> Submitting…</>
                                : "Submit"
                            }
                        </button>
                    </div>

                    {!captchaPassed && (
                        <p className="booking-captcha-hint">Please complete the security check to enable submit.</p>
                    )}

                </form>

                <p className="urgent-bar">
                    For <strong>urgent enquiries</strong>, please get in touch with us on{" "}
                    <a href="tel:1300723628">1300 723 628</a>.
                </p>

                <div className="hero-illustration">
                    <div className="hero-svg-wrap">
                        <div className="hero-person-icon">
                            <img src={image} alt="Tech support professional" />
                        </div>
                        <div className="hero-monitor">
                            <h3>House Appointment</h3>
                            <div className="cal-grid">
                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <span key={`h${i}`} style={{ color: "#e8520a", fontSize: "0.65rem" }}>{d}</span>
                                ))}
                                {calCells.slice(0, 28).map((d, i) => (
                                    <span key={i} className={
                                        d === calToday ? "cal-today" :
                                            d === calToday + 1 ? "cal-selected" : ""
                                    }>
                                        {d || ""}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="hero-caption">
                        Self-booking from <a href="#">the Tech Dr</a> Australia
                    </div>
                </div>

                <SuburbsSection />

            </div>
        </div>
    );
}