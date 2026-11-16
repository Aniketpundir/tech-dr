import { cityData } from '../Components/CityData/CityData';
import { serviceDetails } from '../Components/Home_Section/Services/ServiceDetail/ServiceDetail';

export const siteOrigin = 'https://thetechdr.com.au';
export const slugify = (value) => value.toLowerCase().replace(/\s+/g, '-');
export const legacyRedirects = {
    '/computer-repair-service': '/services/mac-windows-pc-repair',
    '/cctv-setup': '/services/cctv-setup-servicing',
};

const seenSuburbs = new Map();
const locationPaths = [];
for (const [region, data] of Object.entries(cityData)) {
    const regionPath = `/suburbs-section/city/${slugify(region)}`;
    locationPaths.push(regionPath);
    for (const suburb of data.suburbs) {
        const slug = slugify(suburb);
        const path = `${regionPath}/suburbs/${slug}`;
        if (seenSuburbs.has(slug)) {
            legacyRedirects[path] = seenSuburbs.get(slug);
        } else {
            seenSuburbs.set(slug, path);
            locationPaths.push(path);
        }
    }
}

export const indexablePaths = [
    '/', '/about-us', '/contact-us', '/services', '/service-areas/', '/blog',
    ...Object.keys(serviceDetails).map((slug) => `/services/${slug}`),
    ...locationPaths,
];

export const suburbPath = (name) => seenSuburbs.get(slugify(name));
