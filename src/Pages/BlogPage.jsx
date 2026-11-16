import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './BlogPage.css';
import { attachBlogPagination } from '../Components/SoroBlog/blogPagination';
import '../Components/SoroBlog/blogPagination.css';

const EMBED_URL = 'https://app.trysoro.com/api/embed/889e9ec0-f43d-43ec-98c1-26f342ce7dae';

const BlogPage = () => {
    const containerRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const removePagination = attachBlogPagination(container);
        const script = document.createElement('script');
        script.src = EMBED_URL;
        script.defer = true;
        script.onerror = () => setHasError(true);
        // Avoid a duplicate script request during StrictMode's initial effect replay.
        const timer = window.setTimeout(() => document.body.appendChild(script), 0);

        return () => {
            window.clearTimeout(timer);
            removePagination();
            script.onerror = null;
            script.remove();
            container.replaceChildren();
        };
    }, [attempt]);

    const retry = () => {
        setHasError(false);
        setAttempt((current) => current + 1);
    };

    return (
        <main className="blog-page">
            <Helmet>
                <title>Blog | TheTechDr</title>
                <meta name="description" content="Read the latest technology tips, computer care advice and updates from TheTechDr." />
                <link rel="canonical" href="https://thetechdr.com.au/blog" />
            </Helmet>

            <header className="blog-page-header">
                <h1>Our Blog</h1>
                <p>Technology tips, helpful advice and the latest updates from TheTechDr.</p>
            </header>

            <section className="blog-page-content" aria-label="Blog articles">
                {hasError && (
                    <div className="blog-page-error" role="alert">
                        <p>We couldn't load the blog. Please try again.</p>
                        <button type="button" onClick={retry}>Try again</button>
                    </div>
                )}
                <div id="soro-blog" ref={containerRef} />
            </section>
        </main>
    );
};

export default BlogPage;
