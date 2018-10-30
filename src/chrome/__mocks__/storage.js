const storage = new Map();

const clear = () => {
  storage.clear();
};

const set = jest.fn(obj => {
  Object.entries(obj).forEach(([key, value]) => {
    storage.set(key, value);
  });

  Promise.resolve();
});

const get = jest.fn(keys => {
  if (typeof keys === 'string') {
    return {
      [keys]: storage.get(keys),
    };
  }

  if (Array.isArray(keys)) {
    return keys.reduce(
      (ret, key) => ({
        ...ret,
        [key]: storage.get(key),
      }),
      {},
    );
  }

  if (typeof keys === 'object') {
    return Object.entries(keys).reduce(
      (ret, [key, defaultVal]) => ({
        ...ret,
        [key]: storage.get(key) || defaultVal,
      }),
      {},
    );
  }

  const ret = {};
  storage.forEach((value, key) => {
    ret[key] = value;
  });

  return ret;
});

export { set, get, clear };
