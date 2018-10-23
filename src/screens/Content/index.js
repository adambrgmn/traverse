// @flow
import React, { PureComponent, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { send } from '../../chrome/messages';
import * as Event from '../../utils/event';
import * as theme from '../../styles/theme';
import { Global, Container, Button } from './styles';

type Props = {
  rootClassName: string,
  rootZIndex: number,
};

class Content extends PureComponent<Props, *> {
  componentDidMount() {
    document.addEventListener('keydown', this.keyListener);
  }

  keyListener = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 74:
        this.handleNext();
        break;

      case 75:
        this.handlePrevious();
        break;

      default:
      // void
    }
  };

  handleStop = async () => {
    await send(Event.stopTraversing);
  };

  handleNext = async () => {
    await send(Event.nextItem);
  };

  handlePrevious = async () => {
    await send(Event.previousItem);
  };

  render() {
    const { rootClassName, rootZIndex } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Global rootClassName={rootClassName} rootZIndex={rootZIndex} />
          <Container>
            <Button type="button" onClick={this.handlePrevious}>
              Previous
            </Button>
            <Button type="button" onClick={this.handleStop}>
              Stop traversing
            </Button>
            <Button type="button" onClick={this.handleNext}>
              Next
            </Button>
          </Container>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export { Content };
