import React from 'react'
import Img from "../../assets/aboutBanner.jpeg"
import "./AboutHero.css"

const AboutHero = () => {
    return (
        <>
            <section className='about-hero'>
                <h1>About us</h1>
                <div className='about-content'>
                    <div className='about-left'>
                        <img alt='The Tech Dr' src={Img} />
                    </div>
                    <div className='about-right'>
                        <h2>Trusted Since 2010</h2>
                        <h3>Family-Owned & Experienced</h3>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutHero