import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import styles from './Menu.module.css';
import Button from '../Button/index.jsx';

const Menu = () => {
  return useObserver(() => (
    <>
      <div className={styles.menu__wrapper}>
          <img
          className={styles.image}
          src="./assets/img/ancestor_george.png"
          alt=""
          height="140"
          width="140"
        />
        <h2 className={styles.name}>Ethan Cole</h2>

        <div className={styles.menu__nav}>
            <NavLink to={`${ROUTES.ancestors}`} className={styles.nav} activeClassName={styles.tabActive}>
                Dashboard
            </NavLink>
            <NavLink to={'ling'} className={styles.nav} activeClassName={styles.tabActive}>
                Link 1
            </NavLink>
            <NavLink to={'link'} className={styles.nav} activeClassName={styles.tabActive}>
                Link 2
            </NavLink>
            <NavLink to={`${ROUTES.bookmarks}`} className={styles.nav} activeClassName={styles.tabActive}>
                Bookmarks
            </NavLink>
            <NavLink to={'settings'} className={styles.nav} activeClassName={styles.tabActive}>
                Settings
            </NavLink>
        </div>
      </div>
      <Button text={'logout'} to={'link'} />
    </>
  ));
};

export default Menu;
