// @flow
// $FlowFixMe: React Flow typings are not updated with StrictMode yet
import React, { Component, StrictMode, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import * as theme from './styles/theme';
import { Global } from './styles/Global';
import { Picker } from './screens/Picker';
import { getSetting, updateSettings } from './utils/settings';
import { Traverser } from './screens/Traverser';
import * as Stage from './utils/stage';
import type { Stage as StageType } from './utils/stage';

type State = {
  stage: StageType,
};

class App extends Component<*, State> {
  state = {
    stage: Stage.loading,
  };

  componentDidMount() {
    this.init();
    this.listenForStateChange();
  }

  listenForStateChange = () => {
    chrome.storage.onChanged.addListener(changes => {
      Object.entries(changes).forEach(([key, value]) => {
        if (key === 'stage') {
          // $FlowFixMe
          this.setState(() => ({ stage: value.newValue }));
        }
      });
    });
  };

  init = async () => {
    const { stage } = await getSetting({ stage: Stage.idle });

    if (Object.values(Stage).includes(stage)) {
      this.setState(() => ({ stage }));
    } else {
      await updateSettings(() => ({ stage: Stage.idle }));
      this.setState(() => ({ stage: Stage.idle }));
    }
  };

  render() {
    const { stage } = this.state;

    return (
      <StrictMode>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Global />
            {stage === Stage.loading && <p>Loading...</p>}
            {stage === Stage.idle && <Picker />}
            {stage === Stage.traversing && <Traverser />}
          </Fragment>
        </ThemeProvider>
      </StrictMode>
    );
  }
}

const rootEl = document.getElementById('root');
if (rootEl) ReactDOM.render(<App />, rootEl);
