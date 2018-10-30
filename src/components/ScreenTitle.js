import styled from 'styled-components';
import { size, margin, leading } from '../styles/utils';

const ScreenTitle = styled.h1.attrs({
  'data-testid': 'screen-title',
})`
  width: 100%;
  margin-bottom: ${margin(1)};
  padding: 0;
  font-size: ${size(1.5)};
  line-height: ${leading(1)};
`;

export { ScreenTitle };
