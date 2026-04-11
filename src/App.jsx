import React from 'react'
import "./App.css"
import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Layout from './Components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Services from './Components/Home_Section/Services/Services';
import SuburbsSection from './Components/SuburbsSection/SuburbsSection';
import CityPage from './Components/CityData/CityPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path='/services' element={<Services />} />
            <Route path='/suburbs-section' element={<SuburbsSection />} />
            <Route path="/suburbs-section/city/:slug" element={<CityPage />} />
        </Route>
    )
)

const App = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App