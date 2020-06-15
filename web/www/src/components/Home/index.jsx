import React, { useState } from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from '../Button/index.jsx';
import Login from '../LoginSidebar/index.jsx';

const Home = () => {
  const [login, setLogin] = useState(false);

  const LoginView = () => {
    if (login) {
      return <Login login={login} />;
    } else {
      return '';
    }
  };

  return useObserver(() => (
    <>
      <LoginView />
      <div className={styles.home__wrapper}>
        <div className={styles.header}>
          <div className={styles.header__wrapper}>
            <img
              className={styles.logo}
              src="./assets/img/FYFR.svg"
              alt="logo"
              width="37"
              height="39"
            />
            <div className={styles.button__wrapper}>
              <button
                className={`${login ? styles.buttonDissapear : styles.button}`}
                style={{ backgroundImage: `url(./assets/img/arrow.svg)` }}
                onClick={(e) => setLogin(true)}
              >
                Login
              </button>
              <button
                className={`${login ? styles.button__back : styles.buttonDissapear}`}
                style={{ backgroundImage: `url(./assets/img/arrow_back.svg)` }}
                onClick={(e) => setLogin(false)}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${styles.sliced__wrapper} ${
            login ? styles.sliced__wrapperMove : ''
          }`}
        >
          <img
            className={`${styles.img} ${styles.img__left}`}
            src="./assets/img/header_left.jpg"
            alt="left"
          />
          <img
            className={`${styles.img} ${styles.img__middle}`}
            src="./assets/img/header_middle.jpg"
            alt="middle"
          />
          <img
            className={`${styles.img} ${styles.img__right}`}
            src="./assets/img/header_right.jpg"
            alt="right"
          />
          <img
            className={`${styles.img__small}`}
            src="./assets/img/header_small.jpg"
            alt="small"
          />
        </div>

        <div className={styles.content__wrapper}>
          <div
            className={`${styles.timeline__wrapper} ${
              login ? styles.timeline__wrapperDissapear : ''
            }`}
          >
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

          <div
            className={`${styles.title__wrapper} ${
              login ? styles.title__wrapperDissapear : ''
            }`}
          >
            <h1 className={styles.title}>Discover your hidden family roots</h1>
            <Button text={'Start now'} to={'link'} />
          </div>

          <p
            className={`${styles.sidetext} ${
              login ? styles.sidetextDissolve : ''
            }`}
          >
            Have you always wondered if your ancestors originated from another
            country? Eager to know where your history lies?
          </p>
        </div>
      </div>
    </>
  ));
};

export default Home;
