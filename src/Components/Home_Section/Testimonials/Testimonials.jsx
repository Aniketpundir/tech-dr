import React, { useState, useEffect, useRef } from 'react';
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
        stars: 4
    },
    {
        name: 'Rob',
        role: 'Customer',
        text: 'The Tech Dr is not just a repair service — they are simply one of the best in the business.',
        stars: 5
    },
    {
        name: 'Peter',
        role: 'Customer',
        text: 'My experience with The Tech Dr was fantastic. I highly recommend them for their perfection and dedication.',
        stars: 5
    },
    {
        name: 'Carol',
        role: 'Customer',
        text: 'Brilliant service from start to finish. They were professional, fast and very reasonably priced.',
        stars: 4
    },
    {
        name: 'Mrs Smith',
        role: 'Customer',
        text: 'Very professional and friendly team. They explained everything clearly and the price was very fair.',
        stars: 4
    },
    {
        name: 'Ritu',
        role: 'Customer',
        text: 'The Tech Dr truly stands out. Their expertise and care for customers is second to none.',
        stars: 4
    },
    {
        name: 'Sunil',
        role: 'Customer',
        text: 'Excellent SAME DAY service at no extra cost. Would 100% recommend to everyone I know.',
        stars: 4
    },
    {
        name: 'Johnson',
        role: 'Customer',
        text: 'Fast, reliable and professional. My PC was fixed within hours and runs perfectly now. Thank you!',
        stars: 4
    },
];

const CARDS_PER_PAGE = 2;

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const Testimonials = () => {
    const [page, setPage] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState('next');
    const autoRef = useRef(null);

    const maxPage = Math.ceil(reviews.length / CARDS_PER_PAGE) - 1;
    const shown = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

    const goTo = (newPage, dir = 'next') => {
        if (animating) return;
        setDirection(dir);
        setAnimating(true);
        setTimeout(() => {
            setPage(newPage);
            setAnimating(false);
        }, 350);
    };

    const prev = () => {
        if (page > 0) goTo(page - 1, 'prev');
        resetAuto();
    };

    const next = () => {
        if (page < maxPage) goTo(page + 1, 'next');
        resetAuto();
    };

    const resetAuto = () => {
        clearInterval(autoRef.current);
        autoRef.current = setInterval(() => {
            setPage(p => {
                const np = p >= maxPage ? 0 : p + 1;
                return np;
            });
        }, 3500);
    };

    useEffect(() => {
        resetAuto();
        return () => clearInterval(autoRef.current);
    }, [maxPage]);

    return (
        <section className="testimonials">

            {/* ── Main body ── */}
            <div className="testimonials-body">

                {/* Left header */}
                <div className="testimonials-header">
                    <div className="test-label">
                        <StarIcon />
                        <span>TESTIMONIALS</span>
                        <StarIcon />
                    </div>
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
                    <h2>Trusted by hundreds of happy customers</h2>
                    <div className="test-nav">
                        <button className="test-nav-btn" onClick={prev} disabled={page === 0}>←</button>
                        <button className="test-nav-btn" onClick={next} disabled={page === maxPage}>→</button>
                    </div>
                    <div className="test-dots">
                        {Array.from({ length: maxPage + 1 }).map((_, i) => (
                            <button
                                key={i}
                                className={`test-dot${i === page ? ' active' : ''}`}
                                onClick={() => { goTo(i, i > page ? 'next' : 'prev'); resetAuto(); }}
                            />
                        ))}
                    </div>
                    <p className="test-subtext">Real experiences from real people who trust The Tech Dr.</p>
                </div>

                {/* Cards */}
                <div className="testimonials-cards">
                    <div className={`test-cards-inner ${animating ? `slide-out-${direction}` : `slide-in-${direction}`}`}>
                        {shown.map((r, i) => (
                            <div className="test-card" key={page * CARDS_PER_PAGE + i}>
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