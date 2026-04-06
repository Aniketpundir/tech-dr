import React from 'react';
import './TopBar.css';

const TopBar = () => {
    return (
        <div className="topbar">

            {/* Location */}
            <div className="topbar-location">
                <svg width="18" height="18" fill="none" stroke="#e8520a" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                </svg>
                <div>
                    <span className="label">Location: </span>
                    13 Bridge St, Epping NSW 2121, Australia
                </div>
            </div>

            {/* Support Pill */}
            <div className="topbar-support">
                <div className="icon-wrap">
                    <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z" />
                    </svg>
                </div>
                <div className="support-text">
                    <span className="support-title">Urgent Need Support?</span>
                    <span className="support-info">1300 072 073 &nbsp;&nbsp; info@thetechdr.com.au</span>
                </div>
            </div>

            {/* Social */}
            <div className="topbar-social">
                <span className="follow-text">Follow us on:</span>

                {/* Facebook */}
                <a href="#" className="social-link">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                </a>

                {/* X (Twitter) */}
                <a href="#" className="social-link">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </a>

                {/* Instagram */}
                <a href="#" className="social-link">
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                </a>

                {/* LinkedIn */}
                <a href="#" className="social-link">
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
            </div>

        </div>
    );
};

export default TopBar;
