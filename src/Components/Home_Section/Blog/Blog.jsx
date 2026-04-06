import React from 'react';
import './Blog.css';

const Star = () => (
    <svg width="14" height="14" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const posts = [
    {
        title: 'The Latest Trends in Cellphone Repairs: You Need to Know',
        date: 'November 19, 2023',
        comments: 'No Comments',
        titleClass: '',
        bg: '#1a3a5a',
        round: true,
    },
    {
        title: 'The Future of Device Repairs: Innovations and Predictions',
        date: 'November 19, 2023',
        comments: 'No Comments',
        titleClass: '',
        bg: '#2a1a5a',
        round: false,
    },
    {
        title: 'Data Recovery: How to Protect Your Valuable Files',
        date: 'November 22, 2023',
        comments: 'No Comments',
        titleClass: 'orange',
        bg: '#1a2a1a',
        round: false,
    },
];

const ImgPlaceholder = ({ bg, round }) => (
    <div className={`blog-card-img${round ? ' round' : ''}`} style={{ background: bg }}>
        <svg width="80" height="80" fill="none" stroke="#4488cc" strokeWidth="1.5" viewBox="0 0 80 80" opacity="0.5">
            <rect x="10" y="15" width="60" height="50" rx="4" />
            <path d="M20 35 L30 35 M20 45 L50 45 M20 55 L40 55" />
            <circle cx="55" cy="30" r="8" fill="#e8520a" fillOpacity="0.3" stroke="#e8520a" />
        </svg>
    </div>
);

const Blog = () => (
    <section className="blog">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', justifyContent: 'center' }}>
            <Star /> <span style={{ color: '#e8520a', fontSize: '13px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase' }}>OUR BLOG</span> <Star />
        </div>
        <h2>The Digital Pulse: News &amp; Updates</h2>

        <div className="blog-grid">
            {posts.map((p, i) => (
                <div className="blog-card" key={i}>
                    <ImgPlaceholder bg={p.bg} round={p.round} />
                    <div className="blog-card-body">
                        <h3 className={p.titleClass}>{p.title}</h3>
                        <div className="blog-meta">
                            <span>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                </svg>
                                {p.date}
                            </span>
                            <span>
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                                </svg>
                                {p.comments}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default Blog;