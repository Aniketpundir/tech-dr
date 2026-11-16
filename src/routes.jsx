import { Route, Navigate, createRoutesFromElements } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Services from './Components/Home_Section/Services/Services';
import ServiceAreas from './Pages/ServiceAreas';
import CityPage from './Components/CityData/CityPage';
import SuburbPage from './Components/SuburbPage/SuburbPage';
import ServiceDetail from './Components/Home_Section/Services/ServiceDetail/ServiceDetail';
import BookingForm from './Pages/BookingForm/BookingForm';
import BlogPage from './Pages/BlogPage';
import NotFound from './Pages/NotFound';
import { legacyRedirects } from './seo/catalog';

export const appRoutes = createRoutesFromElements(
    <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/contact-us' element={<Contact />} />
        <Route path='/services' element={<Services />} />
        <Route path='/services/:slug' element={<ServiceDetail />} />
        <Route path='/book-now' element={<BookingForm />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/service-areas' element={<ServiceAreas />} />
        <Route path='/suburbs-section' element={<ServiceAreas />} />
        <Route path='/suburbs-section/city/:slug' element={<CityPage />} />
        <Route path='/suburbs-section/city/:slug/suburbs/:suburbSlug' element={<SuburbPage />} />
        {Object.entries(legacyRedirects).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}
        <Route path='*' element={<NotFound />} />
    </Route>
);
