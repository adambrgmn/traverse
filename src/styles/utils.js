// @flow

type Props = Object;

const leading = (num: number) => (props: Props) =>
  `${props.theme.type.leading * num}rem`;
const margin = leading;
const padding = leading;

const size = (num: number) => (props: Props) =>
  `${props.theme.type.baseFontSize * num}rem`;

const color = (c: string) => (props: Props) => props.theme.color[c];

export { leading, margin, padding, size, color };
