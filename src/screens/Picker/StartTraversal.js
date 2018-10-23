// @flow
import React, { PureComponent, Fragment } from 'react';
import { ButtonList, Button, HiddenText } from '../../components/Button';
import { BookmarkList } from '../../components/BookmarkList';
import type {
  BookmarkList as BookmarkListType,
  Bookmark,
} from '../../utils/types';

type Props = {
  list: BookmarkListType,
  onResetClick: () => void | Promise<void>,
  onStartClick: () => void | Promise<void>,
};

class StartTraversal extends PureComponent<Props, *> {
  getTitle = (item: Bookmark) => {
    if (item.title) return item.title;
    const url = new URL(item.url);
    return `${url.host}${url.pathname.replace(/\/$/, '')}`;
  };

  render() {
    const { list, onResetClick, onStartClick } = this.props;

    return (
      <Fragment>
        <ButtonList>
          <Button type="button" onClick={onResetClick}>
            {'<'}
            <HiddenText>Reset</HiddenText>
          </Button>
          <Button type="button" onClick={onStartClick}>
            Start traversal
          </Button>
        </ButtonList>

        <BookmarkList list={list} />
      </Fragment>
    );
  }
}

export { StartTraversal };
