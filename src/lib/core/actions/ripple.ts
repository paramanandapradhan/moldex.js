import { isTouchDevice } from "../utils/index.js";

export type RippleOptions = {
    /**
     * The color of the ripple effect, default is rgba(0, 0, 0, 0.25)
     */
    color?: string;

    /**
     * If true, the ripple effect will be light color rgba(255, 255, 255, 0.25), default is false.
     */
    light?: boolean;
}

export const DARK_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.12)';
export const LIGHT_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.12)';

export function ripple(node: HTMLElement, option: RippleOptions = { color: DARK_RIPPLE_COLOR, light: false }) {
    let containerRemoveTimer: any;
    let isTouchEnabled = isTouchDevice();

    let timeoutInstance: any;

    function scheduleStartRipple(event: MouseEvent | any) {
        if (timeoutInstance) {
            clearTimeout(timeoutInstance)
        }
        timeoutInstance = setTimeout(() => {
            startRipple(event);
        }, 100);
    }

    function mouseMove(event: MouseEvent | any) {
        if (timeoutInstance) {
            clearTimeout(timeoutInstance)
        }
    }

    function startRipple(event: MouseEvent | any) {
        // Is the event is consumed by some other directive, we don't want to start the ripple effect
        // It will happen when the event is triggered in a Dropdown menu of it children
        if (event.isConsumed) return;

        // console.log('startRipple');

        if (option.light) {
            option.color = LIGHT_RIPPLE_COLOR;
        }

        const circle = document.createElement('span');
        const diameter = Math.max(node.clientWidth, node.clientHeight);
        const radius = diameter / 2;

        const touch = (event.touches || [])[0] || {};

        const rect = node.getBoundingClientRect();
        const circleX = (event.clientX || touch.clientX) - rect.left - radius; // Adjust for circle's radius
        const circleY = (event.clientY || touch.clientY) - rect.top - radius; // Adjust for circle's radius

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${circleX}px`;
        circle.style.top = `${circleY}px`;
        circle.attributeStyleMap.set('--ripple-color', option.color || DARK_RIPPLE_COLOR);
        circle.classList.add('ripple');

        // console.log('Circle', circle)
        // console.log('Circle values', { circleX, circleY, radius, clientX: event.clientX })
        // console.log('event', event)

        node.classList.add('ripple-container');
        node.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 500); // align this with the duration of the animation

        if (containerRemoveTimer) {
            clearTimeout(containerRemoveTimer)
        };
        containerRemoveTimer = setTimeout(() => {
            node.classList.remove('ripple-container');
        }, 500);
    }

    if (!isTouchEnabled) {
        // console.log('mousedown registered')
        node.addEventListener('mousedown', scheduleStartRipple);
        node.addEventListener('mousemove', mouseMove);
    } else if (isTouchEnabled) {
        // console.log('touchstart registered')
        node.addEventListener('touchstart', scheduleStartRipple);
        node.addEventListener('touchmove', mouseMove);
    }

    return {
        destroy() {
            if (!isTouchEnabled) {
                node.removeEventListener('mousedown', scheduleStartRipple);
                node.removeEventListener('mousemove', mouseMove);
            } else if (isTouchEnabled) {
                node.removeEventListener('touchstart', scheduleStartRipple);
                node.removeEventListener('touchmove', mouseMove);
            }
        }
    };
}
