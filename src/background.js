// @flow
import { create, update, remove, activate, execute } from './chrome/tabs';
import { updateSettings, getSetting } from './utils/settings';
import * as Stage from './utils/stage';
import * as Event from './utils/event';
import type { BookmarkList } from './utils/types';

async function reset({
  tabId,
  removeTab,
}: {
  tabId: number,
  removeTab?: boolean,
}) {
  if (removeTab) await remove(tabId);
  await updateSettings(() => ({
    stage: Stage.idle,
    activeTab: null,
    lastItemId: null,
    bookmarkList: [],
  }));
}

async function initTraversal({ bookmarkList }: { bookmarkList: BookmarkList }) {
  if (bookmarkList.length > 0) {
    const { url, id } = bookmarkList[0];
    const tab = await create({ url });

    await updateSettings(() => ({
      stage: Stage.traversing,
      activeTab: tab.id,
      lastItemId: id,
      bookmarkList,
    }));
  }
}

async function moveInList(steps: number = 1) {
  const { bookmarkList, lastItemId, activeTab } = await getSetting({
    bookmarkList: [],
    lastItemId: null,
    activeTab: null,
  });

  if (activeTab && lastItemId) {
    const listLength = bookmarkList.length;
    const currentIndex = bookmarkList.findIndex(item => item.id === lastItemId);
    let nextIndex = currentIndex + steps;

    if (nextIndex < 0) nextIndex = listLength - 1;
    if (nextIndex > listLength - 1) nextIndex = 0;

    const nextItem = bookmarkList[nextIndex];

    if (nextItem) {
      await update(activeTab, { url: nextItem.url });
      await updateSettings(() => ({ lastItemId: nextItem.id }));
    }
  }
}

async function goToItem({ itemId }: { itemId: string }) {
  // $FlowFixMe
  const { bookmarkList, activeTab } = await getSetting({
    bookmarkList: [],
    activeTab: null,
  });

  const item = bookmarkList.find(i => i.id === itemId);

  if (item) {
    await update(activeTab, { url: item.url });
    await updateSettings(() => ({ lastItemId: item.id }));
  }
}

function resetOnRemove(
  tabId: number,
  { isWindowClosing }: { isWindowClosing: boolean },
) {
  if (!isWindowClosing) {
    getSetting({ activeTab: null }).then(async ({ activeTab }) => {
      if (activeTab && activeTab === tabId) reset({ tabId: activeTab });
    });
  }
}

async function resetOnStopTraverse() {
  const { activeTab } = await getSetting({ activeTab: null });
  if (activeTab) await reset({ tabId: activeTab, removeTab: true });
}

chrome.runtime.onMessage.addListener(
  ({ event, payload }: { event: string, payload: Object }) => {
    switch (event) {
      case Event.initTraversal:
        initTraversal(payload);
        break;

      case Event.nextItem:
        moveInList(+1);
        break;

      case Event.previousItem:
        moveInList(-1);
        break;

      case Event.goToItem:
        goToItem(payload);
        break;

      case Event.stopTraversing:
        resetOnStopTraverse();
        break;

      default:
      // void
    }
  },
);

chrome.tabs.onRemoved.addListener(resetOnRemove);

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  getSetting({ activeTab: null }).then(async ({ activeTab }) => {
    if (activeTab && activeTab === tabId && changeInfo.status === 'complete') {
      await execute({ tabId: activeTab, file: 'content.js' });
    }
  });
});
