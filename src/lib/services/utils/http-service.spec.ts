import { describe, it, expect, vi, afterEach } from 'vitest';
import { httpGet, httpPost, httpPut, httpPatch, httpDelete, fetchText } from './http-service';

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

function mockJsonResponse(body: unknown, ok = true, status = 200, statusText = 'OK') {
	return vi.fn().mockResolvedValue({
		ok,
		status,
		statusText,
		json: async () => body
	});
}

describe('http verbs', () => {
	it('httpGet returns parsed JSON', async () => {
		vi.stubGlobal('fetch', mockJsonResponse({ hello: 'world' }));
		expect(await httpGet('https://api.test/x')).toEqual({ hello: 'world' });
	});

	it('httpPost sends JSON body and Content-Type header', async () => {
		const fetchMock = mockJsonResponse({ id: 1 });
		vi.stubGlobal('fetch', fetchMock);

		const result = await httpPost('https://api.test/x', { name: 'a' }, { 'X-Custom': '1' });
		expect(result).toEqual({ id: 1 });

		const [, options] = fetchMock.mock.calls[0];
		expect(options.method).toBe('POST');
		expect(options.body).toBe(JSON.stringify({ name: 'a' }));
		expect(options.headers['Content-Type']).toBe('application/json');
		expect(options.headers['X-Custom']).toBe('1');
	});

	it('httpPut / httpPatch use the right method', async () => {
		const putMock = mockJsonResponse({});
		vi.stubGlobal('fetch', putMock);
		await httpPut('https://api.test/x', { a: 1 });
		expect(putMock.mock.calls[0][1].method).toBe('PUT');

		const patchMock = mockJsonResponse({});
		vi.stubGlobal('fetch', patchMock);
		await httpPatch('https://api.test/x', { a: 1 });
		expect(patchMock.mock.calls[0][1].method).toBe('PATCH');
	});

	it('httpDelete uses the DELETE method', async () => {
		const delMock = mockJsonResponse({ ok: true });
		vi.stubGlobal('fetch', delMock);
		await httpDelete('https://api.test/x');
		expect(delMock.mock.calls[0][1].method).toBe('DELETE');
	});

	it('throws on non-2xx responses', async () => {
		vi.stubGlobal('fetch', mockJsonResponse(null, false, 404, 'Not Found'));
		await expect(httpGet('https://api.test/missing')).rejects.toThrow(/404/);
	});

	it('wraps network failures in a descriptive error', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('boom')));
		await expect(httpGet('https://api.test/x')).rejects.toThrow(/Failed to fetch/);
	});

	it('reports a timeout when the request is aborted', async () => {
		const abortError = new Error('aborted');
		abortError.name = 'AbortError';
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError));
		await expect(httpGet('https://api.test/slow')).rejects.toThrow(/timed out/);
	});
});

describe('fetchText', () => {
	it('returns response text on success', async () => {
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue({
					ok: true,
					status: 200,
					statusText: 'OK',
					text: async () => 'plain body'
				})
		);
		expect(await fetchText('https://api.test/file.txt')).toBe('plain body');
	});

	it('throws on a failed response', async () => {
		vi.spyOn(console, 'error').mockImplementation(() => {});
		vi.stubGlobal(
			'fetch',
			vi
				.fn()
				.mockResolvedValue({
					ok: false,
					status: 500,
					statusText: 'Server Error',
					text: async () => ''
				})
		);
		await expect(fetchText('https://api.test/file.txt')).rejects.toThrow(/Failed to fetch text/);
	});
});
