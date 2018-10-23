// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Content } from './screens/Content';
import { getZIndex } from './utils/get-z-index';

async function run() {
  try {
    const rootClassName = 'traverse-root';
    const rootZIndex = document.body ? getZIndex(document.body) : 1;
    const rootEl = document.createElement('div');
    rootEl.classList.add(rootClassName);

    if (document.body) {
      document.body.appendChild(rootEl);
      ReactDOM.render(
        <Content rootClassName={rootClassName} rootZIndex={rootZIndex} />,
        rootEl,
      );
    }
  } catch (err) {
    console.error(err);
  }
}

run();
