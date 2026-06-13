import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('renders the demo color field and submit button', async () => {
		render(Page);

		await expect.element(page.getByText('Choose a color')).toBeInTheDocument();
		await expect.element(page.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
	});
});
