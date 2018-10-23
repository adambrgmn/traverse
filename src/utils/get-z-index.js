// @flow

function getZIndex(el: HTMLElement): number {
  if (el.childNodes) {
    const bodyChilds = Array.from(el.childNodes);
    const highestIndex = bodyChilds.reduce((highest, childNode) => {
      try {
        const computedStyle = window.getComputedStyle(childNode);
        const zIndexString: string = computedStyle.getPropertyValue('z-index');
        let zIndex = 0;

        if (zIndex !== 'auto') zIndex = Number.parseInt(zIndexString, 10);
        return zIndex > highest ? zIndex : highest;
      } catch (err) {
        return highest;
      }
    }, 1);

    return highestIndex + 1;
  }

  return 1;
}

export { getZIndex };
