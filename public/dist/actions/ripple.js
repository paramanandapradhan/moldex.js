export const DARK_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.12)';
export const LIGHT_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.12)';
export function ripple(node, { color, light } = {}) {
    let containerRemoveTimer;
    const isTouchEnabled = isTouchDevice();
    let timeoutInstance;
    function scheduleStartRipple(event) {
        if (node.disabled)
            return;
        if (timeoutInstance) {
            clearTimeout(timeoutInstance);
        }
        timeoutInstance = setTimeout(() => {
            startRipple(event);
        }, 100);
    }
    function mouseMove() {
        if (timeoutInstance) {
            clearTimeout(timeoutInstance);
        }
    }
    function startRipple(event) {
        const rippleColor = light ? LIGHT_RIPPLE_COLOR : color || DARK_RIPPLE_COLOR;
        const circle = document.createElement('span');
        const diameter = Math.max(node.clientWidth, node.clientHeight);
        const radius = diameter / 2;
        const touch = event.touches?.[0] || {};
        const rect = node.getBoundingClientRect();
        const circleX = (event instanceof MouseEvent ? event.clientX : touch.clientX) - rect.left - radius;
        const circleY = (event instanceof MouseEvent ? event.clientY : touch.clientY) - rect.top - radius;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${circleX}px`;
        circle.style.top = `${circleY}px`;
        circle.style.setProperty('--ripple-color', rippleColor);
        circle.classList.add('ripple');
        const newClassList = [];
        if (!node.classList.contains('relative')) {
            newClassList.push('relative');
        }
        if (!node.classList.contains('overflow-hidden')) {
            newClassList.push('overflow-hidden');
        }
        node.classList.add(...newClassList);
        node.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 500);
        if (containerRemoveTimer) {
            clearTimeout(containerRemoveTimer);
        }
        containerRemoveTimer = setTimeout(() => {
            node.classList.remove(...newClassList);
        }, 500);
    }
    if (!isTouchEnabled) {
        node.addEventListener('mousedown', scheduleStartRipple);
        node.addEventListener('mousemove', mouseMove);
    }
    else {
        node.addEventListener('touchstart', scheduleStartRipple);
        node.addEventListener('touchmove', mouseMove);
    }
    return {
        destroy() {
            if (!isTouchEnabled) {
                node.removeEventListener('mousedown', scheduleStartRipple);
                node.removeEventListener('mousemove', mouseMove);
            }
            else {
                node.removeEventListener('touchstart', scheduleStartRipple);
                node.removeEventListener('touchmove', mouseMove);
            }
        }
    };
}
export function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;
}
