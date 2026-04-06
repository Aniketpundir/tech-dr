import React, { useState, useEffect } from 'react';
import './Services.css';
import cctv from "../../../assets/cctv.jpg"
import data from "../../../assets/data.jpg"
import hardware from "../../../assets/hardware-repair.jpg"
import internet from "../../../assets/internet-email-ssues.jpg"
import mac from "../../../assets/mac-repair.jpg"
import mobile from "../../../assets/mobile-up-scaled.jpg"
import networksetup from "../../../assets/networksetup-scaled.jpg"
import pc from "../../../assets/pc-building.jpg"
import servers from "../../../assets/servers-setup.jpg"
import software from "../../../assets/software-device-tutorials.jpg"

const allServices = [
    {
        title: 'Data Recovery',
        desc: 'Professional data recovery solutions to retrieve your lost or corrupted files and important documents.',
        img: data,
    },
    {
        title: 'Mac & Windows PC Repair',
        desc: 'Expert repair services for both Mac and Windows computers, handled by certified technicians.',
        img: mac,
    },
    {
        title: 'Internet & Email Issues',
        desc: 'Fast diagnosis and resolution of all internet connectivity and email configuration problems.',
        img: internet,
    },
    {
        title: 'Hardware Upgrades & Repair',
        desc: 'Comprehensive hardware upgrade and repair services to keep your devices running at peak performance.',
        img: hardware,
    },
    {
        title: 'Software & Device Tutorials',
        desc: 'Step-by-step guidance and hands-on tutorials to help you get the most out of your software and devices.',
        img: software,
    },
    {
        title: 'Network & Wireless Set Up',
        desc: 'Complete setup and configuration of wired and wireless networks for homes and small businesses.',
        img: networksetup,
    },
    {
        title: 'Mobile Phone Email Set Up',
        desc: 'Quick and hassle-free email account configuration and setup on all major mobile phone platforms.',
        img: mobile,
    },
    {
        title: 'CCTV Setup & Servicing',
        desc: 'Professional installation and ongoing servicing of CCTV security systems for homes and businesses.',
        img: cctv,
    },
    {
        title: 'Servers Setup',
        desc: 'Professional server installation, configuration and management solutions tailored for business needs.',
        img: servers,
    },
    {
        title: 'Gaming PC Building & Repair',
        desc: 'Custom gaming PC assembly and specialist repair services to maximise performance for every gamer.',
        img: pc,
    },
];

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const Services = () => {
    const [page, setPage] = useState(0);

    // Screen size ke hisaab se perPage
    const getPerPage = () => {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) return 1;
        return 2;
    };

    const [perPage, setPerPage] = useState(getPerPage);

    useEffect(() => {
        const handleResize = () => setPerPage(getPerPage());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxPage = Math.ceil(allServices.length / perPage) - 1;
    const shown = allServices.slice(page * perPage, page * perPage + perPage);

    // Page reset karo agar perPage change ho
    useEffect(() => {
        setPage(0);
    }, [perPage]);

    useEffect(() => {
        const timer = setInterval(() => {
            setPage(prev => (prev >= maxPage ? 0 : prev + 1));
        }, 3500);
        return () => clearInterval(timer);
    }, [maxPage]);

    return (
        <section className="services">
            <div className="section-label">
                <Star /> <span>FAST AND FRIENDLY SERVICES</span> <Star />
            </div>
            <h2>The Award Winning<br />Computer Support, PC and<br />Laptop Repair Specialists</h2>

            <div className="services-grid">
                {shown.map((s, i) => (
                    <div className="service-card" key={`${page}-${i}`}>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                        <div className="service-card-img">
                            <img src={s.img} alt={s.title} />
                        </div>
                        <button className="btn-read-more">Read More</button>
                    </div>
                ))}
            </div>

            <div className="services-nav">
                <button className="nav-btn" onClick={() => setPage(Math.max(0, page - 1))}>←</button>
                {Array.from({ length: maxPage + 1 }).map((_, i) => (
                    <button
                        key={i}
                        className={`dot-btn${page === i ? ' active' : ''}`}
                        onClick={() => setPage(i)}
                    />
                ))}
                <button className="nav-btn" onClick={() => setPage(Math.min(maxPage, page + 1))}>→</button>
            </div>
        </section>
    );
};

export default Services;