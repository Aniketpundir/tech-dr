import React, { useState } from 'react';
import './FAQ.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const faqs = [
    {
        q: 'Do I need an appointment to bring in my computer for repair?',
        a: "Appointments are required for in-office repairs to ensure timely service and availability. However, if you prefer a home visit, an appointment is not mandatory, though scheduling in advance is recommended for convenience and faster assistance.",
    },

    {
        q: 'What do I need to bring with me when dropping off my computer?',
        a: `You only need to bring your computer. However, if applicable, we recommend also bringing any relevant accessories (such as the charger or cables) to help us diagnose and resolve the issue more efficiently.`
    },

    {
        q: 'How much do you charge to look at my computer and tell me whats wrong with it?',
        a: `The cost of diagnosis depends on the nature and complexity of the issue. We will first assess your computer and then provide you with a clear estimate before proceeding with any repairs.`
    },

    {
        q: 'Do you service Macs?',
        a: `We provide a wide range of IT solutions tailored for both individuals and businesses. Our expertise includes gaming PC building and repair, Mac and Windows PC repair, internet and email troubleshooting, as well as hardware upgrades and repairs. We also offer software and device tutorials to help you make the most of your technology, along with mobile phone email setup for seamless communication.

        In addition, we specialize in network and wireless setup, CCTV installation and servicing, server setup and management, and reliable data recovery services. Our team also supports business phone system setup, provides trong cybersecurity solutions to protect against hackers, and offers Starlink setup and configuration. As a anaged Services Provider (MSP), we ensure ongoing IT support and maintenance to keep your systems running smoothly and securely.`
    },

    {
        q: 'Do you service laptops?',
        a: `Yes, we provide repair and support services for laptops of all major brands and models.`
    },

    {
        q: 'How long will it take to get my computer back?',
        a: `The turnaround time depends on the nature and complexity of the issue. In many cases, repairs can be completed within a short timeframe, but we will provide you with an estimated completion time after assessing your computer.`
    },

    {
        q: 'If I need my job completed right away, is that possible?',
        a: `Yes, we offer priority or expedited services for urgent requests. Please let us know your requirements in advance, and we will do our best to accommodate a faster turnaround time.`
    },

    {
        q: "If I can't be without a computer while mine is being fixed, can you offer me a rental?",
        a: `At this time, we do not offer rental computers. However, we strive to complete repairs as quickly as possible to minimize any inconvenience.`
    },
];

const FAQ = () => {
    const [open, setOpen] = useState(0);

    return (
        <section className="faq">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', justifyContent: 'center' }}>
                <Star /> <span style={{ color: '#e8520a', fontSize: '30px', textAlign: 'center', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREQUENTLY ASKED QUESTIONS</span> <Star />
            </div>
            <h2>Our friendly staff are always happy to answer any of your questions, however first, why not a look through here to see if your question has been answered before.</h2>

            <div className="faq-list">
                {faqs.map((f, i) => (
                    <div className="faq-item" key={i}>
                        <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
                            {f.q}
                            <span className="faq-toggle">{open === i ? '−' : '+'}</span>
                        </button>
                        {open === i && f.a && (
                            <div className="faq-answer">{f.a}</div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;