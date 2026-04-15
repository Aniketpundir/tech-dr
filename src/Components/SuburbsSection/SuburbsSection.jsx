import React from "react";
import { useNavigate } from "react-router-dom";
import { regions } from "../CityData/CityData";
import "./SuburbsSection.css";
const LocationIcon = () => (
    <div className="icon-wrapper">
        <svg className="pin-icon" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
                fill="#ffffff"  // ← white icon (orange bg pe)
            />
        </svg>
    </div>
);

const DiamondIcon = () => (
    <svg className="diamond-icon" viewBox="0 0 20 20" fill="none">
        <path d="M10 1L13 7L19 10L13 13L10 19L7 13L1 10L7 7L10 1Z" fill="rgba(255,255,255,0.85)" />
    </svg>
);


const SuburbsSection = () => {
    const navigate = useNavigate();

    const handleRegionClick = (region) => {
        const slug = region.toLowerCase().replace(/\s+/g, "-");
        navigate(`/suburbs-section/city/${slug}`);
    };

    return (
        <section className="suburbs-section">
            <div className="suburbs-header">
                <div className="header-label">
                    <DiamondIcon />
                    <span>SERVICE REGIONS ACROSS SYDNEY</span>
                    <DiamondIcon />
                </div>
            </div>

            <div className="suburbs-grid-wrapper">
                <div className="suburbs-grid">
                    {regions.map((region, index) => (
                        <div
                            className="suburb-item"
                            key={index}
                            onClick={() => handleRegionClick(region)}
                        >
                            <LocationIcon />
                            <div className="suburb-info">
                                <span className="suburb-name">{region}</span>
                                <span className="suburb-arrow">→</span>  {/* ← arrow added */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuburbsSection;