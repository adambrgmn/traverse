import styled from 'styled-components';

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: ${1.3 / 2}rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Button = styled.button`
  all: unset;
`;

const Folder = styled.span`
  margin-right: 1em;
`;

const Parents = styled.span`
  opacity: 0.5;
`;

const ItemCount = styled.span`
  margin-right: 1em;
`;

const TraverseIndication = styled.span`
  opacity: 0;

  ${Button}:hover & {
    color: #ffe01b;
    opacity: 1;
  }
`;

export {
  List,
  ListItem,
  Button,
  Folder,
  Parents,
  ItemCount,
  TraverseIndication,
};
