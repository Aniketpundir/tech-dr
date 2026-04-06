import React, { useState } from 'react';
import './Services.css';

const allServices = [
    {
        title: 'Data Recovery',
        desc: 'Professional data recovery solutions to retrieve your lost or corrupted files and important documents.',
        color: '#1a1a2e',
        bg: '#0a0a1a',
    },
    {
        title: 'Mac & Windows PC repair',
        desc: 'Expert repair services for both Mac and Windows computers, handled by certified technicians.',
        color: '#2a4a6e',
        bg: '#e8f0fa',
    },
    {
        title: 'Internet & Email Issues',
        desc: 'Fast diagnosis and resolution of all internet connectivity and email configuration problems.',
        color: '#1a4a3a',
        bg: '#e8f5f0',
    },
    {
        title: 'Hardware Upgrades & Repair',
        desc: 'Comprehensive hardware upgrade and repair services to keep your devices running at peak performance.',
        color: '#2a1a4e',
        bg: '#f0eaff',
    },
];

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const ServiceImgPlaceholder = ({ bg, color }) => (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="80" height="80" fill="none" stroke={color} strokeWidth="1.5" viewBox="0 0 80 80" opacity="0.5">
            <rect x="10" y="20" width="60" height="40" rx="4" />
            <path d="M30 20 L30 10 L50 10 L50 20" />
            <circle cx="40" cy="40" r="10" />
            <path d="M35 40 L38 43 L45 36" />
        </svg>
    </div>
);

const Services = () => {
    const [page, setPage] = useState(0);
    const perPage = 2;
    const shown = allServices.slice(page * perPage, page * perPage + perPage);
    const maxPage = Math.ceil(allServices.length / perPage) - 1;

    return (
        <section className="services">
            <div className="section-label">
                <Star /> <span>FAST AND FRIENDLY SERVICES</span> <Star />
            </div>
            <h2>The Award Winning<br />Computer Support, PC and<br />Laptop Repair Specialists</h2>

            <div className="services-grid">
                {shown.map((s, i) => (
                    <div className="service-card" key={i}>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <div className="service-card-img">
                            <ServiceImgPlaceholder bg={s.bg} color={s.color} />
                        </div>
                        <button className="btn-read-more">Read More</button>
                    </div>
                ))}
            </div>

            <div className="services-nav">
                <button className="nav-btn" onClick={() => setPage(Math.max(0, page - 1))}>←</button>
                <button className="nav-btn" onClick={() => setPage(Math.min(maxPage, page + 1))}>→</button>
            </div>
        </section>
    );
};

export default Services;