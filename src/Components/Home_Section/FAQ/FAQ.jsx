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
        a: "Nope! You can just bring in your computer to our shop, no appointment necessary. We operate on a first come first serve basis, but we do offer Rush Service if you need your computer back right away. We only need appointments for house calls.",
    },
    { q: 'What do I need to bring with me when dropping off my computer?', a: '' },
    { q: 'How much do you charge to look at my computer and tell me whats wrong with it?', a: '' },
    { q: 'Do you service Macs?', a: '' },
    { q: 'Do you service laptops?', a: '' },
    { q: 'How long will it take to get my computer back?', a: '' },
    { q: 'If I need my job completed right away, is that possible?', a: '' },
    { q: "If I can't be without a computer while mine is being fixed, can you offer me a rental?", a: '' },
];

const FAQ = () => {
    const [open, setOpen] = useState(0);

    return (
        <section className="faq">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', justifyContent: 'center' }}>
                <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>FREQUENTLY ASKED QUESTIONS</span> <Star />
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