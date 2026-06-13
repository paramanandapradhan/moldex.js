import { describe, it, expect } from 'vitest';
import {
	screenSize,
	handleScreenSizeUpdate,
	isSmallScreen,
	isMobileScreen
} from './screen-service';
import { ScreenSize } from '$lib/types';

describe('handleScreenSizeUpdate', () => {
	it('maps widths to the correct breakpoint, including XS (regression)', () => {
		handleScreenSizeUpdate(1500);
		expect(screenSize.size).toBe(ScreenSize.XXL);

		handleScreenSizeUpdate(1300);
		expect(screenSize.size).toBe(ScreenSize.XL);

		handleScreenSizeUpdate(1000);
		expect(screenSize.size).toBe(ScreenSize.LG);

		handleScreenSizeUpdate(800);
		expect(screenSize.size).toBe(ScreenSize.MD);

		handleScreenSizeUpdate(600);
		expect(screenSize.size).toBe(ScreenSize.SM);

		// Previously this incorrectly resolved to SM; XS must be reachable.
		handleScreenSizeUpdate(400);
		expect(screenSize.size).toBe(ScreenSize.XS);
	});

	it('ignores a zero/falsy size', () => {
		handleScreenSizeUpdate(1000);
		expect(screenSize.size).toBe(ScreenSize.LG);
		handleScreenSizeUpdate(0);
		expect(screenSize.size).toBe(ScreenSize.LG);
	});
});

describe('isSmallScreen / isMobileScreen', () => {
	it('is true for XS and SM', () => {
		handleScreenSizeUpdate(400);
		expect(isSmallScreen()).toBe(true);
		expect(isMobileScreen()).toBe(true);

		handleScreenSizeUpdate(600);
		expect(isSmallScreen()).toBe(true);
	});
	it('is false for medium and larger', () => {
		handleScreenSizeUpdate(1000);
		expect(isSmallScreen()).toBe(false);
		expect(isMobileScreen()).toBe(false);
	});
});
