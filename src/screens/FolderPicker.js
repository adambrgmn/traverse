// @flow
import React, { PureComponent, Fragment } from 'react';
import { join } from 'path';
import { List, ListItem, ListButton } from '../components/List';
import { ScreenTitle } from '../components/ScreenTitle';
import type { BookmarkTree, BookmarkDirectory } from '../types';

type Props = {
  tree: BookmarkTree,
  onDirectoryClick: BookmarkDirectory => void | Promise<void>,
};

class FolderPicker extends PureComponent<Props, *> {
  renderList = (tree: BookmarkTree, parents: Array<string> = []) => {
    const { onDirectoryClick } = this.props;

    return tree.map(
      item =>
        item.type === 'directory' && (
          <Fragment key={item.id}>
            <ListItem>
              <ListButton
                type="button"
                onClick={() => onDirectoryClick(item)}
                disabled={item.children.length < 1}
              >
                <span>{join(...parents, item.title || 'no title')}</span>
                <span>({item.children.length})</span>
              </ListButton>
            </ListItem>
            {this.renderList(item.children, [...parents, item.title])}
          </Fragment>
        ),
    );
  };

  render() {
    const { tree } = this.props;

    return (
      <Fragment>
        <ScreenTitle>Pick a folder:</ScreenTitle>
        <List>{this.renderList(tree)}</List>
      </Fragment>
    );
  }

  CanvasRenderingContext2D;
}

export { FolderPicker };
