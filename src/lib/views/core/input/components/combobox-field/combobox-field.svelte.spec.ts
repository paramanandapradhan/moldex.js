import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComboboxField from './combobox-field.svelte';

const items = [
	{ _id: '1', name: 'Apple' },
	{ _id: '2', name: 'Banana' },
	{ _id: '3', name: 'Cherry' }
];

describe('ComboboxField — opening', () => {
	it('opens the dropdown on click and lists items (portalled to body)', async () => {
		render(ComboboxField, { items, name: 'fruit' });

		await page.getByRole('combobox').click();

		await expect.element(page.getByRole('listbox')).toBeInTheDocument();
		await expect.element(page.getByText('Apple')).toBeInTheDocument();
		await expect.element(page.getByText('Banana')).toBeInTheDocument();

		// The dropdown is portalled to <body>, so it must be a direct child of body
		// (this is what makes it escape an ancestor dialog's transform/overflow).
		const listbox = document.getElementById('options');
		expect(listbox?.parentElement).toBe(document.body);
	});

	it('shows an empty state when there are no items', async () => {
		render(ComboboxField, { items: [], name: 'empty', emptyMessage: 'Nothing here' });
		await page.getByRole('combobox').click();
		await expect.element(page.getByText('Nothing here')).toBeInTheDocument();
	});
});

// NOTE: selection logic (single/multiple toggle, value shape, chip removal) is
// covered deterministically in combobox-utils.spec.ts — clicking inside the
// virtualized list is intentionally not asserted here to keep the browser suite
// stable.

describe('ComboboxField — search', () => {
	it('filters items by the search text', async () => {
		render(ComboboxField, {
			items,
			name: 'fruit',
			hasDropdownHeader: true,
			hasDropdownHeaderSearch: true
		});

		await page.getByRole('combobox').click();
		await page.getByPlaceholder('Search...').fill('ban');

		await expect.element(page.getByText('Banana')).toBeInTheDocument();
		await expect.element(page.getByText('Apple')).not.toBeInTheDocument();
	});
});

describe('ComboboxField — security', () => {
	it('escapes HTML in the displayed selection (no XSS via {@html})', async () => {
		(window as unknown as { __xss?: boolean }).__xss = false;
		const malicious = [{ _id: 'x', name: `<img src=x onerror="window.__xss=true">` }];

		render(ComboboxField, { items: malicious, name: 'xss' });
		await page.getByRole('combobox').click();
		await page.getByText(malicious[0].name).click({ force: true });

		// Give any (wrongly) injected <img> a chance to fire its onerror.
		await new Promise((r) => setTimeout(r, 50));
		expect((window as unknown as { __xss?: boolean }).__xss).toBe(false);
		// No real <img> element should have been injected into the display.
		expect(document.querySelector('[role="combobox"] ~ * img, .text-transparent img')).toBeNull();
	});
});
