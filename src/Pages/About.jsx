import React from 'react'
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
            <div style={{ backgroundColor: '#fff5ee' }}>
                <AboutHero />
                <GoogleRating />
                <TechDrButtons />
                <AboutUs />
                <WhyChooseUs />
                <HowWeHelp />

                <div className="sp-images about-images">
                    <img src={AboutSepration} alt={`About Page`} className="sp-img" />
                </div>

                <SuburbsSection />
            </div>
        </>
    )
}

export default About