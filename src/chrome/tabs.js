// @flow

type CreateProps = {
  active?: boolean,
  index?: number,
  openerTabId?: number,
  pinned?: boolean,
  selected?: boolean,
  url?: string,
  windowId?: number,
};

function create(props: CreateProps): Promise<chrome$Tab> {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.create(props, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

type UpdateProps = {
  active?: boolean,
  highlighted?: boolean,
  muted?: boolean,
  openerTabId?: number,
  pinned?: boolean,
  selected?: boolean,
  url?: string,
};

function update(tabId: number, props: UpdateProps): Promise<?chrome$Tab> {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.update(tabId, props, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

function remove(tabId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.remove(tabId, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

function activate(tabId: number): Promise<?chrome$Tab> {
  return update(tabId, { active: true });
}

function execute({
  tabId,
  ...props
}: {
  tabId?: number,
  allFrames?: boolean,
  code?: string,
  file?: string,
  frameId?: number,
  matchAboutBlank?: boolean,
  runAt?: chrome$RunAt,
}): Promise<?Array<any>> {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.executeScript(tabId, props, resolve);
    } catch (err) {
      reject(err);
    }
  });
}

export { create, update, remove, activate, execute };
