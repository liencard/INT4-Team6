import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Preview.module.css';
import Button from '../Button/index.jsx';

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
        <p className={styles.intro}>
          Mary Walcott was born in 1777 because her mother, a black slave was
          allowed to give birth to a child by her white owner.
        </p>
      </div>
      <Button text={'read story'} to={'link'} />
    </>
  ));
};

export default Preview;
