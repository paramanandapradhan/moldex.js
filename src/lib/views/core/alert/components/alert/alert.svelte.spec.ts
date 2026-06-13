import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Alert from './alert.svelte';

describe('Alert — message rendering / XSS policy', () => {
	it('escapes HTML in the message by default (XSS-safe)', async () => {
		const message = '<b data-evil>bold</b>';
		render(Alert, { message });

		// The markup is shown as literal text, not parsed into a <b> element.
		await expect.element(page.getByText(message)).toBeInTheDocument();
		expect(document.querySelector('b[data-evil]')).toBeNull();
	});

	it('renders HTML only when allowHtml is explicitly enabled', async () => {
		render(Alert, { message: '<b data-safe>bold</b>', allowHtml: true });

		await expect.element(page.getByText('bold')).toBeInTheDocument();
		expect(document.querySelector('b[data-safe]')).not.toBeNull();
	});
});
