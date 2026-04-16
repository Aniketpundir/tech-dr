import React, { useState } from "react";
import "./TechDrButtons.css";
import { Link } from "react-router-dom";

const handleClick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
};

const TechDrButtons = () => {
    const [quoteHover, setQuoteHover] = useState(false);
    const [callHover, setCallHover] = useState(false);

    return (
        <div className="btn-wrapper">
            <Link to='/services' className="btn-link">
                <button
                    className={`btn btn-quote ${quoteHover ? "btn-quote--hover" : ""}`}
                    onMouseEnter={() => setQuoteHover(true)}
                    onMouseLeave={() => setQuoteHover(false)}
                    onClick={() => { handleClick() }}
                >
                    <span className="btn-icon"></span>
                    Our Services
                </button>
            </Link>

            <div className="call-and-booking-section">
                <a href="tel:1300072073" className="btn-link">
                    <button
                        className={`btn btn-call ${callHover ? "btn-call--hover" : ""}`}
                        onMouseEnter={() => setCallHover(true)}
                        onMouseLeave={() => setCallHover(false)}
                    >
                        <span className="btn-icon"></span>
                        CALL US NOW
                    </button>
                </a>
                <Link to="/book-now" onClick={() => { handleClick() }} className="btn-link">
                    <button
                        className={`btn btn-call ${callHover ? "btn-call--hover" : ""}`}
                        onMouseEnter={() => setCallHover(true)}
                        onMouseLeave={() => setCallHover(false)}
                    >
                        <span className="btn-icon"></span>
                        BOOK NOW
                    </button>
                </Link>
            </div>


        </div>
    );
};

export default TechDrButtons;