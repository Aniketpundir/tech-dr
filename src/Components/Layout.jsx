import React from 'react'
import TopBar from "../Components/TopBar/TopBar"
import Navbar from "../Components/Navbar/Navbar"
import Footer from "../Components/Footer/Footer"
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <TopBar />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout