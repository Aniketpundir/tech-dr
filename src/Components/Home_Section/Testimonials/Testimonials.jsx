import React, { useRef } from 'react';
import './Testimonials.css';

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

// Unsplash source URLs — unique image per reviewer, gender-matched, Australia-region style
// Using source.unsplash.com with unique seeds so every card gets a different photo
const reviews = [
    {
        name: 'Jason',
        role: 'Customer',
        gender: 'male',
        text: 'I have found Anand most reliable and efficient in his IT work., repairing all of my computers and software in no time.',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Rob',
        role: 'Customer',
        gender: 'male',
        text: 'The Tech Dr is not just a repair service — they are simply one of the best in the business.',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Peter',
        role: 'Customer',
        gender: 'male',
        text: 'My experience with The Tech Dr was fantastic. I highly recommend them for their perfection and dedication.',
        stars: 5,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Carol',
        role: 'Customer',
        gender: 'female',
        text: "Just an outstanding business. They do great work, they stand behind it, they are reasonably priced and they are nice people. I don't go to the Apple store anymore. These guys actually know computers.",
        stars: 5,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Mrs Smith',
        role: 'Customer',
        gender: 'female',
        text: 'Very professional and friendly team. They explained everything clearly and the price was very fair.',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Ritu',
        role: 'Customer',
        gender: 'female',
        text: 'The Tech Dr truly stands out. Their expertise and care for customers is second to none.',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Sunil',
        role: 'Customer',
        gender: 'male',
        text: 'Excellent SAME DAY service at no extra cost. Would 100% recommend to everyone I know.',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face&auto=format',
    },
    {
        name: 'Johnson',
        role: 'Customer',
        gender: 'male',
        text: 'Fast, reliable and professional. My PC was fixed within hours and runs perfectly now. Thank you!',
        stars: 4,
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format',
    },
];

function initials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const Testimonials = () => {
    const trackRef = useRef(null);

    return (
        <section className="testimonials">

            {/* Marquee heading */}
            <div className="test-marquee-outer">
                <div className="test-marquee-track">
                    <span className="test-marquee-item">
                        <StarIcon />
                        <span>What our Customers Say</span>
                        <StarIcon />
                    </span>
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
                                    <div className="test-avatar">
                                        <img
                                            src={r.image}
                                            alt={r.name}
                                            onError={(e) => {
                                                // Fallback to initials if image fails
                                                e.target.style.display = 'none';
                                                e.target.parentNode.setAttribute('data-fallback', initials(r.name));
                                                e.target.parentNode.classList.add('avatar-fallback');
                                            }}
                                        />
                                    </div>
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