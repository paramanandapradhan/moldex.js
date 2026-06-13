import { describe, it, expect } from 'vitest';
import {
	getFilenameExtension,
	formatFileSize,
	getExtFromFileType,
	ellipsisFileNameAtCenter,
	readDataUrlAsFile,
	convertBufferToFile
} from './file-service';

describe('getFilenameExtension', () => {
	it('splits name and extension', () => {
		expect(getFilenameExtension('example.txt')).toEqual({ name: 'example', ext: 'txt' });
	});
	it('keeps dots in the base name and uses the last segment as extension', () => {
		expect(getFilenameExtension('archive.tar.gz')).toEqual({ name: 'archive.tar', ext: 'gz' });
	});
	it('returns undefined extension when there is none', () => {
		expect(getFilenameExtension('README')).toEqual({ name: 'README', ext: undefined });
	});
	it('handles empty input', () => {
		expect(getFilenameExtension('')).toEqual({ name: '', ext: undefined });
	});
});

describe('formatFileSize', () => {
	it('formats bytes below 1 KB', () => {
		expect(formatFileSize(0)).toBe('0 Bytes');
		expect(formatFileSize(512)).toBe('512 Bytes');
	});
	it('formats KB, MB and GB', () => {
		expect(formatFileSize(1024)).toBe('1.00 KB');
		expect(formatFileSize(1024 * 1024)).toBe('1.00 MB');
		expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 GB');
	});
	it('defaults to zero when no argument is given', () => {
		expect(formatFileSize()).toBe('0 Bytes');
	});
});

describe('getExtFromFileType', () => {
	it('maps known mime types to extensions', () => {
		expect(getExtFromFileType('image/png')).toBe('png');
		expect(getExtFromFileType('application/pdf')).toBe('pdf');
	});
	it('returns null for unknown mime types', () => {
		expect(getExtFromFileType('application/unknown')).toBeNull();
	});
});

describe('ellipsisFileNameAtCenter', () => {
	it('returns the name unchanged when within the limit', () => {
		expect(ellipsisFileNameAtCenter('short.txt')).toBe('short.txt');
	});
	it('truncates long names with an extension', () => {
		const result = ellipsisFileNameAtCenter('a-very-long-document-name.pdf');
		expect(result).toContain('…');
		expect(result.endsWith('.pdf')).toBe(true);
		expect(result.length).toBeLessThan('a-very-long-document-name.pdf'.length);
	});
	it('truncates long names without an extension (regression)', () => {
		const original = 'averylongfilenamewithoutanextension';
		const result = ellipsisFileNameAtCenter(original);
		// Must not duplicate or echo back the whole original name.
		expect(result.length).toBeLessThan(original.length);
		expect(result).toContain('…');
		expect(result.startsWith('avery')).toBe(true);
	});
	it('handles empty/undefined input', () => {
		expect(ellipsisFileNameAtCenter('')).toBe('');
		expect(ellipsisFileNameAtCenter(undefined as unknown as string)).toBe('');
	});
});

describe('readDataUrlAsFile', () => {
	it('decodes a base64 data URL into a File with the correct type', async () => {
		// "Hi" base64-encoded
		const dataUrl = 'data:text/plain;base64,SGk=';
		const file = await readDataUrlAsFile(dataUrl, 'greeting.txt');
		expect(file).toBeInstanceOf(File);
		expect(file.name).toBe('greeting.txt');
		expect(file.type).toBe('text/plain');
		expect(file.size).toBe(2);
	});
	it('falls back to octet-stream when the mime type cannot be derived', async () => {
		const dataUrl = 'data:;base64,SGk=';
		const file = await readDataUrlAsFile(dataUrl);
		expect(file.type).toBe('application/octet-stream');
		expect(file.name).toBe('file');
	});
});

describe('convertBufferToFile', () => {
	it('wraps an ArrayBuffer in a File', async () => {
		const buffer = new Uint8Array([1, 2, 3, 4]).buffer;
		const file = await convertBufferToFile(buffer, 'data.bin', 'application/octet-stream');
		expect(file).toBeInstanceOf(File);
		expect(file.name).toBe('data.bin');
		expect(file.type).toBe('application/octet-stream');
		expect(file.size).toBe(4);
	});
});
