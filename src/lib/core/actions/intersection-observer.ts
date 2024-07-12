declare const bootstrap: any;

type ParamsType = { once?: boolean, left?: number, top?: number, bottom?: number, right?: number, onintersect?: () => void }

export function intersectionObserver(node: HTMLElement, { once = false, left = 0, top = 0, bottom = 0, right = 0, onintersect = () => { } }: ParamsType = {}) {
    let intersecting = false;
    if (typeof IntersectionObserver !== 'undefined') {
        const rootMargin = `${bottom}px ${left}px ${top}px ${right}px`;
        const observer = new IntersectionObserver(entries => {
            intersecting = entries[0].isIntersecting;
            if (intersecting) {
                onintersect && onintersect();
            }
            if (intersecting && once) {
                observer.unobserve(node);
            }
        }, {
            rootMargin
        });

        observer.observe(node);
        return {
            destroy: () => observer.unobserve(node)
        }
    } else {
        return {
            destroy: () => { }
        }
    }
}