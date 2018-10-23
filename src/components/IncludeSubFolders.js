// @flow

import React from 'react';
import styled from 'styled-components';
import { size, margin } from '../styles/utils';

type Props = {
  include: boolean,
  onChange: (SyntheticInputEvent<HTMLInputElement>) => void | Promise<void>,
};

const Container = styled.div`
  margin-bottom: ${margin(0.5)};
  font-size: ${size(1)};
`;

function IncludeSubFolders({ include, onChange }: Props) {
  return (
    <Container>
      <label htmlFor="include-subfolders">
        <input
          type="checkbox"
          id="include-subfolders"
          name="include-subfolders"
          checked={include}
          onChange={onChange}
        />{' '}
        <span>Include subfolders</span>
      </label>
    </Container>
  );
}

export { IncludeSubFolders };
