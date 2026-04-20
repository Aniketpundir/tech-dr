import React, { useState, useRef } from 'react';
import './Testimonials.css';

const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 14 14">
        <path d="M7 0 L7.5 6.5 L14 7 L7.5 7.5 L7 14 L6.5 7.5 L0 7 L6.5 6.5 Z" fill="#e8520a" />
    </svg>
);

const reviews = [
    {
        name: 'Verniece Irvine',
        role: 'Customer',
        text: `Anand the Tech Dr is brilliant as usual! Every time I need help, he delivers top‑tier service with genuine care and unmatched expertise. What I appreciate most is that he never makes me feel like I’m lacking in technology—he explains everything patiently, clearly, and without a hint of judgment. It’s rare to find someone so knowledgeable who is also so kind.

        He goes above and beyond, not just fixing the issue but making sure I understand what happened and how to avoid it in the future. You can tell he truly cares about his customers and takes pride in his work. A very, very caring computer man who treats every job with professionalism and heart.Exceptional as always. Highly recommended!`,
        stars: 4,
    },
    {
        name: 'Neil Ohlback',
        role: 'Customer',
        text: `I want to share my outstanding experience with Anand at The Tech, because truly, he deserves every bit of recognition. If you are searching for the best computer repair service, expert tech support, or someone who genuinely understands computers inside and out, Anand is the person you need.
From the moment I walked in, Anand was extremely polite, patient, and helpful. He treats people with respect and takes the time to explain everything clearly. It’s rare to find someone in the computer business who not only knows how to fix the problem, but also goes the extra mile to educate you, guide you, and make sure you understand what’s happening with your device.
What impressed me most is how highly skilled and accomplished he is. My computer had an issue that nobody else could fix. I had tried other places with no success, but Anand diagnosed the problem quickly and repaired it perfectly. He didn’t just fix it — he improved its performance and gave me valuable advice on how to keep it running smoothly.
His knowledge is exceptional, his service is honest, and his dedication to helping people is obvious. You can tell he genuinely cares about his customers and takes pride in his work. In a world where good service is hard to find, Anand stands out as a true professional and a genuinely good man.
If you need computer repairs, upgrades, troubleshooting, or expert advice, I highly recommend Anand at The Tech. He is the kind of technician everyone hopes to find — trustworthy, talented, and incredibly helpful. I wouldn’t go anywhere else.
Thank you, Anand, for fixing my computer when nobody else could. Your service is excellent, and you have earned a loyal customer.`,
        stars: 5,
    },
    {
        name: 'Savindu Padukkavidana',
        role: 'Customer',
        text: `Outstanding experience from Anan and the team, hands down some of the best customer service I’ve received in Sydney. They were friendly, professional, and took the time to clearly explain the issue and the repair process. The service was quick, pricing was fair and transparent, and the repair was done to a very high standard.

What really stood out was how welcoming and honest the team was throughout the whole process. My device is now working perfectly, and I couldn’t be happier with the result. Highly recommend Anan and the team to anyone looking for reliable, trustworthy, and high-quality tech repair services.`,
        stars: 5,
    },
    {
        name: 'Mariam Mirzoyan',
        role: 'Customer',
        text: `He fixed my computer’s graphics card and the difference is unbelievable. My gaming PC is running better than it ever has, and his knowledge and skill really stood out.
It’s disappointing to see a few people trying to damage his reputation because my experience was nothing but positive. He was professional, honest and genuinely great at what he does. The quality of his work speaks for itself.
I’m extremely happy with the result and I would recommend him to anyone. In my opinion he is the best in Sydney for gaming PC repairs and custom builds.`,
        stars: 4,
    },
    {
        name: 'Geoffrey Thompson',
        role: 'Customer',
        text: `Tech Dr came out very quickly when I called. He clearly knew what he was doing, identified the problem straight away, took the item away for repair, and returned it promptly.

He was friendly, helpful, and easy to talk to.

I would happily recommend him to anyone in the Wahroonga area.`,
        stars: 4,
    },
    {
        name: 'Peter Drummond',
        role: 'Customer',
        text: `I’ve been a customer of Anand at The Tech Dr for over 13 years, and I can confidently say his service has always been outstanding. Anand is reliable, professional, and consistently delivers excellent results. Not only is the quality of his work top-notch, but his pricing has always been fair and reasonable. It’s rare to find someone who combines expertise with integrity, and Anand does exactly that. I highly recommend The Tech Dr to anyone looking for trustworthy and skilled technical support.`,
        stars: 4,
    },
    {
        name: 'John Larrarte',
        role: 'Customer',
        text: `Had an excellent experience with my local IT guy. He fixed my Fetch TV, updated everything, and had it all running smoothly in no time. Really reliable, very knowledgeable, and great to have someone local who knows what they’re doing. Highly recommended!`,
        stars: 4,
    },
    {
        name: 'Harrison Farr',
        role: 'Customer',
        text: `Very professional and friendly. Always responds promptly . I read few reviews which one negative but I still give it a go so I booked appointment. The came promptly fixed up all my problem it is a legit business in Epping area it is shame how some people trying to hold him for ransom to get refund and trying to destroy his image. He's here he's genuinely care about his job`,
        stars: 4,
    },
    {
        name: 'Peter Theodore',
        role: 'Customer',
        text: `Anand the Tech Dr is a first‑class computer technician. He diagnosed the issue quickly, explained everything in clear terms, and had my system running better than ever. His professionalism, honesty, and genuine care for his customers really stand out. Highly recommended to anyone who wants reliable, top‑quality tech support.`,
        stars: 4,
    },
    {
        name: 'Nick S',
        role: 'Customer',
        text: `Anand the Tech Dr is a first‑class computer technician. He diagnosed the issue quickly, explained everything in clear terms, and had my system running better than ever. His professionalism, honesty, and genuine care for his customers really stand out. Highly recommended to anyone who wants reliable, top‑quality tech support.`,
        stars: 4,
    },
    {
        name: 'Peter Theodore',
        role: 'Customer',
        text: `Highly Recommended!
Anand has been my go-to computer expert for quite some time now, and he never disappoints. He's incredibly knowledgeable and always up to date with the latest tech insights. His professionalism stands out—he’s reliable, efficient, and always respectful. On top of that, Anand is just a genuinely friendly person, which makes every interaction a pleasure. No issue is ever too big or too small, and he consistently goes above and beyond to help. If you’re looking for someone who knows their stuff and treats you like a valued client, Anand is your guy!`,
        stars: 4,
    },
    {
        name: 'Nick S',
        role: 'Customer',
        text: `Anand the Tech Dr is a first‑class computer technician. He diagnosed the issue quickly, explained everything in clear terms, and had my system running better than ever. His professionalism, honesty, and genuine care for his customers really stand out. Highly recommended to anyone who wants reliable, top‑quality tech support.`,
        stars: 4,
    },
    {
        name: 'Evette Zeaiter',
        role: 'Customer',
        text: `I recently had my computer repaired by The Tech Dr, he is excellent and I couldn’t be more impressed. From start to finish, the experience was smooth, professional, and surprisingly affordable. He diagnosed the issue quickly, explained everything in plain language, and had my system up and running in no time.
Fixed my phone as well.`,
        stars: 4,
    },
    {
        name: 'Terence Reilly',
        role: 'Customer',
        text: `Annand is an absolute legend. Not only did he sort out my computer quickly and professionally, but he also showed up in a great shirt and even brought me a chai masala, which absolutely made my day. His service is friendly, efficient, and genuinely thoughtful. If you need a computer technician who goes above and beyond, Annand is your guy.`,
        stars: 4,
    },
    {
        name: 'Cloudflare Hosting',
        role: 'Customer',
        text: `Anand is Extremely genuine at what he does
We have been using Anand for all our IT needs as we only provide remote IT services and Anand does all software, hardware, and onsite repairs. His great approach, deep technical knowledge, and commitment to quality outcomes make him a standout in the industry. Unlike many we've worked with before, Anand demonstrates exceptional workmanship, always going the extra mile to ensure systems run smoothly and clients are satisfied. His pricing is fair and transparent, offering great value without compromising on quality. Whether you're a business seeking reliable IT support or a customer needing tailored tech solutions, Anand is the trusted professional you want on your side. His work speaks for itself—efficient, effective, and always delivered with integrity.`,
        stars: 4,
    },
    {
        name: 'Santosh Gubyad',
        role: 'Customer',
        text: `We had a major issue with my computer — it wouldn’t turn on at all. I called Tech Doctor on a Saturday, and to my surprise he came out that same night, even though it was a long weekend. By Sunday evening, my computer was fully sorted, and I’m actually writing this review from the very machine he repaired.
I’ve never seen anyone so dedicated that they’re willing to work on a Sunday. His workmanship is excellent, his knowledge is impressive, and the service is easily some of the best you’ll find in Sydney — especially in the Epping area.
I know there are a few negative reviews out there, but based on my experience, I can’t understand them. He was professional, honest, and an absolute gentleman throughout the whole process. Please don’t let the bad reviews put you off. This is a genuinely great company, and I couldn’t recommend him more highly.`,
        stars: 4,
    },
    {
        name: 'Pravin Jethwa',
        role: 'Customer',
        text: `I had a fantastic experience with Tech Dr. Anand, my technician, was extremely helpful and solved all my IT problems with ease. He is very genuine in what he does and clearly knows his stuff. From start to finish, he was professional, patient, and efficient. It’s not easy to find someone so trustworthy and skilled these days. I highly recommend Tech Dr to anyone in the Epping area looking for reliable and honest tech support!`,
        stars: 4,
    },
    {
        name: 'Dibesh Silwal',
        role: 'Customer',
        text: `Anand from Tech Doctor has been absolutely amazing. We booked a job around Christmas time, and he still made the effort to come out today and fix all the problems with my computer. As a student, I rely heavily on my computer, so I really appreciated his patience and how helpful he was throughout the whole process.
He explained everything clearly, worked efficiently, and made sure every issue was resolved. I’m very happy with the service and would definitely recommend Anand to anyone needing a reliable and skilled technician.`,
        stars: 4,
    },
    {
        name: 'Nick S',
        role: 'Customer',
        text: `Anand the Tech Dr is a first‑class computer technician. He diagnosed the issue quickly, explained everything in clear terms, and had my system running better than ever. His professionalism, honesty, and genuine care for his customers really stand out. Highly recommended to anyone who wants reliable, top‑quality tech support.`,
        stars: 5,
    },
    {
        name: 'Sitecorp Developments',
        role: 'Customer',
        text: `I’m really impressed with their prompt replies and professional service. They got back to me quickly, addressed my issue with care, and made the whole process smooth and stress‑free. It’s rare to find a team this responsive and genuinely helpful. Highly recommend them!`,
        stars: 5,
    },
    {
        name: 'kevin brennan',
        role: 'Customer',
        text: `I’ve been using The Tech Dr and his team for over 10 years, and they have been nothing short of outstanding. In an industry where reliability can be hard to find, they consistently deliver fast, honest, and high‑quality service every single time.

Their computer repair work in the Epping and Pymble areas is exceptional — efficient, accurate, and always explained clearly. Whether it’s a small fix or a major issue, they handle it with professionalism and genuine care.

It’s rare to find a team this dependable for such a long period. Very, very good service and truly a pleasure to deal with. Highly recommended.`,
        stars: 5,
    },
];

const TEXT_LIMIT = 150;

const TestCard = ({ r }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = r.text.length > TEXT_LIMIT;
    const firstLetter = r.name.charAt(0).toUpperCase();

    return (
        <div className="test-card">
            <div className="test-stars">
                {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="star-filled">★</span>
                ))}
                {Array.from({ length: 5 - r.stars }).map((_, j) => (
                    <span key={j} className="star-empty">★</span>
                ))}
            </div>

            <p>
                {isLong && !expanded
                    ? r.text.slice(0, TEXT_LIMIT) + '...'
                    : r.text}
            </p>

            {isLong && (
                <button
                    className="view-more-btn"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'View less ↑' : 'View more ↓'}
                </button>
            )}

            <div className="test-author">
                <div className="test-avatar">
                    <span className="avatar-letter">{firstLetter}</span>
                </div>
                <div className="test-author-info">
                    <h4>{r.name}</h4>
                    <span>{r.role}</span>
                </div>
            </div>
        </div>
    );
};

const Testimonials = () => {
    const trackRef = useRef(null);

    return (
        <section className="testimonials">
            <div className="test-marquee-outer">
                <div className="test-marquee-track">
                    <span className="test-marquee-item">
                        <StarIcon />
                        <span>What our Customers Say</span>
                        <StarIcon />
                    </span>
                </div>
            </div>

            <div className="testimonials-body">
                <div className="testimonials-header">
                    <div className="test-label">
                        <StarIcon />
                        <span>TESTIMONIALS</span>
                        <StarIcon />
                    </div>
                    <h2>Trusted by hundreds of happy customers</h2>
                    <p className="test-subtext">Real experiences from real people who trust The Tech Dr.</p>
                </div>

                <div className="testimonials-cards">
                    <div className="cards-marquee-track" ref={trackRef}>
                        {[...reviews, ...reviews].map((r, i) => (
                            <TestCard key={i} r={r} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;