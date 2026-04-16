import React from 'react'
import { Helmet } from 'react-helmet-async'
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
            <Helmet>
                <title>TheTechDr | Expert IT Support & Computer Repairs Sydney</title>
                <meta name="description" content="TheTechDr provides fast, same-day IT support and computer repairs across Sydney. Gaming PC builds, CCTV, Starlink, networking & more. No fix, no pay. Call 1300 072 073." />
                <meta name="keywords" content="computer repairs Sydney, IT support Sydney, laptop repair Sydney, CCTV installation Sydney, Starlink setup Sydney, Gaming PC Sydney, TheTechDr" />
                <link rel="canonical" href="https://www.thetechdr.com.au" />
                <meta name="robots" content="index, follow" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.thetechdr.com.au" />
                <meta property="og:title" content="TheTechDr | Expert IT Support & Computer Repairs Sydney" />
                <meta property="og:description" content="Fast, reliable IT support and computer repairs across Sydney. Same-day service, no fix no pay guarantee. Call 1300 072 073." />
                <meta property="og:image" content="https://www.thetechdr.com.au/og-image.jpg" />
                <meta property="og:locale" content="en_AU" />
                <meta property="og:site_name" content="TheTechDr" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="TheTechDr | Expert IT Support & Computer Repairs Sydney" />
                <meta name="twitter:description" content="Fast, reliable IT support across Sydney. Same-day service. Call 1300 072 073." />
                <meta name="twitter:image" content="https://www.thetechdr.com.au/og-image.jpg" />
            </Helmet>

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