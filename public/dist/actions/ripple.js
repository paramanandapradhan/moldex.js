import { isTouchDevice } from '../services';
import './ripple.css';
const DARK_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.12)';
const LIGHT_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.12)';
export function ripple(node, { color } = {}) {
    const isTouchEnabled = isTouchDevice();
    let timeoutInstance;
    // Create ripple container
    const rippleContainer = document.createElement('span');
    rippleContainer.classList.add('ripple-container');
    node.appendChild(rippleContainer);
    function scheduleStartRipple(event) {
        // Don't ripple if clicking on backdrop
        if (event.target.closest('[aria-label="backdrop"]')) {
            return;
        }
        if (node.disabled)
            return;
        if (timeoutInstance)
            clearTimeout(timeoutInstance);
        timeoutInstance = setTimeout(() => startRipple(event), 100);
        event.stopPropagation();
    }
    function mouseMove(event) {
        if (timeoutInstance)
            clearTimeout(timeoutInstance);
        event.stopPropagation();
    }
    function startRipple(event) {
        event.stopPropagation();
        const isDarkMode = document.documentElement.classList.contains('dark') ||
            document.body.classList.contains('dark');
        let rippleColor = color || (isDarkMode ? LIGHT_RIPPLE_COLOR : DARK_RIPPLE_COLOR);
        if (color === 'light')
            rippleColor = LIGHT_RIPPLE_COLOR;
        if (color === 'dark')
            rippleColor = DARK_RIPPLE_COLOR;
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        const diameter = Math.max(node.clientWidth, node.clientHeight);
        const radius = diameter / 2;
        const rect = node.getBoundingClientRect();
        const touch = event.touches?.[0] || {};
        const circleX = (event instanceof MouseEvent ? event.clientX : touch.clientX) - rect.left - radius;
        const circleY = (event instanceof MouseEvent ? event.clientY : touch.clientY) - rect.top - radius;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${circleX}px`;
        circle.style.top = `${circleY}px`;
        circle.style.setProperty('--ripple-color', rippleColor);
        rippleContainer.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
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
            rippleContainer.remove();
        }
    };
}
