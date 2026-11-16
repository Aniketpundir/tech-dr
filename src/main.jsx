import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MyProvider } from './StoreContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

const rootElement = document.getElementById('root');
const app = (
  <MyProvider>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </MyProvider>
);

// React owns the live metadata. Remove the static copies before mounting so a
// hosting fallback or subsequent navigation cannot leave two canonical tags.
document.head.querySelectorAll('[data-prerender-head]').forEach((tag) => tag.remove());
const normalizePath = (value) => value.replace(/\/+$/, '') || '/';
const prerenderPath = rootElement.getAttribute('data-prerender-path');
if (rootElement.hasChildNodes() && prerenderPath &&
    normalizePath(prerenderPath) === normalizePath(window.location.pathname)) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
