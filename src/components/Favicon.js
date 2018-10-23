// @flow
import React from 'react';
import styled from 'styled-components';
import { size, margin } from '../styles/utils';

const Img = styled.img`
  display: inline-block;
  width: ${size(1)};
  height: ${size(1)};
  margin-right: ${margin(0.5)};
  transform: translateY(1px);
`;

type Props = {
  url: string,
};

function Favicon({ url }: Props) {
  return (
    <Img src={`https://www.google.com/s2/favicons?domain=${url}`} alt="" />
  );
}

export { Favicon };
