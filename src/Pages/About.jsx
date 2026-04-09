import React from 'react'
import AboutHero from '../Components/About_Section/AboutHero'
import AboutUs from '../Components/Home_Section/AboutUs/AboutUs'
import WhyChooseUs from '../Components/About_Section/WhyChooseUs/WhyChooseUs'
import HowWeHelp from '../Components/About_Section/HowWeHelp/AbHowWeHelp'
import GoogleRating from '../Components/GoogleReviews'

const About = () => {
    return (
        <>
            <AboutHero />
            <GoogleRating/>
            <AboutUs />
            <WhyChooseUs />
            <HowWeHelp/>
        </>
    )
}

export default About