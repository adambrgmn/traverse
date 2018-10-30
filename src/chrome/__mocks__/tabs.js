const tabs = new Map();

const create = jest.fn(props => {
  const id = tabs.size() + 1;
  const newTab = {
    id,
    removed: false,
    ...props,
  };

  tabs.set(id, newTab);
  return Promise.resolve(newTab);
});

const update = jest.fn((tabId, props) => {
  const original = tabs.get(tabId);
  if (!original || original.removed) {
    return Promise.reject(new Error(`Can not find a tab with id ${tabId}`));
  }

  const newTab = {
    ...original,
    ...props,
  };
  tabs.set(tabId, newTab);

  return Promise.resolve(newTab);
});

const remove = jest.fn(tabId =>
  Promise.resolve().then(() => {
    const original = tabs.get(tabId);
    if (!original) throw new Error(`Tab with id ${tabId} doesn't exist`);

    const newTab = { ...original, removed: true };
    tabs.set(tabId, newTab);
  }),
);

const activate = jest.fn(tabId => update(tabId, { active: true }));

const execute = jest.fn(() => Promise.resolve());

export { create, update, remove, activate, execute };
