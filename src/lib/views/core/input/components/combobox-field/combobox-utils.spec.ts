import { describe, it, expect } from 'vitest';
import { toggleSelection, removeSelection } from './combobox-utils';

describe('toggleSelection — single mode', () => {
	it('selects from empty', () => {
		expect(toggleSelection({ currentValue: null, id: '2' })).toBe('2');
	});
	it('replaces the previous selection', () => {
		expect(toggleSelection({ currentValue: '1', id: '2' })).toBe('2');
	});
	it('re-selecting the same id keeps it selected (does not deselect)', () => {
		expect(toggleSelection({ currentValue: '2', id: '2' })).toBe('2');
	});
});

describe('toggleSelection — multiple mode', () => {
	it('always returns an array, even for one selection', () => {
		expect(toggleSelection({ currentValue: null, id: '1', multiple: true })).toEqual(['1']);
	});
	it('accumulates selections', () => {
		expect(toggleSelection({ currentValue: ['1'], id: '3', multiple: true })).toEqual(['1', '3']);
	});
	it('toggles an already-selected id off', () => {
		expect(toggleSelection({ currentValue: ['1', '3'], id: '1', multiple: true })).toEqual(['3']);
	});
	it('returns null when the last selection is toggled off', () => {
		expect(toggleSelection({ currentValue: ['1'], id: '1', multiple: true })).toBeNull();
	});
	it('normalises a single (non-array) current value into a set', () => {
		expect(toggleSelection({ currentValue: '1', id: '2', multiple: true })).toEqual(['1', '2']);
	});
});

describe('removeSelection', () => {
	it('removes an id in multiple mode', () => {
		expect(removeSelection({ currentValue: ['1', '2', '3'], id: '2', multiple: true })).toEqual([
			'1',
			'3'
		]);
	});
	it('returns null when removing the only selection', () => {
		expect(removeSelection({ currentValue: '1', id: '1' })).toBeNull();
		expect(removeSelection({ currentValue: ['1'], id: '1', multiple: true })).toBeNull();
	});
	it('is a no-op for an id that is not selected', () => {
		expect(removeSelection({ currentValue: ['1', '2'], id: '9', multiple: true })).toEqual([
			'1',
			'2'
		]);
	});
});
