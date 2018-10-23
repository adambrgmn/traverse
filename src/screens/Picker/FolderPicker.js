// @flow
import React, { PureComponent, Fragment } from 'react';
import { join } from 'path';
import { List, ListItem, ListButton } from '../../components/List';
import { ScreenTitle } from '../../components/ScreenTitle';
import { IncludeSubFolders } from '../../components/IncludeSubFolders';
import type { BookmarkTree, BookmarkDirectory } from '../../utils/types';

type Props = {
  tree: BookmarkTree,
  includeSubFolders: boolean,
  onDirectoryClick: BookmarkDirectory => void | Promise<void>,
  onIncludeSubFoldersChange: (
    SyntheticInputEvent<HTMLInputElement>,
  ) => void | Promise<void>,
};

class FolderPicker extends PureComponent<Props, *> {
  countItems = (tree: BookmarkTree): number => {
    const { includeSubFolders } = this.props;
    return tree.reduce((acc, item) => {
      if (item.type === 'bookmark') return acc + 1;
      if (item.type === 'directory' && includeSubFolders) {
        return acc + this.countItems(item.children);
      }

      return acc;
    }, 0);
  };

  renderList = (tree: BookmarkTree, parents: Array<string> = []) => {
    const { onDirectoryClick } = this.props;

    return tree.map(item => {
      if (item.type === 'directory') {
        const itemCount = this.countItems(item.children);
        return (
          <Fragment key={item.id}>
            <ListItem>
              <ListButton
                type="button"
                onClick={() => onDirectoryClick(item)}
                disabled={itemCount < 1}
              >
                <span>{join(...parents, item.title || 'no title')}</span>
                <span>({itemCount})</span>
              </ListButton>
            </ListItem>
            {this.renderList(item.children, [...parents, item.title])}
          </Fragment>
        );
      }

      return null;
    });
  };

  render() {
    const { tree, includeSubFolders, onIncludeSubFoldersChange } = this.props;

    return (
      <Fragment>
        <ScreenTitle>Pick a folder:</ScreenTitle>

        <IncludeSubFolders
          include={includeSubFolders}
          onChange={onIncludeSubFoldersChange}
        />

        <List>{this.renderList(tree)}</List>
      </Fragment>
    );
  }
}

export { FolderPicker };
