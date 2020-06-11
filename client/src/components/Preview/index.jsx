import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Preview.module.css';

const Preview = ({ancestor}) => {

  return useObserver(() => (
    <>
      <div className={styles.preview__wrapper}>
        <img
          className={styles.image}
          src="./assets/img/ancestor_george.png"
          alt=""
          height="140"
          width="140"
        />

        <div className={styles.header}>
          <h2 className={styles.name}>{ancestor.name}</h2>
          <p className={styles.dates}>
            {ancestor.birthdate} - {ancestor.deathdate}
          </p>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <button>Button</button>
    </>
  ));
};

export default Preview;
