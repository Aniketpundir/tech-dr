import React from 'react';
import './Products.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const Products = () => (
    <section className="products">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', justifyContent: 'center' }}>
            <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>PRODUCTS</span> <Star />
        </div>
        <h2>We Offer Support for the Following Products</h2>

        <div className="brands-row">
            <div className="brand-logo">
                <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" fill="#333">
                    <text x="0" y="30" fontFamily="serif" fontSize="18" fontWeight="700">SONY</text>
                    <text x="0" y="40" fontFamily="serif" fontSize="14">VAIO</text>
                </svg>
            </div>
            <div className="brand-logo">
                <svg viewBox="0 0 40 50" fill="#333">
                    <path d="M20 5C15 5 12 8 12 12C12 17 16 19 20 19C24 19 28 17 28 12C28 8 25 5 20 5Z" />
                    <path d="M8 28C8 22 12 18 18 17L20 25L22 17C28 18 32 22 32 28C32 36 26 44 20 44C14 44 8 36 8 28Z" />
                </svg>
            </div>
            <div className="brand-logo" style={{ fontSize: '32px', fontFamily: 'sans-serif', fontWeight: '300', letterSpacing: '-1px' }}>
                hp
            </div>
            <div className="brand-logo" style={{ fontSize: '22px', fontFamily: 'monospace', fontWeight: '900', letterSpacing: '4px' }}>
                IBM
            </div>
            <div className="brand-logo" style={{ fontSize: '20px', fontFamily: 'sans-serif', fontWeight: '900', letterSpacing: '1px' }}>
                ASUS
            </div>
        </div>
    </section>
);

export default Products;