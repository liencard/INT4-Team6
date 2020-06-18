import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Preview.module.css';
import { Link } from 'react-router-dom';

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
        <p className={styles.intro}>{ancestor.intro}</p>
        <div className={styles.info}>
          <img
            className={styles.icon}
            src="./assets/img/icon_location.svg"
            alt="icon of location pin"
            width="21"
            height="25"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>{ancestor.place}</p>
            <p className={styles.info__subtitle}>{ancestor.country}</p>
          </div>
          <img
            className={styles.icon}
            src="./assets/img/icon_work.svg"
            alt="icon of work bag"
            width="24"
            height="22"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>{ancestor.occupation}</p>
            <p className={styles.info__subtitle}>{ancestor.occupation_place}</p>
          </div>
          <img
            className={styles.icon}
            src="./assets/img/icon_period.svg"
            alt="icon of travel back time icon"
            width="22"
            height="21"
          />
          <div className={styles.info__wrapper}>
            <p className={styles.info__title}>{ancestor.occurrence}</p>
            <p className={styles.info__subtitle}>{ancestor.occurrence_time}</p>
          </div>
        </div>
      </div>
      <Link className={styles.button}  to={`/detail/${ancestor.id}`}>read story</Link>
    </>
  ));
};

export default Preview;
