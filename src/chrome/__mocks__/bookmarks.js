/* eslint-disable no-underscore-dangle */
const _tree = [
  {
    dateAdded: 1540881134945,
    id: '0',
    title: '',
    children: [
      {
        dateAdded: 1516871994475,
        dateGroupModified: 1540881139074,
        id: '1',
        index: 0,
        parentId: '0',
        title: 'Bookmarkfield',
        children: [
          {
            dateAdded: 1439234133809,
            id: '6',
            index: 1,
            parentId: '1',
            title: '',
            url: 'https://www.facebook.com/',
          },
          {
            dateAdded: 1475453754443,
            id: '7',
            index: 2,
            parentId: '1',
            title: '',
            url: 'https://github.com/',
          },
          {
            dateAdded: 1473842042193,
            id: '8',
            index: 3,
            parentId: '1',
            title: '',
            url: 'https://medium.com/',
          },
          {
            dateAdded: 1483357588164,
            id: '12',
            index: 7,
            parentId: '1',
            title: '',
            url: 'https://travis-ci.org/',
          },
          {
            dateAdded: 1516026936270,
            id: '15',
            index: 10,
            parentId: '1',
            title: '',
            url: 'https://app.netlify.com/',
          },
        ],
      },
      {
        dateAdded: 1516871994475,
        id: '2',
        index: 1,
        parentId: '0',
        title: 'Other bookmarks',
        children: [],
      },
    ],
  },
];

const getTree = jest.fn(() => Promise.resolve(_tree));

export { _tree, getTree };
