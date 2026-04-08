import React, { useEffect, useRef, useState } from 'react';
import './WhyChooseUs.css';
import WhyImg from '../../../assets/why-choose.webp';

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
        desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.',
    },
    {
        id: 2,
        title: 'Customer-Centric Approach',
        desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.',
    },
    {
        id: 3,
        title: 'Quality Guaranteed',
        desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.',
    },
    {
        id: 4,
        title: 'Passionate Team',
        desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.',
    },
];

const stats = [
    { value: 2,  suffix: '+', label: 'Years Of Experience', cls: '' },
    { value: 20, suffix: '+', label: 'Devices Repaired',    cls: 'wcu-stat-bubble--orange' },
    { value: 33, suffix: '%', label: 'Satisfied customers', cls: '' },
];

const StatBubble = ({ value, suffix, label, cls }) => {
    const { count, ref } = useCountUp(value);
    return (
        <div className={`wcu-stat-bubble ${cls}`} ref={ref}>
            <span className="wcu-stat-num">{count}{suffix}</span>
            <span className="wcu-stat-label">{label}</span>
        </div>
    );
};

const WhyChooseUs = () => (
    <section className="wcu-section">
        <div className="wcu-badge">
            <Star />
            <span className="wcu-badge__text">WHY CHOOSE US</span>
            <Star />
        </div>

        <h2 className="wcu-title">
            Experience Seamless Repairs: Your Devices Deserve the Best
        </h2>

        <div className="wcu-inner">

            <div className="wcu-grid">
                {cards.map((card, i) => (
                    <div
                        className={`wcu-card ${i % 4 === 1 || i % 4 === 2 ? 'wcu-card--dark' : 'wcu-card--light'}`}
                        key={card.id}
                    >
                        <div className="wcu-card__icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div className="wcu-card__body">
                            <h3 className="wcu-card__title">{card.title}</h3>
                            <p className="wcu-card__desc">{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="wcu-image">
                <img src={WhyImg} alt="Why Choose Us" />
            </div>

            <div className="wcu-stats">
                {stats.map((s, i) => (
                    <StatBubble key={i} {...s} />
                ))}
            </div>

        </div>
    </section>
);

export default WhyChooseUs;