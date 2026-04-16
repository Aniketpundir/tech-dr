import React from 'react'
import { Helmet } from 'react-helmet-async'
import ContactPage from '../Components/ContactPage/ContactPage'
import ContactUsForm from '../Components/ContactPage/ContactUsForm/ContactUsFrom'
import SuburbsSection from '../Components/SuburbsSection/SuburbsSection'

const Contact = () => {
    return (
        <>
            <Helmet>
                <title>Contact TheTechDr | Book IT Support Sydney | 1300 072 073</title>
                <meta name="description" content="Contact TheTechDr for fast IT support and computer repairs across Sydney. Call 1300 072 073 or fill out our contact form. Same-day service available." />
                <meta name="keywords" content="contact TheTechDr, book IT support Sydney, computer repair booking Sydney, IT support phone number Sydney" />
                <link rel="canonical" href="https://www.thetechdr.com.au/contact-us" />
                <meta name="robots" content="index, follow" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.thetechdr.com.au/contact-us" />
                <meta property="og:title" content="Contact TheTechDr | Book IT Support Sydney" />
                <meta property="og:description" content="Get in touch with TheTechDr for fast IT support and computer repairs across Sydney. Call 1300 072 073." />
                <meta property="og:image" content="https://www.thetechdr.com.au/og-image.jpg" />
                <meta property="og:locale" content="en_AU" />
                <meta property="og:site_name" content="TheTechDr" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contact TheTechDr | Book IT Support Sydney" />
                <meta name="twitter:description" content="Call 1300 072 073 or fill out our form. Same-day IT support across Sydney." />
                <meta name="twitter:image" content="https://www.thetechdr.com.au/og-image.jpg" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contact TheTechDr",
                        "url": "https://www.thetechdr.com.au/contact-us",
                        "description": "Contact TheTechDr for IT support and computer repairs across Sydney.",
                        "mainEntity": {
                            "@type": "LocalBusiness",
                            "name": "TheTechDr",
                            "telephone": "+611300072073",
                            "url": "https://www.thetechdr.com.au",
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Sydney",
                                "addressRegion": "NSW",
                                "addressCountry": "AU"
                            }
                        }
                    })}
                </script>
            </Helmet>

            <ContactPage />
            <ContactUsForm />
            <SuburbsSection />
        </>
    )
}

export default Contact