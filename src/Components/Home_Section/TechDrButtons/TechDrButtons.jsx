import React, { useState } from "react";
import "./TechDrButtons.css";

const TechDrButtons = () => {
    const [quoteHover, setQuoteHover] = useState(false);
    const [callHover, setCallHover] = useState(false);

    return (
        <div className="btn-wrapper">
            <a href="tel:1300072073" className="btn-link">
                <button
                    className={`btn btn-quote ${quoteHover ? "btn-quote--hover" : ""}`}
                    onMouseEnter={() => setQuoteHover(true)}
                    onMouseLeave={() => setQuoteHover(false)}
                >
                    <span className="btn-icon"></span>
                    Make a Booking
                </button>
            </a>

            <a href="tel:1300072073" className="btn-link">
                <button
                    className={`btn btn-call ${callHover ? "btn-call--hover" : ""}`}
                    onMouseEnter={() => setCallHover(true)}
                    onMouseLeave={() => setCallHover(false)}
                >
                    <span className="btn-icon"></span>
                    Call us now
                </button>
            </a>
        </div>
    );
};

export default TechDrButtons;