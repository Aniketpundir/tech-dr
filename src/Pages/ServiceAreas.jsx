import { Helmet } from 'react-helmet-async';
import SuburbsSection from '../Components/SuburbsSection/SuburbsSection';
import './ServiceAreas.css';

const ServiceAreas = () => (
    <main className="service-areas-page">
        <Helmet>
            <title>Service Areas | IT Support Across Sydney | TheTechDr</title>
            <meta name="description" content="Find TheTechDr IT support and computer repairs in your Sydney region. Browse our service areas and local suburbs, or call 1300 072 073 to book." />
            <link rel="canonical" href="https://thetechdr.com.au/service-areas/" />
            <meta name="robots" content="index, follow" />
        </Helmet>
        <header className="service-areas-intro">
            <h1>IT Support &amp; Computer Repairs Across Sydney</h1>
            <p>
                TheTechDr helps homes and businesses across Sydney with computer repairs,
                Wi-Fi and network setup, data recovery, CCTV and more. Choose your region
                below to explore the suburbs we cover and local services available.
            </p>
            <p>
                Not sure which region to choose? Call <a href="tel:1300072073">1300 072 073</a> to
                check service availability at your address.
            </p>
        </header>
        <SuburbsSection />
    </main>
);

export default ServiceAreas;
