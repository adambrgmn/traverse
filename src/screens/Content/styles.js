import styled, { createGlobalStyle } from 'styled-components';
import { margin, padding, size, color, leading } from '../../styles/utils';

const Global = createGlobalStyle`
  .${p => p.rootClassName} {
    all: initial;
    position: fixed;
    bottom: ${margin(0.5)};
    right: ${margin(0.5)};
    width: auto;
    height: auto;
    z-index: ${p => p.rootZIndex};

    & *, & *::before, & *::after {
      all: initial;
      box-sizing: border-box;
      font-size: ${p => p.theme.type.baseFontSize * 16}px;
      font-family: 'Roboto Mono', monospace;
      line-height: ${leading(1)};
      color: ${color('black')};
    }
  }
`;

const Container = styled.div``;

const Button = styled.button`
  margin-right: ${margin(0.5)};
  border: 1px solid ${color('black')};
  border-radius: 4px;
  padding: ${padding(0.25)};
  font-size: ${size(1)};
  background: white;

  &:hover {
    background: ${color('brand')};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export { Global, Container, Button };
