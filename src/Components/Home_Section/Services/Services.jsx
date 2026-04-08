import React from 'react';
import './Services.css';
import cctv from "../../../assets/cctv.jpg";
import data from "../../../assets/data.jpg";
import hardware from "../../../assets/hardware-repair.jpg";
import internet from "../../../assets/internet-email-ssues.jpg";
import mac from "../../../assets/mac-repair.jpg";
import mobile from "../../../assets/mobile-up-scaled.jpg";
import networksetup from "../../../assets/networksetup-scaled.jpg";
import pc from "../../../assets/pc-building.jpg";
import servers from "../../../assets/servers-setup.jpg";
import software from "../../../assets/software-device-tutorials.jpg";

const allServices = [
    {
        title: 'Data Recovery',
        desc: 'Accidentally deleted files or facing a failing hard drive? We offer secure, professional data recovery solutions to retrieve your invaluable documents, photos, and business data quickly.',
        img: data,
    },
    {
        title: 'Mac & Windows PC Repair',
        desc: 'From sluggish performance and virus removals to motherboard repairs, our certified technicians provide expert troubleshooting and repairs for all Apple and Windows devices.',
        img: mac,
    },
    {
        title: 'Internet & Email Issues',
        desc: 'Experiencing network dropouts or email syncing errors? We swiftly diagnose and resolve complex connectivity and configuration problems to keep you online and communicating.',
        img: internet,
    },
    {
        title: 'Hardware Upgrades & Repair',
        desc: 'Breathe new life into your aging machine. We supply and install high-performance SSDs, RAM, and graphics cards to ensure your device runs at peak efficiency.',
        img: hardware,
    },
    {
        title: 'Software & Device Tutorials',
        desc: 'Struggling with new software or a newly purchased device? We provide patient, hands-on tutorials tailored to your pace, helping you master your tech with confidence.',
        img: software,
    },
    {
        title: 'Network & Wireless Set Up',
        desc: 'Eliminate dead zones and slow speeds. We design, configure, and secure reliable wired and wireless networks optimized for both modern homes and demanding small businesses.',
        img: networksetup,
    },
    {
        title: 'Mobile Phone Email Set Up',
        desc: 'Stay connected on the go. We offer hassle-free, secure email account configuration across all major iOS and Android smartphones and tablets.',
        img: mobile,
    },
    {
        title: 'CCTV Setup & Servicing',
        desc: 'Protect what matters most. We specialize in the professional installation, configuration, and ongoing maintenance of high-definition CCTV security systems.',
        img: cctv,
    },
    {
        title: 'Servers Setup',
        desc: 'Empower your business infrastructure. We provide tailored server installations, secure data management, and continuous network administration for small to medium enterprises.',
        img: servers,
    },
    {
        title: 'Gaming PC Building & Repair',
        desc: 'Dominate the leaderboard with a custom-built rig. We assemble premium gaming PCs, optimize cooling systems, and repair specialist hardware to maximize your framerates.',
        img: pc,
    },
];

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const Services = () => {
    return (
        <section className="services">
            <div className="section-label">
                <Star /> <span>FAST AND FRIENDLY SERVICES</span> <Star />
            </div>
            <h2>The Award Winning<br />Computer Support, PC and<br />Laptop Repair Specialists</h2>

            <div className="services-grid">
                {allServices.map((s, i) => (
                    <div className="service-card" key={i}>
                        <h3>{s.title}</h3>
                        {/* Image is now placed BEFORE the description text */}
                        <div className="service-card-img">
                            <img src={s.img} alt={s.title} />
                        </div>
                        {/* Description text is now perfectly underneath the image */}
                        <p>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;