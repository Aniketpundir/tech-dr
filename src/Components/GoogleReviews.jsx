import React from "react";
import "./GoogleRating.css";
import barkLogo from "../assets/barklogo.png";
import ypLogo from '../assets/yellow_p.png'
/* ── Stars ── */
const FIVE_STARS = [1, 2, 3, 4, 5];
const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16"
    style={{ display: "inline-block", verticalAlign: "middle" }}>
    <path fill="#e8a800"
      d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z" />
  </svg>
);

/* ── Google logo ── */
const GoogleLogo = () => (
  <img
    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
    alt="Google"
    style={{ width: 34, height: 34, borderRadius: 0, objectFit: "contain" }}
  />
);

/* ── ServiceSeeking logo ── */
const ServiceSeekingLogo = () => (
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrz3xP3lSAEwFG9qo0g7XJ1KPI3hbnt4_15Q&s"
    alt="ServiceSeeking"
    style={{ width: 38, height: 38, borderRadius: 8, objectFit: "contain" }}
  />
);

/* ── Oneflare logo ── */
const ONEFLARE_BASE64 = "data:image/png;base64,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";

const OneflareLogo = () => (
  <img
    src={ONEFLARE_BASE64}
    alt="Oneflare"
    style={{ width: 38, height: 38, borderRadius: 8, objectFit: "contain" }}
  />
);

/* ── Bark logo ── */
/* ── Bark logo — from Bark.com's own apple-touch-icon ── */
const BarkLogo = () => (
  <img
    src={barkLogo}
    alt="Bark"
    style={{ width: 38, height: 38, borderRadius: 8, objectFit: "contain" }}
    onError={(e) => {
      e.target.style.display = "none";
      e.target.parentNode.innerHTML = `
        <svg viewBox="0 0 38 38" width="38" height="38" style="border-radius:8px;display:block">
          <rect width="38" height="38" rx="8" fill="#00B67A"/>
          <text x="19" y="26" text-anchor="middle" font-size="18" font-weight="800" font-family="Arial,sans-serif" fill="white">B</text>
        </svg>`;
    }}
  />
);

/* ── Word of Mouth logo ── */
const WordOfMouthLogo = () => (
  <svg viewBox="0 0 38 38" width="38" height="38" style={{ borderRadius: 8 }}>
    <rect width="38" height="38" rx="8" fill="#FF6B00"/>
    <text x="19" y="26" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white">W</text>
  </svg>
);

/* ── Yellow Pages logo ── */
const YellowPagesLogo = () => (
 <img
    src={ypLogo}
    alt="Bark"
    style={{ width: 38, height: 38, borderRadius: 8, objectFit: "contain" }}
    onError={(e) => {
      e.target.style.display = "none";
      e.target.parentNode.innerHTML = `
        <svg viewBox="0 0 38 38" width="38" height="38" style="border-radius:8px;display:block">
          <rect width="38" height="38" rx="8" fill="#00B67A"/>
          <text x="19" y="26" text-anchor="middle" font-size="18" font-weight="800" font-family="Arial,sans-serif" fill="white">B</text>
        </svg>`;
    }}
  />
);

/* ── Pill badge ── */
const RatingPill = ({ logo, rating, reviews, poweredBy }) => (
  <div className="gr-pill">
    <div className="gr-pill-logo">{logo}</div>
    <div className="gr-pill-info">
      <div className="gr-pill-top">
        <span className="gr-pill-num">{rating}</span>
        <span className="gr-pill-stars">
          {FIVE_STARS.map((i) => <StarIcon key={i} />)}
        </span>
      </div>
      <span className="gr-pill-reviews">Based on {reviews.toLocaleString()} reviews</span>
      <span className="gr-pill-powered">powered by {poweredBy}</span>
    </div>
  </div>
);

const Sep = () => <span className="gr-sep">·</span>;

/* ══════════════════════════════════════════════
   Main component
   ══════════════════════════════════════════════ */
const GoogleRating = ({
  googleRating = 4.8,
  googleReviews = 1061,
  ssRating = 5.0,
  ssReviews = 59,
  ofRating = 5.0,
  ofReviews = 440,
  barkRating = 5.0,
  barkReviews = 2,
  womRating = 5.0,
  womReviews = 31,
  ypRating = 5.0,
  ypReviews = 68,
}) => {
  const badges = [
    <RatingPill key="google" logo={<GoogleLogo />} rating={googleRating} reviews={googleReviews} poweredBy="Google" />,
    <Sep key="s1" />,
    <RatingPill key="ss" logo={<ServiceSeekingLogo />} rating={ssRating} reviews={ssReviews} poweredBy="ServiceSeeking" />,
    <Sep key="s2" />,
    <RatingPill key="of" logo={<OneflareLogo />} rating={ofRating} reviews={ofReviews} poweredBy="Oneflare" />,
    <Sep key="s3" />,
    <RatingPill key="bark" logo={<BarkLogo />} rating={barkRating} reviews={barkReviews} poweredBy="Bark" />,
    <Sep key="s4" />,
    <RatingPill key="wom" logo={<WordOfMouthLogo />} rating={womRating} reviews={womReviews} poweredBy="Word of Mouth" />,
    <Sep key="s5" />,
    <RatingPill key="yp" logo={<YellowPagesLogo />} rating={ypRating} reviews={ypReviews} poweredBy="Yellow Pages" />,
    <Sep key="s6" />,
  ];

  return (
    <div className="gr-marquee-outer">
      <div className="gr-marquee-track">
        {badges}
        {badges.map((b, i) => React.cloneElement(b, { key: `dup-${i}` }))}
      </div>
    </div>
  );
};

export default GoogleRating;