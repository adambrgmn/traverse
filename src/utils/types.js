// @flow
/* eslint-disable no-use-before-define */
import type { Stage } from './stage';

export type BookmarkDirectory = {
  type: 'directory',
  id: string,
  title: string,
  children: Array<Bookmark | BookmarkDirectory>,
};

export type Bookmark = {
  type: 'bookmark',
  id: string,
  title: string,
  url: string,
};

export type BookmarkTree = Array<Bookmark | BookmarkDirectory>;
export type BookmarkList = Array<Bookmark>;

export type TraverseListItem = { id: string, title: string, url: string };

export type Settings = {
  stage: Stage,
  activeTab: ?number,
  lastItemId: ?string,
  bookmarkList: BookmarkList,
  includeSubFolders: boolean,
};
