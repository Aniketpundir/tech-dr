import React, { useState } from 'react';
import './Testimonials.css';

const Star = () => (
    <svg width="20" height="20" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const reviews = [
    { name: 'Jason', role: 'Customer', text: 'I am very lucky to have the computer repair support of The Tech Dr. Thanks', stars: 4 },
    { name: 'Rob', role: 'Customer', text: 'The Tech Dr is not only a computer repair service but it is better to say that they are one of the best', stars: 5 },
    { name: 'Sarah', role: 'Customer', text: 'Amazing service! They fixed my laptop the same day. Highly recommend The Tech Dr to everyone.', stars: 5 },
    { name: 'Mike', role: 'Customer', text: 'Professional and fast service. They explained everything clearly and solved all my issues.', stars: 4 },
];

const CARDS_PER_PAGE = 2;

const Testimonials = () => {
    const [page, setPage] = useState(0);
    const maxPage = Math.ceil(reviews.length / CARDS_PER_PAGE) - 1;
    const shown = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

    const prev = () => setPage(p => Math.max(0, p - 1));
    const next = () => setPage(p => Math.min(maxPage, p + 1));

    return (
        <section className="testimonials">
            <div className="testimonials-header">
                <div className="test-label">
                    <Star />
                    <span>TESTIMONIALS</span>
                    <Star />
                </div>
                <h2>What our Customers Say...</h2>
                <div className="test-nav">
                    <button className="test-nav-btn" onClick={prev} disabled={page === 0}>←</button>
                    <button className="test-nav-btn" onClick={next} disabled={page === maxPage}>→</button>
                </div>
                {/* Dot indicators */}
                <div className="test-dots">
                    {Array.from({ length: maxPage + 1 }).map((_, i) => (
                        <button
                            key={i}
                            className={`test-dot${i === page ? ' active' : ''}`}
                            onClick={() => setPage(i)}
                        />
                    ))}
                </div>
            </div>

            <div className="testimonials-cards">
                {shown.map((r, i) => (
                    <div className={`test-card${i === 0 ? ' active' : ''}`} key={page * CARDS_PER_PAGE + i}>
                        <div className="test-icon">
                            <svg width="36" height="36" fill="none" stroke="#e8520a" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                <circle cx="12" cy="10" r="2" fill="#e8520a" fillOpacity="0.3" />
                            </svg>
                        </div>
                        <div className="test-stars">
                            {Array.from({ length: r.stars }).map((_, j) => (
                                <span key={j}>★</span>
                            ))}
                            {Array.from({ length: 5 - r.stars }).map((_, j) => (
                                <span key={j} style={{ opacity: 0.3 }}>★</span>
                            ))}
                        </div>
                        <p>{r.text}</p>
                        <div className="test-author">
                            <div className="test-avatar">
                                <svg width="24" height="24" fill="#6a6a8e" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <div className="test-author-info">
                                <h4>{r.name}</h4>
                                <span>{r.role}</span>
                            </div>
                        </div>
                        {i === 0 && (
                            <div className="test-sparkle">
                                <svg width="30" height="30" viewBox="0 0 30 30">
                                    <path d="M15 0 L16 14 L30 15 L16 16 L15 30 L14 16 L0 15 L14 14 Z" fill="#cc88ff" opacity="0.6" />
                                </svg>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;