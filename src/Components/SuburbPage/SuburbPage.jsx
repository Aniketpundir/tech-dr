import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cityData, suburbImages } from "../CityData/CityData";
import "./SuburbPage.css";

// Find which region a suburb belongs to
const findRegionForSuburb = (suburbSlug) => {
    const suburbName = suburbSlug
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    for (const [region, data] of Object.entries(cityData)) {
        const found = data.suburbs.find(
            (s) =>
                s.toLowerCase() === suburbName.toLowerCase() ||
                s.toLowerCase().replace(/\s+/g, "-") === suburbSlug.toLowerCase()
        );
        if (found) return { region, suburb: found, data };
    }
    return null;
};

const FaqItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="sp-faq-item">
            <button
                className={`sp-faq-question ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
            >
                {question}
                <span className="sp-faq-chevron">{open ? "▲" : "▼"}</span>
            </button>
            {open && <p className="sp-faq-answer">{answer}</p>}
        </div>
    );
};

const SuburbPage = () => {
    const { suburbSlug } = useParams();
    const navigate = useNavigate();

    const result = findRegionForSuburb(suburbSlug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (result) {
            document.title = `IT Support in ${result.suburb} | TheTechDr`;
        }
    }, [suburbSlug, result]);

    if (!result) {
        return (
            <div className="sp-page">
                <div className="sp-topbar" />
                <div className="sp-content">
                    <button className="sp-back-btn" onClick={() => navigate(-1)}>
                        <svg viewBox="0 0 24 24" fill="none" className="sp-back-arrow">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#E8623A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </button>
                    <p>Suburb not found.</p>
                </div>
            </div>
        );
    }

    const { region, suburb, data } = result;
    const regionSlug = region.toLowerCase().replace(/\s+/g, "-");

    // ── Suburb-specific images — fallback to parent region if not in map ──
    const imgs = suburbImages[suburb] || { image1: data.image1, image2: data.image2 };

    // Nearby suburbs (excluding current, max 6)
    const nearbySuburbs = data.suburbs.filter((s) => s !== suburb).slice(0, 6);

    // Suburb-specific FAQs
    const suburbFaqs = [
        {
            q: `Do you offer same-day IT support in ${suburb}?`,
            a: `Yes! We provide same-day on-site service in ${suburb} and surrounding suburbs. Call 1300 072 073 to book a technician for today.`,
        },
        {
            q: `What IT services are available in ${suburb}?`,
            a: `We cover a full range of services in ${suburb} including PC & Mac repairs, Gaming PC builds, CCTV installation, Starlink setup, network configuration, data recovery, server setup, and business phone systems.`,
        },
        ...(data.faq || []),
    ];

    return (
        <div className="sp-page">
            <div className="sp-topbar" />

            <div className="sp-content">

                {/* Breadcrumb */}
                <nav className="sp-breadcrumb">
                    <button className="sp-crumb-btn" onClick={() => navigate("/")}>
                        All Regions
                    </button>
                    <span className="sp-crumb-sep">›</span>
                    <button className="sp-crumb-btn" onClick={() => navigate(`/suburbs-section/city/${regionSlug}`)}>
                        {region}
                    </button>
                    <span className="sp-crumb-sep">›</span>
                    <span className="sp-crumb-active">{suburb}</span>
                </nav>

                {/* Back button */}
                <button className="sp-back-btn" onClick={() => navigate(`/suburbs-section/city/${regionSlug}`)}>
                    <svg viewBox="0 0 24 24" fill="none" className="sp-back-arrow">
                        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#E8623A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to {region}
                </button>

                {/* Title */}
                <h1 className="sp-title">
                    Expert IT Support &amp; Tech Services in {suburb} — TheTechDr
                </h1>

                <p className="sp-region-tag">Part of {data.area}</p>

                <p className="sp-intro">
                    Need a Trusted Local IT Expert in <strong>{suburb}</strong> for PC
                    Repairs, Network Setup, CCTV, Gaming PCs, Starlink &amp; More?{" "}
                    <strong>We're just one call away!</strong>{" "}
                    <a href="tel:1300072073" className="sp-phone">1300 072 073</a>
                </p>

                <p className="sp-bold-para">
                    <strong>TheTechDr</strong> is proud to deliver fast, reliable, and
                    professional IT support and technology services for both homes and
                    businesses in <strong>{suburb}</strong> — {data.description}.
                </p>

                {/* ── Suburb-specific images ── */}
                <div className="sp-images">
                    <img src={imgs.image1} alt={`${suburb} Sydney`} className="sp-img" />
                    <img src={imgs.image2} alt={`${suburb} area`} className="sp-img" />
                </div>

                <p className="sp-para">
                    Our experienced team of IT technicians serving <strong>{suburb}</strong>{" "}
                    are highly skilled across a wide range of services — from PC and Mac
                    repairs to Gaming PC builds, CCTV installations, Starlink setups,
                    business servers, and network configuration. {data.character}
                </p>

                <p className="sp-para">
                    Call <a href="tel:1300072073" className="sp-phone">1300 072 073</a>{" "}
                    today and connect with your local {suburb} IT expert. We offer
                    same-day service across {suburb} and nearby suburbs.
                </p>

                <div className="sp-divider" />

                {/* Services */}
                <h2 className="sp-subtitle">Our IT &amp; Technology Services in {suburb}</h2>
                <p className="sp-para">
                    From Gaming PC builds and CCTV installations to business server
                    setup, Starlink configuration, and device repairs — TheTechDr covers
                    every tech need in {suburb}.
                </p>
                <ul className="sp-services-list">
                    {data.services.map((svc, i) => (
                        <li key={i}><span className="sp-svc-dot" />{svc}</li>
                    ))}
                </ul>

                <div className="sp-divider" />

                {/* Why choose us */}
                <h2 className="sp-subtitle">Why {suburb} Residents Choose TheTechDr</h2>
                <p className="sp-para">
                    Whether you need a Gaming PC built, a CCTV system installed, a slow
                    laptop repaired, your Wi-Fi sorted, or a full business server
                    configured — we're here to help. At <strong>TheTechDr</strong>, we
                    ensure you receive friendly, expert service from a certified
                    technician who can assist you <strong>the same day</strong>.
                </p>
                <p className="sp-para">{data.localTip}</p>

                {/* Highlight cards */}
                <div className="sp-highlights">
                    <div className="sp-highlight-card">
                        <span className="sp-highlight-icon">⚡</span>
                        <strong>Same-Day Service</strong>
                        <p>Fast response in {suburb} and nearby suburbs</p>
                    </div>
                    <div className="sp-highlight-card">
                        <span className="sp-highlight-icon">✅</span>
                        <strong>No Fix, No Pay</strong>
                        <p>You only pay when your problem is fully resolved</p>
                    </div>
                    <div className="sp-highlight-card">
                        <span className="sp-highlight-icon">💰</span>
                        <strong>Transparent Pricing</strong>
                        <p>Upfront quotes, no hidden fees, ever</p>
                    </div>
                    <div className="sp-highlight-card">
                        <span className="sp-highlight-icon">🔒</span>
                        <strong>Fully Insured</strong>
                        <p>All technicians are background-checked and insured</p>
                    </div>
                </div>

                <div className="sp-divider" />

                {/* Nearby suburbs */}
                <h2 className="sp-subtitle">Nearby Suburbs We Also Service</h2>
                <p className="sp-para">
                    Along with {suburb}, our technicians regularly service these nearby {region} suburbs:
                </p>
                <div className="sp-nearby-grid">
                    {nearbySuburbs.map((s, i) => (
                        <button
                            key={i}
                            className="sp-nearby-btn"
                            onClick={() => navigate(`/suburbs/${s.toLowerCase().replace(/\s+/g, "-")}`)}
                        >
                            <span className="sp-nearby-dot" />
                            {s}
                            <svg viewBox="0 0 24 24" fill="none" className="sp-nearby-arrow">
                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ))}
                </div>

                <div className="sp-divider" />

                {/* FAQ */}
                <h2 className="sp-subtitle">Frequently Asked Questions — {suburb}</h2>
                <div className="sp-faq">
                    {suburbFaqs.map((item, i) => (
                        <FaqItem key={i} question={item.q} answer={item.a} />
                    ))}
                </div>

                <div className="sp-divider" />

                <p className="sp-para">
                    Whether you are a home user in {suburb} who needs a Gaming PC built,
                    a device repaired, or Starlink set up — or a business owner needing
                    servers, CCTV, phone systems, or full IT support for your team —{" "}
                    <strong>TheTechDr</strong> has the right solution. Our technicians
                    are fully insured, background-checked, and trained to the highest
                    professional standard.
                </p>

                {/* CTA Box */}
                <div className="sp-cta-box">
                    <h3 className="sp-cta-heading">Need IT Support or Tech Services in {suburb}?</h3>
                    <p className="sp-cta-text">
                        PC Repairs · Gaming PC Builds · CCTV · Starlink · Servers · Networks &amp; More<br />
                        Contact <strong>TheTechDr</strong> now — same-day service available in {suburb}!
                    </p>
                    <a href="tel:1300072073" className="sp-cta-btn">📞 Call 1300 072 073 Now</a>
                    <p className="sp-website">
                        Visit us at:{" "}
                        <a href="https://www.thetechdr.com.au" className="sp-link">www.TheTechDr.com.au</a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SuburbPage;