import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cityData, defaultCityData, suburbs } from "./CityData";
import "./CityPage.css";

// slug se original city name dhundho
const slugToCity = (slug) => {
    return suburbs.find(
        (s) => s.toLowerCase().replace(/\s+/g, "-") === slug
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
    const city = slugToCity(slug);
    const data = cityData[city] || defaultCityData(city);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.title = `Computer Repairs ${city} | TheTechDr`;
    }, [city]);

    return (
        <div className="city-page">
            {/* Blue top bar */}
            <div className="city-topbar" />

            <div className="city-content">

                {/* Back button */}
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <svg viewBox="0 0 24 24" fill="none" className="back-arrow">
                        <path
                            d="M19 12H5M5 12L12 19M5 12L12 5"
                            stroke="#E8623A"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Back to All Suburbs
                </button>

                {/* Title */}
                <h1 className="city-title">Repairs your tech devices in {city} with TheTechDr</h1>

                {/* Bold Intro */}
                <p className="city-intro">
                    Need a Trusted Local IT Expert in <strong>{city}</strong> to Fix Your
                    Computer Issues Today? <strong>We're just one call away!</strong>{" "}
                    <a href="tel:1300072073" className="city-phone">1300 072 073</a>
                </p>

                <p className="city-bold-para">
                    <strong>TheTechDr</strong> is proud to deliver fast, reliable, and
                    professional computer repair services for both homes and businesses
                    across <strong>{city}</strong> — {data.description}.
                </p>

                {/* Images side by side */}
                <div className="city-images">
                    <img
                        src={data.image1}
                        alt={`${city} Sydney`}
                        className="city-img"
                    />
                    <img
                        src={data.image2}
                        alt={`${city} area`}
                        className="city-img"
                    />
                </div>

                {/* Body */}
                <p className="city-para">
                    You're in safe hands. Our experienced team of IT technicians
                    in <strong>{city}</strong> are highly skilled in working with PCs,
                    Apple devices, and small business systems. We're dedicated to solving
                    your tech problems quickly and efficiently across the greater {city}{" "}
                    area. {data.character}
                </p>

                <p className="city-para">
                    Call <a href="tel:1300072073" className=" city-phone">1300 072 073</a>{" "}
                    today and connect with your local {city} IT expert. We offer same-day
                    service across {city} and the surrounding suburbs — so you're never
                    left waiting long with a broken device.
                </p>

                <div className="city-divider" />

                {/* Services */}
                <h2 className="city-subtitle">
                    Our IT &amp; Computer Repair Services in {city}
                </h2>
                <p className="city-para">
                    From simple software fixes to complex hardware repairs and full
                    business IT setups, TheTechDr covers every tech need for residents
                    and businesses in {city}.
                </p>
                <ul className="city-services-list">
                    {data.services.map((svc, i) => (
                        <li key={i}>
                            <span className="svc-dot" />
                            {svc}
                        </li>
                    ))}
                </ul>

                <div className="city-divider" />

                {/* Why choose us */}
                <h2 className="city-subtitle">
                    Why {city} Residents Choose TheTechDr
                </h2>
                <p className="city-para">
                    Whether you're dealing with a slow computer, frustrating technical
                    issues, network or Wi-Fi problems — or anything in between — we're
                    here to help. At <strong>TheTechDr</strong>, we ensure you receive
                    friendly, expert service from a certified technician who can assist
                    you <strong>the same day</strong>.
                </p>
                <p className="city-para">{data.localTip}</p>

                {/* Highlight cards */}
                <div className="city-highlights">
                    <div className="highlight-card">
                        <span className="highlight-icon">⚡</span>
                        <strong>Same-Day Service</strong>
                        <p>Fast response across {city} and nearby suburbs</p>
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
                    built a strong reputation as a trusted provider of onsite IT services
                    in {city}. We take pride in delivering high-quality support to both
                    residential and commercial clients throughout {city} and surrounding
                    suburbs. From virus removal and data recovery to hardware upgrades and
                    network setup — no job is too big or too small for our team.
                </p>

                <p className="city-para">
                    Residents and businesses in {city} trust{" "}
                    <strong>TheTechDr</strong> because we offer transparent pricing, no
                    hidden fees, and a genuine{" "}
                    <strong>no-fix-no-pay guarantee</strong>. We value your time and
                    understand how disruptive a computer problem can be — which is why we
                    work swiftly to get your technology back up and running as fast as
                    possible.
                </p>

                {/* FAQ */}
                {data.faq && data.faq.length > 0 && (
                    <>
                        <div className="city-divider" />
                        <h2 className="city-subtitle">
                            Frequently Asked Questions — {city}
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
                    Whether you are a home user in {city} who simply wants their laptop
                    running fast again, or a business owner needing reliable IT support
                    for your team, <strong>TheTechDr</strong> has the right solution for
                    you. Our technicians are fully insured, background-checked, and
                    trained to the highest professional standard.
                </p>

                <p className="city-para">
                    Don't wait until the problem gets worse. Contact{" "}
                    <strong>TheTechDr</strong> today and get your technology running
                    smoothly again. We are proud to serve the {city} community and look
                    forward to being your go-to local IT experts for years to come.
                </p>

                {/* CTA Box */}
                <div className="city-cta-box">
                    <h3 className="city-cta-heading">
                        Ready to fix your tech in {city}?
                    </h3>
                    <p className="city-cta-text">
                        Contact <strong>TheTechDr</strong> now — same-day service
                        available across {city}!
                    </p>
                    <a href="tel:1300 072 073" className="city-cta-btn">
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
        </div >
    );
};

export default CityPage;