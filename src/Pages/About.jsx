import React from 'react'
import { Helmet } from 'react-helmet-async'
import AboutHero from '../Components/About_Section/AboutHero'
import AboutUs from '../Components/Home_Section/AboutUs/AboutUs'
import WhyChooseUs from '../Components/About_Section/WhyChooseUs/WhyChooseUs'
import HowWeHelp from '../Components/About_Section/HowWeHelp/AbHowWeHelp'
import GoogleRating from '../Components/GoogleReviews'
import TechDrButtons from "../Components/Home_Section/TechDrButtons/TechDrButtons"
import SuburbsSection from "../Components/SuburbsSection/SuburbsSection"
import AboutSepration from "../assets/AboutSepration.jpeg"
import "./About.css"

const About = () => {
    return (
        <>
            <Helmet>
                <title>About TheTechDr | Sydney's Trusted IT Support Specialists</title>
                <meta name="description" content="Learn about TheTechDr — Sydney's trusted IT support and computer repair specialists. Background-checked technicians, same-day service, no fix no pay guarantee." />
                <meta name="keywords" content="about TheTechDr, IT support Sydney, computer repair specialists Sydney, trusted IT technicians Sydney" />
                <link rel="canonical" href="https://www.thetechdr.com.au/about-us" />
                <meta name="robots" content="index, follow" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.thetechdr.com.au/about-us" />
                <meta property="og:title" content="About TheTechDr | Sydney's Trusted IT Support Specialists" />
                <meta property="og:description" content="Meet the team behind TheTechDr — Sydney's most trusted IT support and computer repair service. Same-day service, no fix no pay." />
                <meta property="og:image" content="https://www.thetechdr.com.au/og-image.jpg" />
                <meta property="og:locale" content="en_AU" />
                <meta property="og:site_name" content="TheTechDr" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About TheTechDr | Sydney IT Support" />
                <meta name="twitter:description" content="Sydney's trusted IT support and computer repair specialists. Same-day service available." />
                <meta name="twitter:image" content="https://www.thetechdr.com.au/og-image.jpg" />
            </Helmet>

            <div style={{ backgroundColor: '#fff5ee' }}>
                <AboutHero />
                <GoogleRating />
                <TechDrButtons />
                <AboutUs />
                <WhyChooseUs />
                <HowWeHelp />

                <div className="sp-images about-images">
                    <img src={AboutSepration} alt="TheTechDr IT support team Sydney" className="sp-img" />
                </div>

                <SuburbsSection />
            </div>
        </>
    )
}

export default About