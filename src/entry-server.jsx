import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MyContext } from './StoreContext';
import { appRoutes } from './routes';
export { indexablePaths, legacyRedirects, siteOrigin } from './seo/catalog';

export function render(path) {
    const router = createMemoryRouter(appRoutes, { initialEntries: [path] });
    try {
        return renderToString(
            <MyContext.Provider value={{ user: 'Home', setUser: () => {} }}>
                <HelmetProvider><RouterProvider router={router} /></HelmetProvider>
            </MyContext.Provider>
        );
    } finally {
        router.dispose();
    }
}
