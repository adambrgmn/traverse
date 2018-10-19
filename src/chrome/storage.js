// @flow

const set = (obj: Object): Promise<void> =>
  new Promise(resolve => chrome.storage.local.set(obj, resolve));

const get = (key: string | Array<string> | Object | null): Promise<Object> =>
  new Promise(resolve => chrome.storage.local.get(key, resolve));

export { get, set };
