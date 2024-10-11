
// Default timeout duration in milliseconds (60 seconds)
const DEFAULT_TIMEOUT = 60000;

/**
 * Sends a GET request to the specified URL.
 *
 * @param url - The URL to send the GET request to.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 *
 * @example
 * httpGet('https://api.example.com/data')
 *   .then((response) => console.log(response))
 *   .catch((error) => console.error('Error fetching data:', error));
 */
export async function httpGet(url: string, headers: HeadersInit = {}): Promise<any> {
    return httpRequest(url, { method: 'GET', headers });
}

/**
 * Sends a POST request with JSON data to the specified URL.
 *
 * @param url - The endpoint URL to send the POST request to.
 * @param data - The data object to be sent as the request body.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
export async function httpPost(url: string, data: Record<string, any> = {}, headers: HeadersInit = {}): Promise<any> {
    return httpRequest(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

/**
 * Sends a PUT request with JSON data to the specified URL.
 *
 * @param url - The endpoint URL to send the PUT request to.
 * @param data - The data object to be sent as the request body.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
export async function httpPut(url: string, data: Record<string, any> = {}, headers: HeadersInit = {}): Promise<any> {
    return httpRequest(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

/**
 * Sends a PATCH request with JSON data to the specified URL.
 *
 * @param url - The endpoint URL to send the PATCH request to.
 * @param data - The data object to be sent as the request body.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
export async function httpPatch(url: string, data: Record<string, any> = {}, headers: HeadersInit = {}): Promise<any> {
    return httpRequest(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
    });
}

/**
 * Sends a DELETE request to the specified URL.
 *
 * @param url - The endpoint URL to send the DELETE request to.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
export async function httpDelete(url: string, headers: HeadersInit = {}): Promise<any> {
    return httpRequest(url, { method: 'DELETE', headers });
}

/**
 * Generic function to handle HTTP requests with a timeout.
 *
 * @param url - The URL to send the request to.
 * @param options - The request options (method, headers, body, etc.).
 * @param timeout - Optional timeout duration in milliseconds. Default is 60 seconds.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request times out or if the response cannot be parsed as JSON.
 */
async function httpRequest(url: string, options: RequestInit, timeout: number = DEFAULT_TIMEOUT): Promise<any> {
    // Create an AbortController to handle request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    options.signal = controller.signal;

    try {
        const response = await fetch(url, options);

        // Check if the response is successful (status in the range 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        // Parse and return the response as JSON
        return await response.json();
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error(`Request to ${url} timed out after ${timeout / 1000} seconds.`);
        }
        throw new Error(`Failed to fetch ${url}: ${error.message}`);
    } finally {
        clearTimeout(timeoutId); // Clear the timeout to prevent memory leaks
    }
}

/**
 * Fetches text content from a given URL with a default timeout of 60 seconds.
 * 
 * This function sends a GET request to the provided URL and returns the response as text.
 * It throws an error if the request fails or the response cannot be read as text.
 * The request will be aborted if it exceeds the default timeout of 60 seconds.
 * 
 * @param url - The URL to fetch the text content from.
 * @param timeout - Optional. The timeout duration in milliseconds. Default is 60 seconds (60000ms).
 * @returns A promise that resolves to the text content of the URL.
 * 
 * @throws An error if the fetch request fails or if the request times out.
 * 
 * @example
 * fetchText('https://example.com/data.txt').then((text) => {
 *     console.log(text); // Outputs the text content of the file.
 * }).catch((error) => console.error('Failed to fetch text:', error));
 */
export async function fetchText(url: string, timeout: number = DEFAULT_TIMEOUT): Promise<string> {
    // Create an AbortController to handle request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });

        // Check if the response is successful (status in the range 200–299)
        if (!response.ok) {
            throw new Error(`Failed to fetch text. Status: ${response.status} ${response.statusText}`);
        }

        // Return the response as text
        return await response.text();
    } catch (error: any) {
        if (error.name === 'AbortError') {
            throw new Error(`Request to ${url} timed out after ${timeout / 1000} seconds.`);
        }
        console.error('Error fetching text from URL:', error);
        throw new Error(`Failed to fetch text from ${url}: ${error.message}`);
    } finally {
        clearTimeout(timeoutId); // Clear the timeout to prevent memory leaks
    }
}
