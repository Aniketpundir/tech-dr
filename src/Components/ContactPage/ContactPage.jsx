import './ContactPage.css';
import banner from "../../assets/banner.webp"

const contactItems = [
    {
        title: 'Address',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="12" cy="10" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.8" />
            </svg>
        ),
        content: <p>13 Bridge St, Epping NSW 2121,<br />Australia</p>
    },
    {
        title: 'Working Hours',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7.5v5l3.2 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        content: <p>Mon-Fri: 6:00 am–11:00 pm,<br />Sat: 6:00 am–9:30 pm,<br />Sun: 9:00 am–5:00 pm</p>
    },
    {
        title: 'Phone',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 16.2v2.7a1.8 1.8 0 0 1-2 1.8A17.8 17.8 0 0 1 11.2 18a17.3 17.3 0 0 1-5.3-5.3A17.8 17.8 0 0 1 3.2 5 1.8 1.8 0 0 1 5 3h2.7a1.8 1.8 0 0 1 1.8 1.5c.1.8.3 1.6.7 2.4a1.8 1.8 0 0 1-.4 1.9L8.6 10a14.5 14.5 0 0 0 5.4 5.4l1.2-1.2a1.8 1.8 0 0 1 1.9-.4c.8.4 1.6.6 2.4.7A1.8 1.8 0 0 1 21 16.2Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        content: <a href="tel:1300072073">1300 072 073</a>
    }
];

const socialLinks = [
    {
        label: 'Facebook', href: '#',
        icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3a5 5 0 0 0-5 5v3H6v4h3v4h4v-8h3.2l.8-4H13V9a1 1 0 0 1 1-1Z" fill="currentColor" /></svg>
    },
    {
        label: 'LinkedIn', href: '#',
        icon: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5H3.8V20h2.7V8.5Zm.2-3.5a1.7 1.7 0 1 0-3.4 0 1.7 1.7 0 0 0 3.4 0ZM20.2 13.2c0-3.1-1.7-4.8-4.2-4.8-1.9 0-2.8 1.1-3.3 1.9V8.5H10V20h2.7v-6.2c0-1.6.3-3.1 2.3-3.1 2 0 2 1.8 2 3.2V20h2.7v-6.8Z" fill="currentColor" /></svg>
    },
    {
        label: 'Instagram', href: '#',
        icon: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" /></svg>
    }
];

const mapQuery = '13 Bridge St, Epping NSW 2121, Australia';
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`;

const ContactPage = () => {

    return (
        <section className="contact-page">
            <div>
                <div className="contact-page-shell">

                    {/* LEFT */}
                    <div className="contact-lefts">
                        <div className="contact-info-card">
                            {contactItems.map((item) => (
                                <div className="contact-info-block" key={item.title}>
                                    <h2>{item.title}</h2>
                                    <div className="contact-info-row">
                                        <span className="contact-icon">{item.icon}</span>
                                        <div className="contact-info-content">{item.content}</div>
                                    </div>
                                </div>
                            ))}

                            <div className="contact-info-block">
                                <h2>Share:</h2>
                                <div className="contact-share-row">
                                    {socialLinks.map((item) => (
                                        <a key={item.label} href={item.href} className="contact-social-link" aria-label={item.label}>
                                            {item.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* EMBEDDED MAP */}
                        <div className="contact-map-frame">
                            <iframe
                                title="The Tech Dr location on Google Maps"
                                src={mapEmbedSrc}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Image */}
                    <div className="contact-image-panel">
                        <img src={banner} alt="Contact section visual" />
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ContactPage;