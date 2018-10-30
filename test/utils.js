import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-testing-library';
import * as theme from '../src/styles/theme';

const renderWithTheme = comp =>
  render(<ThemeProvider theme={theme}>{comp}</ThemeProvider>);

export { renderWithTheme };
