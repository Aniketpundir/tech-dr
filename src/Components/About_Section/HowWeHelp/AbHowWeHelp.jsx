import React, { useEffect, useRef } from 'react';
import './AbHowWeHelp.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#fff" />
    </svg>
);

const features = [
    {
        title: '100% Fix Guarantee',
        icon: (
            <svg width="28" height="28" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        desc: "We don't leave until the job is done. If we can't fix it, you don't pay — that's our promise to every customer.",
    },
    {
        title: 'Highly Skilled Technicians',
        icon: (
            <svg width="28" height="28" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
            </svg>
        ),
        desc: "Our engineers are certified professionals with years of hands-on experience across all major brands and systems.",
    },
    {
        title: 'Same Day Service Available',
        icon: (
            <svg width="28" height="28" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        desc: "Need it fixed urgently? We offer same-day appointments at no extra charge, so you're never left waiting.",
    },
    {
        title: 'Explained in Plain English',
        icon: (
            <svg width="28" height="28" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        desc: "No jargon, no confusion. We explain exactly what went wrong and what we did to fix it in clear, simple language.",
    },
    {
        title: 'We Secure your Personal Data',
        icon: (
            <svg width="28" height="28" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        desc: "Your privacy matters. We handle your files and personal data with full confidentiality and strict data security practices.",
    },
];

const HowWeHelp = () => {
    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('hwh-card--visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="hwh-section">
            <div className="hwh-label">
                <Star />
                <span>HOW WE CAN HELP</span>
                <Star />
            </div>
            <h2 className="hwh-title">
                For your convenience, we travel to your home<br />or office to solve your technology problems.
            </h2>

            <div className="hwh-grid">
                {features.map((f, i) => (
                    <div
                        className={`hwh-card ${i % 2 === 0 ? 'hwh-card--from-left' : 'hwh-card--from-right'}`}
                        key={i}
                        ref={(el) => (cardRefs.current[i] = el)}
                    >
                        <div className="hwh-card-icon">
                            {f.icon}
                        </div>
                        <div className="hwh-card-body">
                            <h4 className="hwh-card-title">{f.title}</h4>
                            <p className="hwh-card-desc">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowWeHelp;