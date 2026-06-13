import { describe, it, expect } from 'vitest';
import { isDataUrl, isUrl, getFilenameFromUrl, dataUrlToBlob } from './download-service';

describe('isDataUrl', () => {
	it('accepts well-formed base64 data URLs', () => {
		expect(isDataUrl('data:image/png;base64,iVBORw0KGgo=')).toBe(true);
		expect(isDataUrl('data:text/plain;base64,SGk=')).toBe(true);
	});
	it('rejects non data URLs', () => {
		expect(isDataUrl('https://example.com/a.png')).toBe(false);
		expect(isDataUrl('data:text/plain,hello')).toBe(false); // not base64
		expect(isDataUrl('')).toBe(false);
	});
});

describe('isUrl', () => {
	it('accepts absolute URLs', () => {
		expect(isUrl('https://example.com')).toBe(true);
		expect(isUrl('http://localhost:3000/path?x=1')).toBe(true);
	});
	it('rejects strings that are not URLs', () => {
		expect(isUrl('just-a-string')).toBe(false);
		expect(isUrl('/relative/path')).toBe(false);
		expect(isUrl('')).toBe(false);
	});
});

describe('getFilenameFromUrl', () => {
	it('extracts the last path segment when it has an extension', () => {
		expect(getFilenameFromUrl('https://example.com/files/report.pdf')).toBe('report.pdf');
	});
	it('falls back to "download" when there is no file-like segment', () => {
		expect(getFilenameFromUrl('https://example.com/files/')).toBe('download');
		expect(getFilenameFromUrl('https://example.com')).toBe('download');
	});
});

describe('dataUrlToBlob', () => {
	it('decodes a data URL into a Blob with the given mime type', async () => {
		const blob = dataUrlToBlob('data:text/plain;base64,SGk=', 'text/plain');
		expect(blob).toBeInstanceOf(Blob);
		expect(blob.type).toBe('text/plain');
		expect(blob.size).toBe(2);
		expect(await blob.text()).toBe('Hi');
	});
	it('defaults to octet-stream when no mime type is provided', () => {
		const blob = dataUrlToBlob('data:application/octet-stream;base64,SGk=');
		expect(blob.type).toBe('application/octet-stream');
	});
});
