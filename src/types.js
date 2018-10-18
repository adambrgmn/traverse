// @flow
/* eslint-disable no-use-before-define */

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
