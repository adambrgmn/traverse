import React from 'react';
import { fireEvent } from 'react-testing-library';
import { Button } from '../Button';
import { renderWithTheme } from '../../../test/utils';

it('renders a clickable button', () => {
  const onClick = jest.fn();
  const { getByText } = renderWithTheme(
    <Button onClick={onClick}>Click me</Button>,
  );
  const btn = getByText(/click me/i);

  fireEvent.click(btn);
  expect(onClick).toHaveBeenCalled();
});
