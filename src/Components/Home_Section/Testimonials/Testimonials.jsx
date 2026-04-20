import React, { useState, useRef } from 'react';
import './Testimonials.css';

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const reviews = [
    {
        name: 'Jason',
        role: 'Customer',
        text: 'I am very lucky to have the computer repair support of The Tech Dr. Excellent service every time!',
        stars: 4,
    },
    {
        name: 'Rob',
        role: 'Customer',
        text: 'The Tech Dr is not just a repair service — they are simply one of the best in the business.',
        stars: 5,
    },
    {
        name: 'Peter',
        role: 'Customer',
        text: 'My experience with The Tech Dr was fantastic. I highly recommend them for their perfection and dedication.',
        stars: 5,
    },
    {
        name: 'Carol',
        role: 'Customer',
        text: 'Brilliant service from start to finish. They were professional, fast and very reasonably priced.',
        stars: 4,
    },
    {
        name: 'Mrs Smith',
        role: 'Customer',
        text: 'Very professional and friendly team. They explained everything clearly and the price was very fair.',
        stars: 4,
    },
    {
        name: 'Ritu',
        role: 'Customer',
        text: 'The Tech Dr truly stands out. Their expertise and care for customers is second to none.',
        stars: 4,
    },
    {
        name: 'Sunil',
        role: 'Customer',
        text: 'Excellent SAME DAY service at no extra cost. Would 100% recommend to everyone I know.',
        stars: 4,
    },
    {
        name: 'Johnson',
        role: 'Customer',
        text: 'Fast, reliable and professional. My PC was fixed within hours and runs perfectly now. Thank you!',
        stars: 4,
    },
];

const TEXT_LIMIT = 80; // characters — jitne ke baad "View more" dikhega

const TestCard = ({ r }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = r.text.length > TEXT_LIMIT;
    const firstLetter = r.name.charAt(0).toUpperCase();

    return (
        <div className="test-card">
            <div className="test-stars">
                {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="star-filled">★</span>
                ))}
                {Array.from({ length: 5 - r.stars }).map((_, j) => (
                    <span key={j} className="star-empty">★</span>
                ))}
            </div>

            <p>
                {isLong && !expanded
                    ? r.text.slice(0, TEXT_LIMIT) + '...'
                    : r.text}
            </p>

            {isLong && (
                <button
                    className="view-more-btn"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'View less ↑' : 'View more ↓'}
                </button>
            )}

            <div className="test-author">
                <div className="test-avatar">
                    <span className="avatar-letter">{firstLetter}</span>
                </div>
                <div className="test-author-info">
                    <h4>{r.name}</h4>
                    <span>{r.role}</span>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const trackRef = useRef(null);

    return (
        <section className="testimonials">
            <div className="test-marquee-outer">
                <div className="test-marquee-track">
                    <span className="test-marquee-item">
                        <StarIcon />
                        <span>What our Customers Say</span>
                        <StarIcon />
                    </span>
                </div>
            </div>

            <div className="testimonials-body">
                <div className="testimonials-header">
                    <div className="test-label">
                        <StarIcon />
                        <span>TESTIMONIALS</span>
                        <StarIcon />
                    </div>
                    <h2>Trusted by hundreds of happy customers</h2>
                    <p className="test-subtext">Real experiences from real people who trust The Tech Dr.</p>
                </div>

                <div className="testimonials-cards">
                    <div className="cards-marquee-track" ref={trackRef}>
                        {[...reviews, ...reviews].map((r, i) => (
                            <TestCard key={i} r={r} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;