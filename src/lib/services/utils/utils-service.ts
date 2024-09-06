import { BROWSER } from 'esm-env'
import { toDate } from '../date/date-service';


declare const window: any;

const KEY_GEO_INFO = 'geo.info';

export const FILE_VIEWER_HOST = 'https://viewer.cloudparker.com';

export const CODE_FILE_EXTENTIONS = [
    "java", "js", "ts", "json", "c", "cpp", "cs", "py", "ts", "php", "rb", "swift", "go",
    "rs", "kt", "scala", "pl", "lua", "hs", "sh", "ps1", "dart", "jl", "m", "f90", "txt",
    "r", "groovy", "asm", "pas", "ada", "sql", "md", "html", "css", "xml", "yaml", "xml",
    "bat",
]

export const ACCEPT_IMAGE_FILES: string = ".png,.PNG,.jpg,.jpg,.jepg,.JPEG,.webp,.WEBP";

export function random(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function openFilePicker(opt: { accept?: string, multiple?: boolean }): Promise<File | File[]> {
    return new Promise(resolve => {
        let input: HTMLInputElement = document.createElement('input');
        input.type = 'file';
        input.multiple = opt.multiple || false;
        input.accept = opt.accept || ACCEPT_IMAGE_FILES;
        input.onchange = _ => {
            let files: File[] = Array.from(input.files as any);
            if (opt.multiple) {
                resolve(files);
            }
            else {
                resolve(files[0]);
            }
            document.body.removeChild(input);
        };
        input.style.display = 'none';
        document.body.appendChild(input);
        input.click();
    });
}


/**
 * Default quality 1.0
 * @param opt 
 * @returns 
 */
export function resizeImage(opt: {
    file: File,
    width: number,
    height?: number,
    fileName?: string,
    quality?: number, // 1.0
    type?: string,
}): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(opt.file);
        reader.onload = (event: any) => {
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
                const elem = document.createElement('canvas');
                let width = opt.width;
                let height = opt.height || opt.width;

                elem.width = width;
                elem.height = height;
                const ctx: CanvasRenderingContext2D | null = elem.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.canvas.toBlob((blob: any) => {
                        const f = new File([blob], opt.fileName || opt.file
                            .name, {
                            type: opt.type || 'image/webp',
                            lastModified: Date.now()
                        });
                        resolve(f);
                    }, opt.type || 'image/webp', opt.quality ? (opt.quality / 100) : 0.8);
                }
            },
                reader.onerror = error => console.log(error);
        };
    })
}


export async function downloadURI(uri: string, name: string): Promise<void> {
    const res = await fetch(uri);
    const link = document.createElement("a");
    link.download = name;
    link.href = URL.createObjectURL(await res.blob());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export async function downloadFile(file: File): Promise<void> {
    const link = document.createElement("a");
    link.download = file.name;
    link.href = URL.createObjectURL(file);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadBlob(blob: Blob, name: string): Promise<void> {
    return downloadFile(new File([blob], name));
}


export async function fileToDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64data = reader.result as string;
            //console.log(base64data);
            resolve(base64data);
        }
        reader.readAsDataURL(file);
    })
}

export async function fileToText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            const text = reader.result as string;
            //console.log(base64data);
            resolve(text);
        }
        reader.readAsText(file);
    })
}

export async function fileToBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result as ArrayBuffer);
        }
        reader.readAsArrayBuffer(file);
    })
}



export async function fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            var imgObj = new Image();
            imgObj.src = reader.result as string;
            imgObj.onload = () => {
                resolve(imgObj);
            }
        }
        reader.readAsDataURL(file);
    })
}

export async function dataUrlToImage(base64: string): Promise<any> {
    return new Promise((resolve, reject) => {
        var imgObj = new Image();
        imgObj.src = base64;
        imgObj.onload = () => {
            resolve(imgObj);
        }
    })
}

export function stripBase64(data: string): string {
    if (data) {
        return data.split(',')[1];
    }
    return data;
}

/**
* Function to download content from a given URL and convert it to a Base64-encoded string.
* @param url - The URL to download the content from.
* @returns A promise that resolves to the Base64-encoded string of the downloaded content.
*/
export async function urlToBase64(url: string,): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        const base64Content = btoa(
            new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return base64Content;
    } catch (error) {
        console.error('Error downloading or converting content:', error);
        throw error;
    }
}

export function urlToFile(url: string, givenFileName?: string, givenMimeType?: string): Promise<File> {
    return dataUrlToFile(url, givenFileName, givenMimeType);
}

export function dataUrlToFile(url: string, givenFileName?: string, givenMimeType?: string): Promise<File> {
    return (fetch(url)
        .then(async (res) => {
            // Get Content-Disposition header and extract filename
            const contentDisposition = res.headers.get('Content-Disposition');
            let fileName: string = "";

            if (contentDisposition) {
                // Try to extract filename from the Content-Disposition header
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    fileName = filenameMatch[1].replace(/['"]/g, '');
                }
            }

            // Fallback to filename from URL if Content-Disposition is missing or doesn't contain filename
            if (!fileName) {
                const urlParts = url.split('/');
                fileName = urlParts[urlParts.length - 1] || "";
            }

            // Get Content-Type header (MIME type)
            const mimeType: string = res.headers.get('Content-Type') || '';
            const buffer = await res.arrayBuffer();
            return { buffer, fileName, mimeType };
        })
        .then(({ buffer, fileName, mimeType }) => {
            return new File([buffer], givenFileName || fileName, {
                type: givenMimeType || mimeType
            });
        })
    );
}

export async function bufferToFile(buffer: ArrayBuffer, filename: string, mimeType: string): Promise<File> {
    return new File([buffer], filename, {
        type: mimeType
    });
}

export async function postData(url: string = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export function fileNameAndExt(filename: string): { name: string, ext: string | undefined } {
    let arr: Array<string> = (filename || '').split('.');
    let ext = arr.pop();
    let name = arr.join('.');
    return { name, ext };
}

export function isValidateEmail(email: string) {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(String(email).toLowerCase());
}

export function isValidURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export function mailto({ to, body = '', subject = '' }: { to: string, body: string, subject: string }) {
    var uri = `mailto:${to || ''}?subject=${encodeURIComponent(subject || '')}&body=${encodeURIComponent(body || '')}`;
    window.open(uri);
}

export function copyText(str: string) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    if (navigator.clipboard) {
        navigator.clipboard.writeText(str);
    } else {
        document.execCommand('copy', false);
    }
    document.body.removeChild(el);
};

export function copyRichText(node: HTMLElement) {
    if (BROWSER) {
        let r = document.createRange();
        r.selectNode(node);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(r);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }
}

export function download(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type: type || 'application/octet-stream' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

export function formatString(str: string, ...args: any[]) {
    var formatted = str;
    for (var i = 0; i < args.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, args[i]);
    }
    return formatted;
}

export function fileSizeString(size: number): string {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return parseInt((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function delay(mills: number = 0) {
    return new Promise((resolve: any) => {
        setTimeout(() => {
            resolve();
        }, mills)
    });
}


export function sort<T>({ array, field, desc, isDate }: { array: T[], field?: string, desc?: boolean, isDate?: boolean }) {
    return array.sort((a: any, b: any) => {
        let valA = typeof a === 'object' && field ? a[field] : a;
        let valB = typeof b === 'object' && field ? b[field] : b;

        if (isDate) {
            valA = toDate(valA);
            valB = toDate(valB);
        } else {
            // Case-insensitive string comparison
            if (typeof valA === 'string') valA = valA.toLowerCase();
            if (typeof valB === 'string') valB = valB.toLowerCase();
        }

        if (valA < valB) {
            return desc ? 1 : -1;
        } else if (valA > valB) {
            return desc ? -1 : 1;
        }
        return 0;
    });
}



export function vibrate(value: number | number[] = 20) {
    if (window?.navigator?.vibrate) {
        window.navigator.vibrate(value);
    }
}

export function playClickEffect() {
    vibrate();
}

export function toArrayByKey(key: string, obj: any = {}) {
    return Object.keys(obj).map((k) => {
        let data = obj[k];
        if (data) {
            data[key] = k;
        }
        return data;
    }).filter(o => o) || []
}


export function convertNumToAlphabates(num: number) {
    let alphabates = 'abcdefghij'.split('');
    let numArray = num.toString().split('').map((o) => parseInt(o));
    return numArray.map((i) => alphabates[i]).join('');
}

export async function fetchText(url: string) {
    const response = await fetch(url);
    let text = await response.text();
    // console.log(text)
    return text;
}


export function toCurrency(value: number = 0, symbol: string = '$') {
    let currency = Math.abs(value);
    let result = '';
    if (value < 0) {
        result += '- ';
    }
    if (symbol) {
        result += `${symbol} `;
    }
    result += currency.toFixed(2);
    return result;
}

export function inchToPixel(inches: number) {
    return inches * 96; // DPI
}

export function pixelToInch(pixels: number) {
    return pixels / 96; // DPI
}

export function isValidHexColor(hex: string) {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    let res = hexRegex.test(hex);
    return res;
}


export function colorToHex(color: string) {
    // Create a temporary div element to use its computed style
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);

    // Get the computed color from the div element
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    // Convert the computed color to RGB values
    const rgb = computedColor.match(/\d+/g).map(Number);

    // Convert RGB values to a 6-character hex color
    const hexColor = rgbToHex(rgb[0], rgb[1], rgb[2]);
    return hexColor;
}

export function rgbToHex(r: number, g: number, b: number) {
    return (
        "#" +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0")) // Convert to hex and ensure two characters
            .join("")
            .toUpperCase()
    );
}

