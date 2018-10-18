// @flow
import React, { Fragment } from 'react';
import {
  List,
  ListItem,
  Button,
  Folder,
  Parents,
  ItemCount,
  TraverseIndication,
} from './styles';
import type { BookmarkTree } from '../../types';

type FolderItemProps = {
  tree: BookmarkTree,
  parents: Array<string>,
};

function FolderItem({ tree, parents }: FolderItemProps) {
  return tree.map(
    item =>
      item.type === 'directory' && (
        <Fragment key={item.id}>
          <ListItem>
            <Button type="button">
              {parents.length > 0 && (
                <Parents>
                  {parents.join('/')}
                  {'/'}
                </Parents>
              )}
              <Folder>{item.title || 'No title'}</Folder>
              <ItemCount>({item.children.length})</ItemCount>
              <TraverseIndication>Traverse</TraverseIndication>
            </Button>
          </ListItem>

          <FolderItem tree={item.children} parents={[...parents, item.title]} />
        </Fragment>
      ),
  );
}

FolderItem.defaultProps = {
  parents: [],
};

type FolderTreeProps = {
  tree: BookmarkTree,
};

function FolderTree({ tree }: FolderTreeProps) {
  return (
    <List>
      <FolderItem tree={tree} parents={[]} />
    </List>
  );
}

export { FolderTree };
