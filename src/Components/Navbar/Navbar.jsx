import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import './Navbar.css';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    // { label: 'Reviews', path: '/reviews' },
    // { label: 'Service Areas', path: '/service-areas' },
    { label: 'Contact Us', path: '/contact' },
];

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    return (
        <>
            <nav className="navbar">
                {/* Logo */}
                <div className="navbar-logo">
                    <img src={logo} alt="The Tech Dr" />
                </div>

                {/* Desktop Links */}
                <ul className="navbar-links">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Desktop Right */}
                <div className="navbar-right">
                    <button className="btn-quote">GET A FREE QUOTE</button>
                </div>

                {/* Hamburger — mobile only */}
                <button
                    className={`navbar-hamburger${drawerOpen ? ' open' : ''}`}
                    onClick={openDrawer}
                    aria-label="Open menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

            </nav>
            <div className='orage-line'></div>

            {/* Overlay */}
            <div
                className={`navbar-overlay${drawerOpen ? ' visible' : ''}`}
                onClick={closeDrawer}
            />

            {/* Mobile Drawer */}
            <div className={`navbar-drawer${drawerOpen ? ' open' : ''}`}>
                <div className="drawer-header">
                    <img src={logo} alt="The Tech Dr" />
                    <button className="drawer-close" onClick={closeDrawer} aria-label="Close menu">
                        ✕
                    </button>
                </div>

                <ul className="drawer-links">
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => isActive ? 'active' : ''}
                                onClick={closeDrawer}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Navbar;