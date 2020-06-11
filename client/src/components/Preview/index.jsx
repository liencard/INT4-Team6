import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Preview.module.css';

const Preview = ({ancestor, preview}) => {

  return useObserver(() => (
      <>
        <h2>{ancestor.name}</h2>
        <p>Geboorte - Sterfte</p>
        <p>Intro</p>
    </>
  ));
};

export default Preview;
