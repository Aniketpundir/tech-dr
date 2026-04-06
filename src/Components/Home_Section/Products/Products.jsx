import React from 'react';
import './Products.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const brands = [
    {
        name: 'IBM',
        logo: (
            <svg height="40" viewBox="0 0 80 32" fill="#1F70C1" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="2" width="8" height="4" /><rect x="0" y="9" width="8" height="4" />
                <rect x="0" y="16" width="8" height="4" /><rect x="0" y="23" width="8" height="4" />
                <rect x="12" y="2" width="8" height="4" /><rect x="12" y="9" width="4" height="4" />
                <rect x="12" y="16" width="4" height="4" /><rect x="12" y="23" width="8" height="4" />
                <rect x="22" y="2" width="8" height="4" /><rect x="26" y="9" width="4" height="4" />
                <rect x="26" y="16" width="4" height="4" /><rect x="22" y="23" width="8" height="4" />
                <rect x="34" y="2" width="4" height="25" /><rect x="34" y="9" width="8" height="4" />
                <rect x="34" y="16" width="8" height="4" /><rect x="46" y="2" width="4" height="25" />
                <rect x="46" y="9" width="4" height="4" /><rect x="50" y="9" width="4" height="4" />
                <rect x="54" y="9" width="4" height="4" /><rect x="46" y="16" width="4" height="4" />
                <rect x="50" y="16" width="4" height="4" /><rect x="54" y="16" width="4" height="4" />
                <rect x="46" y="23" width="4" height="4" /><rect x="50" y="23" width="4" height="4" />
                <rect x="54" y="23" width="4" height="4" /><rect x="60" y="2" width="4" height="25" />
                <rect x="64" y="2" width="12" height="4" /><rect x="64" y="23" width="12" height="4" />
                <rect x="72" y="9" width="4" height="13" />
            </svg>
        ),
    },
    {
        name: 'GIGABYTE',
        logo: (
            <svg height="40" viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="28" fontFamily="Arial Black,sans-serif" fontSize="22" fontWeight="900" fill="#E2001A" letterSpacing="-0.5">GIGABYTE</text>
                <path d="M0 34 L130 34" stroke="#E2001A" strokeWidth="2" />
            </svg>
        ),
    },
    {
        name: 'Samsung',
        logo: (
            <svg height="40" viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="30" fontFamily="Arial,sans-serif" fontSize="26" fontWeight="700" fill="#1428A0" letterSpacing="1">SAMSUNG</text>
            </svg>
        ),
    },
    {
        name: 'Sony',
        logo: (
            <svg height="40" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="30" fontFamily="Arial,sans-serif" fontSize="28" fontWeight="700" fill="#000" letterSpacing="2">SONY</text>
            </svg>
        ),
    },
    {
        name: 'Apple',
        logo: (
            <svg height="44" viewBox="0 0 36 44" fill="#555" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.8 23.3c0-6.2 5.1-9.2 5.3-9.3-2.9-4.2-7.4-4.8-9-4.9-3.8-.4-7.5 2.2-9.4 2.2-1.9 0-4.9-2.2-8-2.1-4.1.1-7.9 2.4-10 6-4.3 7.5-1.1 18.5 3 24.5 2 2.9 4.4 6.2 7.5 6.1 3-.1 4.2-2 7.8-2 3.6 0 4.7 2 7.9 1.9 3.2-.1 5.3-3 7.3-5.9 2.3-3.3 3.2-6.6 3.3-6.7-.1-.1-6.4-2.5-6.7-9.8zm-6.2-18c1.7-2 2.8-4.8 2.5-7.6-2.4.1-5.3 1.6-7 3.6-1.5 1.8-2.9 4.6-2.5 7.3 2.7.2 5.4-1.4 7-3.3z" />
            </svg>
        ),
    },
    {
        name: 'Dell',
        logo: (
            <svg height="56" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="37" fill="none" stroke="#007DB8" strokeWidth="4" />
                <text x="40" y="48" fontFamily="Arial Black,sans-serif" fontSize="22" fontWeight="900" fill="#007DB8" textAnchor="middle" letterSpacing="1">DELL</text>
            </svg>
        ),
    },
    {
        name: 'Asus',
        logo: (
            <svg height="44" viewBox="0 0 160 44" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="30" fontFamily="Arial Black,sans-serif" fontSize="28" fontWeight="900" fill="#00539B" letterSpacing="2">ASUS</text>
                <text x="0" y="43" fontFamily="Arial,sans-serif" fontSize="10" fill="#00539B" letterSpacing="1.5">IN SEARCH OF INCREDIBLE</text>
            </svg>
        ),
    },
];

const doubled = [...brands, ...brands];

const Products = () => (
    <section className="products">
        <div className="products-label">
            <Star />
            <span>PRODUCTS</span>
            <Star />
        </div>
        <h2>We Offer Support for the Following Products</h2>

        <div className="marquee-wrap">
            <div className="marquee-track">
                {doubled.map((b, i) => (
                    <div className="brand-item" key={i} title={b.name}>
                        {b.logo}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Products;