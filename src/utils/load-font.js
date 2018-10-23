// @flow
import WebFont from 'webfontloader';

function loadFont(families: Array<string>): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      WebFont.load({
        google: { families },
        active: () => resolve(),
        inactive: () => resolve(),
      });
    } catch (err) {
      reject(err);
    }
  });
}

export { loadFont };
