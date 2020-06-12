import React from 'react';
import { useObserver } from 'mobx-react-lite';
import styles from './Home.module.css';
import Button from '../Button/index.jsx';

const Home = () => {

  return useObserver(() => (
    <>
      <div
        className={styles.home__bg}
        style={{ backgroundImage: `url(assets/img/home_header.png)` }}
      >
        <div className={styles.header}>
            <img className={styles.img} src='./assets/img/FYFR.svg' alt="group img" width="37" height="39"/>
            <Button text={'Login'} to={'onboarding-one'} />
        </div>

        <div className={styles.title__wrapper}>
            <h1 className={styles.title}>Discover your hidden family roots</h1>
            <Button text={'Start now'} to={'link'} />
        </div>

    </div>
    </>
  ));
};

export default Home;