import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';
import { renderWithTheme } from '../../../test/utils';
import { Picker } from '../Picker';
import { _tree } from '../../chrome/__mocks__/bookmarks';
import {
  processTree,
  extractBookmarks,
  extractDirectories,
  findByTitle,
} from '../../utils/process-bookmark-tree';
import { set, clear } from '../../chrome/storage';

jest.mock('../../chrome/storage.js');
jest.mock('../../chrome/bookmarks.js');

const tree = processTree(_tree);

afterEach(() => clear());

it('should render a list of available bookmark folders', async () => {
  const { getAllByTestId } = renderWithTheme(<Picker />);
  const listItems = await waitForElement(() => getAllByTestId('list-item'));
  const dirs = extractDirectories(tree);

  expect(listItems).toHaveLength(dirs.length);
});

it('should render all bookmarks in a dir after clicking dir', async () => {
  const { getByText, getAllByTestId } = renderWithTheme(<Picker />);
  const btn = await waitForElement(() => getByText(/Bookmarkfield/));
  fireEvent.click(btn);

  const bookmarks = await waitForElement(() => getAllByTestId('list-item'));
  const bookmarkField = extractBookmarks(
    findByTitle(tree, /Bookmarkfield/).children,
  );

  expect(bookmarks).toHaveLength(bookmarkField.length);
});

it('should react to including subfolders', async () => {
  const { getByTestId, getByText } = renderWithTheme(<Picker />);
  const includeBox = await waitForElement(() =>
    getByTestId('include-subfolders-checkbox'),
  );

  expect(includeBox).not.toHaveAttribute('checked');

  const allBookmarks = extractBookmarks(tree, true);
  const getTopLevelCount = () => getByText(/^\/$/).nextSibling;

  expect(getTopLevelCount()).toHaveTextContent('(0)');

  fireEvent.click(includeBox);
  expect(getTopLevelCount()).toHaveTextContent(`(${allBookmarks.length})`);
});

it('should include subfolders by default if stored in storage', async () => {
  await set({ includeSubFolders: true });

  const { getByTestId } = renderWithTheme(<Picker />);
  const includeBox = await waitForElement(() =>
    getByTestId('include-subfolders-checkbox'),
  );

  expect(includeBox).toHaveAttribute('checked');
});
