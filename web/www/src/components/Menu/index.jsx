import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useStore } from '../../hooks/useStore';
import styles from './Menu.module.css';
import Button from '../Button/index.jsx';

const Menu = () => {
  const { uiStore, userStore } = useStore();

  console.log(userStore.users);
  console.log(uiStore.currentUser);

  return useObserver(() => (
    <>
      <div className={styles.menu__wrapper}>
        <img
          className={styles.image}
          src={uiStore.currentUser.avatar}
          alt=""
          height="140"
          width="140"
        />

        <h2 className={styles.name}>{uiStore.currentUser.name}</h2>

        <div className={styles.menu__nav}>
          <NavLink
            to={`${ROUTES.ancestors}`}
            className={styles.nav}
            activeClassName={styles.tabActive}
          >
            Family Tree
          </NavLink>
          <NavLink
            to={`${ROUTES.map}`}
            className={styles.nav}
            activeClassName={styles.tabActive}
          >
            DNA Roots
          </NavLink>
          <NavLink
            to={'link'}
            className={styles.nav}
            activeClassName={styles.tabActive}
          >
            Link 2
          </NavLink>
          <NavLink
            to={`${ROUTES.bookmarks}`}
            className={styles.nav}
            activeClassName={styles.tabActive}
          > 
            Bookmarks
          </NavLink>
          <NavLink
            to={'settings'}
            className={styles.nav}
            activeClassName={styles.tabActive}
          >
            Settings
          </NavLink>
        </div>
      </div>
      <Button text={'logout'} to={'link'} />
    </>
  ));
};

export default Menu;
