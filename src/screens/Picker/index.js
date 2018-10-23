// @flow

import React, { PureComponent } from 'react';
import { getSetting, updateSettings } from '../../utils/settings';
import { getTree } from '../../chrome/bookmarks';
import { send } from '../../chrome/messages';
import * as Event from '../../utils/event';
import {
  processTree,
  extractBookmarks,
} from '../../utils/process-bookmark-tree';
import { FolderPicker } from './FolderPicker';
import { StartTraversal } from './StartTraversal';
import type {
  BookmarkTree,
  BookmarkList,
  BookmarkDirectory,
} from '../../utils/types';

const Stage = {
  loading: 'LOADING',
  pickFolder: 'PICK_FOLDER',
  initTraverse: 'INIT_TRAVERSE',
};

type State = {
  stage: 'LOADING' | 'PICK_FOLDER' | 'INIT_TRAVERSE',
  tree: BookmarkTree,
  bookmarkList: BookmarkList,
  includeSubFolders: boolean,
};

class Picker extends PureComponent<*, State> {
  state = {
    stage: Stage.loading,
    tree: [],
    bookmarkList: [],
    includeSubFolders: false,
  };

  componentDidMount() {
    this.init();
  }

  async componentDidUpdate(prevProps: *, prevState: State) {
    const { includeSubFolders } = this.state;

    if (includeSubFolders !== prevState.includeSubFolders) {
      try {
        await updateSettings(() => ({ includeSubFolders }));
      } catch (err) {
        // void
      }
    }
  }

  init = async () => {
    const { includeSubFolders } = await getSetting({
      includeSubFolders: false,
    });

    const rawTree = await getTree();
    const tree = processTree(rawTree);
    this.setState(() => ({ stage: Stage.pickFolder, tree, includeSubFolders }));
  };

  extractBookmarksFromTree = (dir: BookmarkDirectory) => {
    const { includeSubFolders } = this.state;
    const bookmarkList = extractBookmarks(dir.children, includeSubFolders);

    this.setState(() => ({ bookmarkList, stage: Stage.initTraverse }));
  };

  toggleIncludeSubfolders = () =>
    this.setState(({ includeSubFolders }) => ({
      includeSubFolders: !includeSubFolders,
    }));

  resetState = () => this.setState(() => ({ stage: Stage.pickFolder }));

  initTraversal = async () => {
    const { bookmarkList } = this.state;
    await send(Event.initTraversal, { bookmarkList });
  };

  render() {
    const { stage, tree, bookmarkList, includeSubFolders } = this.state;

    switch (stage) {
      case Stage.pickFolder:
        return (
          <FolderPicker
            tree={tree}
            includeSubFolders={includeSubFolders}
            onDirectoryClick={this.extractBookmarksFromTree}
            onIncludeSubFoldersChange={this.toggleIncludeSubfolders}
          />
        );

      case Stage.initTraverse:
        return (
          <StartTraversal
            list={bookmarkList}
            onResetClick={this.resetState}
            onStartClick={this.initTraversal}
            includeSubFolders={includeSubFolders}
            onIncludeSubFoldersChange={this.toggleIncludeSubfolders}
          />
        );

      case Stage.loading:
      default:
        return 'Loading';
    }
  }
}

export { Picker };
