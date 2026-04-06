import React, { useState, useEffect } from 'react';
import slideimage1 from "../../../assets/slideimage1.jpeg"
import sliderimage2 from "../../../assets/sliderimage2.jpeg"
import './Hero.css';

const slides = [
    {
        image: slideimage1,
        heading: 'The Award Winning IT Support, PC and Laptop Repair Specialists',
    },
    {
        image: sliderimage2,
        heading: 'A team of professionals ready to help with any IT problem.',
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            goTo((current + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const goTo = (index) => {
        if (animating || index === current) return;
        setAnimating(true);
        setTimeout(() => {
            setCurrent(index);
            setAnimating(false);
        }, 400);
    };

    return (
        <section className="hero">
            {/* Star decoration */}
            <div className="hero-star">
                <svg width="50" height="50" viewBox="0 0 50 50">
                    <path d="M25 0 L27 23 L50 25 L27 27 L25 50 L23 27 L0 25 L23 23 Z" fill="#e8520a" opacity="0.8" />
                </svg>
            </div>

            {/* Content */}
            <div className="hero-content">
                <div className={`hero-text${animating ? ' fade-out' : ''}`}>
                    <h1>{slides[current].heading}</h1>
                    <p>{slides[current].subHeading}</p>
                </div>
            </div>

            {/* Image */}
            <div className="hero-image">
                <img
                    src={slides[current].image}
                    alt={slides[current].heading}
                    className={animating ? 'fade-out' : ''}
                />
            </div>

            {/* Arrows */}
            {/* <button
                className="slider-arrow prev"
                onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                aria-label="Previous slide"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L6 8l4 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button
                className="slider-arrow next"
                onClick={() => goTo((current + 1) % slides.length)}
                aria-label="Next slide"
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l4 5-4 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button> */}

            {/* Dots */}
            <div className="slider-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`slider-dot${i === current ? ' active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;