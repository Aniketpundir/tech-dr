import React, { useState, useEffect, useRef } from 'react';
import './Testimonials.css';

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const reviews = [
    { name: 'Jason', role: 'Customer', text: 'I am very lucky to have the computer repair support of The Tech Dr. Excellent service every time!', stars: 4 },
    { name: 'Rob', role: 'Customer', text: 'The Tech Dr is not just a repair service — they are simply one of the best in the business.', stars: 5 },
    { name: 'Peter', role: 'Customer', text: 'My experience with The Tech Dr was fantastic. I highly recommend them for their perfection and dedication.', stars: 5 },
    { name: 'Carol', role: 'Customer', text: 'Brilliant service from start to finish. They were professional, fast and very reasonably priced.', stars: 4 },
    { name: 'Mrs Smith', role: 'Customer', text: 'Very professional and friendly team. They explained everything clearly and the price was very fair.', stars: 4 },
    { name: 'Ritu', role: 'Customer', text: 'The Tech Dr truly stands out. Their expertise and care for customers is second to none.', stars: 4 },
    { name: 'Sunil', role: 'Customer', text: 'Excellent SAME DAY service at no extra cost. Would 100% recommend to everyone I know.', stars: 4 },
    { name: 'Johnson', role: 'Customer', text: 'Fast, reliable and professional. My PC was fixed within hours and runs perfectly now. Thank you!', stars: 4 },
];

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const Testimonials = () => {
    const [page, setPage] = useState(0);
    const trackRef = useRef(null);
    const autoResumeRef = useRef(null);
    const animatingRef = useRef(false);
    const maxPage = reviews.length - 1;

    const scrollToCard = (index) => {
        setPage(index);
        const track = trackRef.current;
        if (!track) return;
        const cardWidth = 320;
        track.style.transition = 'transform 0.4s ease';
        track.style.animationPlayState = 'paused';
        track.style.animation = 'none';
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        clearTimeout(autoResumeRef.current);
        autoResumeRef.current = setTimeout(() => {
            track.style.transition = '';
            track.style.transform = '';
            track.style.animation = '';
            track.style.animationPlayState = 'running';
        }, 4000);
    };

    const prev = () => { if (page > 0) scrollToCard(page - 1); };
    const next = () => { if (page < maxPage) scrollToCard(page + 1); };

    return (
        <section className="testimonials">

            {/* Marquee heading */}
            <div className="test-marquee-outer">
                <div className="test-marquee-track">
                    {[...Array(4)].map((_, ri) => (
                        <span key={ri} className="test-marquee-item">
                            <StarIcon />
                            <span>What our Customers Say</span>
                            <StarIcon />
                        </span>
                    ))}
                </div>
            </div>

            {/* Main body */}
            <div className="testimonials-body">

                {/* Left header */}
                <div className="testimonials-header">
                    <div className="test-label">
                        <StarIcon />
                        <span>TESTIMONIALS</span>
                        <StarIcon />
                    </div>
                    <h2>Trusted by hundreds of happy customers</h2>
                    <p className="test-subtext">Real experiences from real people who trust The Tech Dr.</p>
                </div>

                {/* Cards Marquee */}
                <div className="testimonials-cards">
                    <div className="cards-marquee-track" ref={trackRef}>
                        {[...reviews, ...reviews].map((r, i) => (
                            <div className="test-card" key={i}>
                                <div className="test-quote-icon">"</div>
                                <div className="test-stars">
                                    {Array.from({ length: r.stars }).map((_, j) => (
                                        <span key={j} className="star-filled">★</span>
                                    ))}
                                    {Array.from({ length: 5 - r.stars }).map((_, j) => (
                                        <span key={j} className="star-empty">★</span>
                                    ))}
                                </div>
                                <p>{r.text}</p>
                                <div className="test-author">
                                    <div className="test-avatar">{initials(r.name)}</div>
                                    <div className="test-author-info">
                                        <h4>{r.name}</h4>
                                        <span>{r.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;