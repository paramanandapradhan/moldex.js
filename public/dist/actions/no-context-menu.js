export function noContextMenu(node) {
    const handleContextMenu = (event) => {
        event.preventDefault();
    };
    node.addEventListener('contextmenu', handleContextMenu);
    return {
        destroy() {
            node.removeEventListener('contextmenu', handleContextMenu);
        },
    };
}
