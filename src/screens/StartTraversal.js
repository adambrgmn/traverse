// @flow
import React, { PureComponent, Fragment } from 'react';
import { List, ListItem, ListText } from '../components/List';
import { ButtonList, Button, HiddenText } from '../components/Button';
import { Favicon } from '../components/Favicon';
import type { BookmarkList } from '../types';

type Props = {
  list: BookmarkList,
  onResetClick: () => void | Promise<void>,
  onStartClick: () => void | Promise<void>,
};

class StartTraversal extends PureComponent<Props, *> {
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

        <List>
          {list.map(item => (
            <ListItem key={item.id}>
              <ListText>
                <Favicon url={item.url} />
                {item.title || item.url}
              </ListText>
            </ListItem>
          ))}
        </List>
      </Fragment>
    );
  }
}

export { StartTraversal };
