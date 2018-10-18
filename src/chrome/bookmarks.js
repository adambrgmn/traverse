// @flow

const getTree = (): Promise<Array<chrome$BookmarkTreeNode>> =>
  new Promise(resolve => chrome.bookmarks.getTree(resolve));

export { getTree };
