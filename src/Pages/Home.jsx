import React from 'react'
import Hero from "../Components/Home_Section/Hero/Hero"
import Services from "../Components/Home_Section/Services/Services"
import CTABanner from "../Components/Home_Section/CTABanner/CTABanner"
import AboutUs from "../Components/Home_Section/AboutUs/AboutUs"
import WhyChooseUs from "../Components/Home_Section/WhyChooseUs/WhyChooseUs"
import HowWeHelp from "../Components/Home_Section/HowWeHelp/HowWeHelp"
import Testimonials from "../Components/Home_Section/Testimonials/Testimonials"
import ContactForm from "../Components/Home_Section/ContactForm/ContactForm"
import FAQ from "../Components/Home_Section/FAQ/FAQ"
import Products from "../Components/Home_Section/Products/Products"
import Blog from "../Components/Home_Section/Blog/Blog"
import TechDrButtons from '../Components/Home_Section/TechDrButtons/TechDrButtons'
import GoogleRating from '../Components/GoogleReviews'
import SuburbsSection from '../Components/SuburbsSection/SuburbsSection'

const Home = () => {
    return (
        <>
            <Hero />
            <TechDrButtons />
            {/* <Services /> */}
            {/* <CTABanner /> */}
            <AboutUs />
            <WhyChooseUs />
            <GoogleRating />
            {/* <Services /> */}
            <ContactForm />
            <Testimonials />
            {/* <Blog /> */}
            <HowWeHelp />
            <FAQ />
            <Products />
            <SuburbsSection />
        </>
    )
}

export default Home