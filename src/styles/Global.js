// @flow
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { leading, padding, color } from './utils';

const Global = createGlobalStyle`
  ${normalize()}

  html {
    font-size: ${p => p.theme.type.baseFontSize * 16}px;
    line-height: ${leading(1)};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    line-height: ${leading(1)};
  }

  body {
    width: 20rem;
    padding: ${padding(0.5)};
    font-family: 'Roboto Mono', monospace;
    color: ${color('black')};
  }
`;

export { Global };
