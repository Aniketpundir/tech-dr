import React from 'react';
import './Products.css';


import ibmLogo from '../../../assets/IBM-removebg-preview.png';
import gigabyteLogo from '../../../assets/Gigabyte-removebg-preview.png';
import samsungLogo from '../../../assets/samsung-removebg-preview.png';
import sonyLogo from '../../../assets/sony-removebg-preview.png';
import appleLogo from '../../../assets/apple-removebg-preview.png';
import dellLogo from '../../../assets/dell-removebg-preview.png';
import asusLogo from '../../../assets/asus-removebg-preview.png';



const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const brands = [
    { name: 'IBM', logo: ibmLogo },
    { name: 'GIGABYTE', logo: gigabyteLogo },
    { name: 'Samsung', logo: samsungLogo },
    { name: 'Sony', logo: sonyLogo },
    { name: 'Apple', logo: appleLogo },
    { name: 'Dell', logo: dellLogo },
    { name: 'Asus', logo: asusLogo },
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
                    <div
                        className="brand-item"
                        key={i}
                        title={b.name}
                        style={{ opacity: 1, filter: 'none' }}
                    >
                        <img
                            src={b.logo}
                            alt={b.name}
                            height="70"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Products;