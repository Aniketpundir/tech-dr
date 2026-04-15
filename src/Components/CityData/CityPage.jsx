import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { cityData } from "../CityData/CityData";
import "./CityPage.css";

// slug to region name
const slugToRegion = (slug) => {
    return Object.keys(cityData).find(
        (r) => r.toLowerCase().replace(/\s+/g, "-") === slug
    ) || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const FaqItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="faq-item">
            <button
                className={`faq-question ${open ? "open" : ""}`}
                onClick={() => setOpen(!open)}
            >
                {question}
                <span className="faq-chevron">{open ? "▲" : "▼"}</span>
            </button>
            {open && <p className="faq-answer">{answer}</p>}
        </div>
    );
};

const CityPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const region = slugToRegion(slug);
    const data = cityData[region];
    const [callHover, setCallHover] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = `IT Support & Tech Services in ${region} | TheTechDr`;
    }, [region]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    if (!data) {
        return (
            <div className="city-page">
                <div className="city-topbar" />
                <div className="city-content">
                    <button className="back-btn" onClick={() => navigate("/")}>
                        <svg viewBox="0 0 24 24" fill="none" className="back-arrow">
                            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#E8623A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to All Regions
                    </button>
                    <p>Region not found.</p>
                </div>
            </div>
        );
    }

    const handleSuburbClick = (suburb) => {
        const suburbSlug = suburb.toLowerCase().replace(/\s+/g, "-");
        navigate(`/suburbs-section/city/${slug}/suburbs/${suburbSlug}`)
    };

    return (
        <div className="city-page">
            {/* Blue top bar */}
            <div className="city-topbar" />

            <div className="city-content">

                {/* Back button */}
                <button className="back-btn" onClick={() => navigate("/")}>
                    <svg viewBox="0 0 24 24" fill="none" className="back-arrow">
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            stroke="#E8623A"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to All Regions
                </button>

                {/* Title */}
                <h1 className="city-title">Expert IT Support & Tech Services in {region} </h1>
                <h1 className="city-title">TheTechDr</h1>

                {/* Area tag */}
                <p className="city-area-tag">{data.area}</p>

                {/* Bold Intro */}
                <p className="city-intro">
                    Need a Trusted Local IT Expert in <strong>{region}</strong> for PC Repairs,
                    Network Setup, CCTV, Gaming PCs, Starlink &amp; More?{" "}
                    <strong>We're just one call away!</strong>{" "}
                    <a href="tel:1300072073" className="city-phone">1300 072 073</a>
                </p>

                <p className="city-bold-para">
                    <strong>TheTechDr</strong> is proud to deliver fast, reliable, and
                    professional IT support and technology services for both homes and businesses
                    across <strong>{region}</strong> — {data.description}.
                </p>

                {/* Images */}
                <div className="city-images">
                    <img src={data.image1} alt={`${region} Sydney`} className="city-img" />
                    <img src={data.image2} alt={`${region} area`} className="city-img" />
                </div>

                {/* Body */}
                <p className="city-para">
                    You're in safe hands. Our experienced team of IT technicians
                    in <strong>{region}</strong> are highly skilled across a wide range of
                    services — from PC and Mac repairs to Gaming PC builds, CCTV installations,
                    Starlink setups, business servers, and network configuration. We're dedicated
                    to solving your tech challenges quickly and efficiently across the entire {region} area.{" "}
                    {data.character}
                </p>

                <p className="city-para">
                    Call <a href="tel:1300072073" className="city-phone">1300 072 073</a>{" "}
                    today and connect with your local {region} IT expert. We offer same-day
                    service across {region} and the surrounding suburbs — so you're never
                    left waiting long with a broken device.
                </p>

                <div className="call-and-booking-section button-section">
                    <Link to="/book-now" onClick={() => { handleClick() }} className="btn-link">
                        <button
                            className={`btn btn-call ${callHover ? "btn-call--hover" : ""}`}
                            onMouseEnter={() => setCallHover(true)}
                            onMouseLeave={() => setCallHover(false)}
                        >
                            <span className="btn-icon"></span>
                            BOOK NOW
                        </button>
                    </Link>
                </div>

                <div className="city-divider" />

                {/* Suburbs we cover */}
                <h2 className="city-subtitle">Suburbs We Cover in {region}</h2>
                <p className="city-para">
                    Our technicians service all suburbs across the {region} region. Click on any suburb below to see more details:
                </p>

                <div className="btn-wrapper">
                </div>

                <ul className="city-suburbs-list">
                    {data.suburbs.map((suburb, i) => (
                        <li
                            key={i}
                            className="city-suburb-clickable"
                            onClick={() => handleSuburbClick(suburb)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === "Enter" && handleSuburbClick(suburb)}
                            aria-label={`View IT support in ${suburb}`}
                        >
                            <span className="svc-dot" />
                            {suburb}
                            <svg viewBox="0 0 24 24" fill="none" className="suburb-link-arrow">
                                <path
                                    d="M5 12h14M13 6l6 6-6 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </li>
                    ))}
                </ul>

                <div className="city-divider" />

                {/* Services */}
                <h2 className="city-subtitle">
                    Our IT &amp; Technology Services in {region}
                </h2>
                <p className="city-para">
                    From Gaming PC builds and CCTV installations to business server setup,
                    Starlink configuration, network troubleshooting, and device repairs —
                    TheTechDr covers every tech need for residents and businesses in {region}.
                </p>
                <ul className="city-services-list">
                    {data.services.map((svc, i) => (
                        <li key={i}>
                            {/* <span className="svc-dot" /> */}
                            {svc}
                        </li>
                    ))}
                </ul>

                <div className="city-divider" />

                {/* Why choose us */}
                <h2 className="city-subtitle">
                    Why {region} Residents Choose TheTechDr
                </h2>
                <p className="city-para">
                    Whether you need a Gaming PC built, a CCTV system installed, a slow
                    laptop repaired, your Wi-Fi sorted, or a full business server configured —
                    we're here to help. At <strong>TheTechDr</strong>, we ensure you receive
                    friendly, expert service from a certified technician who can assist
                    you <strong>the same day</strong>.
                </p>
                <p className="city-para">{data.localTip}</p>

                {/* Highlight cards */}
                <div className="city-highlights">
                    <div className="highlight-card">
                        <span className="highlight-icon">⚡</span>
                        <strong>Same-Day Service</strong>
                        <p>Fast response across {region} and nearby suburbs</p>
                    </div>
                    <div className="highlight-card">
                        <span className="highlight-icon">✅</span>
                        <strong>No Fix, No Pay</strong>
                        <p>You only pay when your problem is fully resolved</p>
                    </div>
                    <div className="highlight-card">
                        <span className="highlight-icon">💰</span>
                        <strong>Transparent Pricing</strong>
                        <p>Upfront quotes, no hidden fees, ever</p>
                    </div>
                    <div className="highlight-card">
                        <span className="highlight-icon">🔒</span>
                        <strong>Fully Insured</strong>
                        <p>All technicians are background-checked and insured</p>
                    </div>
                </div>

                <div className="city-divider" />

                <p className="city-para">
                    With years of industry experience, <strong>TheTechDr</strong> has
                    built a strong reputation as a trusted provider of on-site IT services
                    in {region}. We take pride in delivering high-quality support to both
                    residential and commercial clients throughout {region} and surrounding
                    suburbs. From Gaming PC builds and CCTV setup to data recovery, Starlink
                    installation, and business phone systems — no job is too big or too small
                    for our team.
                </p>

                <p className="city-para">
                    Residents and businesses in {region} trust{" "}
                    <strong>TheTechDr</strong> because we offer transparent pricing, no
                    hidden fees, and a genuine{" "}
                    <strong>no-fix-no-pay guarantee</strong>. We value your time and
                    understand how disruptive a tech problem can be — which is why we
                    work swiftly to get your technology back up and running as fast as
                    possible.
                </p>

                {/* FAQ */}
                {data.faq && data.faq.length > 0 && (
                    <>
                        <div className="city-divider" />
                        <h2 className="city-subtitle">
                            Frequently Asked Questions — {region}
                        </h2>
                        <div className="city-faq">
                            {data.faq.map((item, i) => (
                                <FaqItem key={i} question={item.q} answer={item.a} />
                            ))}
                        </div>
                    </>
                )}

                <div className="city-divider" />

                <p className="city-para">
                    Whether you are a home user in {region} who needs a Gaming PC built,
                    a device repaired, or Starlink set up — or a business owner needing
                    servers, CCTV, phone systems, or full IT support for your team —{" "}
                    <strong>TheTechDr</strong> has the right solution for you. Our
                    technicians are fully insured, background-checked, and trained to
                    the highest professional standard.
                </p>

                <p className="city-para">
                    Don't wait until the problem gets worse. Contact{" "}
                    <strong>TheTechDr</strong> today and get your technology running
                    smoothly again. We are proud to serve the {region} community and look
                    forward to being your go-to local IT experts for years to come.
                </p>

                {/* CTA Box */}
                <div className="city-cta-box">
                    <h3 className="city-cta-heading">
                        Need IT Support or Tech Services in {region}?
                    </h3>
                    <p className="city-cta-text">
                        PC Repairs · Gaming PC Builds · CCTV · Starlink · Servers · Networks &amp; More<br />
                        Contact <strong>TheTechDr</strong> now — same-day service available across {region}!
                    </p>
                    <a href="tel:1300072073" className="city-cta-btn">
                        📞 Call 1300 072 073 Now
                    </a>
                    <p className="city-website">
                        Visit us at:{" "}
                        <a href="https://www.thetechdr.com.au" className="city-link">
                            www.TheTechDr.com.au
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default CityPage;