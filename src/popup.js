// @flow
// $FlowFixMe: React Flow typings are not updated with StrictMode yet
import React, { Component, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { getTree } from './chrome/bookmarks';
import { Global } from './styles/Global';
import { FolderTree } from './components/FolderTree';
import type { Bookmark, BookmarkDirectory, BookmarkTree } from './types';

type State = {
  tree: BookmarkTree,
};

class App extends Component<*, State> {
  state = {
    tree: [],
  };

  componentDidMount() {
    this.getBookmarks();
  }

  async getBookmarks() {
    try {
      const rawTree = await getTree();
      const tree = this.traverseTree(rawTree[0].children);
      this.setState({ tree });
    } catch (err) {
      console.error(err);
    }
  }

  traverseTree = (tree: Array<chrome$BookmarkTreeNode>): BookmarkTree =>
    tree.reduce((acc, item) => {
      if (item.children != null && Array.isArray(item.children)) {
        const dir: BookmarkDirectory = {
          type: 'directory',
          id: item.id,
          title: item.title,
          children: this.traverseTree(item.children),
        };

        return [...acc, dir];
      }

      if (item.url != null) {
        const bookmark: Bookmark = {
          type: 'bookmark',
          id: item.id,
          title: item.title,
          url: item.url,
        };

        return [...acc, bookmark];
      }

      return acc;
    }, []);

  renderTree = (tree: BookmarkTree) => (
    <ul>
      {tree.map(
        item =>
          item.type === 'directory' && (
            <li key={item.id}>
              <button type="button">
                {item.title || 'No title'} ({item.children.length})
              </button>
              {this.renderTree(item.children)}
            </li>
          ),
      )}
    </ul>
  );

  render() {
    const { tree } = this.state;
    return (
      <StrictMode>
        <Global />
        <FolderTree tree={tree} />
      </StrictMode>
    );
  }
}

const rootEl = document.getElementById('root');
if (rootEl) ReactDOM.render(<App />, rootEl);
