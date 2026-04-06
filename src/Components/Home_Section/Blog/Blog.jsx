import React from 'react';
import './Blog.css';
import blog1 from '../../../assets/blog1.webp';
import blog2 from '../../../assets/blog3.webp';
import blog3 from '../../../assets/blog2.webp';

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
        img: blog1,
        type: 'round',
    },
    {
        title: 'The Future of Device Repairs: Innovations and Predictions',
        date: 'November 19, 2023',
        comments: 'No Comments',
        img: blog2,
        type: 'middle',
    },
    {
        title: 'Data Recovery: How to Protect Your Valuable Files',
        date: 'November 22, 2023',
        comments: 'No Comments',
        img: blog3,
        type: 'round',
    },
];

const CalendarIcon = () => (
    <svg width="13" height="13" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);

const CommentIcon = () => (
    <svg width="13" height="13" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
);

const MetaRow = ({ date, comments }) => (
    <div className="blog-meta">
        <span>
            <CalendarIcon />
            {date}
        </span>
        <span>
            <CommentIcon />
            {comments}
        </span>
    </div>
);

const Blog = () => (
    <section className="blog">
        <div className="blog-label">
            <Star />
            <span>OUR BLOG</span>
            <Star />
        </div>
        <h2>The Digital Pulse: News &amp; Updates</h2>

        <div className="blog-grid">
            {posts.map((p, i) => {

                if (p.type === 'round') {
                    return (
                        <div className="blog-card blog-card--round" key={i}>
                            <div className="blog-round-img-wrap">
                                <img src={p.img} alt={p.title} className="blog-round-img" />
                            </div>
                            <div className="blog-card-body">
                                <h3>{p.title}</h3>
                                <MetaRow date={p.date} comments={p.comments} />
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="blog-card blog-card--middle" key={i}>
                        <div className="blog-card-body--top">
                            <h3>{p.title}</h3>
                            <MetaRow date={p.date} comments={p.comments} />
                        </div>
                        <div className="blog-middle-circle-wrap">
                            <img src={p.img} alt={p.title} className="blog-middle-circle" />
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);

export default Blog;