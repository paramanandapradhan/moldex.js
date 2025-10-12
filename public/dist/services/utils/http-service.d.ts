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
export declare function httpGet(url: string, headers?: HeadersInit): Promise<any>;
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
export declare function httpPost(url: string, data?: Record<string, any>, headers?: HeadersInit): Promise<any>;
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
export declare function httpPut(url: string, data?: Record<string, any>, headers?: HeadersInit): Promise<any>;
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
export declare function httpPatch(url: string, data?: Record<string, any>, headers?: HeadersInit): Promise<any>;
/**
 * Sends a DELETE request to the specified URL.
 *
 * @param url - The endpoint URL to send the DELETE request to.
 * @param headers - Optional headers to include in the request.
 * @returns A promise that resolves to the JSON response from the server.
 *
 * @throws An error if the request fails or the response cannot be parsed as JSON.
 */
export declare function httpDelete(url: string, headers?: HeadersInit): Promise<any>;
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
export declare function fetchText(url: string, timeout?: number): Promise<string>;
