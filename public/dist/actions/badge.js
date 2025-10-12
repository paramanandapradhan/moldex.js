export function badge(node, { containerClassName = '', badgePositionClassName = 'top-0 right-0', badgeContainerClassName = '', badgeClassName = '', badgeBackgroundClassName = '', badgeText = '', hasBadgeBackground = true } = {}) {
    let badgeBackElement = hasBadgeBackground ? `<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 ${badgeBackgroundClassName}"></span>` : '';
    const badge = document.createElement('span');
    badge.className = 'absolute transform translate-x-1/2 -translate-y-1/2 ' + badgePositionClassName;
    badge.innerHTML = `
      <span class="relative flex h-3 w-3 ${badgeContainerClassName}">
        ${badgeBackElement}
        <span class="relative inline-grid place-items-center rounded-full h-3 w-3 text-3xs text-white bg-sky-500 ${badgeClassName}">${badgeText || ''}</span>
      </span>
    `;
    let list = ['relative'];
    list.push(...containerClassName.split(' ').map(o => o.trim()).filter(o => o));
    const nodeClassList = [...list];
    node.classList.add(...nodeClassList);
    node.appendChild(badge);
    return {
        destroy() {
            node.removeChild(badge);
            node.classList.remove(...nodeClassList);
        }
    };
}
