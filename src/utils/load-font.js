// @flow
import WebFont from 'webfontloader';

function loadFont(families: Array<string>): Promise<void> {
  return new Promise(resolve => {
    try {
      WebFont.load({
        google: { families },
        active: () => resolve(),
        inactive: () => resolve(),
      });
    } catch (err) {
      resolve();
    }
  });
}

export { loadFont };
