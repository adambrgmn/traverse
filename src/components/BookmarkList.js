// @flow
import React from 'react';
import { List, ListItem, ListText, ListButton } from './List';
import { Favicon } from './Favicon';
import type {
  BookmarkList as BookmarkListType,
  Bookmark,
} from '../utils/types';

const getTitle = (item: Bookmark) => {
  if (item.title) return item.title;
  const url = new URL(item.url);
  return `${url.host}${url.pathname.replace(/\/$/, '')}`;
};

type Props = {
  list: BookmarkListType,
  activeId: ?string,
  onItemClick: ?(item: Bookmark) => void | Promise<void>,
};

function BookmarkList({ list, activeId, onItemClick }: Props) {
  return (
    <List>
      {list.map(item => {
        let onClick;
        if (onItemClick) onClick = () => onItemClick(item);

        return (
          <ListItem key={item.id} active={item.id === activeId}>
            <ListButton onClick={onClick}>
              <ListText>
                <Favicon url={item.url} />
                {getTitle(item)}
              </ListText>
            </ListButton>
          </ListItem>
        );
      })}
    </List>
  );
}

BookmarkList.defaultProps = {
  activeId: null,
  onItemClick: null,
};

export { BookmarkList };
