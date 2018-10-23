import styled, { css } from 'styled-components';
import { lighten, borderRadius } from 'polished';
import { padding, color, size } from '../styles/utils';

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  flex: 1;
  min-width: 0;
  margin: 0;
  border: 1px solid ${p => lighten(0.5, color('black')(p))};
  border-top: none;
  font-size: ${size(1)};

  &:first-child {
    border-top: 1px solid ${p => lighten(0.5, color('black')(p))};
    ${borderRadius('top', '4px')};
  }

  &:last-child {
    ${borderRadius('bottom', '4px')};
  }

  ${p =>
    p.active &&
    css`
      background-color: ${color('brand')(p)};
    `};
`;

const ListButton = styled.button`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  border: none;
  padding: ${padding(0.5)};
  font-size: ${size(1)};
  text-align: left;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > *:first-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > *:last-child {
    margin-left: auto;
  }

  &:hover {
    background: ${color('brand')};
  }

  &[disabled] {
    color: ${p => lighten(0.2, color('black')(p))};
    background: transparent;
  }
`;

const ListText = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export { List, ListItem, ListButton, ListText };
