import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Home.module.css';
import Button from '../Button/index.jsx';

const Home = () => {

  return useObserver(() => (
    <>
      <div
        className={styles.home__bg}
        style={{ backgroundImage: `url(assets/img/home_bgcolor.png)` }}
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
            <Button text={'Login'} to={'login'} />
          </div>
        </div>

        <div className={styles.sliced__wrapper}>
          <img className={`${styles.img} ${styles.img__left}`} src="./assets/img/header_left.png" alt="left" />
          <img className={`${styles.img} ${styles.img__middle}`}  src="./assets/img/header_middle.png" alt="middle" />
          <img className={`${styles.img} ${styles.img__right}`}  src="./assets/img/header_right_old.png" alt="right" />
          {/* <img className={`${styles.img__red}`}  src="./assets/img/header_red.png" alt="red" /> */}
          <img className={`${styles.img__small}`}  src="./assets/img/header_small.png" alt="small" />
          {/* <img className={`${styles.img__mouw}`}  src="./assets/img/header_mouw.png" alt="mouw" /> */}
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
