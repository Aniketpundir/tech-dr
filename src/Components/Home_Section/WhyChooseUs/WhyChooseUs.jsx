import React, { useEffect, useRef, useState } from 'react';
import './WhyChooseUs.css';
import WhyImg from '../../../assets/home-page-wcu.jpeg';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const useCountUp = (target, duration = 1500) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const step = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(step);
                        else setCount(target);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
};

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

const stats = [
    { value: 15, suffix: '+', label: 'Years Of Experience', cls: '' },
    { value: 55, suffix: '+', label: 'Devices Repaired', cls: 'orange-bg' },
    { value: 100, suffix: '%', label: 'Satisfied customers', cls: '' },
];

const StatBubble = ({ value, suffix, label, cls }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div className={`stat-bubble ${cls}`} ref={ref}>
            <span className="stat-num">{count}{suffix}</span>
            <span className="stat-label">{label}</span>
        </div>
    );
};

const WhyChooseUs = () => {
    return (<section className="why">
        <div className="why-badge">
            <Star />
            <span className="why-badge__text">WHY CHOOSE US</span>
            <Star />
        </div>

        <h2 className="why-title">
            Experience Seamless Repairs: Your Devices Deserve the Best
        </h2>

        <div className="why-inner">

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

            <div className="why-image">
                <img src={WhyImg} alt="Why Choose Us" />
            </div>

            <div className="why-stats">
                {stats.map((s, i) => (
                    <StatBubble key={i} {...s} />
                ))}
            </div>


        </div>
    </section>
    );
}

export default WhyChooseUs;