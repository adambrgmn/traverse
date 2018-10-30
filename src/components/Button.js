// @flow
import styled from 'styled-components';
import { hideVisually } from 'polished';
import { size, margin, padding, color } from '../styles/utils';

const ButtonList = styled.div.attrs({
  'data-testid': 'button-list',
})`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${margin(1)};
`;

const Button = styled.button.attrs({
  'data-testid': 'button',
})`
  margin-right: ${margin(1)};
  border: none;
  border-radius: 4px;
  padding: ${padding(0.5)};
  font-size: ${size(1)};
  background: ${color('brand')};

  &:last-child {
    margin-right: 0;
    margin-left: auto;
  }
`;

const HiddenText = styled.span.attrs({
  'data-testid': 'hidden-text',
})`
  ${hideVisually()};
`;

export { ButtonList, Button, HiddenText };
