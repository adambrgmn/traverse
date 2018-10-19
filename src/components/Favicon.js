// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { size, margin } from '../styles/utils';

const Img = styled.img`
  display: inline-block;
  width: ${size(1)};
  height: ${size(1)};
  margin-right: ${margin(0.5)};
  transform: translateY(1px);
`;

type Props = {
  url: string, // eslint-disable-line
};

type State = {
  src: string,
};

class Favicon extends PureComponent<Props, State> {
  state = {
    src: '',
  };

  componentDidMount() {
    this.downloadIcon();
  }

  downloadIcon = async () => {
    try {
      const { url } = this.props;
      const { origin } = new URL(url);
      const src = `${origin}/favicon.ico`;

      const img = new Image();
      img.src = src;
      img.onload = () => this.setState(() => ({ src }));

      img.onerror = async () => {
        try {
          const res = await fetch(origin, { mode: 'no-cors' });
          const text = await res.text();
          console.log(text);
        } catch (err) {
          console.error(origin, err);
          // void
        }
      };
    } catch (err) {
      console.log(err);
      // void
    }
  };

  render() {
    const { src } = this.state;
    return src && <Img src={src} alt="" />;
  }
}

export { Favicon };
