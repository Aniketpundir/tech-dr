import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import cctv from "../../../assets/cctv-new.jpg.jpeg";
import data from "../../../assets/data.jpg";
import hardware from "../../../assets/hardware-repair-new.jpeg";
import internet from "../../../assets/internet-issues.jpeg";
import mac from "../../../assets/mac-repair-new.jpeg";
import mobile from "../../../assets/mobile-up-scaled.jpg";
import networksetup from "../../../assets/networksetup-scaled-new.jpg.jpeg";
import pc from "../../../assets/gaming-pc.jpeg";
import servers from "../../../assets/servers-setup-new.jpeg";
import software from "../../../assets/software-device-tutorials-new.jpg.jpeg";
import protectionHacker from "../../../assets/protection-from-hacker.jpeg";
import starlink from "../../../assets/starlink.jpeg";
import bussinessSystem from "../../../assets/bussiness-phone-system.jpeg";
import Testimonials from "../Testimonials/Testimonials";
import GoogleRating from '../../GoogleReviews';
import mspImage from '../../../assets/msp.jpeg';
import WebsiteDevelopment from "../../../assets/WebsiteDevelopment.jpeg"
import TechDrButtons from '../TechDrButtons/TechDrButtons';
import SuburbsSection from '../../SuburbsSection/SuburbsSection';

const allServices = [
    {
        title: 'Gaming PC Building & Repair',
        desc: 'Dominate the leaderboard with a custom-built rig. We assemble premium gaming PCs, optimize cooling systems, and repair specialist hardware to maximize your framerates.',
        img: pc,
        slug: 'gaming-pc-building-repair'
    },

    {
        title: 'Mac & Windows PC Repair',
        desc: 'From sluggish performance and virus removals to motherboard repairs, our certified technicians provide expert troubleshooting and repairs for all Apple and Windows devices.',
        img: mac,
        slug: 'mac-windows-pc-repair'
    },

    {
        title: 'Managed Services Provider (MSP)',
        desc: 'Empower your business with our all-in-one proactive IT management. We provide 24/7 helpdesk support, robust cybersecurity, automated disaster recovery, seamless Microsoft 365 & Google Workspace integration, and modern VoIP communications.',
        img: mspImage,
        slug: 'managed-services-provider-msp'
    },

    {
        title: 'Internet & Email Issues',
        desc: 'Experiencing network dropouts or email syncing errors? We swiftly diagnose and resolve complex connectivity and configuration problems to keep you online and communicating.',
        img: internet,
        slug: 'internet-email-issues'
    },

    {
        title: 'Hardware Upgrades & Repair',
        desc: 'Breathe new life into your aging machine. We supply and install high-performance SSDs, RAM, and graphics cards to ensure your device runs at peak efficiency.',
        img: hardware,
        slug: 'hardware-upgrades-repair'
    },

    {
        title: 'Software & Device Tutorials',
        desc: 'Struggling with new software or a newly purchased device? We provide patient, hands-on tutorials tailored to your pace, helping you master your tech with confidence.',
        img: software,
        slug: 'software-device-tutorials'
    },

    {
        title: 'Network & Wireless Set Up',
        desc: 'Eliminate dead zones and slow speeds. We design, configure, and secure reliable wired and wireless networks optimized for both modern homes and demanding small businesses.',
        img: networksetup,
        slug: 'network-wireless-set-up'
    },

    {
        title: 'Mobile Phone Email Set Up',
        desc: 'Stay connected on the go. We offer hassle-free, secure email account configuration across all major iOS and Android smartphones and tablets.',
        img: mobile,
        slug: 'mobile-phone-email-set-up'
    },

    {
        title: 'CCTV Setup & Servicing',
        desc: 'Protect what matters most. We specialize in the professional installation, configuration, and ongoing maintenance of high-definition CCTV security systems.',
        img: cctv,
        slug: 'cctv-setup-servicing'
    },

    {
        title: 'Servers Setup',
        desc: 'Empower your business infrastructure. We provide tailored server installations, secure data management, and continuous network administration for small to medium enterprises.',
        img: servers,
        slug: 'servers-setup'
    },

    {
        title: 'Data Recovery',
        desc: 'Accidentally deleted files or facing a failing hard drive? We offer secure, professional data recovery solutions to retrieve your invaluable documents, photos, and business data quickly.',
        img: data,
        slug: 'data-recovery'
    },

    {
        title: 'Business Phone System Set Up',
        desc: 'Upgrade your business communications. We provide comprehensive setup and configuration of modern, scalable VoIP phone systems tailored to keep your team connected.',
        img: bussinessSystem,
        slug: 'business-phone-system-set-up'
    },

    {
        title: 'Protection From Hackers',
        desc: 'Safeguard your digital life and business data. We implement robust cybersecurity measures, including advanced firewalls, malware protection, and network audits to keep hackers at bay.',
        img: protectionHacker,
        slug: 'protection-from-hackers'
    },

    {
        title: 'Starlink Set Up',
        desc: 'Experience high-speed satellite internet anywhere. We offer professional, secure installation and optimization of Starlink dishes and routers for uninterrupted connectivity.',
        img: starlink,
        slug: 'starlink-set-up'
    },
    {
        title: 'Website development',
        desc: 'Build high-performance websites for your business. We offer professional, secure development and optimization of modern, responsive sites for seamless user experience and consistent online growth.',
        img: WebsiteDevelopment,
        slug: 'website-development'
    },
];

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const handleClick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
};

const Services = () => {
    const navigate = useNavigate();

    const handleCardClick = (slug) => {
        navigate(`/services/${slug}`);
    };

    const handleBookNow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/book-now');
    };

    return (
        <>
            <br />
            <GoogleRating />
            <TechDrButtons />
            <section className="services">
                <div className="section-label">
                    <Star /> <span>FAST AND FRIENDLY SERVICES</span> <Star />
                </div>
                <h2 className='heading-for-award'>The Award Winning<br />Computer Support, PC and<br />Laptop Repair Specialists</h2>

                <div className="services-grid">
                    {allServices.map((s, i) => (
                        <div className="service-card" key={i}>

                            {/* Top area → /services/:slug */}
                            <div
                                className="service-card-top"
                                onClick={() => handleCardClick(s.slug)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(s.slug)}
                            >
                                <h3>{s.title}</h3>
                                <div className="service-card-img">
                                    <img src={s.img} alt={s.title} />
                                </div>
                                <p>{s.desc}</p>
                            </div>

                            {/* <button
                                className="btn-learn-more"
                                type="button"
                                onClick={(e) => handleLearnMore(e, s.slug)}
                            >
                                Learn More About It <span className="btn-arrow">→</span>
                            </button> */}

                            {/* Book Now → /book-now (completely separate from card-top) */}
                            <button
                                className="btn-learn-more"
                                type="button"
                                onClick={(e) => { handleBookNow(e, s.slug), handleClick(0) }}
                            >
                                Book Now <span className="btn-arrow">→</span>
                            </button>

                        </div>
                    ))}
                </div>
            </section>
            <Testimonials />
            <SuburbsSection />
        </>
    );
};

export default Services;