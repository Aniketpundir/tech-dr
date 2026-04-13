import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { MyContext } from '../../StoreContext';
import './Navbar.css';

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Booking Now', path: '/book-now' }
];

const handleClick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
};

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => setDrawerOpen(true);
    const closeDrawer = () => setDrawerOpen(false);

    const { setUser } = useContext(MyContext);

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
                                onClick={() => { setUser(item.label), handleClick() }}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Desktop Right */}
                <div className="navbar-right">
                    <Link to="/services" className="btn-quote">Our Services</Link>
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
                                onClick={() => { closeDrawer(), setUser(item.label), handleClick() }}
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