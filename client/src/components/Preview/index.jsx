import React from 'react';
import { useObserver } from 'mobx-react-lite';

const Preview = ({ancestor, preview}) => {
console.log(preview)

const Content = () => {
    if (preview) {
        return ancestor.name
    } else {
        return `geen ancestor`
    }
}

  return useObserver(() => (
    <Content />
  ));
};

export default Preview;
