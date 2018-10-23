// @flow
import React, { PureComponent, Fragment } from 'react';
import { ButtonList, Button } from '../../components/Button';
import { BookmarkList } from '../../components/BookmarkList';
import { getSetting } from '../../utils/settings';
import { send } from '../../chrome/messages';
import * as Event from '../../utils/event';
import type {
  BookmarkList as BookmarkListType,
  Bookmark,
} from '../../utils/types';

type State = {
  activeId: ?string,
  list: BookmarkListType,
};

class Traverser extends PureComponent<*, State> {
  state = {
    activeId: null,
    list: [],
  };

  componentDidMount() {
    this.init();
    this.listenForChange();
  }

  init = async () => {
    const { bookmarkList, lastItemId } = await getSetting({
      bookmarkList: [],
      lastItemId: null,
    });

    this.setState(() => ({ list: bookmarkList, activeId: lastItemId }));
  };

  listenForChange = () => {
    chrome.storage.onChanged.addListener(changes => {
      Object.entries(changes).forEach(([key, value]) => {
        if (key === 'lastItemId') {
          // $FlowFixMe
          this.setState(() => ({ activeId: value.newValue }));
        }
      });
    });
  };

  handleReset = async () => {
    await send(Event.stopTraversing);
  };

  handleNext = async () => {
    await send(Event.nextItem);
  };

  handlePrevious = async () => {
    await send(Event.previousItem);
  };

  handleItemClick = async (item: Bookmark) => {
    await send(Event.goToItem, { itemId: item.id });
  };

  render() {
    const { list, activeId } = this.state;
    return (
      <Fragment>
        <ButtonList>
          <Button type="button" onClick={this.handlePrevious}>
            Previous
          </Button>

          <Button type="button" onClick={this.handleNext}>
            Next
          </Button>
        </ButtonList>

        <BookmarkList
          list={list}
          activeId={activeId}
          onItemClick={this.handleItemClick}
        />

        <ButtonList style={{ marginTop: '1.36rem', marginBottom: '0' }}>
          <Button
            type="button"
            onClick={this.handleReset}
            style={{ marginLeft: 0 }}
          >
            Stop traversing
          </Button>
        </ButtonList>
      </Fragment>
    );
  }
}

export { Traverser };
