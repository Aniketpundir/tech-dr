import React from 'react';
import './AboutUs.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const AboutUs = () => (
    <section className="about">
        <div className="about-image">
            <div className="about-image-inner">
                <svg width="200" height="200" fill="none" stroke="#4488cc" strokeWidth="1.5" viewBox="0 0 200 200" opacity="0.7">
                    <rect x="30" y="50" width="140" height="100" rx="6" />
                    <path d="M60 80 L80 80 M60 100 L120 100 M60 120 L100 120" />
                    <circle cx="150" cy="70" r="15" fill="#e8520a" fillOpacity="0.3" stroke="#e8520a" />
                    <path d="M143 70 L148 75 L158 63" stroke="#e8520a" strokeWidth="2" />
                </svg>
            </div>
        </div>

        <div className="about-content">
            <div className="section-label" style={{ justifyContent: 'flex-start', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>ABOUT US</span> <Star />
            </div>
            <h2>Welcome To The Tech Dr.</h2>
            <p>We are the premium company providing services in the area of Sydney and surrounding suburbs.</p>

            <div className="about-features">
                <div className="about-feature">
                    <div className="feature-icon orange">
                        <svg width="24" height="24" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
                        </svg>
                    </div>
                    <div>
                        <h4>Computer & Technology Repair Service</h4>
                    </div>
                </div>
                <div className="about-feature">
                    <div className="feature-icon blue">
                        <svg width="24" height="24" fill="none" stroke="#4488cc" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <div>
                        <h4>100% Fix</h4>
                    </div>
                </div>
                <div className="about-feature">
                    <div className="feature-icon teal">
                        <svg width="24" height="24" fill="none" stroke="#22aa88" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div>
                        <h4>Excellent Service</h4>
                    </div>
                </div>
                <div className="about-feature">
                    <div className="feature-icon yellow">
                        <svg width="24" height="24" fill="none" stroke="#e8a020" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <div>
                        <h4>Free Home &amp; Office Visits</h4>
                    </div>
                </div>
            </div>

            <p className="about-desc">
                With our specialized and experienced team of customer support, we ensure a fast service at the convenience of your own home or office. Our super fast desktop support allows you to get your problems rectified in a matter of hours. If you are having any computer repair issues, feel free to contact us on 1300 072 073 for a Cost-Effective, Professional Computer Repair Service.
            </p>

            <button className="btn-about">ABOUT US</button>
        </div>
    </section>
);

export default AboutUs;