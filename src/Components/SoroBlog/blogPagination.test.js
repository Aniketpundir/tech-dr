import { test } from 'node:test';
import assert from 'node:assert/strict';
import { attachBlogPagination, sortBlogCards } from './blogPagination.js';

const card = (date) => ({
    date,
    hidden: false,
    querySelector: () => ({ getAttribute: () => date }),
});

test('newest dates come first, with missing dates last', () => {
    const cards = [card('2026-01-01'), card(null), card('2026-11-14')];
    assert.deepEqual(sortBlogCards(cards).map((item) => item.date), ['2026-11-14', '2026-01-01', null]);
    assert.equal(cards[0].date, '2026-01-01');
});

test('10 cards per page, final partial page, article return, and cleanup', () => {
    const previousDocument = globalThis.document;
    const previousObserver = globalThis.MutationObserver;
    let onMutation;
    let disconnected = false;
    let nav;
    let currentList;
    const makeList = (count) => ({
        cards: Array.from({ length: count }, (_, index) => card(`2026-10-${String(index + 1).padStart(2, '0')}`)),
        querySelectorAll() { return [...this.cards]; },
        appendChild(item) { this.cards = this.cards.filter((entry) => entry !== item); this.cards.push(item); },
        after(element) { nav = element; },
        scrollIntoView() {},
    });
    globalThis.MutationObserver = class {
        constructor(callback) { onMutation = callback; }
        disconnect() { disconnected = true; }
        observe() { disconnected = false; }
    };
    globalThis.document = {
        createElement: () => ({
            children: [], attributes: {},
            setAttribute(name, value) { this.attributes[name] = value; },
            addEventListener(name, handler) { this[name] = handler; },
            appendChild(child) { this.children.push(child); },
            remove() { if (nav === this) nav = null; },
            querySelector() { return this.children.find((child) => child.attributes['aria-current'] === 'page'); },
            focus() {},
        }),
    };
    try {
        currentList = makeList(23);
        const cleanup = attachBlogPagination({ querySelector: () => currentList });
        const visible = () => currentList.cards.filter((item) => !item.hidden);
        const next = () => nav.children.find((child) => child.textContent === 'Next');
        assert.equal(visible().length, 10);
        assert.equal(visible()[0].date, '2026-10-23');
        assert.equal(nav.children[0].disabled, true);
        next().click();
        assert.equal(visible().length, 10);
        assert.equal(visible()[0].date, '2026-10-13');
        next().click();
        assert.equal(visible().length, 3);
        assert.equal(next().disabled, true);
        currentList = null;
        onMutation();
        assert.equal(nav, null);
        currentList = makeList(23);
        onMutation();
        assert.equal(visible().length, 3);
        cleanup();
        assert.equal(disconnected, true);
        assert.equal(nav, null);
        assert.equal(visible().length, 23);
        currentList = makeList(5);
        const cleanupShort = attachBlogPagination({ querySelector: () => currentList });
        assert.equal(visible().length, 5);
        assert.equal(nav, null);
        cleanupShort();
    } finally {
        globalThis.document = previousDocument;
        globalThis.MutationObserver = previousObserver;
    }
});
