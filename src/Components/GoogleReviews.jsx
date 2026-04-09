import React from "react";
import "./GoogleRating.css";

const Star = ({ fill }) => (
  <svg
    viewBox="0 0 24 24"
    className="star-svg"
  >
    <defs>
      <linearGradient id={`grad-${fill}`}>
        <stop offset={`${fill}%`} stopColor="#F4B400" />
        <stop offset={`${fill}%`} stopColor="#DADCE0" />
      </linearGradient>
    </defs>

    <path
      fill={`url(#grad-${fill})`}
      d="M12 17.27L18.18 21 16.54 13.97 
         22 9.24 14.81 8.63 
         12 2 9.19 8.63 
         2 9.24 7.46 13.97 
         5.82 21z"
    />
  </svg>
);

const GoogleRating = ({ rating = 4.8, reviews = 1061 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const fill =
      rating >= i
        ? 100
        : rating + 1 > i
        ? (rating - (i - 1)) * 100
        : 0;

    stars.push(<Star key={i} fill={fill} />);
  }

  return (
    <div className="rating-wrapper">
      <div className="rating-box">

        <img
          src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
          className="google-logo"
          alt="Google"
        />

        <div className="rating-content">

          <div className="rating-top">

            <span className="rating-number">
              {rating}
            </span>

            <div className="stars">
              {stars}
            </div>

          </div>

          <div className="review-text">
            Based on {reviews.toLocaleString()} reviews
          </div>

          <div className="powered-text">
            powered by Google
          </div>

        </div>
      </div>
    </div>
  );
};

export default GoogleRating;