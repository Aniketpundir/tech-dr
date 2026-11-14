const PAGE_SIZE = 10;

export function sortBlogCards(cards) {
    const timestamp = (card) => Date.parse(card.querySelector('time[datetime]')?.getAttribute('datetime')) || 0;
    return [...cards].sort((first, second) => timestamp(second) - timestamp(first));
}

// Soro recreates its list when returning from an article. Watch for that list,
// keeping its original card nodes and click handlers intact.
export function attachBlogPagination(container) {
    let list = null;
    let cards = [];
    let page = 1;
    let navigation = null;

    const render = () => {
        const totalPages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));
        page = Math.min(page, totalPages);
        cards.forEach((card, index) => {
            card.hidden = index < (page - 1) * PAGE_SIZE || index >= page * PAGE_SIZE;
        });
        navigation?.remove();
        navigation = null;
        if (totalPages < 2) return;

        navigation = document.createElement('nav');
        navigation.className = 'soro-page-controls';
        navigation.setAttribute('aria-label', 'Blog pages');
        const button = (label, target, disabled = false) => {
            const element = document.createElement('button');
            element.type = 'button';
            element.textContent = label;
            element.disabled = disabled;
            if (typeof label === 'number') {
                element.setAttribute('aria-label', `Page ${label}`);
                if (target === page) element.setAttribute('aria-current', 'page');
            }
            element.addEventListener('click', () => {
                observer.disconnect();
                page = target;
                render();
                watch();
                navigation?.querySelector('[aria-current="page"]')?.focus();
                list.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            navigation.appendChild(element);
        };
        button('Previous', page - 1, page === 1);
        for (let number = 1; number <= totalPages; number += 1) button(number, number);
        button('Next', page + 1, page === totalPages);
        list.after(navigation);
    };

    const update = () => {
        const nextList = container.querySelector('.soro-blog-list');
        if (nextList === list) return;
        observer.disconnect();
        navigation?.remove();
        navigation = null;
        list = nextList;
        if (list) {
            cards = sortBlogCards(Array.from(list.querySelectorAll('.soro-blog-card')));
            cards.forEach((card) => list.appendChild(card));
            render();
        }
        watch();
    };
    const observer = new MutationObserver(update);
    const watch = () => observer.observe(container, { childList: true, subtree: true });
    update();
    watch();

    return () => {
        observer.disconnect();
        navigation?.remove();
        cards.forEach((card) => { card.hidden = false; });
    };
}
