

export function noContextMenu(node: HTMLElement,) {
  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
  };

  node.addEventListener('contextmenu', handleContextMenu);

  return {
    destroy() {
      node.removeEventListener('contextmenu', handleContextMenu);
    },
  };
}