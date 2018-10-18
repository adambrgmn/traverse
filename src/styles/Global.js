// @flow
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const Global = createGlobalStyle`
  ${normalize()}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: 1.3em;
  }

  body {
    width: 20rem;
    padding: 0.5rem;
    font-family: 'Roboto Mono', monospace;
    color: #403b3b;
  }
`;

export { Global };
