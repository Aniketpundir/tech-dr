import React from 'react';
import './WhyChooseUs.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const points = [
    { title: 'Exceptional Expertise', desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.' },
    { title: 'Customer-Centric Approach', desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.' },
    { title: 'Quality Guaranteed', desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.' },
    { title: 'Passionate Team', desc: 'Our skilled technicians bring years of experience and specialized knowledge to ensure precise, reliable repairs for your devices.' },
];

const WhyChooseUs = () => (
    <section className="why">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>WHY CHOOSE US</span> <Star />
        </div>
        <h2>Experience Seamless Repairs: Your Devices Deserve the Best</h2>

        <div className="why-inner">
            <div className="why-points">
                {points.map((p, i) => (
                    <div className="why-point" key={i}>
                        <div className="check-icon">
                            <svg width="16" height="16" fill="none" stroke="#e8520a" strokeWidth="2.5" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div>
                            <h4>{p.title}</h4>
                            <p>{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="why-image">
                <svg width="150" height="150" fill="none" stroke="#4488cc" strokeWidth="1.5" viewBox="0 0 150 150" opacity="0.6">
                    <rect x="20" y="40" width="110" height="70" rx="6" />
                    <path d="M40 70 L60 70 M40 90 L90 90 M70 70 L110 70" />
                    <circle cx="110" cy="55" r="12" fill="#e8520a" fillOpacity="0.4" stroke="#e8520a" />
                </svg>
            </div>

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