import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <main className="service-areas-intro">
        <Helmet>
            <title>Page Not Found | TheTechDr</title>
            <meta name="robots" content="noindex, follow" />
        </Helmet>
        <h1>Page not found</h1>
        <p>The page you requested is unavailable. Browse our <Link to="/services">services</Link> or <Link to="/service-areas/">service areas</Link> to find what you need.</p>
    </main>
);

export default NotFound;
