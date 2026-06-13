import { page } from '@vitest/browser/context';
import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import InputField from './input-field.svelte';

describe('InputField — rendering', () => {
	it('renders a label, placeholder and the given type', async () => {
		render(InputField, {
			label: 'Email',
			placeholder: 'you@example.com',
			type: 'email',
			name: 'email'
		});

		await expect.element(page.getByText('Email')).toBeInTheDocument();
		const input = page.getByPlaceholder('you@example.com');
		await expect.element(input).toBeInTheDocument();
		await expect.element(input).toHaveAttribute('type', 'email');
	});

	it('derives id from name and links the label to it', async () => {
		render(InputField, { label: 'First name', name: 'firstName' });
		const input = document.querySelector('input');
		expect(input?.getAttribute('id')).toBe('firstName');
		expect(input?.getAttribute('name')).toBe('firstName');
	});

	it('renders a textarea when type is "textarea"', async () => {
		render(InputField, { type: 'textarea', name: 'bio', placeholder: 'About you' });
		await expect.element(page.getByPlaceholder('About you')).toBeInTheDocument();
		expect(document.querySelector('textarea')).not.toBeNull();
		expect(document.querySelector('input')).toBeNull();
	});

	it('marks the field required on the underlying input', async () => {
		render(InputField, { label: 'Name', name: 'name', required: true });
		const input = document.querySelector('input');
		expect(input?.required).toBe(true);
	});
});

describe('InputField — interaction', () => {
	it('fires onInput as the user types', async () => {
		const onInput = vi.fn();
		render(InputField, { name: 'q', placeholder: 'type here', onInput });

		await page.getByPlaceholder('type here').fill('hello');
		expect(onInput).toHaveBeenCalled();
	});

	it('does not accept input when disabled', async () => {
		render(InputField, { name: 'q', placeholder: 'disabled', disabled: true });
		const input = document.querySelector('input') as HTMLInputElement;
		expect(input.disabled).toBe(true);
	});

	it('is not editable when readonly', async () => {
		render(InputField, { name: 'q', placeholder: 'readonly', readonly: true });
		const input = document.querySelector('input') as HTMLInputElement;
		expect(input.readOnly).toBe(true);
	});
});
