import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/index.jsx';

const Home = () => {

  return useObserver(() => (
    <>
      <div
        className={styles.home__wrapper}
      >
        <div className={styles.header}>
          <div className={styles.header__wrapper}>
            <img
              className={styles.logo}
              src="./assets/img/FYFR.svg"
              alt="logo"
              width="37"
              height="39"
            />
            <Link to={'login'}className={styles.button} style={{backgroundImage: `url(./assets/img/arrow.svg)`}}>
              login
            </Link>
          </div>
        </div>

        <div className={styles.sliced__wrapper}>
          <img className={`${styles.img} ${styles.img__left}`} src="./assets/img/header_left.jpg" alt="left" />
          <img className={`${styles.img} ${styles.img__middle}`}  src="./assets/img/header_middle.jpg" alt="middle" />
          <img className={`${styles.img} ${styles.img__right}`}  src="./assets/img/header_right.jpg" alt="right" />
          <img className={`${styles.img__small}`}  src="./assets/img/header_small.jpg" alt="small" />
        </div>

        <div className={styles.content__wrapper}>
          <div className={styles.timeline__wrapper}>
            <span>01</span>
            <span>Start Journey</span>
            <span>02</span>
            <span>See your roots</span>
            <span>03</span>
            <span>Read stories</span>
            <span>04</span>
            <span>Discover yourself</span>
            <span>05</span>
            <span>Go explore</span>
          </div>

          <div className={styles.title__wrapper}>
            <h1 className={styles.title}>Discover your hidden family roots</h1>
            <Button text={'Start now'} to={'link'} />
          </div>

          <p className={styles.sidetext}>
            Have you always wondered if your ancestors originated from another
            country? Eager to know where your history lies?
          </p>
        </div>
      </div>
    </>
  ));
};

export default Home;
