// @flow
import React, { PureComponent, Fragment } from 'react';
import { ScreenTitle } from '../components/ScreenTitle';

type Props = {};

class Loading extends PureComponent<Props, *> {
  render() {
    return (
      <Fragment>
        <ScreenTitle>Loading...</ScreenTitle>
      </Fragment>
    );
  }
}

export { Loading };
