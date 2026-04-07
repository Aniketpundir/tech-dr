import React from 'react';
import './WhyChooseUs.css';
import WhyImg from '../../../assets/why-choose.webp';
 
const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);
 
const cards = [
    {
        id: 1,
        title: 'Exceptional Expertise',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Customer-Centric Approach',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Quality Guaranteed',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Passionate Team',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
        ),
    },
];
 
const WhyChooseUs = () => (
    <section className="why">
        <div className="why-badge">
            <Star />
            <span className="why-badge__text">WHY CHOOSE US</span>
            <Star />
        </div>
 
        <h2 className="why-title">
            Experience Seamless Repairs: Your Devices Deserve the Best
        </h2>
 
        <div className="why-inner">
 
            {/* Column 1 – 2x2 Card Grid replacing old bullet points */}
            <div className="why-grid">
                {cards.map((card, i) => (
                    <div
                        className={`why-card ${i % 4 === 1 || i % 4 === 2 ? 'why-card--dark' : 'why-card--light'}`}
                        key={card.id}
                    >
                        <div className="why-card__icon-wrap">
                            {card.icon}
                        </div>
                        <h3 className="why-card__title">{card.title}</h3>
                    </div>
                ))}
            </div>
 
            {/* Column 2 – Image (kept as-is) */}
            <div className="why-image">
                <img src={WhyImg} alt="Why Choose Us" />
            </div>
 
            {/* Column 3 – Stats bubbles (kept as-is) */}
            <div className="why-stats">
                <div className="stat-bubble">
                    <span className="stat-num">2+</span>
                    <span className="stat-label">Years Of Experience</span>
                </div>
                <div className="stat-bubble orange-bg">
                    <span className="stat-num">20+</span>
                    <span className="stat-label">Devices Repaired</span>
                </div>
                <div className="stat-bubble">
                    <span className="stat-num">33%</span>
                    <span className="stat-label">Satisfied customers</span>
                </div>
            </div>
 
        </div>
    </section>
);
 
export default WhyChooseUs;