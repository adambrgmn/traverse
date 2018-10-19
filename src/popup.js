// @flow
// $FlowFixMe: React Flow typings are not updated with StrictMode yet
import React, { Component, StrictMode, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import * as theme from './styles/theme';
import { getTree } from './chrome/bookmarks';
import { Global } from './styles/Global';
import { FolderPicker } from './screens/FolderPicker';
import { StartTraversal } from './screens/StartTraversal';
import { Loading } from './screens/Loading';
import { getSetting } from './settings';
import type {
  Bookmark,
  BookmarkDirectory,
  BookmarkTree,
  BookmarkList,
  Stage,
} from './types';

type State = {
  stage: ?Stage,
  tree: BookmarkTree,
  list: BookmarkList,
};

class App extends Component<*, State> {
  state = {
    stage: null,
    tree: [],
    list: [],
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: *, prevState: State) {
    const { stage } = this.state;

    if (stage !== prevState.stage) {
      switch (stage) {
        case 'idle':
          this.getBookmarks();
          break;

        default:
          break;
      }
    }
  }

  async init() {
    const { stage } = await getSetting({ stage: 'idle' });
    this.setState(() => ({ stage }));
  }

  async getBookmarks() {
    try {
      const rawTree = await getTree();
      const tree = this.processTree(rawTree);
      this.setState({ tree });
    } catch (err) {
      console.error(err);
    }
  }

  processTree = (tree: Array<chrome$BookmarkTreeNode>): BookmarkTree =>
    tree.reduce((acc, item) => {
      if (item.children != null && Array.isArray(item.children)) {
        const dir: BookmarkDirectory = {
          type: 'directory',
          id: item.id,
          title: item.id === '0' ? '/' : item.title,
          children: this.processTree(item.children),
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

  extractBookmarks = (tree: BookmarkTree): BookmarkList => {
    const list = tree.reduce((acc, item) => {
      switch (item.type) {
        case 'bookmark':
          return [...acc, item];

        case 'directory':
          return [...acc, ...this.extractBookmarks(item.children)];

        default:
          return acc;
      }
    }, []);

    return list;
  };

  handleDirectoryClick = (dir: BookmarkDirectory) => {
    const list = this.extractBookmarks(dir.children);
    this.setState(() => ({ list }));
  };

  handleReset = () => {
    this.setState(() => ({ list: [] }));
  };

  handleStart = () => {};

  renderScreen() {
    const { tree, list, stage } = this.state;

    switch (stage) {
      case null:
        return <Loading />;

      case 'idle':
        if (!tree.length && !list.length) return <Loading />;
        if (list.length)
          return (
            <StartTraversal
              list={list}
              onResetClick={this.handleReset}
              onStartClick={this.handleStart}
            />
          );
        return (
          <FolderPicker
            tree={tree}
            onDirectoryClick={this.handleDirectoryClick}
          />
        );

      case 'traversing':
        return null;

      case 'error':
      default:
        return null;
    }
  }

  render() {
    return (
      <StrictMode>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Global />
            {this.renderScreen()}
          </Fragment>
        </ThemeProvider>
      </StrictMode>
    );
  }
}

const rootEl = document.getElementById('root');
if (rootEl) ReactDOM.render(<App />, rootEl);
