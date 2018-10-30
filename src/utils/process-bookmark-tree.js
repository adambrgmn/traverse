// @flow
import type {
  Bookmark,
  BookmarkTree,
  BookmarkList,
  BookmarkDirectory,
} from './types';

const processTree = (tree: Array<chrome$BookmarkTreeNode>): BookmarkTree =>
  tree.reduce((acc, item) => {
    if (item.children != null && Array.isArray(item.children)) {
      const dir: BookmarkDirectory = {
        type: 'directory',
        id: item.id,
        title: item.id === '0' ? '/' : item.title,
        children: processTree(item.children),
      };

      return [...acc, dir];
    }

    if (item.url != null) {
      const bookmark: Bookmark = {
        type: 'bookmark',
        id: item.id,
        title: item.title,
        url: item.url,
      };

      return [...acc, bookmark];
    }

    return acc;
  }, []);

const extractBookmarks = (
  tree: BookmarkTree,
  includeSubFolders: boolean,
): BookmarkList => {
  const bookmarkList = tree.reduce((acc, item) => {
    switch (item.type) {
      case 'bookmark':
        return [...acc, item];

      case 'directory':
        if (includeSubFolders) {
          return [
            ...acc,
            ...extractBookmarks(item.children, includeSubFolders),
          ];
        }

        return acc;

      default:
        return acc;
    }
  }, []);

  return bookmarkList;
};

const extractDirectories = (tree: BookmarkTree): Array<BookmarkDirectory> => {
  const directoryList = tree.reduce((acc, item) => {
    switch (item.type) {
      case 'directory':
        return [...acc, item, ...extractDirectories(item.children)];
      case 'bookmark':
      default:
        return acc;
    }
  }, []);

  return directoryList;
};

const findByTitle = (
  tree: BookmarkTree,
  title: string | RegExp,
): ?(BookmarkDirectory | Bookmark) => {
  const match = (str: string) => {
    if (typeof title === 'string') return str === title;
    return title.test(str);
  };

  const result = tree.reduce((res, item) => {
    if (res != null) return res;

    if (match(item.title)) return item;
    if (item.type === 'bookmark' && match(item.url)) return item;

    if (item.type === 'directory') return findByTitle(item.children, title);
    return null;
  }, null);

  return result;
};

export { processTree, extractBookmarks, extractDirectories, findByTitle };
