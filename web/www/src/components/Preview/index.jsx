import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Preview.module.css';
import Button from '../Button/index.jsx';

const Preview = ({ancestor}) => {
  const imgName = ancestor.name.split(' ').join('');
  console.log(ancestor.name);

  return useObserver(() => (
    <>
      <div className={styles.preview__wrapper}>
        <img
          className={styles.image}
          src={`./assets/img/ancestors/thumbnail/${imgName}.jpg`}
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

        <div className={styles.info}>
          <img
            className={styles.icon}
            src="./assets/img/icon_location.svg"
            alt="icon of location pin"
            width="21"
            height="25"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>Georgia</p>
            <p className={styles.info__subtitle}>United States of America</p>
          </div>
          <img
            className={styles.icon}
            src="./assets/img/icon_work.svg"
            alt="icon of work bag"
            width="24"
            height="22"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>Farmer</p>
            <p className={styles.info__subtitle}>Working at cotton fields</p>
          </div>
          <img
            className={styles.icon}
            src="./assets/img/icon_period.svg"
            alt="icon of travel back time icon"
            width="22"
            height="21"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>The american revolution</p>
            <p className={styles.info__subtitle}>1776 - 1789</p>
          </div>
        </div>
      </div>
      <Button text={'read story'} to={'link'} />
    </>
  ));
};

export default Preview;
