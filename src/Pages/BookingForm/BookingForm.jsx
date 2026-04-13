import { useState, useEffect, useCallback } from "react";
import "./BookingForm.css";

// ============================================================
//  ⬇️  YAHAN APNI API URL AUR KEY DAALEN  ⬇️
// ============================================================
const API_URL = "https://YOUR-API-URL-YAHAN-DAALEN.com/api/bookings";
//  👆 Upar apni API ka poora URL likho
//  Example: "https://api.thetechdr.com.au/bookings"

const API_KEY = "YOUR-API-KEY-YAHAN-DAALEN";
//  👆 Upar apni real API Key likho
//  Agar API Key nahi hai to khali string chhod do: ""

const API_METHOD = "POST";
//  👆 Ye method hai — POST rehne do jab tak kuch aur bataya na jaye
// ============================================================

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

export default function BookingForm() {

    // ── Form State ──
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
            morning: true,
            midday: false,
            afternoon: false,
            evening: false,
        },
        subscribe: true,
    });

    // ── UI State ──
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [scrollBtn, setScrollBtn] = useState(false);
    const [errors, setErrors] = useState({});

    // ── Scroll listener ──
    useEffect(() => {
        const onScroll = () => setScrollBtn(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── Auto-hide toast ──
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 6000);
        return () => clearTimeout(t);
    }, [toast]);

    // ── Field Handler ──
    const handleField = (e) => {
        const { name, value, type, checked } = e.target;
        setErrors((prev) => ({ ...prev, [name]: "" }));

        if (Object.prototype.hasOwnProperty.call(form.timeSlots, name)) {
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

    // ── Validation ──
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
        return errs;
    };

    // ── Build Payload ──
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

    // ── Submit ──
    const handleSubmit = async () => {
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            setToast({ type: "error", message: "Please fix the highlighted fields before submitting." });
            window.scrollTo({ top: 0, behavior: "smooth" });
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
                try { data = await res.json(); } catch (e) { console.log(e) }
                setToast({
                    type: "success",
                    message: data.message || "✅ Booking submitted successfully! We will contact you soon.",
                });
                // Reset form
                setForm({
                    name: "", email: "", phone: "", address: "", postcode: "",
                    description: "", objectives: "",
                    serviceType: "onsite", siteType: "home",
                    preferredDate: todayStr(),
                    timeSlots: { morning: true, midday: false, afternoon: false, evening: false },
                    subscribe: true,
                });
                setErrors({});
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                let errMsg = `Server error (${res.status})`;
                try {
                    const errData = await res.json();
                    errMsg = errData.message || errData.error || errMsg;
                } catch (e) {
                    console.log(e);
                }
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

    // ── Calendar ──
    const { cells: calCells, today: calToday } = buildCalDays();

    return (
        <div>
            <div className="booking-page">

                {/* ── Branding ── */}
                <h1 className="booking-page-title">
                    The <span>Tech Dr</span>
                </h1>
                <p className="booking-page-subtitle">Expert IT Support &amp; Tech Services</p>

                {/* ── Toast ── */}
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

                {/* ── Intro ── */}
                <p className="intro-title">Ready to wave goodbye to Expert IT Support & Tech Services headaches?</p>
                <p className="intro-body">
                    You're in the right place. Book a <strong>professional, in-home Expert IT Support & Tech Services</strong> in
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

                {/* ── Name ── */}
                <div className="field-row">
                    <label>Name:</label>
                    <div>
                        <input
                            className="field-input"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleField}
                            placeholder='e.g., Carl "Byte Banter" Barron'
                        />
                        {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>
                </div>

                {/* ── Email ── */}
                <div className="field-row">
                    <label>Email:</label>
                    <div>
                        <input
                            className="field-input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleField}
                            placeholder="e.g., one.ended.stick@gmail.com"
                        />
                        {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>
                </div>

                {/* ── Phone ── */}
                <div className="field-row">
                    <label>Phone:</label>
                    <div>
                        <input
                            className="field-input"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleField}
                            placeholder="e.g., 0412345678 / 0212345678 (10 digits, please)"
                        />
                        {errors.phone && <p className="field-error">{errors.phone}</p>}
                    </div>
                </div>

                {/* ── Address ── */}
                <div className="field-row">
                    <label>Address:</label>
                    <div>
                        <input
                            className="field-input"
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleField}
                            placeholder="e.g., 13 NoPaddle Street, Chip Creek, QLD 4730"
                        />
                        {errors.address && <p className="field-error">{errors.address}</p>}
                    </div>
                </div>

                {/* ── Postcode ── */}
                <div className="field-row">
                    <label>Postcode:</label>
                    <input
                        className="field-input postcode"
                        type="text"
                        name="postcode"
                        value={form.postcode}
                        onChange={handleField}
                        placeholder=""
                    />
                </div>

                <hr className="form-divider" />

                {/* ── Description ── */}
                <div className="field-row top-align">
                    <label>Description of<br />the Problem:</label>
                    <div>
                        <textarea
                            className="field-textarea"
                            name="description"
                            value={form.description}
                            onChange={handleField}
                            placeholder="Please list your technology issues in detail, we love to assist people with technology challenges!"
                        />
                        {errors.description && <p className="field-error">{errors.description}</p>}
                    </div>
                </div>

                {/* ── Objectives ── */}
                <div className="field-row top-align">
                    <label>Objectives:<br />What are you<br />trying to<br />achieve?</label>
                    <textarea
                        className="field-textarea"
                        name="objectives"
                        value={form.objectives}
                        onChange={handleField}
                        placeholder="How can we assist you best?"
                    />
                </div>

                <hr className="form-divider" />

                {/* ── Service Type ── */}
                <div className="field-row">
                    <label>Service Type:</label>
                    <div className="radio-group">
                        {[
                            { value: "onsite", label: "On-site Visit" },
                            { value: "remote", label: "Remote Support" },
                            { value: "laptop", label: "Laptop Repair" },
                        ].map((opt) => (
                            <label key={opt.value}>
                                <input
                                    type="radio"
                                    name="serviceType"
                                    value={opt.value}
                                    checked={form.serviceType === opt.value}
                                    onChange={handleField}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* ── Site Type ── */}
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
                                <input
                                    type="radio"
                                    name="siteType"
                                    value={opt.value}
                                    checked={form.siteType === opt.value}
                                    onChange={handleField}
                                />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>

                <hr className="form-divider" />

                {/* ── Preferred Date ── */}
                <div className="field-row">
                    <label>Preferred Date:</label>
                    <input
                        className="field-input date-input"
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleField}
                        min={todayStr()}
                    />
                </div>

                {/* ── Time Slots ── */}
                <div className="field-row top-align">
                    <label>Preferred<br />Time(s) Slots:</label>
                    <div>
                        <div className="timeslots-grid">
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

                {/* ── Subscribe ── */}
                <div className="subscribe-section">
                    <label className="field-label">Subscribe:</label>
                    <label className="subscribe-check">
                        <input
                            type="checkbox"
                            name="subscribe"
                            checked={form.subscribe}
                            onChange={handleField}
                        />
                        Sign me up for the weekly newsletter
                    </label>
                    <p className="privacy-note">
                        *We will never share your information with anyone{" "}
                        <a href="#">( Visit our Privacy Policy here )</a>.
                    </p>
                </div>

                {/* ── Submit Button ── */}
                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting
                        ? <><span className="spinner" /> Submitting…</>
                        : "Submit"
                    }
                </button>

                {/* ── Urgent Bar ── */}
                <p className="urgent-bar">
                    For <strong>urgent enquiries</strong>, please get in touch with us on{" "}
                    <a href="tel:1300723628">1300 723 628</a>.
                </p>

                {/* ── Hero Illustration ── */}
                <div className="hero-illustration">
                    <div className="hero-svg-wrap">
                        <div className="hero-person-icon">🧑‍💻</div>

                        <div className="hero-monitor">
                            <h3>House Appointment</h3>
                            <div className="cal-grid">
                                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                    <span key={`h${i}`} style={{ color: "#e8520a", fontSize: "0.65rem" }}>{d}</span>
                                ))}
                                {calCells.slice(0, 28).map((d, i) => (
                                    <span
                                        key={i}
                                        className={
                                            d === calToday ? "cal-today" :
                                                d === calToday + 1 ? "cal-selected" : ""
                                        }
                                    >
                                        {d || ""}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            background: "#e8520a", color: "#fff",
                            borderRadius: 10, padding: "14px 20px",
                            textAlign: "center", boxShadow: "0 4px 14px rgba(26,111,196,0.3)"
                        }}>
                            <div style={{ fontSize: "2.2rem", fontWeight: 800, lineHeight: 1 }}>1</div>
                            <div style={{
                                fontSize: "0.7rem", fontWeight: 800, letterSpacing: 1,
                                textTransform: "uppercase", marginTop: 4
                            }}>Booking</div>
                        </div>
                    </div>

                    <div className="hero-caption">
                        Self-booking from <a href="#">the Tech Dr</a> Australia
                    </div>
                </div>

            </div>

            {/* ── Scroll To Top ── */}
            {scrollBtn && (
                <button
                    className="scroll-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                >
                    ↑
                </button>
            )}
        </div>
    );
}